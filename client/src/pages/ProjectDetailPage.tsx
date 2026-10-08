// ─────────────────────────────────────────────────────────────
// INDIVIDUAL PROJECT CASE STUDY PAGE (/projects/:slug)
// In-depth mini case study covering Problem, Solution, Architecture,
// Features, Engineering Challenges, and Verified Deployments
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
          <h1 className="font-display text-3xl font-bold text-white">
            Project Not Found
          </h1>
          <p className="text-slate-400 text-sm">
            The project you requested does not exist or has been moved.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-semibold"
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* ────────── Top Breadcrumbs & Back ────────── */}
        <div className="flex items-center justify-between text-xs font-mono">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
          <span className="text-slate-600">Case Study 0{projectIndex + 1}</span>
        </div>

        {/* ────────── Hero Header ────────── */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono">
              {project.period}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live in Production
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {project.name}
          </h1>

          <p className="text-cyan-300 font-mono text-base sm:text-lg">
            {project.tagline}
          </p>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs font-mono transition shadow-lg shadow-cyan-950/40"
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono transition"
              >
                <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </section>

        {/* ────────── Preview Media / Banner ────────── */}
        <section className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] text-slate-400">
              {project.liveUrl.replace("https://", "")}
            </span>
            <span className="text-[10px] text-cyan-400">Vercel Deployment</span>
          </div>

          <div className="p-6 sm:p-10 flex items-center justify-center bg-slate-950">
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className="w-full max-h-[480px] object-contain rounded-xl"
              />
            ) : (
              <div className="w-full max-w-2xl p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white text-sm">
                        AI Resume Evaluation Engine
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">
                        Real-Time Semantic ATS Parser
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                    ATS Match: 88%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Identified Keywords</span>
                    <span className="text-cyan-400 font-bold text-base">24 Tracked</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Missing Competencies</span>
                    <span className="text-amber-400 font-bold text-base">4 Gaps Detected</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Processing Speed</span>
                    <span className="text-emerald-400 font-bold text-base">&lt; 1.2s</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  <span className="text-cyan-400 font-semibold">Recommended Rewrite:</span>{" "}
                  &ldquo;Orchestrated high-throughput REST controllers integrating Kafka event queues and H2 in-memory databases, reducing async latency by 28%.&rdquo;
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ────────── Problem vs. Solution Breakdown ────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>01 / The Challenge</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              The Problem Statement
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>02 / The Engineered Solution</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              System Architecture & Response
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* ────────── Architecture & Technical Implementation ────────── */}
        <section className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display text-2xl font-bold text-white">
              Technical Architecture & Stack
            </h2>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.architecture}
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Technology Stack Components:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ────────── Key Features List ────────── */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-white">
            Core Features & Functionality
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ────────── Engineering Challenges & Resolutions ────────── */}
        <section className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-xl font-bold text-white">
              Technical Challenges Overcome
            </h2>
          </div>

          <div className="space-y-3">
            {project.challenges.map((chal, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs sm:text-sm text-slate-300 flex items-start gap-3"
              >
                <span className="text-cyan-400 font-mono font-semibold">
                  0{idx + 1}
                </span>
                <span>{chal}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ────────── Sole Developer Ownership Note ────────── */}
        <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-display font-semibold text-white text-sm">
              Role & Contribution
            </h4>
            <p className="text-xs text-slate-400">
              Sole developer — owned end-to-end delivery: React frontend, backend API integration, testing, and production deployment on Vercel.
            </p>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-semibold transition shrink-0"
            >
              <span>Verify Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </section>

        {/* ────────── Project Navigation (Prev / Next) ────────── */}
        <section className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition"
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
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
            >
              <span>Next: {nextProject.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
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
