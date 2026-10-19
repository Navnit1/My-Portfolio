// ─────────────────────────────────────────────────────────────
// EXPERIENCE & CAREER TIMELINE PAGE
// Interactive animated timeline of verified job simulations,
// internships, enterprise backend tasks, and academic foundation
// Styled with White + Burgundy design system
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-14">
        {/* ────────── Header Banner ────────── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-xs font-mono text-[#7A1F35] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7A1F35] animate-pulse" />
            <span>/professional-timeline</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211C1D] leading-tight">
            Industry Simulations &amp; Engineering Experience
          </h1>
          <p className="text-[#625A58] text-base sm:text-lg leading-relaxed">
            Real-world backend workflows, distributed messaging with Kafka, enterprise technology consulting, and accredited technical internships.
          </p>
        </section>

        {/* ────────── Interactive Timeline ────────── */}
        <section className="relative">
          {/* Vertical Timeline Rule */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-[#D8CFC3] -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-[#D8CFC3] sm:hidden" />

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
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#7A1F35] border-2 border-white flex items-center justify-center text-white shadow-md shadow-[#7A1F35]/30 z-10">
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
                    <div className="group relative p-6 sm:p-8 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] hover:border-[#7A1F35]/60 transition-all duration-300 shadow-warm-card overflow-hidden">
                      {/* Period & Type */}
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6DED3]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-[11px] font-mono text-[#7A1F35] font-semibold">
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#F8F5EF] border border-[#D8CFC3] text-[#625A58]">
                          {item.type}
                        </span>
                      </div>

                      {/* Role & Org */}
                      <div className="mt-4">
                        <h3 className="font-display text-xl font-bold text-[#211C1D] group-hover:text-[#7A1F35] transition-colors">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-[#625A58] flex items-center gap-1.5">
                          <Building className="w-4 h-4 text-[#8B8178]" />
                          {item.org}
                        </p>
                      </div>

                      {/* Contribution bullet points */}
                      <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[#625A58] leading-relaxed">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7A1F35] shrink-0 mt-2" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack badges */}
                      <div className="mt-5 pt-4 border-t border-[#E6DED3] flex flex-wrap gap-1.5">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md bg-[#F8F5EF] border border-[#D8CFC3] text-[11px] font-mono text-[#211C1D]"
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
                            className="inline-flex items-center gap-1.5 text-[#7A1F35] hover:text-[#962D46] font-semibold hover:underline"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Verified Certificate</span>
                          </button>
                          <span className="text-[#D8CFC3]">&bull;</span>
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
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-700 border-2 border-white flex items-center justify-center text-white shadow-md z-10">
                <GraduationCap className="w-4 h-4" />
              </div>

              <div className="hidden sm:block sm:w-1/2" />

              <div className="w-full sm:w-1/2 pl-14 sm:pl-12">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] shadow-warm-card space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E6DED3]">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-800 font-semibold">
                      2023 – 2027
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#F8F5EF] border border-[#D8CFC3] text-[#625A58]">
                      B.Tech IT
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-[#211C1D]">
                      {EDUCATION_DATA[0].degree} in {EDUCATION_DATA[0].major}
                    </h3>
                    <p className="text-sm font-semibold text-[#7A1F35] mt-1">
                      {EDUCATION_DATA[0].institution}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#625A58] leading-relaxed">
                    Undergraduate program focused on rigorous computer science foundations, algorithms, data structures, operating systems, and web architectures.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {EDUCATION_DATA[0].coursework.slice(0, 5).map((c) => (
                      <span
                        key={c}
                        className="px-2 py-1 rounded bg-[#F8F5EF] border border-[#D8CFC3] text-[10px] font-mono text-[#211C1D]"
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
              onClick={() => setActiveModalCert(null)}
            >
              <button
                onClick={() => setActiveModalCert(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#FFFCF7] border border-[#D8CFC3] text-[#211C1D] flex items-center justify-center hover:bg-[#F1ECE3] transition shadow-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-[#7A1F35]" />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-[#D8CFC3] bg-[#FFFCF7] shadow-2xl"
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
        <section className="pt-6 border-t border-[#D8CFC3] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#7A1F35] hover:text-[#962D46] font-mono text-sm font-semibold hover:underline"
          >
            <span>Next: Explore Projects &amp; Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-[#625A58] hover:text-[#211C1D] font-mono text-xs"
          >
            <span>View All Certifications &amp; Credentials</span>
            <ArrowRight className="w-3 h-3 text-[#7A1F35]" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
