// ─────────────────────────────────────────────────────────────
// HOME PAGE
// Premium developer hero, staggered motion, key metrics,
// selected projects showcase, achievements preview, and strong CTAs
// ─────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Code2,
  ExternalLink,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import PageWrapper from "../components/PageWrapper";
import CompanionBot from "../components/CompanionBot";
import LeetCodeCard from "../components/LeetCodeCard";
import GitHubCard from "../components/GitHubCard";
import {
  PORTFOLIO_CONFIG,
  DEVELOPER_STATS,
  PROJECTS_DATA,
  CERTIFICATIONS_DATA,
} from "../data/portfolioData";

interface HomePageProps {
  onOpenResume?: () => void;
}

export default function HomePage({ onOpenResume }: HomePageProps) {

  return (
    <PageWrapper
      title={`${PORTFOLIO_CONFIG.name} — ${PORTFOLIO_CONFIG.title}`}
      description="Portfolio of Navnit Kumar: Software Development Engineer and Full Stack Developer specializing in MERN, AI integration, and algorithmic problem solving."
    >
      {/* ────────────────── HERO SECTION ────────────────── */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden py-12 md:py-20">
        {/* Subtle background ambient mesh */}
        <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Role Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 backdrop-blur shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="tracking-wider uppercase font-semibold">
                  {PORTFOLIO_CONFIG.title}
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-400">Full-Stack & MERN</span>
              </motion.div>

              {/* Large Display Heading */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-2"
              >
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  Hi, I&rsquo;m{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
                    {PORTFOLIO_CONFIG.name}
                  </span>
                </h1>
                <p className="font-display text-xl sm:text-2xl text-slate-300 font-medium">
                  Turning complex challenges into elegant, resilient software.
                </p>
              </motion.div>

              {/* Developer Mission Statement */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed"
              >
                Final-year B.Tech (IT) engineer with deep hands-on experience building production MERN applications, AI-integrated LLM pipelines, and asynchronous microservices. Seasoned by practical simulations at{" "}
                <strong className="text-slate-200 font-semibold">JPMorgan Chase</strong> and{" "}
                <strong className="text-slate-200 font-semibold">Deloitte</strong>, alongside active LeetCode algorithmic mastery.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:scale-[1.02]"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm transition hover:border-slate-600"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Download CV</span>
                  </button>
                )}

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-slate-400 hover:text-cyan-300 font-mono text-xs transition"
                >
                  <span>Let&rsquo;s Connect</span>
                </Link>
              </motion.div>

              {/* Social Channels Stagger */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-4 pt-3 text-slate-400"
              >
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  Connect:
                </span>
                <a
                  href={PORTFOLIO_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_CONFIG.leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LeetCode Profile"
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                >
                  <Code2 className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PORTFOLIO_CONFIG.email}`}
                  aria-label="Email Direct"
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            {/* Hero Right Visual: The Companion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="lg:col-span-5 flex flex-col items-center justify-center relative"
            >
              <div className="relative p-6 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center max-w-sm w-full">
                {/* Tech tag */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                  <Terminal className="w-3 h-3" />
                  <span>interactive.companion</span>
                </div>

                {/* Mascot Bot */}
                <div className="my-4">
                  <CompanionBot size="lg" mood="coding" />
                </div>

                {/* Mascot Caption */}
                <div className="mt-3 space-y-1">
                  <h3 className="font-display font-semibold text-white text-base">
                    Nexus BitBot
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Hover or move your cursor to interact. Your AI companion throughout the portfolio.
                  </p>
                </div>

                {/* Quick Status Pill */}
                <div className="mt-5 w-full pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for SDE Roles
                  </span>
                  <Link
                    to="/about"
                    className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
                  >
                    <span>Meet Navnit</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────── SHORT INTRO STATEMENT ────────────────── */}
      <section className="py-14 border-y border-slate-800/80 bg-slate-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                Core Philosophy
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Software engineered with discipline & precision.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-3 text-slate-400 text-sm leading-relaxed">
              <p>
                I believe modern full-stack development is not just about connecting libraries, but crafting resilient, observable systems that deliver measurable business value. Whether optimizing complex state management in React, architecting secured Node.js APIs, or solving algorithmic edge cases, I focus on clean maintainable code.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["MERN Architecture", "REST API Contracts", "LLM Integration", "Striver A2Z DSA", "Kafka Asynchronous Simulation", "Vercel Cloud CI/CD"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── DEVELOPER STATISTICS ────────────────── */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {DEVELOPER_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-lg group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/10 transition" />
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {stat.value}
                  </span>
                  <span className="font-mono text-2xl font-bold text-cyan-400">
                    {stat.suffix}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-sm font-semibold text-slate-200">
                  {stat.label}
                </h3>
                <p className="mt-1 text-xs font-mono text-slate-500">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── SELECTED PROJECTS GATEWAY ────────────────── */}
      <section className="py-18 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                Featured Work
              </span>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Engineered Applications
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>Explore All Projects & Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PROJECTS_DATA.map((proj, idx) => (
              <motion.article
                key={proj.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-7 sm:p-9 hover:border-cyan-500/50 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/15 transition" />

                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800">
                    <span className="font-mono text-xs text-cyan-400 tracking-wider">
                      PROJECT 0{idx + 1} · {proj.category}
                    </span>
                    <span className="font-mono text-xs text-slate-500">{proj.period}</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {proj.name}
                  </h3>

                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {proj.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white hover:text-cyan-400 transition"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </Link>

                  <div className="flex items-center gap-4">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── CODING CREDIBILITY SECTION ────────────────── */}
      <section className="py-16 bg-slate-950/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Technical Credibility
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-white tracking-tight">
              Verified Developer Metrics
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Live and verified activity metrics from LeetCode and GitHub profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LeetCodeCard />
            <GitHubCard />
          </div>
        </div>
      </section>

      {/* ────────────────── SELECTED ACHIEVEMENTS GATEWAY ────────────────── */}
      <section className="py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                Certifications & Badges
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold text-white tracking-tight">
                Selected Credentials
              </h2>
            </div>
            <Link
              to="/achievements"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>View All 8 Certificates & Lightbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CERTIFICATIONS_DATA.slice(0, 3).map((cert) => (
              <div
                key={cert.id}
                className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 rounded-xl bg-slate-950 overflow-hidden border border-slate-800/80 mb-4 flex items-center justify-center">
                    <img
                      src={cert.file}
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-display font-medium text-sm text-white line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-amber-400">{cert.org}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>{cert.date}</span>
                  <Link to="/achievements" className="text-cyan-400 hover:underline">
                    Inspect ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── FINAL CTA ────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 relative text-center shadow-2xl overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Immediate Opportunities
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Let&rsquo;s engineer something remarkable together.
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Whether you have an SDE opening, a full-stack engineering internship, or want to discuss modern MERN and AI architectures, I am just one message away.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`mailto:${PORTFOLIO_CONFIG.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-mono text-xs transition"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{PORTFOLIO_CONFIG.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
