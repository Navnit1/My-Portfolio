// ─────────────────────────────────────────────────────────────
// GITHUB CREDIBILITY CARD
// Verified GitHub developer stats, repositories, and direct link
// Styled with White + Burgundy design system
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
      <div className="rounded-2xl border border-[#D8CFC3] bg-[#FFFCF7] p-6 animate-pulse">
        <div className="h-6 w-36 bg-[#E6DED3] rounded mb-4" />
        <div className="h-16 bg-[#F1ECE3] rounded mb-4" />
        <div className="h-8 bg-[#E6DED3] rounded" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#D8CFC3] bg-[#FFFCF7] p-6 sm:p-7 relative overflow-hidden group hover:border-[#7A1F35]/50 transition-all duration-300 shadow-warm-card">
      {/* Background warmth accent */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#7A1F35]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E6DED3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F1ECE3] border border-[#D8CFC3] flex items-center justify-center text-[#211C1D] group-hover:text-[#7A1F35] group-hover:border-[#7A1F35]/30 transition">
            <GithubIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-[#211C1D] text-base">
                GitHub Activity
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 flex items-center gap-1 font-medium">
                <CheckCircle className="w-2.5 h-2.5" />
                Active
              </span>
            </div>
            <p className="text-xs font-mono text-[#625A58]">
              @{stats.username} &bull; Full-Stack &amp; MERN Repositories
            </p>
          </div>
        </div>

        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] hover:text-[#7A1F35] text-xs font-mono text-[#211C1D] transition w-fit shadow-xs"
        >
          <span>View GitHub</span>
          <ExternalLink className="w-3 h-3 text-[#7A1F35]" />
        </a>
      </div>

      {/* Bio / statement */}
      <p className="py-4 text-xs sm:text-sm text-[#625A58] leading-relaxed">
        {stats.bio}
      </p>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-3 pt-2 pb-4">
        <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
          <div className="flex items-center gap-1.5 text-[#625A58] text-[11px] font-mono">
            <FolderGit2 className="w-3.5 h-3.5 text-[#7A1F35]" />
            <span>Public Repos</span>
          </div>
          <div className="mt-1 font-display text-xl font-bold text-[#211C1D]">
            {stats.publicRepos}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
          <div className="flex items-center gap-1.5 text-[#625A58] text-[11px] font-mono">
            <Users className="w-3.5 h-3.5 text-[#7A1F35]" />
            <span>Followers</span>
          </div>
          <div className="mt-1 font-display text-xl font-bold text-[#211C1D]">
            {stats.followers}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
          <div className="flex items-center gap-1.5 text-[#625A58] text-[11px] font-mono">
            <GitBranch className="w-3.5 h-3.5 text-[#7A1F35]" />
            <span>Vercel / Prod</span>
          </div>
          <div className="mt-1 font-display text-xl font-bold text-emerald-800">
            Deployed
          </div>
        </div>
      </div>

      {/* Footer stamp */}
      <div className="pt-2 border-t border-[#E6DED3] flex items-center justify-between text-[10px] font-mono text-[#8B8178]">
        <span>Verified Developer Identity</span>
        <span>Source: {stats.source === "live" ? "Live GitHub API" : "Verified Snapshot"} ({stats.lastUpdated})</span>
      </div>
    </div>
  );
}
