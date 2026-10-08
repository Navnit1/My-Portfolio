// ─────────────────────────────────────────────────────────────
// COMPANION BOT ("BitBot / Nexus")
// The 10% Cute + 20% Motion + 70% Technical Developer Mascot
// Responsive to mouse movement, idle floating, hover-reactive
// ─────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface CompanionBotProps {
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  mood?: "idle" | "coding" | "happy" | "thinking";
  className?: string;
  showBadge?: boolean;
}

export default function CompanionBot({
  size = "md",
  interactive = true,
  className = "",
  showBadge = true,
}: CompanionBotProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentFace, setCurrentFace] = useState<"normal" | "happy" | "code" | "blink">("normal");
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for subtle eye & head rotation
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates (-1 to 1)
      const dx = Math.max(-1, Math.min(1, (e.clientX - centerX) / 400));
      const dy = Math.max(-1, Math.min(1, (e.clientY - centerY) / 400));
      setMousePos({ x: dx * 10, y: dy * 8 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  // Periodic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isHovered) {
        setCurrentFace("blink");
        setTimeout(() => setCurrentFace("normal"), 200);
      }
    }, 4000);

    return () => clearInterval(blinkInterval);
  }, [isHovered]);

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-36 h-36 sm:w-44 sm:h-44",
    lg: "w-48 h-48 sm:w-60 sm:h-60",
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setCurrentFace("happy");
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentFace("normal");
      }}
    >
      {/* Floating container */}
      <motion.div
        animate={{
          y: isHovered ? -6 : [0, -8, 0],
          rotate: isHovered ? 1.5 : [0, 1.2, -1.2, 0],
        }}
        transition={{
          y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
      >
        {/* Soft cyan aura backlight */}
        <div
          className="absolute inset-2 rounded-full bg-cyan-500/20 blur-xl transition-all duration-300"
          style={{
            transform: isHovered ? "scale(1.2)" : "scale(1)",
            opacity: isHovered ? 0.45 : 0.25,
          }}
        />

        {/* Orbiting Tech Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-6%] rounded-full border border-cyan-500/20 border-dashed pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
        </motion.div>

        {/* Mascot SVG Body */}
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-2xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Antenna with pulsing core */}
          <path d="M80 34V20" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <motion.circle
            cx="80"
            cy="18"
            r="5"
            fill={isHovered ? "#22d3ee" : "#06b6d4"}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              filter: "drop-shadow(0 0 6px rgba(6, 182, 212, 0.8))",
            }}
          />

          {/* Ears / Side audio sensors */}
          <rect x="22" y="65" width="8" height="24" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <rect x="24" y="70" width="4" height="14" rx="2" fill="#06b6d4" opacity="0.6" />
          <rect x="130" y="65" width="8" height="24" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <rect x="132" y="70" width="4" height="14" rx="2" fill="#06b6d4" opacity="0.6" />

          {/* Main Bot Head / Chassis */}
          <rect
            x="28"
            y="36"
            width="104"
            height="86"
            rx="24"
            fill="#0f172a"
            stroke={isHovered ? "#38bdf8" : "#334155"}
            strokeWidth="2"
            className="transition-colors duration-300"
          />

          {/* Subtle metallic top highlight */}
          <path
            d="M48 42C60 39 100 39 112 42"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Visor Screen (Deep Obsidian Glass) */}
          <rect
            x="38"
            y="48"
            width="84"
            height="58"
            rx="16"
            fill="#050811"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Visor scanline effect */}
          <line x1="42" y1="56" x2="118" y2="56" stroke="rgba(6,182,212,0.06)" strokeWidth="1" />
          <line x1="42" y1="64" x2="118" y2="64" stroke="rgba(6,182,212,0.06)" strokeWidth="1" />
          <line x1="42" y1="72" x2="118" y2="72" stroke="rgba(6,182,212,0.06)" strokeWidth="1" />
          <line x1="42" y1="80" x2="118" y2="80" stroke="rgba(6,182,212,0.06)" strokeWidth="1" />
          <line x1="42" y1="88" x2="118" y2="88" stroke="rgba(6,182,212,0.06)" strokeWidth="1" />
          <line x1="42" y1="96" x2="118" y2="96" stroke="rgba(6,182,212,0.06)" strokeWidth="1" />

          {/* Interactive Eyes / Visor Display */}
          <g transform={`translate(${mousePos.x}, ${mousePos.y})`}>
            {currentFace === "blink" ? (
              // Blinking line eyes
              <>
                <line x1="60" y1="74" x2="74" y2="74" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
                <line x1="86" y1="74" x2="100" y2="74" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : currentFace === "happy" ? (
              // Happy curved eyes ^ ^
              <>
                <path d="M58 76Q67 65 76 76" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" fill="none" style={{ filter: "drop-shadow(0 0 4px #22d3ee)" }} />
                <path d="M84 76Q93 65 102 76" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" fill="none" style={{ filter: "drop-shadow(0 0 4px #22d3ee)" }} />
                {/* Cute smile */}
                <path d="M74 86Q80 91 86 86" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            ) : (
              // Normal tech glowing eyes
              <>
                {/* Left eye */}
                <circle cx="66" cy="74" r="7.5" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 6px #06b6d4)" }} />
                <circle cx="68.5" cy="71.5" r="2.5" fill="#ffffff" />

                {/* Right eye */}
                <circle cx="94" cy="74" r="7.5" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 6px #06b6d4)" }} />
                <circle cx="96.5" cy="71.5" r="2.5" fill="#ffffff" />

                {/* Subtle tech blush dots */}
                <circle cx="56" cy="84" r="2" fill="#06b6d4" opacity="0.4" />
                <circle cx="104" cy="84" r="2" fill="#06b6d4" opacity="0.4" />
              </>
            )}
          </g>

          {/* Mini chest badge / status LED */}
          <rect x="74" y="112" width="12" height="4" rx="2" fill="#10b981" style={{ filter: "drop-shadow(0 0 4px #10b981)" }} />

          {/* Floating Thruster Plume */}
          <motion.ellipse
            cx="80"
            cy="134"
            rx="16"
            ry="4"
            fill="#06b6d4"
            opacity="0.3"
            animate={{
              rx: [14, 18, 14],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(2px)" }}
          />
        </svg>
      </motion.div>

      {/* Companion micro badge label */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400 backdrop-blur shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>BitBot v2.4 · {isHovered ? "Ready!" : "Online"}</span>
        </motion.div>
      )}
    </div>
  );
}
