// ─────────────────────────────────────────────────────────────
// HOME PAGE — FOCUSED HERO INTRODUCTION
// Redesigned with White + Burgundy theme matching reference design:
// - Apple-inspired animated English greeting "Hello."
// - Navnit Kumar name in bold burgundy typography
// - SDE & MERN role badge, real professional tagline, and bio
// - Animated developer mascot with preserved eye-blinking animation
// - Clear action buttons: View My Work, Download CV, Let's Connect
// - Verified social profiles including updated LeetCode profile
// - Zero duplicated full portfolio sections (true multi-page experience)
// ─────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Code2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import PageWrapper from "../components/PageWrapper";
import CompanionBot from "../components/CompanionBot";
import AppleGreeting from "../components/AppleGreeting";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

interface HomePageProps {
  onOpenResume?: () => void;
}

export default function HomePage({ onOpenResume: _onOpenResume }: HomePageProps) {
  return (
    <PageWrapper
      title={`${PORTFOLIO_CONFIG.name} — ${PORTFOLIO_CONFIG.title}`}
      description="Portfolio of Navnit Kumar: Software Development Engineer and Full Stack Developer specializing in MERN, AI integration, and algorithmic problem solving."
    >
      <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center py-10 sm:py-16 overflow-hidden">
        {/* Subtle background ambient warmth */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#7A1F35]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#D8CFC3]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* ────────── LEFT COLUMN: FOCUSED INTRODUCTION ────────── */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Role Badge (matching reference image) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-xs font-mono text-[#211C1D] shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#7A1F35] animate-pulse" />
                <span className="font-semibold text-[#7A1F35]">
                  Software Development Engineer
                </span>
                <span className="text-[#8B8178]">/</span>
                <span className="text-[#625A58]">MERN Developer</span>
              </motion.div>

              {/* Display Heading: Apple-inspired Hello & Name */}
              <div className="space-y-1">
                {/* Apple-Inspired English Greeting */}
                <AppleGreeting />

                {/* Name */}
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#211C1D] leading-[1.08]"
                >
                  I&rsquo;m{" "}
                  <span className="text-[#7A1F35]">
                    {PORTFOLIO_CONFIG.name}
                  </span>
                </motion.h2>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-display text-lg sm:text-2xl text-[#211C1D] font-medium"
              >
                Turning complex challenges into elegant, resilient software.
              </motion.p>

              {/* Bio Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="max-w-2xl text-[#625A58] text-sm sm:text-base leading-relaxed"
              >
                Final-year B.Tech (IT) engineer with deep hands-on experience building production-ready applications using the MERN stack, AI integrations, and modern web technologies. Passionate about clean code, problem solving and creating impactful digital products.
              </motion.p>

              {/* Action Buttons (matching reference image) */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                {/* View My Work */}
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#7A1F35] hover:bg-[#962D46] text-white font-medium text-sm transition-all shadow-md shadow-[#7A1F35]/20 hover:shadow-lg hover:shadow-[#7A1F35]/30 hover:scale-[1.02]"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Download CV */}
                <a
                  href="/Navnit_Kumar_Resume.pdf"
                  download="Navnit_Kumar_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] text-[#211C1D] font-medium text-sm transition shadow-xs"
                >
                  <Download className="w-4 h-4 text-[#7A1F35]" />
                  <span>Download CV</span>
                </a>

                {/* Let's Connect */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#D8CFC3] bg-[#FFFCF7] hover:bg-[#F1ECE3] text-[#211C1D] font-medium text-sm transition shadow-xs"
                >
                  <Mail className="w-4 h-4 text-[#7A1F35]" />
                  <span>Let&rsquo;s Connect</span>
                </Link>
              </motion.div>

              {/* Social Channels & Status Row (matching reference image) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-3 pt-3"
              >
                {/* GitHub */}
                <a
                  href={PORTFOLIO_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 rounded-xl bg-[#FFFCF7] border border-[#D8CFC3] flex items-center justify-center text-[#211C1D] hover:text-[#7A1F35] hover:border-[#7A1F35]/50 transition shadow-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PORTFOLIO_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-xl bg-[#FFFCF7] border border-[#D8CFC3] flex items-center justify-center text-[#211C1D] hover:text-[#7A1F35] hover:border-[#7A1F35]/50 transition shadow-xs"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                {/* LeetCode (updated to navnit121) */}
                <a
                  href={PORTFOLIO_CONFIG.leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LeetCode Profile"
                  className="w-10 h-10 rounded-xl bg-[#FFFCF7] border border-[#D8CFC3] flex items-center justify-center text-[#211C1D] hover:text-[#7A1F35] hover:border-[#7A1F35]/50 transition shadow-xs"
                >
                  <Code2 className="w-4 h-4" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${PORTFOLIO_CONFIG.email}`}
                  aria-label="Email Direct"
                  className="w-10 h-10 rounded-xl bg-[#FFFCF7] border border-[#D8CFC3] flex items-center justify-center text-[#211C1D] hover:text-[#7A1F35] hover:border-[#7A1F35]/50 transition shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                </a>

                {/* Open to Opportunities Pill */}
                <div className="inline-flex items-center gap-2 pl-3 py-1 text-xs font-mono text-[#625A58]">
                  <span className="w-2 h-2 rounded-full bg-[#7A1F35] animate-pulse" />
                  <span>Open to Opportunities</span>
                </div>
              </motion.div>
            </div>

            {/* ────────── RIGHT COLUMN: ANIMATED DEVELOPER MASCOT ────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="lg:col-span-5 flex items-center justify-center relative"
            >
              <CompanionBot size="lg" interactive={true} />
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
