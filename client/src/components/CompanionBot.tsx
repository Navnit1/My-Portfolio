// ─────────────────────────────────────────────────────────────
// COMPANION BOT ("BitBot") — NAVNIT KUMAR'S DEVELOPER MASCOT
// Faithfully matches the supplied reference image:
// - Robot sitting in burgundy hoodie with headphones & antenna
// - Working on dark laptop with illuminated "NK" monogram
// - Stack of books (React, Node.js, MongoDB) and coffee mug (</>)
// - Floating code cards and star sparkles in White + Burgundy theme
// - CURSOR INTERACTION: Eyes, mouth & head smoothly track mouse cursor
// - BLINK ANIMATION: Autonomous natural eye-closing and reopening
// - Zero BitBot product panels or marketing text
// ─────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useCapabilities";

interface CompanionBotProps {
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
}

export default function CompanionBot({
  size = "lg",
  interactive = true,
  className = "",
}: CompanionBotProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [normalized, setNormalized] = useState({ dx: 0, dy: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentFace, setCurrentFace] = useState<"normal" | "happy" | "blink">("normal");
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // ── Smooth Cursor-Following Eye & Head Tracking ────────────
  useEffect(() => {
    if (!interactive || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates (-1 to 1) with dampening
      const dx = Math.max(-1, Math.min(1, (e.clientX - centerX) / 320));
      const dy = Math.max(-1, Math.min(1, (e.clientY - centerY) / 320));

      setNormalized({ dx, dy });
      // Gaze offset for eyes inside the visor
      setMousePos({ x: dx * 14, y: dy * 10 });
    };

    const handleWindowBlur = () => {
      setMousePos({ x: 0, y: 0 });
      setNormalized({ dx: 0, dy: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("blur", handleWindowBlur);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [interactive, reducedMotion]);

  // ── Autonomous Natural Eye Blinking Animation ──────────────
  // Periodically closes eyes into fine horizontal line and reopens
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isHovered) {
        setCurrentFace("blink");
        setTimeout(() => {
          setCurrentFace("normal");
        }, 210);
      }
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, [isHovered]);

  const sizeClasses = {
    sm: "w-44 h-44 sm:w-52 sm:h-52",
    md: "w-64 h-64 sm:w-80 sm:h-80",
    lg: "w-full max-w-[480px] sm:max-w-[540px] aspect-[1.14/1]",
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
        setMousePos({ x: 0, y: 0 });
        setNormalized({ dx: 0, dy: 0 });
      }}
      onClick={() => {
        // Touch friendly interaction
        setCurrentFace("happy");
        setTimeout(() => setCurrentFace("normal"), 800);
      }}
    >
      {/* Floating Animated Mascot Scene Container */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: isHovered ? -5 : [0, -6, 0],
              }
        }
        transition={{
          y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
        }}
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
      >
        {/* Soft Warm Radial Backdrop Glow */}
        <div
          className="absolute inset-4 rounded-full bg-[#7A1F35]/10 blur-3xl pointer-events-none transition-all duration-500"
          style={{
            transform: isHovered ? "scale(1.15)" : "scale(1)",
            opacity: isHovered ? 0.35 : 0.2,
          }}
        />

        {/* Master Mascot SVG Illustration matching supplied reference */}
        <svg
          viewBox="0 0 500 440"
          className="w-full h-full overflow-visible drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Burgundy Gradient */}
            <linearGradient id="burgundyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#962D46" />
              <stop offset="60%" stopColor="#7A1F35" />
              <stop offset="100%" stopColor="#541526" />
            </linearGradient>

            {/* Dark Chassis Gradient */}
            <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2425" />
              <stop offset="50%" stopColor="#1E191A" />
              <stop offset="100%" stopColor="#130F10" />
            </linearGradient>

            {/* Laptop Surface Gradient */}
            <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E2729" />
              <stop offset="100%" stopColor="#181415" />
            </linearGradient>

            {/* Soft Warm Drop Shadow Filter */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#211C1D" floodOpacity="0.12" />
            </filter>
            <filter id="badgeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#7A1F35" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* ────────── BACKGROUND ACCENTS ────────── */}
          {/* Soft warm circular halo backdrop (matching reference image) */}
          <circle cx="250" cy="215" r="155" fill="#F1ECE3" opacity="0.75" />

          {/* Decorative Branch / Plant Leaves on Right (matching reference) */}
          <g opacity="0.45" stroke="#C8BEB0" strokeWidth="2" strokeLinecap="round">
            <path d="M410 330 C425 270, 420 210, 435 170" fill="none" />
            <path d="M418 275 C438 260, 448 270, 438 285 C428 290, 422 280, 418 275 Z" fill="#DCD3C6" />
            <path d="M417 240 C435 225, 445 232, 436 246 C428 250, 421 244, 417 240 Z" fill="#DCD3C6" />
            <path d="M422 205 C442 190, 448 196, 442 208 C435 214, 426 208, 422 205 Z" fill="#DCD3C6" />
            <path d="M435 170 C449 155, 457 160, 450 172 C444 177, 438 172, 435 170 Z" fill="#DCD3C6" />
          </g>

          {/* Sparkle 4-point stars (matching reference) */}
          <g fill="#962D46" opacity="0.75">
            {/* Top Left Sparkle */}
            <path d="M105 95 Q105 105 95 105 Q105 105 105 115 Q105 105 115 105 Q105 105 105 95 Z" />
            {/* Top Right Sparkle */}
            <path d="M380 85 Q380 93 372 93 Q380 93 380 101 Q380 93 388 93 Q380 93 380 85 Z" />
            {/* Far Right Sparkle */}
            <path d="M440 220 Q440 226 434 226 Q440 226 440 232 Q440 226 446 226 Q440 226 440 220 Z" />
            {/* Mid Left Sparkle */}
            <path d="M68 200 Q68 206 62 206 Q68 206 68 212 Q68 206 74 206 Q68 206 68 200 Z" />
          </g>

          {/* Floating Code Badge Left: "</>" (matching reference) */}
          <g filter="url(#badgeShadow)">
            <rect
              x="65"
              y="125"
              width="46"
              height="46"
              rx="12"
              fill="url(#burgundyGrad)"
              transform="rotate(-8 88 148)"
            />
            <text
              x="88"
              y="155"
              fill="#FFFFFF"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="17"
              fontWeight="bold"
              textAnchor="middle"
              transform="rotate(-8 88 148)"
            >
              &lt;/&gt;
            </text>
          </g>

          {/* Floating Code Card Right: Code snippet (matching reference) */}
          <g filter="url(#badgeShadow)">
            <rect
              x="375"
              y="115"
              width="58"
              height="48"
              rx="11"
              fill="url(#burgundyGrad)"
              transform="rotate(6 404 139)"
            />
            {/* Mock syntax code lines */}
            <rect x="385" y="127" width="18" height="3" rx="1.5" fill="#FFFFFF" opacity="0.95" transform="rotate(6 404 139)" />
            <rect x="385" y="134" width="38" height="3" rx="1.5" fill="#E6DED3" opacity="0.85" transform="rotate(6 404 139)" />
            <rect x="385" y="141" width="30" height="3" rx="1.5" fill="#E6DED3" opacity="0.85" transform="rotate(6 404 139)" />
            <rect x="385" y="148" width="22" height="3" rx="1.5" fill="#FFFFFF" opacity="0.85" transform="rotate(6 404 139)" />
          </g>

          {/* ────────── CHAIR BACK ────────── */}
          <rect
            x="202"
            y="170"
            width="96"
            height="145"
            rx="30"
            fill="#1E191A"
            stroke="#3D3536"
            strokeWidth="3.5"
            filter="url(#softShadow)"
          />

          {/* ────────── ROBOT BODY & HOODIE ────────── */}
          {/* Main Burgundy Hoodie Torso */}
          <path
            d="M190 280 C200 230, 300 230, 310 280 L335 375 C305 385, 195 385, 165 375 Z"
            fill="url(#burgundyGrad)"
            filter="url(#softShadow)"
          />

          {/* Hoodie kangaroo pocket / shadow crease */}
          <path
            d="M210 325 Q250 335 290 325 L285 365 Q250 373 215 365 Z"
            fill="#541526"
            opacity="0.45"
          />

          {/* White Hoodie Drawstrings */}
          <path d="M238 250 C236 270, 234 290, 235 300" stroke="#F8F5EF" strokeWidth="3" strokeLinecap="round" />
          <path d="M262 250 C264 270, 266 290, 265 300" stroke="#F8F5EF" strokeWidth="3" strokeLinecap="round" />

          {/* Arms reaching towards laptop keyboard */}
          {/* Left Arm */}
          <path
            d="M190 280 C175 308, 180 335, 218 348 L228 342 C202 328, 202 308, 206 285 Z"
            fill="#7A1F35"
          />
          {/* Right Arm */}
          <path
            d="M310 280 C325 308, 320 335, 282 348 L272 342 C298 328, 298 308, 294 285 Z"
            fill="#7A1F35"
          />

          {/* ────────── ROBOT HEAD & HEADPHONES (CURSOR TRACKING) ────────── */}
          <g
            transform={
              reducedMotion
                ? undefined
                : `translate(${normalized.dx * 6}, ${normalized.dy * 4}) rotate(${normalized.dx * 3.5} 250 160)`
            }
            className="transition-transform duration-100 ease-out"
          >
            {/* White Neck Segment */}
            <rect
              x="240"
              y="218"
              width="20"
              height="18"
              rx="6"
              fill="#F8F5EF"
              stroke="#211C1D"
              strokeWidth="2.5"
            />

            {/* Central Antenna with Burgundy Sphere (matching reference) */}
            <path d="M250 115 V84" stroke="#211C1D" strokeWidth="4" strokeLinecap="round" />
            <circle
              cx="250"
              cy="76"
              r="12"
              fill="url(#burgundyGrad)"
              stroke="#211C1D"
              strokeWidth="2.5"
              style={{
                filter: isHovered ? "drop-shadow(0 0 8px rgba(150, 45, 70, 0.6))" : undefined,
              }}
            />
            {/* Antenna reflection shine */}
            <circle cx="246" cy="72" r="3.5" fill="#FFFFFF" opacity="0.85" />

            {/* Headphone Arching Headband over helmet */}
            <path
              d="M196 160 C196 95, 304 95, 304 160"
              fill="none"
              stroke="#211C1D"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M196 160 C196 95, 304 95, 304 160"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Left Headphone Earcup (white outer with burgundy inner cushion) */}
            <rect x="184" y="140" width="18" height="46" rx="9" fill="#FFFFFF" stroke="#211C1D" strokeWidth="2.5" />
            <rect x="192" y="147" width="7" height="32" rx="3.5" fill="url(#burgundyGrad)" />

            {/* Right Headphone Earcup (white outer with burgundy inner cushion) */}
            <rect x="298" y="140" width="18" height="46" rx="9" fill="#FFFFFF" stroke="#211C1D" strokeWidth="2.5" />
            <rect x="301" y="147" width="7" height="32" rx="3.5" fill="url(#burgundyGrad)" />

            {/* Outer Helmet Shell (Off-White Casing with Dark Bezel - matching reference) */}
            <rect
              x="195"
              y="114"
              width="110"
              height="96"
              rx="28"
              fill="#FFFFFF"
              stroke="#211C1D"
              strokeWidth="3.5"
              filter="url(#softShadow)"
            />

            {/* Glossy Head Top Highlight */}
            <path
              d="M216 123 C230 119, 270 119, 284 123"
              stroke="#F1ECE3"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Visor Screen (Deep Obsidian Monitor Display) */}
            <rect
              x="206"
              y="126"
              width="88"
              height="72"
              rx="20"
              fill="#141112"
              stroke="#282224"
              strokeWidth="2"
            />

            {/* ────────── Visor Eyes & Mouth (Cursor Gaze Following) ────────── */}
            <g
              transform={reducedMotion ? undefined : `translate(${mousePos.x}, ${mousePos.y})`}
              className="transition-transform duration-75 ease-out"
            >
              {currentFace === "blink" ? (
                // BLINKING STATE — Natural closed eyelid line eyes (preserves original blinking behavior)
                <>
                  <line x1="221" y1="162" x2="243" y2="162" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="257" y1="162" x2="279" y2="162" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Subtle cute smile during blink */}
                  <path d="M244 175 Q250 180 256 175" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
                </>
              ) : currentFace === "happy" ? (
                // HOVER / HAPPY STATE — Upward curved smiling eyes with blush
                <>
                  <path
                    d="M221 165 Q232 148 243 165"
                    stroke="#FFFFFF"
                    strokeWidth="4.8"
                    strokeLinecap="round"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.85))" }}
                  />
                  <path
                    d="M257 165 Q268 148 279 165"
                    stroke="#FFFFFF"
                    strokeWidth="4.8"
                    strokeLinecap="round"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.85))" }}
                  />
                  {/* Cheerful open smile */}
                  <path d="M243 175 Q250 183 257 175" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Soft Rosy Blush Dots */}
                  <circle cx="218" cy="173" r="4" fill="#962D46" opacity="0.75" />
                  <circle cx="282" cy="173" r="4" fill="#962D46" opacity="0.75" />
                </>
              ) : (
                // NORMAL IDLE STATE — Curved crescent smiling eyes (matching reference image)
                <>
                  <path
                    d="M221 164 Q232 150 243 164"
                    stroke="#FFFFFF"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))" }}
                  />
                  <path
                    d="M257 164 Q268 150 279 164"
                    stroke="#FFFFFF"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))" }}
                  />
                  {/* Gentle mouth smile */}
                  <path d="M244 175 Q250 181 256 175" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
                  {/* Subtle blush */}
                  <circle cx="218" cy="173" r="3.5" fill="#962D46" opacity="0.45" />
                  <circle cx="282" cy="173" r="3.5" fill="#962D46" opacity="0.45" />
                </>
              )}
            </g>
          </g>

          {/* ────────── DESK SURFACE ────────── */}
          <ellipse cx="250" cy="385" rx="205" ry="24" fill="#E6DED3" opacity="0.6" />

          {/* ────────── LEFT: STACK OF 3 BOOKS (matching reference) ────────── */}
          {/* Bottom Book: MongoDB */}
          <g filter="url(#softShadow)">
            <rect x="85" y="340" width="76" height="18" rx="4" fill="url(#burgundyGrad)" stroke="#541526" strokeWidth="1.2" />
            <text x="123" y="353" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fontWeight="600" textAnchor="middle">
              MongoDB
            </text>
          </g>

          {/* Middle Book: Node.js */}
          <g filter="url(#softShadow)">
            <rect x="88" y="322" width="70" height="18" rx="4" fill="#211C1D" stroke="#3D3536" strokeWidth="1.2" />
            <text x="123" y="335" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fontWeight="600" textAnchor="middle">
              Node.js
            </text>
          </g>

          {/* Top Book: React */}
          <g filter="url(#softShadow)">
            <rect x="91" y="304" width="64" height="18" rx="4" fill="url(#burgundyGrad)" stroke="#541526" strokeWidth="1.2" />
            <text x="123" y="317" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fontWeight="600" textAnchor="middle">
              React
            </text>
          </g>

          {/* ────────── RIGHT: COFFEE MUG WITH "</>" (matching reference) ────────── */}
          <g filter="url(#softShadow)">
            {/* Mug Handle */}
            <path
              d="M378 330 C396 330, 396 358, 378 358"
              fill="none"
              stroke="#7A1F35"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Mug Body */}
            <rect x="342" y="318" width="40" height="48" rx="7" fill="url(#burgundyGrad)" stroke="#541526" strokeWidth="1.8" />
            {/* Code symbol on mug */}
            <text x="362" y="348" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace" fontSize="14" fontWeight="bold" textAnchor="middle">
              &lt;/&gt;
            </text>
          </g>

          {/* ────────── FOREGROUND: LAPTOP WITH "NK" MONOGRAM ────────── */}
          <g filter="url(#softShadow)">
            {/* Laptop Base / Keyboard Deck */}
            <path
              d="M165 362 L335 362 L347 375 L153 375 Z"
              fill="#262022"
              stroke="#3D3536"
              strokeWidth="1.8"
            />
            {/* Trackpad */}
            <rect x="233" y="365" width="34" height="6" rx="1.5" fill="#181415" stroke="#443A3C" strokeWidth="0.8" />

            {/* Laptop Screen Lid (Open towards robot, facing viewer) */}
            <path
              d="M168 362 L180 256 L320 256 L332 362 Z"
              fill="url(#laptopGrad)"
              stroke="#443B3D"
              strokeWidth="2.2"
            />

            {/* Monogram "NK" on the back lid (matching reference image) */}
            <text
              x="250"
              y="318"
              fill="#FFFFFF"
              fontFamily="'Playfair Display', Georgia, serif"
              fontSize="26"
              fontWeight="bold"
              textAnchor="middle"
              letterSpacing="2"
              style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.6))" }}
            >
              NK
            </text>

            {/* Cute White Robot Mittens / Hands Typing on Keyboard Deck */}
            <ellipse cx="218" cy="360" rx="9" ry="6" fill="#FFFFFF" stroke="#211C1D" strokeWidth="1.6" />
            <ellipse cx="282" cy="360" rx="9" ry="6" fill="#FFFFFF" stroke="#211C1D" strokeWidth="1.6" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
