import type { GitHubRepo } from '@/types';

const CACHE_KEY = 'gh_repos_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: GitHubRepo[];
  timestamp: number;
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  if (typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const entry: CacheEntry = JSON.parse(cached);
        if (Date.now() - entry.timestamp < CACHE_TTL) {
          return entry.data;
        }
      }
    } catch {}
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
    { headers: { Accept: 'application/vnd.github.v3+json' } }
  );

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const allRepos: GitHubRepo[] = await res.json();

  const filtered = allRepos
    .filter((r) => !r.fork)
    .sort((a, b) => {
      const starDiff = b.stargazers_count - a.stargazers_count;
      if (starDiff !== 0) return starDiff;
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    })
    .slice(0, 6);

  if (typeof window !== 'undefined') {
    try {
      const entry: CacheEntry = { data: filtered, timestamp: Date.now() };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
    } catch {}
  }

  return filtered;
}

export async function fetchUserStats(username: string) {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
    ]);
    const user = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();
    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    return {
      publicRepos: user.public_repos || 0,
      followers: user.followers || 0,
      totalStars,
    };
  } catch {
    return { publicRepos: 0, followers: 0, totalStars: 0 };
  }
}
