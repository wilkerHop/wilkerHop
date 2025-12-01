import { fetchGitHubData } from './github-api';
import { extractTopics, fetchNews } from './news-api';
import type { NewsArticle } from './types';
import { getBentoCardClass } from './utils';

/**
 * Render a single news card
 */
function createNewsCard(article: NewsArticle, index: number = 0): HTMLElement {
  const card = document.createElement('article');
  const bentoClass = getBentoCardClass(index, 'news');
  card.className = `${bentoClass} bg-brutal-white border-5 border-brutal-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`;
  
  const imageUrl = article.urlToImage || 'https://placehold.co/400x200/000000/FFFF00?text=News';
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  card.innerHTML = `
    <div class="aspect-video bg-brutal-black border-b-5 border-brutal-black overflow-hidden">
      <img 
        src="${imageUrl}" 
        alt="${article.title}"
        class="w-full h-full object-cover"
        onerror="this.src='https://placehold.co/400x200/000000/FFFF00?text=News'"
      />
    </div>
    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span class="brutal-badge bg-hot-pink text-xs">${article.source.name}</span>
        <span class="text-xs font-mono text-gray-600">${publishedDate}</span>
      </div>
      <h3 class="text-2xl font-black uppercase mb-3 leading-tight">
        ${article.title}
      </h3>
      <p class="font-mono text-sm mb-4 line-clamp-3">
        ${article.description || 'No description available'}
      </p>
      <a 
        href="${article.url}" 
        target="_blank" 
        rel="noopener noreferrer"
        class="brutal-btn bg-neon-yellow text-sm inline-block"
      >
        READ MORE →
      </a>
    </div>
  `;
  
  return card;
}

/**
 * Render loading state
 */
function renderLoading(): void {
  const grid = document.getElementById('news-grid');
  if (!grid) return;
  
  grid.innerHTML = `
    <div class="col-span-full text-center py-20">
      <div class="inline-block animate-spin text-6xl mb-4">📰</div>
      <p class="text-2xl font-black uppercase">Loading Hot Topics...</p>
      <p class="font-mono text-sm mt-2">Fetching latest tech news</p>
    </div>
  `;
}

/**
 * Render error state
 */
function renderError(message: string): void {
  const grid = document.getElementById('news-grid');
  if (!grid) return;
  
  grid.innerHTML = `
    <div class="col-span-full">
      <div class="bg-hot-pink border-5 border-brutal-black shadow-brutal p-8 text-center text-brutal-white">
        <div class="text-6xl mb-4">⚠️</div>
        <h3 class="text-3xl font-black uppercase mb-4">Oops!</h3>
        <p class="font-mono text-lg">${message}</p>
      </div>
    </div>
  `;
}

/**
 * Render news articles
 */
function renderNews(articles: NewsArticle[]): void {
  const grid = document.getElementById('news-grid');
  if (!grid) return;
  
  if (articles.length === 0) {
    renderError('No news articles found. Try again later!');
    return;
  }
  
  grid.innerHTML = '';
  articles.forEach((article, index) => {
    grid.appendChild(createNewsCard(article, index));
  });
}

/**
 * Initialize demos dropdown (shared component)
 */
async function initDemosDropdown() {
  try {
    const { articles } = await fetchGitHubData();
    const dropdown = document.getElementById('demos-dropdown');
    
    if (!dropdown || articles.length === 0) {
      if (dropdown) {
        dropdown.innerHTML = '<div class="p-4 text-center font-mono text-sm">No demos available</div>';
      }
      return;
    }
    
    dropdown.innerHTML = articles.map(article => `
      <a href="${article.homepage}" 
         class="block p-3 hover:bg-neon-yellow transition-colors border-b-2 border-brutal-black last:border-b-0 font-mono text-sm font-bold uppercase">
        ${article.name}
      </a>
    `).join('');
  } catch (error) {
    console.error('Error loading demos:', error);
  }
}

/**
 * Main initialization
 */
async function main() {
  console.log('🚀 Initializing News page...');
  
  renderLoading();
  
  try {
    // Fetch GitHub data to get repository topics
    const { repositories } = await fetchGitHubData();
    
    if (repositories.length === 0) {
      renderError('Could not load repository data');
      return;
    }
    
    // Extract topics from repositories
    const topics = extractTopics(repositories);
    console.log('📊 Topics:', topics);
    
    if (topics.length === 0) {
      renderError('No topics found in repositories');
      return;
    }
    
    // Fetch news based on topics
    const articles = await fetchNews(topics);
    
    // Render news
    renderNews(articles);
    
    // Initialize demos dropdown
    await initDemosDropdown();
    
    console.log('✅ News page initialized');
  } catch (error) {
    console.error('Error initializing news page:', error);
    renderError('Failed to load news. Please try again later.');
  }
}

// Run on page load
main();
