// ─────────────────────────────────────────────────────────────
// ABOUT PAGE
// Deep-dive into Navnit's developer journey, engineering mindset,
// technical focus areas, and education credentials
// Styled with White + Burgundy design system
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-14">
        {/* ────────── Header Banner ────────── */}
        <section className="relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-xs font-mono text-[#7A1F35] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#7A1F35] animate-pulse" />
              <span>/about-the-developer</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211C1D] leading-tight">
              Software Engineering with Purpose, Rigor &amp; Curiosity.
            </h1>
            <p className="text-[#625A58] text-base sm:text-lg leading-relaxed">
              I am {PORTFOLIO_CONFIG.name}, a final-year Information Technology student and Full-Stack / SDE aspirant based in {PORTFOLIO_CONFIG.location}. I engineer robust web solutions, explore practical AI integrations, and solve algorithmic challenges.
            </p>
          </div>
        </section>

        {/* ────────── Profile Overview Grid ────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] shadow-warm-card space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#E6DED3]">
                <Compass className="w-5 h-5 text-[#7A1F35]" />
                <h2 className="font-display text-xl font-bold text-[#211C1D]">
                  My Engineering Journey
                </h2>
              </div>

              <div className="space-y-4 text-[#625A58] text-sm sm:text-base leading-relaxed">
                <p>
                  My path into software development began with a strong interest in understanding how digital systems operate under the hood. Enrolling in the B.Tech Information Technology program at <strong className="text-[#211C1D]">IKG Punjab Technical University</strong> provided the rigorous academic bedrock—spanning Data Structures, Algorithms, Database Management Systems, and Computer Networks.
                </p>
                <p>
                  I quickly transitioned from theory to production by building end-to-end full stack web applications with the <strong className="text-[#211C1D]">MERN stack (MongoDB, Express, React, Node.js)</strong>. Along the way, I discovered the tremendous potential of AI APIs, leading me to engineer the <span className="text-[#7A1F35] font-semibold">AI Resume Analyser</span>—a real-time ATS optimization tool that utilizes LLM inference to empower applicants.
                </p>
                <p>
                  To cultivate professional enterprise software habits, I completed the <strong className="text-[#211C1D]">JPMorgan Chase Software Engineering Simulation</strong> (diving into REST controller implementations and Kafka event streaming) and <strong className="text-[#211C1D]">Deloitte Technology Simulation</strong>. In parallel, I consistently practice algorithmic problem solving using Striver's A2Z DSA sheet on LeetCode.
                </p>
              </div>

              {/* Fast Facts Row */}
              <div className="pt-4 border-t border-[#E6DED3] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#8B8178] block">Degree</span>
                  <span className="text-[#211C1D] font-semibold">B.Tech (IT)</span>
                </div>
                <div>
                  <span className="text-[#8B8178] block">Graduation</span>
                  <span className="text-[#211C1D] font-semibold">2027</span>
                </div>
                <div>
                  <span className="text-[#8B8178] block">Focus</span>
                  <span className="text-[#7A1F35] font-semibold">SDE / Full Stack</span>
                </div>
                <div>
                  <span className="text-[#8B8178] block">LeetCode</span>
                  <span className="text-[#7A1F35] font-semibold">Striver A2Z</span>
                </div>
              </div>
            </div>

            {/* Core Pillars / Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-[#FFFCF7] border border-[#D8CFC3] space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#7A1F35]/10 border border-[#7A1F35]/20 flex items-center justify-center text-[#7A1F35]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-[#211C1D] text-base">
                  MERN &amp; Full Stack
                </h3>
                <p className="text-xs text-[#625A58] leading-relaxed">
                  Clean frontend components in React paired with robust, modular Node/Express backends and secure REST API contracts.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFCF7] border border-[#D8CFC3] space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-[#211C1D] text-base">
                  Algorithmic Rigor
                </h3>
                <p className="text-xs text-[#625A58] leading-relaxed">
                  Practicing Striver A2Z DSA sheet on LeetCode; strong understanding of time/space complexity tradeoffs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFCF7] border border-[#D8CFC3] space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-800">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-[#211C1D] text-base">
                  AI &amp; Cloud Ready
                </h3>
                <p className="text-xs text-[#625A58] leading-relaxed">
                  Oracle Cloud AI Certified Foundations Associate; practical LLM prompt engineering and API integrations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mascot & Quick Meta Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mascot card */}
            <div className="p-6 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] text-center flex flex-col items-center shadow-warm-card">
              <CompanionBot size="sm" interactive={true} />
              <h3 className="font-display font-semibold text-[#211C1D] text-base mt-3">
                Navnit&rsquo;s Developer Mascot
              </h3>
              <p className="text-xs text-[#625A58] mt-1 max-w-xs">
                Your animated companion representing Navnit Kumar across the portfolio.
              </p>
            </div>

            {/* Quick Contact & Details */}
            <div className="p-6 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] space-y-4 shadow-warm-card text-xs font-mono">
              <h4 className="font-display text-sm font-semibold text-[#211C1D] uppercase tracking-wider">
                Direct Contact
              </h4>
              <div className="space-y-3 text-[#625A58]">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#7A1F35] shrink-0" />
                  <a href={`mailto:${PORTFOLIO_CONFIG.email}`} className="truncate hover:text-[#7A1F35] text-[#211C1D]">
                    {PORTFOLIO_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#7A1F35] shrink-0" />
                  <span className="text-[#211C1D]">{PORTFOLIO_CONFIG.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#7A1F35] shrink-0" />
                  <span className="text-[#211C1D]">{PORTFOLIO_CONFIG.location}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6DED3] space-y-2">
                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#7A1F35] hover:bg-[#962D46] text-white font-medium text-xs transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV</span>
                  </button>
                )}
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] text-[#211C1D] text-xs transition shadow-xs"
                >
                  <span>Send a Message</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A1F35]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ────────── Education Detail Card ────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-[#7A1F35]" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#211C1D]">
              Academic Foundation
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] shadow-warm-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E6DED3]">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#211C1D]">
                  {edu.degree} in {edu.major}
                </h3>
                <p className="text-sm text-[#7A1F35] font-mono mt-0.5 font-semibold">
                  {edu.institution}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-800 font-medium inline-block">
                  {edu.status}
                </span>
                <p className="text-xs font-mono text-[#8B8178] mt-1">{edu.period}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#625A58] font-semibold">
                Core Computer Science Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1.5 rounded-lg bg-[#F8F5EF] border border-[#D8CFC3] text-xs font-mono text-[#211C1D]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#625A58] font-semibold">
                Academic &amp; Extracurricular Focus
              </h4>
              <ul className="space-y-1.5 text-sm text-[#625A58]">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#7A1F35] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ────────── Next Steps CTA ────────── */}
        <section className="pt-6 border-t border-[#D8CFC3] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 text-[#7A1F35] hover:text-[#962D46] font-mono text-sm font-semibold hover:underline"
          >
            <span>Next: Explore My Technical Skills</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#625A58] hover:text-[#211C1D] font-mono text-xs"
          >
            <span>Or jump straight to Projects</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7A1F35]" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
