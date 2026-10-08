// ─────────────────────────────────────────────────────────────
// PAGE WRAPPER
// Manages smooth route transitions, scroll-to-top, and SEO titles
// ─────────────────────────────────────────────────────────────

import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function PageWrapper({
  children,
  title = "Navnit Kumar — Software Development Engineer",
  description = "Portfolio of Navnit Kumar, Software Development Engineer and Full Stack Developer specializing in MERN, AI integration, and algorithmic problem solving.",
}: PageWrapperProps) {
  const location = useLocation();

  useEffect(() => {
    // Scroll smoothly to top on route change
    window.scrollTo(0, 0);

    // Update document title & meta description
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }
  }, [location.pathname, title, description]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex flex-col pt-20"
    >
      <div className="flex-1">{children}</div>
    </motion.div>
  );
}
