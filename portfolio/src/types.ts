export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  fork: boolean;
  open_issues_count: number;
}

export interface UserStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languages: LanguageStat[];
  topRepositories: Repository[];
}

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
}

export interface ArticleRepo extends Repository {
  imageUrl?: string;
  summary: string;
}
