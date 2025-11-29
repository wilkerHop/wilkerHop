import { Octokit } from '@octokit/rest';
import type { ArticleRepo, LanguageStat, Repository, UserStats } from './types';

const GITHUB_USERNAME = 'wilkerHop';
const octokit = new Octokit();

/**
 * Checks if a repository is relevant based on criteria:
 * - Has description
 * - Has at least one topic
 * - Updated in last 12 months OR has stars
 * - Not a fork (optional)
 */
function isRelevant(repo: Repository): boolean {
  const hasDescription = !!repo.description;
  const hasTopics = repo.topics && repo.topics.length > 0;
  
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
  const recentlyUpdated = new Date(repo.updated_at) > twelveMonthsAgo;
  
  const hasActivity = recentlyUpdated || repo.stargazers_count > 0;
  const notFork = !repo.fork;
  
  return hasDescription && hasTopics && hasActivity && notFork;
}

/**
 * Fetch all public repositories for the user
 */
export async function fetchRepositories(): Promise<Repository[]> {
  try {
    const { data } = await octokit.repos.listForUser({
      username: GITHUB_USERNAME,
      sort: 'updated',
      per_page: 100,
    });
    
    return data.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage ?? null,
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count ?? 0,
      forks_count: repo.forks_count ?? 0,
      language: repo.language ?? null,
      updated_at: repo.updated_at ?? new Date().toISOString(),
      created_at: repo.created_at ?? new Date().toISOString(),
      fork: repo.fork ?? false,
      open_issues_count: repo.open_issues_count ?? 0,
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

/**
 * Filter repositories by relevancy criteria
 */
export function filterRelevantRepos(repos: Repository[]): Repository[] {
  return repos.filter(isRelevant);
}

/**
 * Get repositories tagged with 'article' topic
 */
export function getArticleRepos(repos: Repository[]): ArticleRepo[] {
  return repos
    .filter(repo => repo.topics.includes('article'))
    .map(repo => ({
      ...repo,
      summary: repo.description || 'No description available',
      imageUrl: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    }));
}

/**
 * Calculate language statistics from repositories
 */
export function calculateLanguageStats(repos: Repository[]): LanguageStat[] {
  const languageCounts: Record<string, number> = {};
  
  repos.forEach(repo => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });
  
  const total = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 languages
}

/**
 * Calculate user statistics
 */
export function calculateUserStats(repos: Repository[]): UserStats {
  const relevantRepos = filterRelevantRepos(repos);
  
  const totalStars = relevantRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = relevantRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
  
  const topRepositories = [...relevantRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
  
  return {
    totalRepos: relevantRepos.length,
    totalStars,
    totalForks,
    languages: calculateLanguageStats(relevantRepos),
    topRepositories,
  };
}

/**
 * Main function to fetch all GitHub data
 */
export async function fetchGitHubData() {
  const repos = await fetchRepositories();
  const stats = calculateUserStats(repos);
  const articles = getArticleRepos(repos);
  const relevantRepos = filterRelevantRepos(repos);
  
  return {
    stats,
    articles,
    repositories: relevantRepos,
  };
}
