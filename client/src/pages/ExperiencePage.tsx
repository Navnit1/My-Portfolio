// ─────────────────────────────────────────────────────────────
// EXPERIENCE & CAREER TIMELINE PAGE
// Interactive animated timeline of verified job simulations,
// internships, enterprise backend tasks, and academic foundation
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Building,
  ArrowRight,
  Eye,
  X,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import {
  PORTFOLIO_CONFIG,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
} from "../data/portfolioData";

export default function ExperiencePage() {
  const [activeModalCert, setActiveModalCert] = useState<string | null>(null);

  return (
    <PageWrapper
      title={`Experience & Simulations — ${PORTFOLIO_CONFIG.name}`}
      description="Professional engineering timeline of Navnit Kumar featuring software engineering simulations at JPMorgan Chase & Deloitte, and AICTE IBM internships."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* ────────── Header Banner ────────── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>/professional-timeline</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Industry Simulations & Engineering Experience
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Real-world backend workflows, distributed messaging with Kafka, enterprise technology consulting, and accredited technical internships.
          </p>
        </section>

        {/* ────────── Interactive Timeline ────────── */}
        <section className="relative">
          {/* Vertical Timeline Rule */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/80 via-slate-700 to-transparent -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-800 sm:hidden" />

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Badge */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>

                  {/* Spacer for 2-column alternating layout on desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Timeline Card */}
                  <div
                    className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${
                      isEven ? "sm:pr-12" : "sm:pl-12"
                    }`}
                  >
                    <div className="group relative p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl overflow-hidden">
                      {/* Glow backdrop */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition" />

                      {/* Period & Type */}
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-400">
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80 text-amber-400">
                          {item.type}
                        </span>
                      </div>

                      {/* Role & Org */}
                      <div className="mt-4">
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                          <Building className="w-4 h-4 text-slate-500" />
                          {item.org}
                        </p>
                      </div>

                      {/* Contribution bullet points */}
                      <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack badges */}
                      <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Certificate link */}
                      {item.certificateRef && (
                        <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono">
                          <button
                            onClick={() => setActiveModalCert(`/certificates/${item.certificateRef}`)}
                            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Verified Certificate</span>
                          </button>
                          <span className="text-slate-600">●</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Education timeline node */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col sm:flex-row items-start"
            >
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)] z-10">
                <GraduationCap className="w-4 h-4" />
              </div>

              <div className="hidden sm:block sm:w-1/2" />

              <div className="w-full sm:w-1/2 pl-14 sm:pl-12">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
                      2023 – 2027
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                      B.Tech IT
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {EDUCATION_DATA[0].degree} in {EDUCATION_DATA[0].major}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 mt-1">
                      {EDUCATION_DATA[0].institution}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Undergraduate program focused on rigorous computer science foundations, algorithms, data structures, operating systems, and web architectures.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {EDUCATION_DATA[0].coursework.slice(0, 5).map((c) => (
                      <span
                        key={c}
                        className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ────────── Certificate Modal Lightbox ────────── */}
        <AnimatePresence>
          {activeModalCert && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
              onClick={() => setActiveModalCert(null)}
            >
              <button
                onClick={() => setActiveModalCert(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center hover:border-cyan-400 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeModalCert}
                  alt="Verified Certificate"
                  className="w-full h-full object-contain max-h-[85vh]"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ────────── Bottom Navigation ────────── */}
        <section className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm hover:underline"
          >
            <span>Next: Explore Projects & Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-mono text-xs"
          >
            <span>View All Certifications & Credentials</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
