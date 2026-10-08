// ─────────────────────────────────────────────────────────────
// GLOBAL NAVBAR
// Multi-page navigation with active route indicator,
// scroll responsiveness, mobile drawer, and status beacon
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  FileText,
  Mail,
  Code2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

interface NavbarProps {
  onOpenResume?: () => void;
}

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/skills", label: "Skills" },
  { path: "/experience", label: "Experience" },
  { path: "/projects", label: "Projects" },
  { path: "/achievements", label: "Achievements" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar({ onOpenResume }: NavbarProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileOpen(false);
  }

  // Track scroll position for compact header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 glass-nav bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-slate-100 hover:text-cyan-400 transition"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all">
              <span className="font-display font-bold text-sm text-cyan-400">NK</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {PORTFOLIO_CONFIG.name}
              </span>
              <span className="font-mono text-[10px] text-slate-400 tracking-wider uppercase">
                SDE · MERN Builder
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-3 py-1.5 backdrop-blur-md shadow-inner">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive
                        ? "text-cyan-300 font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white transition"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume</span>
              </button>
            )}

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-950 animate-ping" />
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/contact"
              className="px-3 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-xs font-semibold sm:hidden"
            >
              Talk
            </Link>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              {mobileOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-950/95 backdrop-blur-xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <span className="font-display font-bold text-xs text-cyan-400">NK</span>
                </div>
                <span className="font-display font-semibold text-white text-sm">
                  {PORTFOLIO_CONFIG.name}
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list with staggered animation */}
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
              <nav className="space-y-2">
                {NAV_LINKS.map((link, idx) => {
                  const isActive =
                    link.path === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(link.path);

                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                          isActive
                            ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-semibold"
                            : "border-transparent text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                      >
                        <span className="font-display text-lg">{link.label}</span>
                        <ArrowRight
                          className={`w-4 h-4 ${
                            isActive ? "text-cyan-400" : "text-slate-600"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom Drawer Actions */}
              <div className="pt-8 border-t border-slate-800 space-y-4">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenResume();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-700 bg-slate-900 text-sm font-mono text-slate-200 hover:bg-slate-800 transition"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>View / Download Resume</span>
                  </button>
                )}

                <div className="flex items-center justify-center gap-4 text-slate-400 pt-2">
                  <a
                    href={PORTFOLIO_CONFIG.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_CONFIG.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_CONFIG.leetcodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition"
                    aria-label="LeetCode"
                  >
                    <Code2 className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO_CONFIG.email}`}
                    className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

                <p className="text-center text-xs font-mono text-slate-500">
                  {PORTFOLIO_CONFIG.availabilityStatus}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
