// ─────────────────────────────────────────────────────────────
// GITHUB CREDIBILITY CARD
// Verified GitHub developer stats, repositories, and direct link
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { ExternalLink, CheckCircle, GitBranch, Users, FolderGit2 } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { fetchGitHubStats, type GitHubStats } from "../services/githubService";

export default function GitHubCard() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchGitHubStats().then((data) => {
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

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 relative overflow-hidden backdrop-blur-sm group hover:border-cyan-500/40 transition-all duration-300 shadow-xl">
      {/* Background glow accent */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition">
            <GithubIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-white text-base">
                GitHub Activity
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-2.5 h-2.5" />
                Active
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              @{stats.username} · Full-Stack & MERN Repositories
            </p>
          </div>
        </div>

        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 hover:text-cyan-300 text-xs font-mono text-slate-300 transition w-fit"
        >
          <span>View GitHub</span>
          <ExternalLink className="w-3 h-3 text-cyan-400" />
        </a>
      </div>

      {/* Bio / statement */}
      <p className="py-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        {stats.bio}
      </p>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-3 pt-2 pb-4">
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Public Repos</span>
          </div>
          <div className="mt-1 font-display text-xl font-bold text-white">
            {stats.publicRepos}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Followers</span>
          </div>
          <div className="mt-1 font-display text-xl font-bold text-white">
            {stats.followers}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>Vercel / Prod</span>
          </div>
          <div className="mt-1 font-display text-xl font-bold text-emerald-400">
            Deployed
          </div>
        </div>
      </div>

      {/* Footer stamp */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>Verified Developer Identity</span>
        <span>Source: {stats.source === "live" ? "Live GitHub API" : "Verified Snapshot"} ({stats.lastUpdated})</span>
      </div>
    </div>
  );
}
