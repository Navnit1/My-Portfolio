// ─────────────────────────────────────────────────────────────
// INDIVIDUAL PROJECT CASE STUDY PAGE (/projects/:slug)
// In-depth case study covering Problem, Solution, Architecture,
// Features, Engineering Challenges, and Verified Deployments
// Styled with White + Burgundy design system
// ─────────────────────────────────────────────────────────────

import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  AlertTriangle,
  Layers,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import PageWrapper from "../components/PageWrapper";
import { PROJECTS_DATA, PORTFOLIO_CONFIG } from "../data/portfolioData";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = PROJECTS_DATA.findIndex((p) => p.slug === slug);
  const project = PROJECTS_DATA[projectIndex];

  if (!project) {
    return (
      <PageWrapper title="Project Not Found">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
          <h1 className="font-display text-3xl font-bold text-[#211C1D]">
            Project Not Found
          </h1>
          <p className="text-[#625A58] text-sm">
            The project you requested does not exist or has been moved.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1F35] text-white font-mono text-xs font-semibold shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Projects</span>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const prevProject = projectIndex > 0 ? PROJECTS_DATA[projectIndex - 1] : null;
  const nextProject =
    projectIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[projectIndex + 1] : null;

  return (
    <PageWrapper
      title={`${project.name} Case Study — ${PORTFOLIO_CONFIG.name}`}
      description={project.description}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-14">
        {/* ────────── Top Breadcrumbs & Back ────────── */}
        <div className="flex items-center justify-between text-xs font-mono">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#625A58] hover:text-[#7A1F35] transition font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
          <span className="text-[#8B8178]">Case Study 0{projectIndex + 1}</span>
        </div>

        {/* ────────── Hero Header ────────── */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-[#7A1F35] text-xs font-mono font-semibold">
              {project.category}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-[#FFFCF7] border border-[#D8CFC3] text-[#625A58] text-xs font-mono">
              {project.period}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-xs font-mono flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live in Production
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#211C1D] leading-tight">
            {project.name}
          </h1>

          <p className="text-[#7A1F35] font-mono text-base sm:text-lg font-medium">
            {project.tagline}
          </p>

          <p className="text-[#625A58] text-base sm:text-lg leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7A1F35] hover:bg-[#962D46] text-white font-semibold text-xs font-mono transition shadow-md shadow-[#7A1F35]/20"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] text-[#211C1D] text-xs font-mono transition shadow-xs"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#7A1F35]" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </section>

        {/* ────────── Preview Media / Banner ────────── */}
        <section className="rounded-3xl border border-[#D8CFC3] bg-[#FFFCF7] overflow-hidden shadow-warm-card">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E6DED3] bg-[#F1ECE3] text-xs font-mono text-[#625A58]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[11px] text-[#211C1D] font-medium">
              {project.liveUrl.replace("https://", "")}
            </span>
            <span className="text-[10px] text-[#7A1F35] font-semibold">Vercel Deployment</span>
          </div>

          <div className="p-6 sm:p-10 flex items-center justify-center bg-[#F8F5EF]">
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className="w-full max-h-[480px] object-contain rounded-xl shadow-sm"
              />
            ) : (
              <div className="w-full max-w-2xl p-8 rounded-2xl bg-[#FFFCF7] border border-[#D8CFC3] text-left space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E6DED3] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#7A1F35]/10 border border-[#7A1F35]/20 flex items-center justify-center text-[#7A1F35]">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[#211C1D] text-base">
                        AI Resume Evaluation Engine
                      </h3>
                      <p className="text-[11px] font-mono text-[#625A58]">
                        Real-Time Semantic ATS Parser
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-mono border border-emerald-500/25 font-semibold">
                    ATS Match: 88%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
                    <span className="text-[#8B8178] block text-[10px]">Identified Keywords</span>
                    <span className="text-[#7A1F35] font-bold text-base">24 Tracked</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
                    <span className="text-[#8B8178] block text-[10px]">Missing Competencies</span>
                    <span className="text-amber-800 font-bold text-base">4 Gaps Detected</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3]">
                    <span className="text-[#8B8178] block text-[10px]">Processing Speed</span>
                    <span className="text-emerald-800 font-bold text-base">&lt; 1.2s</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] text-xs font-mono text-[#211C1D]">
                  <span className="text-[#7A1F35] font-semibold">Recommended Rewrite:</span>{" "}
                  &ldquo;Orchestrated high-throughput REST controllers integrating Kafka event queues and H2 in-memory databases, reducing async latency by 28%.&rdquo;
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ────────── Problem vs. Solution Breakdown ────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem */}
          <div className="p-8 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] space-y-4 shadow-warm-card">
            <div className="flex items-center gap-2 text-amber-800 font-mono text-xs uppercase tracking-wider font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>01 / The Challenge</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[#211C1D]">
              The Problem Statement
            </h2>
            <p className="text-[#625A58] text-sm leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="p-8 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] space-y-4 shadow-warm-card">
            <div className="flex items-center gap-2 text-[#7A1F35] font-mono text-xs uppercase tracking-wider font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>02 / The Engineered Solution</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[#211C1D]">
              System Architecture &amp; Response
            </h2>
            <p className="text-[#625A58] text-sm leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* ────────── Architecture & Technical Implementation ────────── */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] space-y-6 shadow-warm-card">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#7A1F35]" />
            <h2 className="font-display text-2xl font-bold text-[#211C1D]">
              Technical Architecture &amp; Stack
            </h2>
          </div>

          <p className="text-[#625A58] text-sm sm:text-base leading-relaxed">
            {project.architecture}
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#211C1D] font-semibold">
              Technology Stack Components:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] text-xs font-mono text-[#211C1D]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ────────── Key Features List ────────── */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#211C1D]">
            Core Features &amp; Functionality
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#D8CFC3] flex items-start gap-3 shadow-xs"
              >
                <div className="w-6 h-6 rounded-lg bg-[#7A1F35]/10 border border-[#7A1F35]/20 flex items-center justify-center text-[#7A1F35] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-[#625A58] leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ────────── Engineering Challenges & Resolutions ────────── */}
        <section className="p-8 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] space-y-6 shadow-warm-card">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-800" />
            <h2 className="font-display text-xl font-bold text-[#211C1D]">
              Technical Challenges Overcome
            </h2>
          </div>

          <div className="space-y-3">
            {project.challenges.map((chal, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] text-xs sm:text-sm text-[#625A58] flex items-start gap-3"
              >
                <span className="text-[#7A1F35] font-mono font-semibold">
                  0{idx + 1}
                </span>
                <span>{chal}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ────────── Sole Developer Ownership Note ────────── */}
        <section className="p-6 rounded-2xl bg-[#F1ECE3] border border-[#D8CFC3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-display font-semibold text-[#211C1D] text-sm">
              Role &amp; Contribution
            </h4>
            <p className="text-xs text-[#625A58]">
              Sole developer &mdash; owned end-to-end delivery: React frontend, backend API integration, testing, and production deployment on Vercel.
            </p>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A1F35] hover:bg-[#962D46] text-white text-xs font-mono font-semibold transition shrink-0 shadow-xs"
            >
              <span>Verify Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </section>

        {/* ────────── Project Navigation (Prev / Next) ────────── */}
        <section className="pt-6 border-t border-[#D8CFC3] flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#625A58] hover:text-[#7A1F35] transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous: {prevProject.name}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#7A1F35] hover:text-[#962D46] font-semibold transition"
            >
              <span>Next: {nextProject.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#7A1F35] hover:text-[#962D46] font-semibold transition"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </section>
      </div>
    </PageWrapper>
  );
}
