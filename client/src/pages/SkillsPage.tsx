// ─────────────────────────────────────────────────────────────
// SKILLS PAGE
// Interactive technology cards, categorization, hover micro-interactions,
// and practical engineering context without boring percentage bars
// Styled with White + Burgundy design system
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  FileCode,
  Layout,
  Palette,
  Atom,
  Boxes,
  Wind,
  MonitorSmartphone,
  Server,
  Cpu,
  Network,
  ShieldCheck,
  Activity,
  Database,
  Table2,
  HardDrive,
  Sparkles,
  Cloud,
  GitBranch,
  CloudUpload,
  Globe,
  Terminal,
  Send,
  Binary,
  Component,
  Laptop,
  Radio,
  Layers,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import PageWrapper from "../components/PageWrapper";
import { PORTFOLIO_CONFIG, SKILL_CATEGORIES } from "../data/portfolioData";

// Icon mapping helper
const ICON_MAP: Record<string, any> = {
  Code2,
  FileCode,
  Layout,
  Palette,
  Atom,
  Boxes,
  Wind,
  MonitorSmartphone,
  Server,
  Cpu,
  Network,
  ShieldCheck,
  Activity,
  Database,
  Table2,
  HardDrive,
  Sparkles,
  Cloud,
  GitBranch,
  Github: GithubIcon,
  CloudUpload,
  Globe,
  Terminal,
  Send,
  Binary,
  Component,
  Laptop,
  Radio,
  Layers,
};

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", ...Object.keys(SKILL_CATEGORIES)];

  // Flatten or filter skills
  const allSkills = Object.entries(SKILL_CATEGORIES).flatMap(([category, items]) =>
    items.map((item) => ({ ...item, category }))
  );

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory =
      activeCategory === "All" || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageWrapper
      title={`Technical Skills — ${PORTFOLIO_CONFIG.name}`}
      description="Interactive technical capabilities and engineering competencies of Navnit Kumar across Frontend, Backend, Databases, Cloud & AI, and CS Fundamentals."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
        {/* ────────── Header Banner ────────── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-xs font-mono text-[#7A1F35] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7A1F35] animate-pulse" />
            <span>/skills-and-technologies</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211C1D] leading-tight">
            Technical Stack &amp; Engineering Toolkit
          </h1>
          <p className="text-[#625A58] text-base sm:text-lg leading-relaxed">
            A comprehensive, battle-tested suite of technologies applied across real web applications, simulations at JPMorgan Chase &amp; Deloitte, and algorithmic problem-solving.
          </p>
        </section>

        {/* ────────── Filter & Search Bar ────────── */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFFCF7] border border-[#D8CFC3] shadow-warm-card">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? "bg-[#7A1F35] text-white font-semibold shadow-xs"
                    : "bg-[#F8F5EF] border border-[#D8CFC3] text-[#211C1D] hover:bg-[#F1ECE3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. React, Node)..."
              className="w-full bg-[#F8F5EF] border border-[#D8CFC3] rounded-xl px-3.5 py-1.5 text-xs text-[#211C1D] placeholder:text-[#8B8178] focus:outline-none focus:border-[#7A1F35] font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8B8178] hover:text-[#211C1D]"
              >
                &times;
              </button>
            )}
          </div>
        </section>

        {/* ────────── Interactive Cards Grid ────────── */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const IconComponent = ICON_MAP[skill.icon] || Code2;

                return (
                  <motion.div
                    key={`${skill.category}-${skill.name}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="group relative p-5 rounded-2xl bg-[#FFFCF7] border border-[#D8CFC3] hover:border-[#7A1F35]/60 transition-all duration-300 shadow-warm-card flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Top icon and category badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F1ECE3] border border-[#D8CFC3] flex items-center justify-center text-[#7A1F35] group-hover:scale-110 group-hover:bg-[#7A1F35] group-hover:text-white transition-all duration-300 shadow-xs">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#F8F5EF] border border-[#D8CFC3] text-[#625A58]">
                          {skill.category}
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="font-display font-semibold text-base text-[#211C1D] group-hover:text-[#7A1F35] transition-colors">
                        {skill.name}
                      </h3>

                      {/* Level */}
                      <p className="mt-1 text-xs font-mono text-[#7A1F35] font-medium">
                        {skill.level}
                      </p>
                    </div>

                    {/* Bottom visual accent line */}
                    <div className="mt-5 pt-3 border-t border-[#E6DED3] flex items-center justify-between text-[11px] font-mono text-[#8B8178]">
                      <span className="flex items-center gap-1.5 text-[#625A58]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#7A1F35]" />
                        Production ready
                      </span>
                      <span className="text-[#D8CFC3] group-hover:text-[#7A1F35] transition">
                        &bull;
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-16 p-8 rounded-2xl bg-[#FFFCF7] border border-[#D8CFC3] text-[#625A58] font-mono text-sm">
              No matching technologies found for &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </section>

        {/* ────────── Highlights Summary ────────── */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] shadow-warm-card space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#7A1F35]" />
            <h2 className="font-display text-xl font-bold text-[#211C1D]">
              Core Engineering Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-[#625A58] leading-relaxed">
            <div className="space-y-2 p-4 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
              <span className="font-mono text-[#7A1F35] font-semibold block">01 / Full-Stack MERN</span>
              <p className="text-[#625A58]">
                End-to-end web architectures using React.js frontend component trees connected to Express/Node.js REST servers with MongoDB database modeling.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
              <span className="font-mono text-[#7A1F35] font-semibold block">02 / AI LLM Pipelines</span>
              <p className="text-[#625A58]">
                Integration of LLM inference endpoints for automated resume ATS evaluations, certified as an Oracle Cloud AI Foundations Associate.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
              <span className="font-mono text-[#7A1F35] font-semibold block">03 / DSA &amp; Algorithms</span>
              <p className="text-[#625A58]">
                Active algorithmic problem solving on LeetCode following Striver's A2Z DSA sheet alongside Microsoft Coursera DSA credential.
              </p>
            </div>
          </div>
        </section>

        {/* ────────── Bottom Navigation ────────── */}
        <section className="pt-6 border-t border-[#D8CFC3] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/experience"
            className="inline-flex items-center gap-2 text-[#7A1F35] hover:text-[#962D46] font-mono text-sm font-semibold hover:underline"
          >
            <span>Next: View Experience &amp; Job Simulations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#625A58] hover:text-[#211C1D] font-mono text-xs"
          >
            <span>Or see how these skills are used in Projects</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7A1F35]" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
