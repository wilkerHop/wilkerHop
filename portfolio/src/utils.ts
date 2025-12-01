import type { ArticleRepo, Repository } from './types';

/**
 * Format a number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Format a date to relative time
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
}

/**
 * Get color for a programming language
 */
export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#41b883',
    React: '#61dafb',
  };
  
  return language ? (colors[language] || '#858585') : '#858585';
}

/**
 * Create brutal button HTML
 */
export function createBrutalButton(text: string, href: string, colorClass = 'bg-neon-yellow'): string {
  return `
    <a href="${href}" 
       class="brutal-btn ${colorClass} inline-block px-6 py-3 text-brutal-black
              border-4 border-brutal-black font-bold uppercase tracking-wider
              shadow-brutal hover:shadow-brutal-hover
              transition-all duration-75
              hover:translate-x-[2px] hover:translate-y-[2px]
              active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
       target="_blank" rel="noopener noreferrer">
      ${text}
    </a>
  `;
}

/**
 * Get bento card size class based on index and type
 */
export function getBentoCardClass(index: number, type: 'stat' | 'repo' | 'article' | 'news'): string {
  if (type === 'stat') {
    // Stats: First two are larger
    if (index === 0) return 'bento-card bento-card-large'; // Total Repos
    if (index === 1) return 'bento-card bento-card-medium'; // Total Stars
    return 'bento-card bento-card-small';
  }
  
  if (type === 'repo') {
    // Repos: First one large, next 2 medium, rest small
    if (index === 0) return 'bento-card bento-card-large';
    if (index === 1 || index === 2) return 'bento-card bento-card-medium';
    return 'bento-card bento-card-small';
  }
  
  if (type === 'article') {
    // Articles: First one wide, others alternate medium/small
    if (index === 0) return 'bento-card bento-card-wide';
    return index % 2 === 0 ? 'bento-card bento-card-small' : 'bento-card bento-card-medium';
  }
  
  if (type === 'news') {
    // News: First two medium, others small
    if (index === 0 || index === 1) return 'bento-card bento-card-medium';
    return 'bento-card bento-card-small';
  }
  
  return 'bento-card bento-card-small';
}

/**
 * Create repository card HTML
 */
export function createRepoCard(repo: Repository, index: number = 0): string {
  const topics = repo.topics.slice(0, 5).map(topic => 
    `<span class="brutal-tag px-2 py-1 bg-brutal-black text-neon-cyan border-2 border-neon-cyan text-xs font-mono uppercase">${topic}</span>`
  ).join('');
  
  const bentoClass = getBentoCardClass(index, 'repo');
  
  return `
    <div class="${bentoClass} bg-brutal-white border-5 border-brutal-black p-6
                shadow-brutal-lg hover:shadow-brutal
                hover:translate-x-[4px] hover:translate-y-[4px]
                transition-all duration-100">
      <div class="brutal-accent-left brutal-accent-pink pl-4 mb-4">
        <h3 class="text-xl sm:text-2xl font-black uppercase">${repo.name}</h3>
      </div>
      <p class="text-sm mb-4 line-clamp-3">${repo.description || 'No description'}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${topics}
      </div>
      <div class="flex justify-between items-center text-sm">
        <div class="flex gap-4">
          ${repo.language ? `<span class="font-mono">💻 ${repo.language}</span>` : ''}
          <span class="font-mono">⭐ ${repo.stargazers_count}</span>
        </div>
        <a href="${repo.html_url}" 
           class="brutal-link font-bold uppercase underline decoration-4"
           target="_blank" rel="noopener noreferrer">
          VIEW →
        </a>
      </div>
    </div>
  `;
}

/**
 * Create article card HTML
 */
export function createArticleCard(article: ArticleRepo, index: number = 0): string {
  const bentoClass = getBentoCardClass(index, 'article');
  
  return `
    <article class="${bentoClass} bg-brutal-white border-5 border-brutal-black p-6
                    shadow-brutal-lg hover:shadow-brutal
                    hover:translate-x-[4px] hover:translate-y-[4px]
                    transition-all duration-100">
      ${article.imageUrl ? `
        <div class="border-4 border-brutal-black mb-6 overflow-hidden">
          <img src="${article.imageUrl}" 
               alt="${article.name}" 
               class="w-full h-48 object-cover"
               loading="lazy">
        </div>
      ` : ''}
      <div class="brutal-accent-left brutal-accent-cyan pl-4 mb-4">
        <h2 class="text-2xl sm:text-3xl font-black uppercase">${article.name}</h2>
      </div>
      <p class="text-base mb-6 leading-relaxed">${article.summary}</p>
      <div class="flex gap-4">
        ${createBrutalButton('VIEW LIVE DEMO', article.homepage || '#', 'bg-hot-pink')}
      </div>
    </article>
  `;
}

/**
 * Create stats widget HTML
 */
export function createStatWidget(label: string, value: string | number, colorClass: string, index: number = 0): string {
  const bentoClass = getBentoCardClass(index, 'stat');
  
  return `
    <div class="${bentoClass} ${colorClass} border-5 border-brutal-black p-6 sm:p-8 text-center
                shadow-brutal flex flex-col justify-center items-center">
      <div class="text-4xl sm:text-5xl font-black mb-2">${value}</div>
      <div class="text-xs sm:text-sm font-mono uppercase tracking-widest">${label}</div>
    </div>
  `;
}
