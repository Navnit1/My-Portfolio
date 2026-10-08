// ─────────────────────────────────────────────────────────────
// LEETCODE CREDIBILITY CARD
// Verified DSA statistics, difficulty breakdown, and profile link
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
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 animate-pulse">
        <div className="h-6 w-36 bg-slate-800 rounded mb-4" />
        <div className="h-16 bg-slate-800/60 rounded mb-4" />
        <div className="h-8 bg-slate-800 rounded" />
      </div>
    );
  }

  const easyPercent = Math.round((stats.easySolved / stats.totalSolved) * 100) || 54;
  const mediumPercent = Math.round((stats.mediumSolved / stats.totalSolved) * 100) || 42;
  const hardPercent = Math.round((stats.hardSolved / stats.totalSolved) * 100) || 4;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 relative overflow-hidden backdrop-blur-sm group hover:border-cyan-500/40 transition-all duration-300 shadow-xl">
      {/* Background glow accent */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-white text-base">
                LeetCode Profile
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-2.5 h-2.5" />
                Verified
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              @{stats.username} · Striver A2Z DSA Practice
            </p>
          </div>
        </div>

        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 hover:text-cyan-300 text-xs font-mono text-slate-300 transition w-fit"
        >
          <span>View Profile</span>
          <ExternalLink className="w-3 h-3 text-cyan-400" />
        </a>
      </div>

      {/* Main Stats Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5">
        <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Total Solved
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-white">
              {stats.totalSolved}
            </span>
            <span className="text-xs font-mono text-cyan-400">+</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">DSA Fundamentals</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
          <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
            Easy
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-emerald-300">
              {stats.easySolved}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">{easyPercent}% of solved</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
          <p className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
            Medium
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-amber-300">
              {stats.mediumSolved}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">{mediumPercent}% of solved</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
          <p className="text-[11px] font-mono text-red-400 uppercase tracking-wider">
            Hard
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-red-300">
              {stats.hardSolved}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">{hardPercent}% of solved</span>
        </div>
      </div>

      {/* Visual Progress Bar Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Problem Distribution</span>
          <span>{stats.acceptanceRate}% Acceptance</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
          <div
            style={{ width: `${easyPercent}%` }}
            className="h-full bg-emerald-500"
            title={`Easy: ${stats.easySolved}`}
          />
          <div
            style={{ width: `${mediumPercent}%` }}
            className="h-full bg-amber-500"
            title={`Medium: ${stats.mediumSolved}`}
          />
          <div
            style={{ width: `${hardPercent}%` }}
            className="h-full bg-red-500"
            title={`Hard: ${stats.hardSolved}`}
          />
        </div>
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Easy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Medium
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Hard
            </span>
          </div>
          <span className="text-[10px] text-slate-500">
            Source: {stats.source === "live" ? "Live API" : "Verified Snapshot"} ({stats.lastUpdated})
          </span>
        </div>
      </div>
    </div>
  );
}
