// ─────────────────────────────────────────────────────────────
// ACHIEVEMENTS & CERTIFICATIONS PAGE
// Verified technical credentials, real certificate images in lightbox,
// LeetCode DSA profile breakdown, and industry simulations
// Styled with White + Burgundy design system
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-14">
        {/* ────────── Header Banner ────────── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-xs font-mono text-[#7A1F35] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7A1F35] animate-pulse" />
            <span>/verified-credentials-and-achievements</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211C1D] leading-tight">
            Verified Certifications &amp; Technical Milestones
          </h1>
          <p className="text-[#625A58] text-base sm:text-lg leading-relaxed">
            All credentials presented here are strictly verified through official issuers including Oracle University, Microsoft via Coursera, Cisco Networking Academy, and Forage.
          </p>
        </section>

        {/* ────────── Coding Credibility Row ────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#7A1F35]" />
            <h2 className="font-display text-2xl font-bold text-[#211C1D]">
              Algorithmic &amp; Developer Profiles
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LeetCodeCard />
            <GitHubCard />
          </div>
        </section>

        {/* ────────── Filter Tabs ────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#D8CFC3]">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#7A1F35]" />
              <h2 className="font-display text-2xl font-bold text-[#211C1D]">
                Accredited Certifications ({CERTIFICATIONS_DATA.length})
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#7A1F35] text-white font-semibold shadow-xs"
                      : "bg-[#FFFCF7] border border-[#D8CFC3] text-[#211C1D] hover:bg-[#F1ECE3]"
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
                className="group p-5 rounded-2xl bg-[#FFFCF7] border border-[#D8CFC3] hover:border-[#7A1F35]/50 transition-all duration-300 shadow-warm-card flex flex-col justify-between"
              >
                <div>
                  {/* Certificate preview thumbnail */}
                  <div
                    onClick={() => setActiveCertModal(cert)}
                    className="relative aspect-[4/3] rounded-xl bg-[#F8F5EF] overflow-hidden border border-[#D8CFC3] mb-4 cursor-zoom-in group/img"
                  >
                    <img
                      src={cert.file}
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[#211C1D]/30 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFCF7] text-[#7A1F35] border border-[#D8CFC3] text-xs font-mono font-semibold shadow-sm">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </span>
                    </div>
                  </div>

                  {/* Badge & Org */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#625A58] mb-1.5">
                    <span className="text-[#7A1F35] font-semibold truncate max-w-[160px]">
                      {cert.org}
                    </span>
                    <span>{cert.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-sm text-[#211C1D] line-clamp-2 leading-snug group-hover:text-[#7A1F35] transition-colors">
                    {cert.name}
                  </h3>

                  {/* Credential ID if present */}
                  {cert.credentialId && (
                    <p className="mt-2 text-[11px] font-mono text-[#625A58]">
                      ID: <span className="text-[#7A1F35] font-semibold">{cert.credentialId}</span>
                    </p>
                  )}

                  {cert.validTill && (
                    <p className="mt-1 text-[10px] font-mono text-emerald-800 font-medium">
                      Valid through {cert.validTill}
                    </p>
                  )}
                </div>

                {/* Inspect Action */}
                <div className="mt-4 pt-3 border-t border-[#E6DED3] flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-[#8B8178]">{cert.category}</span>
                  <button
                    onClick={() => setActiveCertModal(cert)}
                    className="inline-flex items-center gap-1 text-[#7A1F35] hover:text-[#962D46] font-semibold hover:underline"
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
              onClick={() => setActiveCertModal(null)}
            >
              <button
                onClick={() => setActiveCertModal(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#FFFCF7] border border-[#D8CFC3] text-[#211C1D] flex items-center justify-center hover:bg-[#F1ECE3] transition z-10 shadow-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-[#7A1F35]" />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-[#D8CFC3] bg-[#FFFCF7] shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DED3] bg-[#F1ECE3] text-xs font-mono">
                  <div>
                    <h3 className="font-display font-semibold text-[#211C1D] text-sm">
                      {activeCertModal.name}
                    </h3>
                    <p className="text-[#7A1F35] font-semibold text-xs mt-0.5">
                      Issued by {activeCertModal.org} &bull; {activeCertModal.date}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FFFCF7] border border-[#D8CFC3] text-[11px] text-[#625A58]">
                    {activeCertModal.category}
                  </span>
                </div>

                <div className="p-4 sm:p-6 overflow-auto max-h-[calc(90vh-80px)] flex items-center justify-center bg-[#F8F5EF]">
                  <img
                    src={activeCertModal.file}
                    alt={activeCertModal.name}
                    className="max-h-[70vh] w-auto object-contain rounded-lg shadow-sm"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ────────── Bottom Navigation ────────── */}
        <section className="pt-6 border-t border-[#D8CFC3] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-[#7A1F35] hover:text-[#962D46] font-mono text-sm font-semibold hover:underline"
          >
            <span>Next: Start a Conversation / Hire Navnit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#625A58] hover:text-[#211C1D] font-mono text-xs"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7A1F35]" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
