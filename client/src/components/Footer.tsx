// ─────────────────────────────────────────────────────────────
// GLOBAL FOOTER
// Editorial footer with quick links, status beacon, and social hubs
// ─────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { ArrowUp, Mail, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/70 backdrop-blur text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                <span className="font-display font-bold text-xs text-cyan-400">NK</span>
              </div>
              <span className="font-display font-bold text-lg text-white">
                {PORTFOLIO_CONFIG.name}
              </span>
            </Link>
            <p className="max-w-md text-slate-400 text-xs sm:text-sm leading-relaxed">
              Software Development Engineer crafting scalable full-stack web applications, AI integrations, and high-performance backend systems with the MERN stack and clean architectural patterns.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{PORTFOLIO_CONFIG.availabilityStatus}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition">
                  / Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">
                  / About
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-cyan-400 transition">
                  / Skills
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-cyan-400 transition">
                  / Experience
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-400 transition">
                  / Projects
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-cyan-400 transition">
                  / Achievements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition">
                  / Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-200">
              Profiles & Connect
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href={PORTFOLIO_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-400 transition"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub (@{PORTFOLIO_CONFIG.githubUsername})</span>
                </a>
              </li>
              <li>
                <a
                  href={PORTFOLIO_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-400 transition"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={PORTFOLIO_CONFIG.leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-400 transition"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>LeetCode Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PORTFOLIO_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-cyan-400 transition"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{PORTFOLIO_CONFIG.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            © {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. All verified credentials & work preserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Muzaffarpur, Bihar · India</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 transition text-slate-400"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
