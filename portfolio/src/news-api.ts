import type { CachedNews, NewsArticle, NewsResponse, Repository } from './types';

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const CACHE_KEY = 'wilkerHop_news_cache';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

/**
 * Extract unique topics from repositories for news queries
 */
export function extractTopics(repos: Repository[]): string[] {
  const topicsSet = new Set<string>();
  
  repos.forEach(repo => {
    repo.topics.forEach(topic => {
      // Filter out generic topics and keep tech-specific ones
      const normalized = topic.toLowerCase();
      if (normalized.length > 2 && !['demo', 'article', 'project'].includes(normalized)) {
        topicsSet.add(normalized);
      }
    });
    
    // Also add primary language if it exists
    if (repo.language) {
      topicsSet.add(repo.language.toLowerCase());
    }
  });
  
  return Array.from(topicsSet).slice(0, 10); // Limit to top 10 topics
}

/**
 * Get cached news if still valid
 */
function getCachedNews(): NewsArticle[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const parsedCache: CachedNews = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - parsedCache.timestamp < CACHE_TTL) {
      console.log('📦 Using cached news data');
      return parsedCache.data;
    }
    
    console.log('⏰ Cache expired, fetching fresh news');
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

/**
 * Save news to cache
 */
function cacheNews(articles: NewsArticle[], topics: string[]): void {
  try {
    const cacheData: CachedNews = {
      data: articles,
      timestamp: Date.now(),
      topics,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    console.log('💾 News cached successfully');
  } catch (error) {
    console.error('Error caching news:', error);
  }
}

/**
 * Fetch news from NewsAPI.org
 * Note: This uses the free tier which requires an API key.
 * For development, we'll use a fallback if no key is provided.
 */
export async function fetchNews(topics: string[]): Promise<NewsArticle[]> {
  // Check cache first
  const cached = getCachedNews();
  if (cached) return cached;
  
  try {
    // Build query from topics
    const query = topics.slice(0, 5).join(' OR '); // Limit to 5 topics for cleaner results
    
    // Note: NewsAPI.org requires an API key. 
    // For a truly free solution without API key, we'll use a fallback approach
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️ No NEWS_API_KEY found, using fallback data');
      return getFallbackNews(topics);
    }
    
    const url = new URL(`${NEWS_API_BASE_URL}/everything`);
    url.searchParams.append('q', query);
    url.searchParams.append('language', 'en');
    url.searchParams.append('sortBy', 'publishedAt');
    url.searchParams.append('pageSize', '20');
    url.searchParams.append('apiKey', apiKey);
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }
    
    const data: NewsResponse = await response.json();
    
    // Cache the results
    cacheNews(data.articles, topics);
    
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return getFallbackNews(topics);
  }
}

/**
 * Fallback news data when API is unavailable or no key is provided
 * Uses RSS feeds or other free sources
 */
function getFallbackNews(topics: string[]): NewsArticle[] {
  // For now, return empty array. In a production app, you could:
  // 1. Use RSS feeds from tech sites (Hacker News, Dev.to, etc.)
  // 2. Use Google News RSS
  // 3. Scrape public tech news sites
  // 4. Use alternative free APIs like Bing News Search API (also requires key)
  
  console.log('📰 Attempting to fetch from alternative sources...');
  
  // Return sample data for demonstration
  return [
    {
      source: { id: null, name: 'GitHub Blog' },
      author: null,
      title: `Hot Topics in ${topics[0] || 'Tech'}: Latest Updates`,
      description: 'Stay updated with the latest developments in your tech stack.',
      url: 'https://github.blog',
      urlToImage: null,
      publishedAt: new Date().toISOString(),
      content: 'No API key configured. Please add VITE_NEWS_API_KEY to your .env file for live news.',
    },
  ];
}

/**
 * Clear cached news (useful for testing)
 */
export function clearNewsCache(): void {
  localStorage.removeItem(CACHE_KEY);
  console.log('🗑️ News cache cleared');
}
