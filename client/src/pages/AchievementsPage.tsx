// ─────────────────────────────────────────────────────────────
// ACHIEVEMENTS & CERTIFICATIONS PAGE
// Verified technical credentials, real certificate images in lightbox,
// LeetCode DSA profile breakdown, and industry simulations
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Eye,
  X,
  Target,
  ArrowRight,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import LeetCodeCard from "../components/LeetCodeCard";
import GitHubCard from "../components/GitHubCard";
import {
  PORTFOLIO_CONFIG,
  CERTIFICATIONS_DATA,
  type CertificateItem,
} from "../data/portfolioData";

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCertModal, setActiveCertModal] = useState<CertificateItem | null>(null);

  const categories = ["All", "AI & Cloud", "DSA & CS", "Job Simulation", "Web Development"];

  const filteredCerts = CERTIFICATIONS_DATA.filter((cert) => {
    if (selectedCategory === "All") return true;
    return cert.category === selectedCategory;
  });

  return (
    <PageWrapper
      title={`Achievements & Certifications — ${PORTFOLIO_CONFIG.name}`}
      description="Verified technical achievements and certifications of Navnit Kumar: Oracle AI Associate, Coursera DSA, Cisco Python, JPMorgan Chase and Deloitte simulations."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* ────────── Header Banner ────────── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>/verified-credentials-and-achievements</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Verified Certifications & Technical Milestones
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            All credentials presented here are strictly verified through official issuers including Oracle University, Microsoft via Coursera, Cisco Networking Academy, and Forage.
          </p>
        </section>

        {/* ────────── Coding Credibility Row ────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display text-2xl font-bold text-white">
              Algorithmic & Developer Profiles
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LeetCodeCard />
            <GitHubCard />
          </div>
        </section>

        {/* ────────── Filter Tabs ────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-2xl font-bold text-white">
                Accredited Certifications ({CERTIFICATIONS_DATA.length})
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-950"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCerts.map((cert) => (
              <motion.article
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Certificate preview thumbnail */}
                  <div
                    onClick={() => setActiveCertModal(cert)}
                    className="relative aspect-[4/3] rounded-xl bg-slate-950 overflow-hidden border border-slate-800/80 mb-4 cursor-zoom-in group/img"
                  >
                    <img
                      src={cert.file}
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </span>
                    </div>
                  </div>

                  {/* Badge & Org */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span className="text-amber-400 font-medium truncate max-w-[160px]">
                      {cert.org}
                    </span>
                    <span>{cert.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-sm text-white line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {cert.name}
                  </h3>

                  {/* Credential ID if present */}
                  {cert.credentialId && (
                    <p className="mt-2 text-[11px] font-mono text-slate-400">
                      ID: <span className="text-cyan-400">{cert.credentialId}</span>
                    </p>
                  )}

                  {cert.validTill && (
                    <p className="mt-1 text-[10px] font-mono text-emerald-400">
                      Valid through {cert.validTill}
                    </p>
                  )}
                </div>

                {/* Inspect Action */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-slate-500">{cert.category}</span>
                  <button
                    onClick={() => setActiveCertModal(cert)}
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    <span>Zoom In</span>
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ────────── Lightbox Modal for Full Certificate ────────── */}
        <AnimatePresence>
          {activeCertModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
              onClick={() => setActiveCertModal(null)}
            >
              <button
                onClick={() => setActiveCertModal(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center hover:border-cyan-400 transition z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 text-xs font-mono">
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm">
                      {activeCertModal.name}
                    </h3>
                    <p className="text-amber-400 text-xs mt-0.5">
                      Issued by {activeCertModal.org} · {activeCertModal.date}
                    </p>
                  </div>
                  {activeCertModal.credentialId && (
                    <span className="text-cyan-400">
                      ID: {activeCertModal.credentialId}
                    </span>
                  )}
                </div>

                <div className="p-4 overflow-auto flex items-center justify-center bg-slate-950">
                  <img
                    src={activeCertModal.file}
                    alt={activeCertModal.name}
                    className="max-h-[75vh] w-auto object-contain rounded-lg shadow-xl"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ────────── Bottom Navigation ────────── */}
        <section className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm hover:underline"
          >
            <span>Next: Contact Navnit for Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-mono text-xs"
          >
            <span>Return to Projects</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
