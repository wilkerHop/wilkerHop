import '../styles/style.css';
import { fetchGitHubData } from './github-api';
import { createRepoCard, createStatWidget, formatNumber } from './utils';

async function initPortfolio() {
  try {
    // Show loading state
    const statsGrid = document.getElementById('stats-grid');
    const reposGrid = document.getElementById('repos-grid');
    
    if (!statsGrid || !reposGrid) {
      console.error('Required elements not found');
      return;
    }
    
    statsGrid.innerHTML = '<div class="col-span-full text-center text-2xl font-black uppercase">Loading stats...</div>';
    reposGrid.innerHTML = '<div class="col-span-full text-center text-2xl font-black uppercase">Loading repositories...</div>';
    
    // Fetch GitHub data
    const { stats, repositories } = await fetchGitHubData();
    
    // Render stats
    statsGrid.innerHTML = `
      ${createStatWidget(stats.totalRepos.toString(), 'REPOSITORIES', 'bg-neon-yellow')}
      ${createStatWidget(formatNumber(stats.totalStars), 'TOTAL STARS', 'bg-hot-pink')}
      ${createStatWidget(formatNumber(stats.totalForks), 'TOTAL FORKS', 'bg-electric-cyan')}
      ${createStatWidget(stats.languages[0]?.name || 'N/A', 'TOP LANGUAGE', 'bg-neon-green')}
    `;
    
    // Render repositories
    reposGrid.innerHTML = repositories
      .slice(0, 12) // Show top 12
      .map(repo => createRepoCard(repo))
      .join('');
      
  } catch (error) {
    console.error('Error initializing portfolio:', error);
    const statsGrid = document.getElementById('stats-grid');
    const reposGrid = document.getElementById('repos-grid');
    
    if (statsGrid) {
      statsGrid.innerHTML = '<div class="col-span-full text-center text-red-600 font-black">Error loading stats</div>';
    }
    if (reposGrid) {
      reposGrid.innerHTML = '<div class="col-span-full text-center text-red-600 font-black">Error loading repositories</div>';
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
