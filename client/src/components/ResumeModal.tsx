// ─────────────────────────────────────────────────────────────
// RESUME MODAL & PRINT/DOWNLOAD HANDLER
// High-fidelity recruiter-ready resume view and export
// Styled with White + Burgundy design system
// ─────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import {
  PORTFOLIO_CONFIG,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  SKILL_CATEGORIES,
} from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-10 flex flex-col w-full max-w-4xl max-h-[90vh] bg-[#FFFCF7] border border-[#D8CFC3] rounded-2xl shadow-2xl overflow-hidden text-[#211C1D]"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DED3] bg-[#F1ECE3]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A1F35] animate-pulse" />
              <h2 className="font-display font-bold text-[#211C1D] text-base sm:text-lg">
                Curriculum Vitae &mdash; {PORTFOLIO_CONFIG.name}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/Navnit_Kumar_Resume.pdf"
                download="Navnit_Kumar_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#7A1F35] bg-[#7A1F35] hover:bg-[#962D46] text-xs font-mono text-white transition shadow-xs"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F8F5EF] text-xs font-mono text-[#211C1D] transition shadow-xs"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-[#7A1F35]" />
                <span>Print</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F8F5EF] text-[#211C1D] transition shadow-xs"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-[#7A1F35]" />
              </button>
            </div>
          </div>

          {/* Scrollable Document Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#FFFCF7] text-[#211C1D] text-sm leading-relaxed">
            {/* Header info */}
            <div className="border-b border-[#E6DED3] pb-6">
              <h1 className="font-display text-3xl font-bold text-[#211C1D] tracking-tight">
                {PORTFOLIO_CONFIG.name}
              </h1>
              <p className="mt-1 font-mono text-[#7A1F35] text-sm font-semibold">
                {PORTFOLIO_CONFIG.title} &bull; {PORTFOLIO_CONFIG.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-[#625A58]">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#7A1F35]" />
                  <a href={`mailto:${PORTFOLIO_CONFIG.email}`} className="hover:text-[#7A1F35] text-[#211C1D]">
                    {PORTFOLIO_CONFIG.email}
                  </a>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#7A1F35]" />
                  <span className="text-[#211C1D]">{PORTFOLIO_CONFIG.phone}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7A1F35]" />
                  <span className="text-[#211C1D]">{PORTFOLIO_CONFIG.location}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#7A1F35]" />
                  <a href={PORTFOLIO_CONFIG.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[#7A1F35] text-[#211C1D]">
                    LinkedIn
                  </a>
                </span>
                <span className="flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#7A1F35]" />
                  <a href={PORTFOLIO_CONFIG.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[#7A1F35] text-[#211C1D]">
                    GitHub (@{PORTFOLIO_CONFIG.githubUsername})
                  </a>
                </span>
                <span className="flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#7A1F35]" />
                  <a href={PORTFOLIO_CONFIG.leetcodeUrl} target="_blank" rel="noreferrer" className="hover:text-[#7A1F35] text-[#211C1D]">
                    LeetCode (@{PORTFOLIO_CONFIG.leetcodeUsername})
                  </a>
                </span>
              </div>
            </div>

            {/* Summary */}
            <section>
              <h3 className="font-display text-xs uppercase tracking-widest text-[#7A1F35] font-bold mb-2">
                Executive Profile
              </h3>
              <p className="text-[#625A58] leading-relaxed text-sm">
                Final-year B.Tech (IT) student and Full Stack / SDE aspirant with hands-on experience building and deploying full-stack and AI-integrated web applications using the MERN stack. Completed JPMorgan Chase &amp; Co. Software Engineering Job Simulation covering REST API design and Kafka asynchronous streaming, alongside Deloitte&rsquo;s Technology Job Simulation. Active LeetCode practitioner (Striver A2Z) strengthening DSA fundamentals. Seeking SDE / Full Stack Developer internships and entry-level roles.
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h3 className="font-display text-xs uppercase tracking-widest text-[#7A1F35] font-bold mb-3">
                Technical Expertise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(SKILL_CATEGORIES).map(([cat, skills]) => (
                  <div key={cat} className="p-3 rounded-xl border border-[#D8CFC3] bg-[#F8F5EF]">
                    <span className="font-semibold text-[#211C1D]">{cat}: </span>
                    <span className="text-[#625A58]">
                      {skills.map((s) => s.name).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience / Simulations */}
            <section>
              <h3 className="font-display text-xs uppercase tracking-widest text-[#7A1F35] font-bold mb-3">
                Experience &amp; Simulations
              </h3>
              <div className="space-y-4">
                {EXPERIENCE_DATA.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl border border-[#D8CFC3] bg-[#F8F5EF]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-semibold text-[#211C1D] text-sm">{exp.role}</h4>
                      <span className="font-mono text-xs text-[#8B8178]">{exp.period}</span>
                    </div>
                    <p className="text-xs text-[#7A1F35] font-semibold mt-0.5">{exp.org}</p>
                    <ul className="mt-2 space-y-1.5 list-disc list-inside text-xs text-[#625A58]">
                      {exp.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Projects */}
            <section>
              <h3 className="font-display text-xs uppercase tracking-widest text-[#7A1F35] font-bold mb-3">
                Key Engineered Projects
              </h3>
              <div className="space-y-4">
                {PROJECTS_DATA.map((proj) => (
                  <div key={proj.slug} className="p-4 rounded-xl border border-[#D8CFC3] bg-[#F8F5EF]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-semibold text-[#211C1D] text-sm">{proj.name}</h4>
                      <span className="font-mono text-xs text-[#8B8178]">{proj.period}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 my-2">
                      {proj.stack.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#FFFCF7] border border-[#D8CFC3] text-[#211C1D]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#625A58] mb-2">{proj.description}</p>
                    <ul className="space-y-1 text-xs text-[#625A58] list-disc list-inside">
                      {proj.features.slice(0, 3).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex gap-3 text-xs font-mono">
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-[#7A1F35] font-semibold hover:underline">
                        Live Demo &nearr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="font-display text-xs uppercase tracking-widest text-[#7A1F35] font-bold mb-3">
                Education
              </h3>
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.institution} className="p-4 rounded-xl border border-[#D8CFC3] bg-[#F8F5EF]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-[#211C1D]">{edu.degree} &mdash; {edu.major}</h4>
                      <p className="text-xs text-[#7A1F35] font-semibold mt-0.5">{edu.institution}</p>
                    </div>
                    <span className="font-mono text-xs text-[#8B8178]">{edu.period}</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {edu.coursework.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FFFCF7] border border-[#D8CFC3] text-[#625A58]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Footer CTAs */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E6DED3] bg-[#F1ECE3]">
            <span className="text-xs font-mono text-[#625A58] hidden sm:inline">
              Ready for immediate joining &amp; interviews
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <a
                href="/Navnit_Kumar_Resume.pdf"
                download="Navnit_Kumar_Resume.pdf"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1F35] hover:bg-[#962D46] text-white font-medium text-xs font-mono transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
