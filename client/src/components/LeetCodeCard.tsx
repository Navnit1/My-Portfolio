// ─────────────────────────────────────────────────────────────
// LEETCODE CREDIBILITY CARD
// Verified live DSA statistics, difficulty breakdown, and profile link
// Styled with White + Burgundy design system
// Zero hardcoded numbers. Honest unavailable and loading states.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { ExternalLink, CheckCircle, Target, RefreshCw, AlertCircle } from "lucide-react";
import { fetchLeetCodeStats, type LeetCodeStats } from "../services/leetcodeService";

export default function LeetCodeCard() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let active = true;
    fetchLeetCodeStats(false).then((data) => {
      if (active) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchLeetCodeStats(true);
      setStats(data);
    } finally {
      setRefreshing(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="rounded-2xl border border-[#D8CFC3] bg-[#FFFCF7] p-6 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between pb-5 border-b border-[#E6DED3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F1ECE3] animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-[#E6DED3] rounded animate-pulse" />
              <div className="h-3 w-48 bg-[#F1ECE3] rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] h-20 animate-pulse" />
          ))}
        </div>
        <div className="h-3 w-full bg-[#E6DED3] rounded animate-pulse" />
      </div>
    );
  }

  // Unavailable state (Honest, zero fabrication)
  if (!stats || stats.status === "unavailable") {
    return (
      <div className="rounded-2xl border border-[#D8CFC3] bg-[#FFFCF7] p-6 sm:p-7 relative overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6DED3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7A1F35]/10 border border-[#7A1F35]/20 flex items-center justify-center text-[#7A1F35]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-[#211C1D] text-base">
                LeetCode Profile
              </h3>
              <p className="text-xs font-mono text-[#625A58]">
                @{stats?.username || "navnit121"} &bull; Striver A2Z Practice
              </p>
            </div>
          </div>
          <a
            href={stats?.profileUrl || "https://leetcode.com/u/navnit121/"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#7A1F35] bg-[#7A1F35] text-white hover:bg-[#962D46] text-xs font-mono transition shadow-xs w-fit"
          >
            <span>View on LeetCode</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="py-6 flex items-start gap-3 text-xs text-[#625A58]">
          <AlertCircle className="w-5 h-5 text-[#7A1F35] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[#211C1D]">Live Statistics Temporarily Unavailable</p>
            <p>
              {stats?.error || "Unable to reach the live LeetCode data feed at this moment. You can review authentic solved problems directly on my profile."}
            </p>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#D8CFC3] bg-[#F8F5EF] hover:bg-[#F1ECE3] text-[#211C1D] text-xs font-mono transition"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin text-[#7A1F35]" : ""}`} />
              <span>Retry Live Fetch</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate difficulty percentages honestly
  const total = stats.totalSolved;
  const easyPercent = total > 0 ? Math.round((stats.easySolved / total) * 100) : 0;
  const mediumPercent = total > 0 ? Math.round((stats.mediumSolved / total) * 100) : 0;
  const hardPercent = total > 0 ? Math.round((stats.hardSolved / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-[#D8CFC3] bg-[#FFFCF7] p-6 sm:p-7 relative overflow-hidden group hover:border-[#7A1F35]/50 transition-all duration-300 shadow-sm">
      {/* Background warmth accent */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#7A1F35]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E6DED3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7A1F35]/10 border border-[#7A1F35]/20 flex items-center justify-center text-[#7A1F35]">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-[#211C1D] text-base">
                LeetCode Profile
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 flex items-center gap-1 font-medium">
                <CheckCircle className="w-2.5 h-2.5" />
                Live Source
              </span>
            </div>
            <p className="text-xs font-mono text-[#625A58]">
              @{stats.username} &bull; Striver A2Z DSA Practice
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-1.5 rounded-lg border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] text-[#625A58] hover:text-[#7A1F35] transition shadow-xs"
            title="Refresh statistics"
            aria-label="Refresh statistics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#7A1F35]" : ""}`} />
          </button>
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] hover:text-[#7A1F35] text-xs font-mono text-[#211C1D] transition shadow-xs"
          >
            <span>View Profile</span>
            <ExternalLink className="w-3 h-3 text-[#7A1F35]" />
          </a>
        </div>
      </div>

      {/* Main Stats Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5">
        <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
          <p className="text-[11px] font-mono text-[#625A58] uppercase tracking-wider font-semibold">
            Total Solved
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-[#211C1D]">
              {stats.totalSolved}
            </span>
            {stats.totalQuestions && (
              <span className="text-[10px] font-mono text-[#8B8178]">
                / {stats.totalQuestions}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-[#8B8178]">Algorithmic Practice</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
          <p className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider font-semibold">
            Easy
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-emerald-800">
              {stats.easySolved}
            </span>
            {stats.easyTotal && (
              <span className="text-[10px] font-mono text-[#8B8178]">/ {stats.easyTotal}</span>
            )}
          </div>
          <span className="text-[10px] font-mono text-[#8B8178]">{easyPercent}% of solved</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
          <p className="text-[11px] font-mono text-amber-700 uppercase tracking-wider font-semibold">
            Medium
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-amber-800">
              {stats.mediumSolved}
            </span>
            {stats.mediumTotal && (
              <span className="text-[10px] font-mono text-[#8B8178]">/ {stats.mediumTotal}</span>
            )}
          </div>
          <span className="text-[10px] font-mono text-[#8B8178]">{mediumPercent}% of solved</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
          <p className="text-[11px] font-mono text-red-700 uppercase tracking-wider font-semibold">
            Hard
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-red-800">
              {stats.hardSolved}
            </span>
            {stats.hardTotal && (
              <span className="text-[10px] font-mono text-[#8B8178]">/ {stats.hardTotal}</span>
            )}
          </div>
          <span className="text-[10px] font-mono text-[#8B8178]">{hardPercent}% of solved</span>
        </div>
      </div>

      {/* Visual Progress Bar Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-[#625A58]">
          <span>Difficulty Distribution</span>
          {stats.acceptanceRate !== undefined && (
            <span className="font-semibold text-[#211C1D]">
              {stats.acceptanceRate}% Acceptance Rate
            </span>
          )}
        </div>
        <div className="h-2 w-full rounded-full bg-[#E6DED3] overflow-hidden flex">
          {total > 0 ? (
            <>
              <div
                style={{ width: `${easyPercent}%` }}
                className="h-full bg-emerald-600"
                title={`Easy: ${stats.easySolved}`}
              />
              <div
                style={{ width: `${mediumPercent}%` }}
                className="h-full bg-amber-600"
                title={`Medium: ${stats.mediumSolved}`}
              />
              <div
                style={{ width: `${hardPercent}%` }}
                className="h-full bg-red-600"
                title={`Hard: ${stats.hardSolved}`}
              />
            </>
          ) : (
            <div className="w-full h-full bg-[#D8CFC3]" />
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 text-[11px] font-mono text-[#8B8178]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" /> Easy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600" /> Medium
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" /> Hard
            </span>
          </div>
          <span className="text-[10px] text-[#8B8178]">
            {stats.source === "live" ? "Live Source" : "Cached"}: Last updated {stats.lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
}
