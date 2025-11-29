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
  if (languages.length === 0) {
    return 'No language data available for the last 7 days.';
  }

  const sorted = [...languages].sort((a) => (a.name === 'Other' ? -1 : 1));
  
  // Find 'Other' category
  const otherIndex = sorted.findIndex(lang => lang.name === 'Other');
  const other = otherIndex >= 0 ? sorted[otherIndex] : null;
  
  // Get top languages (excluding 'Other')
  const topLanguages = sorted.filter(lang => lang.name !== 'Other').slice(0, 5);
  
  // Emoji medals for top 5
  const medals = ['🥇', '🥈', '🥉', '🏅', '🎖️'];
  const descriptors = [
    'of pleasure',
    'of work',
    'of playing',
    'of extreme thinking',
    'of worrying bugs would appear'
  ];
  
  // Build language list
  const languageList = topLanguages
    .map((lang, index) => {
      const medal = medals[index] ?? '🏆';
      const descriptor = descriptors[index] ?? 'of coding';
      return `${index + 1}. ${medal} **${lang.name}** with **${lang.text}** ${descriptor}.`;
    })
    .join('\n');
  
  // Add 'Other' category if available
  const otherText = other 
    ? `\n\nAnd more **${other.text}** of 😁🖱💻🔌 (diverse file extensions).`
    : '';

  // TODO: randomize the order of the languages end texts
  return languageList + otherText;
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
