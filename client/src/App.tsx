// ─────────────────────────────────────────────────────────────
// APPLICATION ENTRYPOINT & MULTI-PAGE ROUTING
// Multi-page architecture with smooth transitions,
// global navigation, floating chatbot, and resume modal
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Core components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ResumeModal from "./components/ResumeModal";

// Multi-page routes
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";

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
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#F8F5EF] text-[#211C1D] selection:bg-[#7A1F35] selection:text-white">
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
