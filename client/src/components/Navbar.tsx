// ─────────────────────────────────────────────────────────────
// GLOBAL NAVBAR
// Multi-page navigation matching reference design:
// - Burgundy "NK" monogram & name branding
// - Pill-style active navigation with solid burgundy highlight
// - Clean white + burgundy styling across desktop & mobile
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

  // Track scroll position for header shadow
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
          scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-full transition-all duration-300 border border-[#D8CFC3] ${
              scrolled
                ? "bg-[#F8F5EF]/95 backdrop-blur-md shadow-md shadow-[#211C1D]/5"
                : "bg-[#F8F5EF]/90 backdrop-blur-sm shadow-sm"
            }`}
          >
            {/* Logo / Brand (matching reference image) */}
            <Link
              to="/"
              className="group flex items-center gap-3 text-[#211C1D] transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7A1F35] flex items-center justify-center shadow-sm group-hover:bg-[#962D46] transition-colors">
                <span className="font-display font-black text-sm text-white tracking-wider">NK</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-sm sm:text-base tracking-tight text-[#211C1D] leading-tight">
                  {PORTFOLIO_CONFIG.name}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#625A58] tracking-widest uppercase font-semibold">
                  SDE &bull; MERN BUILDER
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((item) => {
                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-4 py-2 rounded-full text-xs font-medium transition-colors"
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-[#7A1F35] shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    ) : null}
                    <span
                      className={`relative z-10 transition-colors ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-[#211C1D] hover:text-[#7A1F35]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Resume & Mobile Toggle */}
            <div className="flex items-center gap-2">
              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] text-xs font-mono text-[#211C1D] transition shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#7A1F35]" />
                  <span>Resume</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="w-10 h-10 rounded-xl md:hidden border border-[#D8CFC3] bg-[#FFFCF7] text-[#211C1D] hover:bg-[#F1ECE3] flex items-center justify-center transition shadow-xs"
              >
                {mobileOpen ? <X className="w-5 h-5 text-[#7A1F35]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
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
            className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#F8F5EF]/98 backdrop-blur-xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D8CFC3]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#7A1F35] flex items-center justify-center">
                  <span className="font-display font-black text-xs text-white">NK</span>
                </div>
                <span className="font-display font-bold text-[#211C1D] text-base">
                  {PORTFOLIO_CONFIG.name}
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-lg border border-[#D8CFC3] bg-[#FFFCF7] text-[#211C1D] flex items-center justify-center shadow-xs"
              >
                <X className="w-5 h-5 text-[#7A1F35]" />
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
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.25 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                          isActive
                            ? "bg-[#7A1F35] border-[#7A1F35] text-white font-semibold shadow-sm"
                            : "bg-[#FFFCF7] border-[#D8CFC3] text-[#211C1D] hover:bg-[#F1ECE3]"
                        }`}
                      >
                        <span className="font-display text-base">{link.label}</span>
                        <ArrowRight
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-[#8B8178]"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom Drawer Actions */}
              <div className="pt-6 border-t border-[#D8CFC3] space-y-4">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenResume();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D8CFC3] bg-[#FFFCF7] text-sm font-mono text-[#211C1D] hover:bg-[#F1ECE3] transition shadow-xs"
                  >
                    <FileText className="w-4 h-4 text-[#7A1F35]" />
                    <span>View / Download Resume</span>
                  </button>
                )}

                <div className="flex items-center justify-center gap-3 text-[#211C1D] pt-2">
                  <a
                    href={PORTFOLIO_CONFIG.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-[#FFFCF7] border border-[#D8CFC3] hover:text-[#7A1F35] transition shadow-xs"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_CONFIG.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-[#FFFCF7] border border-[#D8CFC3] hover:text-[#7A1F35] transition shadow-xs"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_CONFIG.leetcodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-[#FFFCF7] border border-[#D8CFC3] hover:text-[#7A1F35] transition shadow-xs"
                    aria-label="LeetCode"
                  >
                    <Code2 className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO_CONFIG.email}`}
                    className="p-2.5 rounded-xl bg-[#FFFCF7] border border-[#D8CFC3] hover:text-[#7A1F35] transition shadow-xs"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

                <p className="text-center text-xs font-mono text-[#625A58]">
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
