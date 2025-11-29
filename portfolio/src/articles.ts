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
    
    if (articles.length === 0) {
      articlesGrid.innerHTML = `
        <div class="col-span-full text-center p-12">
          <div class="brutal-card bg-neon-yellow inline-block">
            <h2 class="text-3xl font-black uppercase mb-4">No Articles Yet</h2>
            <p class="font-mono">Add the 'article' topic to your repositories to showcase them here!</p>
          </div>
        </div>
      `;
      return;
    }
    
    // Render articles
    articlesGrid.innerHTML = articles
      .map(article => createArticleCard(article))
      .join('');
      
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
