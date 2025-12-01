import { Octokit } from '@octokit/rest';
import { exec } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const GITHUB_USERNAME = 'wilkerHop';
const DEMOS_DIR = join(process.cwd(), 'portfolio', 'public', 'demos');

// Initialize Octokit (uses GITHUB_TOKEN if available)
const octokit = new Octokit({
  auth: process.env['GITHUB_TOKEN'],
});

async function fetchDemos() {
  console.log('🚀 Starting demo fetch process...');

  try {
    // 1. Clean up existing demos directory
    console.log('Cleaning up existing demos...');
    await rm(DEMOS_DIR, { recursive: true, force: true });
    await mkdir(DEMOS_DIR, { recursive: true });

    // 2. Fetch all public repositories
    console.log(`Fetching repositories for ${GITHUB_USERNAME}...`);
    const { data: repos } = await octokit.repos.listForUser({
      username: GITHUB_USERNAME,
      type: 'owner',
      per_page: 100,
    });

    // 3. Filter for 'article' topic
    const articleRepos = repos.filter((repo: any) => 
      repo.topics?.includes('article')
    );

    console.log(`Found ${articleRepos.length} article repositories.`);

    // 4. Clone each repository
    for (const repo of articleRepos) {
      console.log(`\n📦 Processing ${repo.name}...`);
      
      const targetDir = join(DEMOS_DIR, repo.name);
      const cloneUrl = repo.clone_url;

      // Clone the repository
      console.log(`Cloning to ${targetDir}...`);
      await execAsync(`git clone --depth 1 ${cloneUrl} ${targetDir}`);

      // Remove .git directory to keep build clean
      const gitDir = join(targetDir, '.git');
      await rm(gitDir, { recursive: true, force: true });
      
      console.log(`✅ ${repo.name} ready!`);
    }

    console.log('\n✨ All demos fetched successfully!');
    
  } catch (error) {
    console.error('❌ Error fetching demos:', error);
    process.exit(1);
  }
}

fetchDemos();
