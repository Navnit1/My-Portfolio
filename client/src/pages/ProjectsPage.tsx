// ─────────────────────────────────────────────────────────────
// PROJECTS PAGE — VISUAL STORYTELLING
// Large project panels, interactive mockups, technical architecture,
// and direct deep-dive case study routes
// Styled with White + Burgundy design system
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Cpu,
  CheckCircle,
} from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import PageWrapper from "../components/PageWrapper";
import { PORTFOLIO_CONFIG, PROJECTS_DATA } from "../data/portfolioData";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "AI & Cloud", "Web Application"];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (selectedCategory === "All") return true;
    return project.category === selectedCategory;
  });

  return (
    <PageWrapper
      title={`Engineered Projects — ${PORTFOLIO_CONFIG.name}`}
      description="Visual storytelling showcase of software engineering projects by Navnit Kumar: AI Resume Analyser and VMC Coaching Management Platform."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-14">
        {/* ────────── Header Banner ────────── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-xs font-mono text-[#7A1F35] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7A1F35] animate-pulse" />
            <span>/engineered-projects-storytelling</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211C1D] leading-tight">
            Production Software &amp; Architecture Case Studies
          </h1>
          <p className="text-[#625A58] text-base sm:text-lg leading-relaxed">
            End-to-end full stack web platforms, algorithmic integrations, and LLM inference pipelines built with scalability, modern UI, and verified deployments.
          </p>
        </section>

        {/* ────────── Category Filter Tabs ────────── */}
        <section className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-[#7A1F35] text-white font-semibold shadow-xs"
                  : "bg-[#FFFCF7] border border-[#D8CFC3] text-[#211C1D] hover:bg-[#F1ECE3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* ────────── Large Visual Storytelling Panels ────────── */}
        <section className="space-y-14 sm:space-y-20">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] p-6 sm:p-10 lg:p-12 hover:border-[#7A1F35]/60 transition-all duration-300 shadow-warm-card overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Project Details */}
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E6DED3]">
                      <span className="font-mono text-xs font-bold text-[#7A1F35] tracking-wider">
                        PROJECT 0{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-[#625A58]">
                          {project.category}
                        </span>
                        <span className="font-mono text-xs text-[#8B8178]">
                          {project.period}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#211C1D] group-hover:text-[#7A1F35] transition-colors">
                        {project.name}
                      </h2>
                      <p className="mt-2 text-sm sm:text-base text-[#7A1F35] font-mono font-medium">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-[#625A58] text-sm leading-relaxed">
                      {project.overview}
                    </p>

                    {/* Key features bullets */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#211C1D] font-semibold">
                        Engineered Capabilities:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#625A58]">
                        {project.features.slice(0, 3).map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#7A1F35] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-md bg-[#F8F5EF] border border-[#D8CFC3] text-xs font-mono text-[#211C1D]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action CTAs */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7A1F35] hover:bg-[#962D46] text-white font-medium text-xs font-mono transition shadow-md shadow-[#7A1F35]/20"
                      >
                        <span>Explore Deep Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] text-xs font-mono text-[#211C1D] transition shadow-xs"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#7A1F35]" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] text-xs font-mono text-[#211C1D] transition shadow-xs"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code Repo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup Showcase */}
                  <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                    <div className="rounded-2xl border border-[#D8CFC3] bg-[#F8F5EF] overflow-hidden shadow-lg group-hover:border-[#7A1F35]/50 transition-all duration-300">
                      {/* Browser Mockup Top Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#D8CFC3] bg-[#F1ECE3] text-xs font-mono text-[#625A58]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <div className="px-3 py-0.5 rounded-md bg-[#FFFCF7] border border-[#D8CFC3] text-[11px] truncate max-w-[200px] sm:max-w-xs text-[#211C1D]">
                          {project.liveUrl.replace("https://", "")}
                        </div>
                        <span className="text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          Live
                        </span>
                      </div>

                      {/* Mockup Preview Body */}
                      <div className="relative aspect-[16/10] bg-[#FFFCF7] flex items-center justify-center overflow-hidden p-6">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center p-8 space-y-3">
                            <div className="w-16 h-16 rounded-2xl bg-[#7A1F35]/10 border border-[#7A1F35]/20 flex items-center justify-center text-[#7A1F35]">
                              <Cpu className="w-8 h-8" />
                            </div>
                            <h4 className="font-display font-bold text-lg text-[#211C1D]">
                              {project.name}
                            </h4>
                            <p className="text-xs text-[#625A58] max-w-sm">
                              {project.description}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#7A1F35] font-semibold">
                              <span>Production Verified</span>
                              <CheckCircle className="w-3 h-3" />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </section>

        {/* ────────── Bottom Navigation ────────── */}
        <section className="pt-6 border-t border-[#D8CFC3] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-[#7A1F35] hover:text-[#962D46] font-mono text-sm font-semibold hover:underline"
          >
            <span>Next: View Certifications &amp; Achievements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-[#625A58] hover:text-[#211C1D] font-mono text-xs"
          >
            <span>Interested in collaborating? Contact Navnit</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7A1F35]" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
