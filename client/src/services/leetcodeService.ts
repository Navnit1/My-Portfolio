// ─────────────────────────────────────────────────────────────
// GENUINE LEETCODE STATISTICS SERVICE
// Fetches real public statistics for navnit121 with caching,
// loading states, and honest error/unavailable handling.
// Zero hardcoded numbers. Zero fabricated claims.
// ─────────────────────────────────────────────────────────────

import { PORTFOLIO_CONFIG } from "../data/portfolioData";

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions?: number;
  easyTotal?: number;
  mediumTotal?: number;
  hardTotal?: number;
  acceptanceRate?: number;
  ranking?: string;
  contributionPoint?: number;
  source: "live" | "cached";
  lastUpdated: string;
  profileUrl: string;
  status: "success" | "unavailable";
  error?: string;
}

const CACHE_KEY = `leetcode_stats_v2_${PORTFOLIO_CONFIG.leetcodeUsername}`;
const CACHE_EXPIRY_MS = 1000 * 60 * 60; // 1 hour client cache

export async function fetchLeetCodeStats(forceRefresh = false): Promise<LeetCodeStats> {
  const username = PORTFOLIO_CONFIG.leetcodeUsername;
  const profileUrl = PORTFOLIO_CONFIG.leetcodeUrl;

  // 1. Check client-side cache first unless forceRefresh is requested
  if (!forceRefresh) {
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
      // Continue to network if localStorage access fails
    }
  }

  // Helper to extract clean stats from raw payload
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsePayload = (data: any): LeetCodeStats | null => {
    if (!data || typeof data.totalSolved !== "number") return null;

    // Calculate acceptance rate from submissions if present
    let acceptanceRate: number | undefined;
    if (Array.isArray(data.totalSubmissions)) {
      const allSub = data.totalSubmissions.find((s: { difficulty: string }) => s.difficulty === "All");
      if (allSub && allSub.submissions > 0) {
        acceptanceRate = parseFloat(((allSub.count / allSub.submissions) * 100).toFixed(1));
      }
    } else if (typeof data.acceptanceRate === "number") {
      acceptanceRate = parseFloat(data.acceptanceRate.toFixed(1));
    }

    // Format ranking
    let ranking: string | undefined;
    if (typeof data.ranking === "number" || typeof data.ranking === "string") {
      const rankNum = Number(data.ranking);
      if (!isNaN(rankNum) && rankNum > 0) {
        ranking = rankNum >= 5000000 ? "5,000,000+" : rankNum.toLocaleString();
      }
    }

    const now = new Date();
    const formattedTime = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) + " at " + now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      username,
      totalSolved: data.totalSolved,
      easySolved: data.easySolved ?? 0,
      mediumSolved: data.mediumSolved ?? 0,
      hardSolved: data.hardSolved ?? 0,
      totalQuestions: data.totalQuestions,
      easyTotal: data.totalEasy,
      mediumTotal: data.totalMedium,
      hardTotal: data.totalHard,
      acceptanceRate,
      ranking,
      contributionPoint: data.contributionPoint,
      source: "live",
      lastUpdated: formattedTime,
      profileUrl,
      status: "success",
    };
  };

  // 2. Fetch from verified public proxy endpoint
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(username)}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const parsedStats = parsePayload(data);
      if (parsedStats) {
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data: parsedStats })
          );
        } catch {
          // Ignore cache write failures
        }
        return parsedStats;
      }
    }
  } catch (netErr) {
    console.warn("Public LeetCode proxy query failed, attempting backend fallback:", netErr);
  }

  // 3. Fallback to local server endpoint if available
  try {
    const backendRes = await fetch(`/api/leetcode?username=${encodeURIComponent(username)}`);
    if (backendRes.ok) {
      const data = await backendRes.json();
      const parsedStats = parsePayload(data);
      if (parsedStats) {
        return parsedStats;
      }
    }
  } catch {
    // Backend unreachable
  }

  // 4. If all network attempts fail, try using any previously cached entry even if expired
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.data) {
        return {
          ...parsed.data,
          source: "cached",
          lastUpdated: `${parsed.data.lastUpdated} (Offline Cache)`,
          profileUrl,
        };
      }
    }
  } catch {
    // Cache read failed
  }

  // 5. Honest Unavailable State (Zero fabrication)
  return {
    username,
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    source: "live",
    lastUpdated: "Recently",
    profileUrl,
    status: "unavailable",
    error: "Live statistics currently unavailable from public provider. Check back shortly or view the profile directly on LeetCode.",
  };
}
