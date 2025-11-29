import axios from 'axios';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import qs from 'qs';

// ============================================================================
// Type Definitions
// ============================================================================

interface LanguageStats {
  name: string;
  text: string;
  total_seconds: number;
}

interface WakatimeStatsData {
  languages: LanguageStats[];
}

interface WakatimeStatsResponse {
  data: WakatimeStatsData;
}

interface WakatimeTokenDocument {
  refresh_token: string;
  access_token?: string;
}

interface WakatimeTokenResponse {
  access_token: string;
  refresh_token: string;
}

interface Environment {
  MONGODB_URI: string;
  WAKATIME_CLIENT_ID: string;
  WAKATIME_CLIENT_SECRET: string;
  WAKATIME_REDIRECT_URI: string;
}

// ============================================================================
// Environment Validation
// ============================================================================

function validateEnvironment(): Environment {
  const mongoUri = process.env['MONGODB_URI'];
  const clientId = process.env['WAKATIME_CLIENT_ID'];
  const clientSecret = process.env['WAKATIME_CLIENT_SECRET'];
  const redirectUri = process.env['WAKATIME_REDIRECT_URI'];

  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is required');
  }
  if (!clientId) {
    throw new Error('WAKATIME_CLIENT_ID environment variable is required');
  }
  if (!clientSecret) {
    throw new Error('WAKATIME_CLIENT_SECRET environment variable is required');
  }
  if (!redirectUri) {
    throw new Error('WAKATIME_REDIRECT_URI environment variable is required');
  }

  return {
    MONGODB_URI: mongoUri,
    WAKATIME_CLIENT_ID: clientId,
    WAKATIME_CLIENT_SECRET: clientSecret,
    WAKATIME_REDIRECT_URI: redirectUri,
  };
}

// ============================================================================
// Language Stats Formatting
// ============================================================================

function createLanguageStatsWithOther(languages: LanguageStats[]): string {
  const sorted = [...languages].sort((a) => (a.name === 'Other' ? -1 : 1));
  
  if (sorted.length < 6) {
    throw new Error('Expected at least 6 languages in stats');
  }

  const other = sorted[0];
  const first = sorted[1];
  const second = sorted[2];
  const third = sorted[3];
  const fourth = sorted[4];
  const fifth = sorted[5];

  if (!other || !first || !second || !third || !fourth || !fifth) {
    throw new Error('Failed to extract language stats from sorted array');
  }

  // TODO: sum the other with the remaining languages
  // TODO: randomize the order of the languages end texts
  return `
1. 🥇 **${first.name}** with **${first.text}** of pleasure.
2. 🥈 **${second.name}** with **${second.text}** of work.
3. 🥉 **${third.name}** with **${third.text}** of playing.
4. 🏅 **${fourth.name}** with **${fourth.text}** of extreme thinking.
5. 🎖️ **${fifth.name}** with **${fifth.text}** of worrying bugs would appear.

And more **${other.text}** of 😁🖱💻🔌 (diverse file extensions).`;
}

// ============================================================================
// Wakatime API
// ============================================================================

async function getWakatimeTokens(
  refreshToken: string,
  env: Environment
): Promise<WakatimeTokenResponse> {
  const querystring = qs.stringify({
    client_id: env.WAKATIME_CLIENT_ID,
    client_secret: env.WAKATIME_CLIENT_SECRET,
    redirect_uri: env.WAKATIME_REDIRECT_URI,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const config = {
    method: 'post' as const,
    url: 'https://wakatime.com/oauth/token',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring,
  };

  try {
    const response = await axios(config);
    const data = qs.parse(response.data) as unknown as WakatimeTokenResponse;

    if (!data.access_token || !data.refresh_token) {
      throw new Error('Invalid token response from Wakatime API');
    }

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to refresh Wakatime tokens: ${error.message}`
      );
    }
    throw error;
  }
}

async function fetchWakatimeStats(
  accessToken: string
): Promise<WakatimeStatsData> {
  try {
    const response = await axios.get<WakatimeStatsResponse>(
      'https://wakatime.com/api/v1/users/current/stats/last_7_days',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch Wakatime stats: ${error.message}`
      );
    }
    throw error;
  }
}

// ============================================================================
// MongoDB Operations
// ============================================================================

async function updateTokensInDatabase(
  client: MongoClient,
  tokens: WakatimeTokenResponse
): Promise<void> {
  const collection = client.db('wakatime').collection<WakatimeTokenDocument>('tokens');
  
  await collection.updateOne(
    {},
    { 
      $set: { 
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token 
      } 
    }
  );
}

async function getRefreshTokenFromDatabase(
  client: MongoClient
): Promise<string> {
  const collection = client.db('wakatime').collection<WakatimeTokenDocument>('tokens');
  
  // TODO: get last time used to check if it's time to refresh the token
  const doc = await collection.findOne();
  
  if (!doc || !doc.refresh_token) {
    throw new Error('No refresh token found in database');
  }

  return doc.refresh_token;
}

// ============================================================================
// README Update
// ============================================================================

function updateReadmeWithStats(languageStats: string): void {
  const readmePath = 'README.md';
  
  if (!fs.existsSync(readmePath)) {
    throw new Error('README.md file not found');
  }

  const readme = fs.readFileSync(readmePath, 'utf8');
  const parts = readme.split('<!-- Wakatime Stats -->');

  if (parts.length !== 3) {
    throw new Error(
      'README.md must contain exactly two <!-- Wakatime Stats --> markers'
    );
  }

  const [head, , tail] = parts;
  const languages = `\n\n### Top Languages\n\n_Powered by [Wakatime](https://wakatime.com/@wilkerHop)_\n${languageStats}\n\n`;
  const newReadme = [head, languages, tail].join('<!-- Wakatime Stats -->');

  fs.writeFileSync(readmePath, newReadme);
}

// ============================================================================
// Main Application
// ============================================================================

async function main(): Promise<void> {
  try {
    // Validate environment variables
    const env = validateEnvironment();

    // Connect to MongoDB
    const client = new MongoClient(env.MONGODB_URI);
    await client.connect();

    try {
      // Get refresh token from database
      const refreshToken = await getRefreshTokenFromDatabase(client);

      // Refresh Wakatime tokens
      const tokens = await getWakatimeTokens(refreshToken, env);

      // Update tokens in database
      await updateTokensInDatabase(client, tokens);

      // Fetch Wakatime stats
      const stats = await fetchWakatimeStats(tokens.access_token);

      // Format language stats
      const languageStats = createLanguageStatsWithOther(stats.languages);

      // Update README
      updateReadmeWithStats(languageStats);

      console.log('✅ Successfully updated Wakatime stats in README.md');
    } finally {
      await client.close();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
    throw error;
  }
}

// Run the application
main();
