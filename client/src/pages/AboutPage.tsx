// ─────────────────────────────────────────────────────────────
// ABOUT PAGE
// Deep-dive into Navnit's developer journey, engineering mindset,
// technical focus areas, and education credentials
// ─────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  Code2,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Download,
  CheckCircle,
  Compass,
  Cpu,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import CompanionBot from "../components/CompanionBot";
import {
  PORTFOLIO_CONFIG,
  EDUCATION_DATA,
} from "../data/portfolioData";

interface AboutPageProps {
  onOpenResume?: () => void;
}

export default function AboutPage({ onOpenResume }: AboutPageProps) {
  const edu = EDUCATION_DATA[0];

  return (
    <PageWrapper
      title={`About — ${PORTFOLIO_CONFIG.name}`}
      description={`Learn about ${PORTFOLIO_CONFIG.name}, a passionate Software Development Engineer with hands-on experience in MERN, AI integration, and core CS fundamentals.`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* ────────── Header Banner ────────── */}
        <section className="relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>/about-the-developer</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Software Engineering with Purpose, Rigor & Curiosity.
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              I am {PORTFOLIO_CONFIG.name}, a final-year Information Technology student and Full-Stack / SDE aspirant based in {PORTFOLIO_CONFIG.location}. I engineer robust web solutions, explore practical AI integrations, and solve algorithmic challenges.
            </p>
          </div>
        </section>

        {/* ────────── Profile Overview Grid ────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
                <Compass className="w-5 h-5 text-cyan-400" />
                <h2 className="font-display text-xl font-bold text-white">
                  My Engineering Journey
                </h2>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  My path into software development began with a strong interest in understanding how digital systems operate under the hood. Enrolling in the B.Tech Information Technology program at <strong className="text-white">IKG Punjab Technical University</strong> provided the rigorous academic bedrock—spanning Data Structures, Algorithms, Database Management Systems, and Computer Networks.
                </p>
                <p>
                  I quickly transitioned from theory to production by building end-to-end full stack web applications with the <strong className="text-white">MERN stack (MongoDB, Express, React, Node.js)</strong>. Along the way, I discovered the tremendous potential of AI APIs, leading me to engineer the <span className="text-cyan-400">AI Resume Analyser</span>—a real-time ATS optimization tool that utilizes LLM inference to empower applicants.
                </p>
                <p>
                  To cultivate professional enterprise software habits, I completed the <strong className="text-white">JPMorgan Chase Software Engineering Simulation</strong> (diving into REST controller implementations and Kafka event streaming) and <strong className="text-white">Deloitte Technology Simulation</strong>. In parallel, I consistently practice algorithmic problem solving using Striver's A2Z DSA sheet on LeetCode.
                </p>
              </div>

              {/* Fast Facts Row */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">Degree</span>
                  <span className="text-slate-200 font-medium">B.Tech (IT)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Graduation</span>
                  <span className="text-slate-200 font-medium">2027</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Focus</span>
                  <span className="text-cyan-400 font-medium">SDE / Full Stack</span>
                </div>
                <div>
                  <span className="text-slate-500 block">LeetCode</span>
                  <span className="text-amber-400 font-medium">100+ Solved</span>
                </div>
              </div>
            </div>

            {/* Core Pillars / Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-white text-base">
                  MERN & Full Stack
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clean frontend components in React paired with robust, modular Node/Express backends and secure REST API contracts.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-white text-base">
                  Algorithmic Rigor
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Practicing Striver A2Z DSA sheet on LeetCode; strong understanding of time/space complexity tradeoffs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-white text-base">
                  AI & Cloud Ready
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Oracle Cloud AI Certified Foundations Associate; practical LLM prompt engineering and API integrations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Companion & Quick Meta Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mascot card */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-center flex flex-col items-center shadow-lg">
              <CompanionBot size="md" mood="happy" />
              <h3 className="font-display font-semibold text-white text-sm mt-3">
                Nexus Coding Assistant
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Always on standby to assist with questions regarding Navnit's technical background and code samples.
              </p>
            </div>

            {/* Quick Contact & Details */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-lg text-xs font-mono">
              <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
                Direct Contact
              </h4>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href={`mailto:${PORTFOLIO_CONFIG.email}`} className="truncate hover:text-cyan-400">
                    {PORTFOLIO_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{PORTFOLIO_CONFIG.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{PORTFOLIO_CONFIG.location}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV</span>
                  </button>
                )}
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                >
                  <span>Send a Message</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ────────── Education Detail Card ────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Academic Foundation
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {edu.degree} in {edu.major}
                </h3>
                <p className="text-sm text-cyan-400 font-mono mt-0.5">
                  {edu.institution}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-400 inline-block">
                  {edu.status}
                </span>
                <p className="text-xs font-mono text-slate-500 mt-1">{edu.period}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Core Computer Science Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Academic & Extracurricular Focus
              </h4>
              <ul className="space-y-1.5 text-sm text-slate-400">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ────────── Next Steps CTA ────────── */}
        <section className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm hover:underline"
          >
            <span>Next: Explore My Technical Skills</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-mono text-xs"
          >
            <span>Or jump straight to Projects</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
