// ─────────────────────────────────────────────────────────────
// GLOBAL FOOTER
// Editorial footer with quick links, status beacon, and social hubs
// Styled with White + Burgundy design system
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
    <footer className="border-t border-[#D8CFC3] bg-[#F1ECE3] text-[#625A58] text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#7A1F35] flex items-center justify-center shadow-xs">
                <span className="font-display font-black text-xs text-white">NK</span>
              </div>
              <span className="font-display font-bold text-lg text-[#211C1D]">
                {PORTFOLIO_CONFIG.name}
              </span>
            </Link>
            <p className="max-w-md text-[#625A58] text-xs sm:text-sm leading-relaxed">
              Software Development Engineer crafting scalable full-stack web applications, AI integrations, and high-performance backend systems with the MERN stack and clean architectural patterns.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFCF7] border border-[#D8CFC3] text-xs font-mono text-emerald-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{PORTFOLIO_CONFIG.availabilityStatus}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#211C1D]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link to="/" className="text-[#625A58] hover:text-[#7A1F35] transition">
                  / Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#625A58] hover:text-[#7A1F35] transition">
                  / About
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-[#625A58] hover:text-[#7A1F35] transition">
                  / Skills
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-[#625A58] hover:text-[#7A1F35] transition">
                  / Experience
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-[#625A58] hover:text-[#7A1F35] transition">
                  / Projects
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="text-[#625A58] hover:text-[#7A1F35] transition">
                  / Achievements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#625A58] hover:text-[#7A1F35] transition">
                  / Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#211C1D]">
              Profiles &amp; Connect
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href={PORTFOLIO_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#625A58] hover:text-[#7A1F35] transition"
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
                  className="flex items-center gap-2 text-[#625A58] hover:text-[#7A1F35] transition"
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
                  className="flex items-center gap-2 text-[#625A58] hover:text-[#7A1F35] transition"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>LeetCode Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PORTFOLIO_CONFIG.email}`}
                  className="flex items-center gap-2 text-[#625A58] hover:text-[#7A1F35] transition"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{PORTFOLIO_CONFIG.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#D8CFC3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8B8178]">
          <p>
            &copy; {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. All verified credentials &amp; work preserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Muzaffarpur, Bihar &bull; India</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F8F5EF] hover:text-[#7A1F35] transition text-[#211C1D] shadow-xs"
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
