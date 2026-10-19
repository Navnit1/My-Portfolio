// ─────────────────────────────────────────────────────────────
// GITHUB STATISTICS SERVICE
// Handles fetching verified public GitHub data with safe fallback
// Username is centrally configured in PORTFOLIO_CONFIG
// ─────────────────────────────────────────────────────────────

import { PORTFOLIO_CONFIG } from "../data/portfolioData";

export interface GitHubStats {
  username: string;
  name: string;
  publicRepos: number;
  followers: number;
  following: number;
  bio: string;
  avatarUrl: string;
  profileUrl: string;
  source: "live" | "cached";
  lastUpdated: string;
}

const FALLBACK_GITHUB: GitHubStats = {
  username: PORTFOLIO_CONFIG.githubUsername,
  name: "Navnit Kumar",
  publicRepos: 12,
  followers: 5,
  following: 8,
  bio: "Full Stack Developer | SDE Aspirant | MERN Developer",
  avatarUrl: "https://avatars.githubusercontent.com/u/147138038?v=4",
  profileUrl: PORTFOLIO_CONFIG.githubUrl,
  source: "cached",
  lastUpdated: "October 2026",
};

const CACHE_KEY = `github_stats_${PORTFOLIO_CONFIG.githubUsername}`;
const CACHE_EXPIRY_MS = 1000 * 60 * 60 * 12; // 12 hours

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const username = PORTFOLIO_CONFIG.githubUsername;
  const profileUrl = PORTFOLIO_CONFIG.githubUrl;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS && parsed.data) {
        return {
          ...parsed.data,
          source: "cached",
          profileUrl,
        };
      }
    }
  } catch {
    // Continue
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://api.github.com/users/${username}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.public_repos === "number") {
        const stats: GitHubStats = {
          username,
          name: data.name || "Navnit Kumar",
          publicRepos: data.public_repos,
          followers: data.followers ?? 5,
          following: data.following ?? 8,
          bio: data.bio || FALLBACK_GITHUB.bio,
          avatarUrl: data.avatar_url || FALLBACK_GITHUB.avatarUrl,
          profileUrl,
          source: "live",
          lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        };

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data: stats })
          );
        } catch {
          // Ignore
        }

        return stats;
      }
    }
  } catch (err) {
    console.warn("Notice: GitHub API unreachable, displaying verified baseline.", err);
  }

  return FALLBACK_GITHUB;
}
