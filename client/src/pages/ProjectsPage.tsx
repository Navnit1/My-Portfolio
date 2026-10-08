// ─────────────────────────────────────────────────────────────
// PROJECTS PAGE — VISUAL STORYTELLING
// Large project panels, interactive mockups, technical architecture,
// and direct deep-dive case study routes
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* ────────── Header Banner ────────── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>/engineered-projects-storytelling</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Production Software & Architecture Case Studies
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
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
                  ? "bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* ────────── Large Visual Storytelling Panels ────────── */}
        <section className="space-y-16 sm:space-y-24">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-10 lg:p-12 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl overflow-hidden"
              >
                {/* Glow backdrop */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Project Details */}
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
                        PROJECT 0{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                          {project.category}
                        </span>
                        <span className="font-mono text-xs text-slate-500">
                          {project.period}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.name}
                      </h2>
                      <p className="mt-2 text-sm sm:text-base text-cyan-400/90 font-mono">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {project.overview}
                    </p>

                    {/* Key features bullets */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                        Engineered Capabilities:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {project.features.slice(0, 3).map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
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
                          className="px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 group-hover:border-slate-700 transition"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action CTAs */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs font-mono transition shadow-md shadow-cyan-950/40"
                      >
                        <span>Explore Deep Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-200 transition"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-mono text-slate-400 hover:text-white transition"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code Repo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup Showcase */}
                  <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                    <div className="rounded-2xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-2xl group-hover:border-cyan-500/50 transition-all duration-300">
                      {/* Browser Mockup Top Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="px-3 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] truncate max-w-[200px] sm:max-w-xs text-slate-400">
                          {project.liveUrl.replace("https://", "")}
                        </div>
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live
                        </span>
                      </div>

                      {/* Mockup Preview Body */}
                      <div className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center overflow-hidden p-6">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          // Custom high-fidelity mock interface for AI Resume Analyser
                          <div className="w-full h-full rounded-xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between text-left space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                              <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-cyan-400" />
                                <span className="font-display font-semibold text-xs text-white">
                                  AI Resume Analysis Dashboard
                                </span>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                ATS Score: 88%
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
                              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                                <span className="text-slate-500 block mb-1">Keywords Matched</span>
                                <div className="text-cyan-400 font-bold text-sm">24 / 28 Found</div>
                              </div>
                              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                                <span className="text-slate-500 block mb-1">Action Items</span>
                                <div className="text-amber-400 font-bold text-sm">4 Improvements</div>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono">
                              <span className="text-cyan-400">💡 LLM Insight:</span> Strengthen impact metrics in experience bullets; add explicit REST API latency benchmarking.
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                              <span>Model: LLM Inference API</span>
                              <span>Status: Ready for Export</span>
                            </div>
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
        <section className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm hover:underline"
          >
            <span>Next: View Certifications & Achievements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-mono text-xs"
          >
            <span>Ready to discuss an opportunity? Get in touch</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
