import axios from 'axios';
import fs from 'fs';

// ============================================================================
// Type Definitions
// ============================================================================

interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

interface Environment {
  URL: string;
}

// ============================================================================
// Environment Validation
// ============================================================================

function validateEnvironment(): Environment {
  const url = process.env['URL'];

  if (!url) {
    throw new Error('URL environment variable is required');
  }

  return {
    URL: url,
  };
}

// ============================================================================
// Date Utilities
// ============================================================================

function getYesterdayDate(): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0] ?? '';
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0] ?? '';
}

// ============================================================================
// HTML Generation
// ============================================================================

function createArticleHtml(article: NewsArticle): string {
  return `
<tr>
<td valign="top" align="center" width="20%">
<a href="${article.url}">
<span>${article.source.name}</span>
<img src="${article.urlToImage}" align="center" alt="${article.source.name}"/>
</a>
</td>
<td valign="center" width="80%">
<h2>${article.title}</h2>
<p>${article.description}</p>
</td>
</tr>`;
}

function createNewsTable(articles: NewsArticle[]): string {
  const articleRows = articles
    .slice(0, 5)
    .map((article) => createArticleHtml(article))
    .join('\n');

  return `\n<table width="100%">${articleRows}\n</table>\n`;
}

// ============================================================================
// News API
// ============================================================================

async function fetchNews(apiUrl: string): Promise<NewsArticle[]> {
  try {
    const response = await axios.get<NewsApiResponse>(apiUrl);

    if (response.data.status !== 'ok') {
      throw new Error(`News API returned status: ${response.data.status}`);
    }

    return response.data.articles;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch news: ${error.message}`);
    }
    throw error;
  }
}

// ============================================================================
// README Update
// ============================================================================

function updateReadmeWithNews(newsTable: string): void {
  const readmePath = 'README.md';

  if (!fs.existsSync(readmePath)) {
    throw new Error('README.md file not found');
  }

  const readme = fs.readFileSync(readmePath, 'utf8');
  const parts = readme.split('<!-- Crypto News -->');

  if (parts.length !== 3) {
    throw new Error(
      'README.md must contain exactly two <!-- Crypto News --> markers'
    );
  }

  const [head, , tail] = parts;
  const newReadme = [head, newsTable, tail].join('<!-- Crypto News -->');

  fs.writeFileSync(readmePath, newReadme);
}

// ============================================================================
// Main Application
// ============================================================================

async function main(): Promise<void> {
  try {
    // Validate environment variables
    const env = validateEnvironment();

    // Build API URL with date parameters
    const today = getTodayDate();
    const yesterday = getYesterdayDate();
    const apiUrl = `${env.URL}${today}&from=${yesterday}`;

    // Fetch news articles
    const articles = await fetchNews(apiUrl);

    if (articles.length === 0) {
      console.warn('⚠️  No articles found for the specified date range');
      return;
    }

    // Generate HTML table
    const newsTable = createNewsTable(articles);

    // Update README
    updateReadmeWithNews(newsTable);

    console.log(`✅ Successfully updated news in README.md (${articles.length} articles fetched, showing top 5)`);
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
