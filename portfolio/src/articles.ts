import '../styles/style.css';
import { fetchGitHubData } from './github-api';
import { createArticleCard } from './utils';

async function initArticles() {
  try {
    const articlesGrid = document.getElementById('articles-grid');
    
    if (!articlesGrid) {
      console.error('Articles grid element not found');
      return;
    }
    
    articlesGrid.innerHTML = '<div class="col-span-full text-center text-2xl font-black uppercase">Loading articles...</div>';
    
    // Fetch GitHub data
    const { articles } = await fetchGitHubData();
    
    // All article repos are now live demos (built locally)
    const liveArticles = articles;
    
    if (liveArticles.length === 0) {
      articlesGrid.innerHTML = `
        <div class="col-span-full text-center p-12">
          <div class="brutal-card bg-neon-yellow inline-block">
            <h2 class="text-3xl font-black uppercase mb-4">No Live Demos Yet</h2>
            <p class="font-mono">Add the 'article' topic and a homepage URL to repositories to showcase live demos here!</p>
          </div>
        </div>
      `;
      return;
    }
    
    // Render articles
    articlesGrid.innerHTML = liveArticles
      .map((article, index) => createArticleCard(article, index))
      .filter(html => html !== '') // Remove empty cards
      .join('');
      
    // Populate Demos Dropdown
    const demosDropdown = document.getElementById('demos-dropdown');
    if (demosDropdown) {
      if (liveArticles.length > 0) {
        demosDropdown.innerHTML = liveArticles.map(article => `
          <a href="${article.homepage}" 
             class="block px-4 py-3 border-b-2 border-brutal-black hover:bg-neon-yellow font-bold uppercase text-sm last:border-b-0 transition-colors">
            ${article.name}
          </a>
        `).join('');
      } else {
        demosDropdown.innerHTML = '<div class="p-4 text-center font-mono text-sm">No demos available</div>';
      }
    }
      
  } catch (error) {
    console.error('Error initializing articles:', error);
    const articlesGrid = document.getElementById('articles-grid');
    
    if (articlesGrid) {
      articlesGrid.innerHTML = '<div class="col-span-full text-center text-red-600 font-black">Error loading articles</div>';
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initArticles);
} else {
  initArticles();
}
