// ─────────────────────────────────────────────────────────────
// APPLICATION ENTRYPOINT & MULTI-PAGE ROUTING
// Real multi-page architecture with smooth transitions,
// global navigation, floating chatbot, and resume modal
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Core components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ResumeModal from "./components/ResumeModal";
import BootSequence from "./components/BootSequence";

// Multi-page routes
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";

const BOOT_SESSION_KEY = "portfolio-boot-played";

function AnimatedRoutes({ onOpenResume }: { onOpenResume: () => void }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage onOpenResume={onOpenResume} />} />
        <Route path="/about" element={<AboutPage onOpenResume={onOpenResume} />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/contact" element={<ContactPage onOpenResume={onOpenResume} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [bootDone, setBootDone] = useState(() => {
    try {
      return sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
    } catch {
      return true;
    }
  });

  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    if (bootDone) {
      try {
        sessionStorage.setItem(BOOT_SESSION_KEY, "1");
      } catch {
        // Ignore
      }
    }
  }, [bootDone]);

  return (
    <BrowserRouter>
      {/* Initial boot sequence on first visit only (skippable) */}
      {!bootDone && <BootSequence onDone={() => setBootDone(true)} />}

      <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f8fafc] selection:bg-cyan-500/30 selection:text-white">
        {/* Global Navigation Header */}
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        {/* Main Content with Animated Multi-Page Routing */}
        <main className="flex-1">
          <AnimatedRoutes onOpenResume={() => setResumeOpen(true)} />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating AI Chatbot Companion */}
        <Chatbot />

        {/* Recruiter-Ready CV Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
