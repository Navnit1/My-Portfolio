// ─────────────────────────────────────────────────────────────
// LEETCODE CREDIBILITY CARD
// Verified DSA statistics, difficulty breakdown, and profile link
// Styled with White + Burgundy design system
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { ExternalLink, CheckCircle, Target } from "lucide-react";
import { fetchLeetCodeStats, type LeetCodeStats } from "../services/leetcodeService";

export default function LeetCodeCard() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchLeetCodeStats().then((data) => {
      if (active) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (loading || !stats) {
    return (
      <div className="rounded-2xl border border-[#D8CFC3] bg-[#FFFCF7] p-6 animate-pulse">
        <div className="h-6 w-36 bg-[#E6DED3] rounded mb-4" />
        <div className="h-16 bg-[#F1ECE3] rounded mb-4" />
        <div className="h-8 bg-[#E6DED3] rounded" />
      </div>
    );
  }

  const easyPercent = Math.round((stats.easySolved / stats.totalSolved) * 100) || 54;
  const mediumPercent = Math.round((stats.mediumSolved / stats.totalSolved) * 100) || 42;
  const hardPercent = Math.round((stats.hardSolved / stats.totalSolved) * 100) || 4;

  return (
    <div className="rounded-2xl border border-[#D8CFC3] bg-[#FFFCF7] p-6 sm:p-7 relative overflow-hidden group hover:border-[#7A1F35]/50 transition-all duration-300 shadow-warm-card">
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
                Verified
              </span>
            </div>
            <p className="text-xs font-mono text-[#625A58]">
              @{stats.username} &bull; Striver A2Z DSA Practice
            </p>
          </div>
        </div>

        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] hover:text-[#7A1F35] text-xs font-mono text-[#211C1D] transition w-fit shadow-xs"
        >
          <span>View Profile</span>
          <ExternalLink className="w-3 h-3 text-[#7A1F35]" />
        </a>
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
            <span className="text-xs font-mono text-[#7A1F35] font-bold">+</span>
          </div>
          <span className="text-[10px] font-mono text-[#8B8178]">DSA Fundamentals</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
          <p className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider font-semibold">
            Easy
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-emerald-800">
              {stats.easySolved}
            </span>
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
          </div>
          <span className="text-[10px] font-mono text-[#8B8178]">{hardPercent}% of solved</span>
        </div>
      </div>

      {/* Visual Progress Bar Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-[#625A58]">
          <span>Problem Distribution</span>
          <span className="font-semibold text-[#211C1D]">{stats.acceptanceRate}% Acceptance</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#E6DED3] overflow-hidden flex">
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
        </div>
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#8B8178]">
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
            Source: {stats.source === "live" ? "Live API" : "Verified Snapshot"} ({stats.lastUpdated})
          </span>
        </div>
      </div>
    </div>
  );
}
