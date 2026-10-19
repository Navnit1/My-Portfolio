// ─────────────────────────────────────────────────────────────
// APPLE-INSPIRED ENGLISH GREETING COMPONENT
// Elegant typography, simplicity, and polished motion inspired by
// the iPhone welcome experience. English only. Zero delays.
// ─────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useCapabilities";

interface AppleGreetingProps {
  className?: string;
}

export default function AppleGreeting({ className = "" }: AppleGreetingProps) {
  const reducedMotion = usePrefersReducedMotion();

  // Individual letter reveal with refined staggering
  const letters = ["H", "e", "l", "l", "o"];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 18,
      filter: reducedMotion ? "none" : "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  if (reducedMotion) {
    return (
      <h1 className={`font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#211C1D] leading-none ${className}`}>
        Hello
      </h1>
    );
  }

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#211C1D] leading-none flex items-center select-none ${className}`}
      aria-label="Hello"
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
        className="inline-block text-[#7A1F35] ml-0.5"
      >
        .
      </motion.span>
    </motion.h1>
  );
}
