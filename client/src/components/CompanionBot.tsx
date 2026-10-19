// ─────────────────────────────────────────────────────────────
// DEVELOPER MASCOT FOR NAVNIT KUMAR
// Personalized animated companion inspired by the homepage design.
// Features:
// - Robot in burgundy hoodie with headphones & antenna
// - Working on dark laptop with "NK" monogram
// - Stack of books (React, Node.js, MongoDB) and coffee mug (</>)
// - Floating code badges and star sparkles
// - CRITICAL: Preserves eye blinking, natural closing & opening,
//   mouse tracking, and hover interactions. Zero BitBot product UI.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

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
  const [isHovered, setIsHovered] = useState(false);
  const [currentFace, setCurrentFace] = useState<"normal" | "happy" | "blink">("normal");
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for subtle eye & head rotation
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates (-1 to 1) with dampening
      const dx = Math.max(-1, Math.min(1, (e.clientX - centerX) / 350));
      const dy = Math.max(-1, Math.min(1, (e.clientY - centerY) / 350));
      setMousePos({ x: dx * 5, y: dy * 4 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  // Periodic natural eye blinking (closes eyes and reopens)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isHovered) {
        setCurrentFace("blink");
        setTimeout(() => {
          setCurrentFace("normal");
        }, 220);
      }
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, [isHovered]);

  const sizeClasses = {
    sm: "w-44 h-44 sm:w-52 sm:h-52",
    md: "w-64 h-64 sm:w-80 sm:h-80",
    lg: "w-full max-w-[480px] sm:max-w-[540px] aspect-[1.15/1]",
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
      {/* Floating Animated Mascot Scene Container */}
      <motion.div
        animate={{
          y: isHovered ? -4 : [0, -6, 0],
        }}
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

        {/* Master Mascot SVG Illustration */}
        <svg
          viewBox="0 0 540 460"
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
              <stop offset="0%" stopColor="#322B2D" />
              <stop offset="50%" stopColor="#211C1D" />
              <stop offset="100%" stopColor="#151213" />
            </linearGradient>

            {/* Laptop Surface Gradient */}
            <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#352E30" />
              <stop offset="100%" stopColor="#1C1819" />
            </linearGradient>

            {/* Headphone Cushion Gradient */}
            <linearGradient id="cushionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EAE3D7" />
              <stop offset="100%" stopColor="#D5CBBF" />
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
          {/* Subtle warm halo backdrop circle */}
          <circle cx="370" cy="230" r="150" fill="#F1ECE3" opacity="0.6" />

          {/* Decorative Branch / Plant Leaves on Right */}
          <g opacity="0.45" stroke="#C8BEB0" strokeWidth="2" strokeLinecap="round">
            <path d="M480 340 C490 280, 485 220, 500 180" fill="none" />
            <path d="M488 285 C510 270, 520 280, 510 295 C500 300, 492 290, 488 285 Z" fill="#DCD3C6" />
            <path d="M487 250 C505 235, 515 242, 506 256 C498 260, 491 254, 487 250 Z" fill="#DCD3C6" />
            <path d="M492 215 C512 200, 518 206, 512 218 C505 224, 496 218, 492 215 Z" fill="#DCD3C6" />
            <path d="M500 180 C514 165, 522 170, 515 182 C509 187, 503 182, 500 180 Z" fill="#DCD3C6" />
          </g>

          {/* Sparkle 4-point stars */}
          <g fill="#962D46" opacity="0.75">
            {/* Top Left Sparkle */}
            <path d="M330 115 Q330 125 320 125 Q330 125 330 135 Q330 125 340 125 Q330 125 330 115 Z" />
            {/* Top Right Sparkle */}
            <path d="M425 100 Q425 108 417 108 Q425 108 425 116 Q425 108 433 108 Q425 108 425 100 Z" />
            {/* Mid Left Sparkle */}
            <path d="M305 205 Q305 211 299 211 Q305 211 305 217 Q305 211 311 211 Q305 211 305 205 Z" />
          </g>

          {/* Floating Code Badge Left: "</>" */}
          <g filter="url(#badgeShadow)">
            <rect
              x="290"
              y="145"
              width="44"
              height="44"
              rx="12"
              fill="url(#burgundyGrad)"
              transform="rotate(-8 312 167)"
            />
            <text
              x="312"
              y="173"
              fill="#FFFFFF"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              transform="rotate(-8 312 167)"
            >
              &lt;/&gt;
            </text>
          </g>

          {/* Floating Code Card Right */}
          <g filter="url(#badgeShadow)">
            <rect
              x="435"
              y="140"
              width="54"
              height="46"
              rx="10"
              fill="url(#burgundyGrad)"
              transform="rotate(6 462 163)"
            />
            {/* Mock code lines */}
            <rect x="444" y="152" width="16" height="3" rx="1.5" fill="#FFFFFF" opacity="0.9" transform="rotate(6 462 163)" />
            <rect x="444" y="159" width="36" height="3" rx="1.5" fill="#E6DED3" opacity="0.8" transform="rotate(6 462 163)" />
            <rect x="444" y="166" width="28" height="3" rx="1.5" fill="#E6DED3" opacity="0.8" transform="rotate(6 462 163)" />
            <rect x="444" y="173" width="22" height="3" rx="1.5" fill="#FFFFFF" opacity="0.8" transform="rotate(6 462 163)" />
          </g>

          {/* ────────── CHAIR BACK ────────── */}
          <rect
            x="368"
            y="190"
            width="90"
            height="140"
            rx="28"
            fill="#1E191A"
            stroke="#3D3536"
            strokeWidth="3"
            filter="url(#softShadow)"
          />

          {/* ────────── ROBOT BODY & HOODIE ────────── */}
          {/* Main Hoodie Torso */}
          <path
            d="M320 295 C330 250, 415 250, 425 295 L445 385 C420 395, 330 395, 305 385 Z"
            fill="url(#burgundyGrad)"
            filter="url(#softShadow)"
          />
          {/* Hoodie pocket / seam */}
          <path
            d="M340 330 Q373 340 405 330 L400 370 Q373 378 345 370 Z"
            fill="#541526"
            opacity="0.4"
          />
          {/* White Hoodie Drawstrings */}
          <path d="M362 265 C360 285, 358 305, 359 315" stroke="#F8F5EF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M382 265 C384 285, 386 305, 385 315" stroke="#F8F5EF" strokeWidth="2.5" strokeLinecap="round" />

          {/* Arms reaching towards laptop keyboard */}
          {/* Left Arm */}
          <path
            d="M320 295 C305 320, 310 345, 345 355 L355 350 C330 335, 330 315, 335 298 Z"
            fill="#7A1F35"
          />
          {/* Right Arm */}
          <path
            d="M425 295 C440 320, 435 345, 400 355 L390 350 C415 335, 415 315, 410 298 Z"
            fill="#7A1F35"
          />

          {/* ────────── ROBOT HEAD & HEADPHONES (INTERACTIVE ROTATION) ────────── */}
          <g transform={`translate(${mousePos.x * 0.5}, ${mousePos.y * 0.4})`}>
            {/* Antenna with Burgundy Sphere */}
            <path d="M372 135 V105" stroke="#4A3F41" strokeWidth="4" strokeLinecap="round" />
            <circle cx="372" cy="100" r="11" fill="url(#burgundyGrad)" stroke="#3A2D30" strokeWidth="2" />
            {/* Antenna reflection shine */}
            <circle cx="369" cy="97" r="3.5" fill="#FFFFFF" opacity="0.8" />

            {/* Headphone Metallic Headband */}
            <path
              d="M320 185 C320 115, 425 115, 425 185"
              fill="none"
              stroke="#D8CFC3"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M320 185 C320 115, 425 115, 425 185"
              fill="none"
              stroke="#8B8178"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Left Headphone Earcup */}
            <rect x="310" y="165" width="14" height="42" rx="7" fill="url(#burgundyGrad)" stroke="#541526" strokeWidth="2" />
            <rect x="318" y="169" width="6" height="34" rx="3" fill="url(#cushionGrad)" />

            {/* Right Headphone Earcup */}
            <rect x="420" y="165" width="14" height="42" rx="7" fill="url(#burgundyGrad)" stroke="#541526" strokeWidth="2" />
            <rect x="418" y="169" width="6" height="34" rx="3" fill="url(#cushionGrad)" />

            {/* Main Robot Head Chassis */}
            <rect
              x="324"
              y="135"
              width="96"
              height="84"
              rx="26"
              fill="url(#chassisGrad)"
              stroke="#4D4244"
              strokeWidth="3"
              filter="url(#softShadow)"
            />

            {/* Glossy Head Highlight */}
            <path
              d="M342 143 C355 139, 390 139, 402 143"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.25"
            />

            {/* Visor Screen (Deep Obsidian Glass) */}
            <rect
              x="332"
              y="147"
              width="80"
              height="60"
              rx="18"
              fill="#0D0A0B"
              stroke="#2A2224"
              strokeWidth="2"
            />

            {/* Interactive Visor Eyes & Mouth (with mouse tracking offset) */}
            <g transform={`translate(${mousePos.x * 0.8}, ${mousePos.y * 0.6})`}>
              {currentFace === "blink" ? (
                // BLINKING EYES — Natural closed line eyes
                <>
                  <line x1="347" y1="175" x2="363" y2="175" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="381" y1="175" x2="397" y2="175" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Subtle cute smile during blink */}
                  <path d="M367 187 Q372 191 377 187" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
                </>
              ) : currentFace === "happy" ? (
                // HAPPY / HOVER EYES — Upward curved smiling eyes
                <>
                  <path
                    d="M346 177 Q355 165 364 177"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.8))" }}
                  />
                  <path
                    d="M380 177 Q389 165 398 177"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.8))" }}
                  />
                  {/* Happy Smile */}
                  <path d="M366 186 Q372 192 378 186" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Soft Rosy Blush Dots */}
                  <circle cx="343" cy="184" r="3.5" fill="#962D46" opacity="0.6" />
                  <circle cx="401" cy="184" r="3.5" fill="#962D46" opacity="0.6" />
                </>
              ) : (
                // NORMAL IDLE EYES — Gentle curved awake eyes with smile (matching reference)
                <>
                  <path
                    d="M346 177 Q355 166 364 177"
                    stroke="#FFFFFF"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.6))" }}
                  />
                  <path
                    d="M380 177 Q389 166 398 177"
                    stroke="#FFFFFF"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.6))" }}
                  />
                  {/* Gentle mouth smile */}
                  <path d="M367 186 Q372 190 377 186" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
                  {/* Subtle blush */}
                  <circle cx="344" cy="184" r="3" fill="#962D46" opacity="0.4" />
                  <circle cx="400" cy="184" r="3" fill="#962D46" opacity="0.4" />
                </>
              )}
            </g>
          </g>

          {/* ────────── DESK SURFACE ────────── */}
          <ellipse cx="370" cy="385" rx="160" ry="24" fill="#E6DED3" opacity="0.5" />

          {/* ────────── LEFT: STACK OF 3 BOOKS ────────── */}
          {/* Bottom Book: MongoDB */}
          <g filter="url(#softShadow)">
            <rect x="250" y="325" width="58" height="15" rx="3" fill="url(#burgundyGrad)" stroke="#541526" strokeWidth="1" />
            <text x="279" y="336" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fontWeight="600" textAnchor="middle">
              MongoDB
            </text>
          </g>

          {/* Middle Book: Node.js */}
          <g filter="url(#softShadow)">
            <rect x="252" y="310" width="54" height="15" rx="3" fill="#211C1D" stroke="#3D3536" strokeWidth="1" />
            <text x="279" y="321" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fontWeight="600" textAnchor="middle">
              Node.js
            </text>
          </g>

          {/* Top Book: React */}
          <g filter="url(#softShadow)">
            <rect x="254" y="295" width="50" height="15" rx="3" fill="url(#burgundyGrad)" stroke="#541526" strokeWidth="1" />
            <text x="279" y="306" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fontWeight="600" textAnchor="middle">
              React
            </text>
          </g>

          {/* ────────── RIGHT: COFFEE MUG WITH "</>" ────────── */}
          <g filter="url(#softShadow)">
            {/* Mug Handle */}
            <path
              d="M482 316 C498 316, 498 340, 482 340"
              fill="none"
              stroke="#7A1F35"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Mug Body */}
            <rect x="450" y="306" width="34" height="42" rx="6" fill="url(#burgundyGrad)" stroke="#541526" strokeWidth="1.5" />
            {/* Code symbol on mug */}
            <text x="467" y="333" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace" fontSize="13" fontWeight="bold" textAnchor="middle">
              &lt;/&gt;
            </text>
          </g>

          {/* ────────── FOREGROUND: LAPTOP WITH "NK" MONOGRAM ────────── */}
          <g filter="url(#softShadow)">
            {/* Laptop Base / Keyboard Deck */}
            <path
              d="M295 365 L435 365 L445 376 L285 376 Z"
              fill="#262022"
              stroke="#3D3536"
              strokeWidth="1.5"
            />
            {/* Trackpad */}
            <rect x="350" y="367" width="30" height="6" rx="1.5" fill="#1A1516" stroke="#443A3C" strokeWidth="0.8" />

            {/* Laptop Screen Lid (Open towards viewer) */}
            <path
              d="M298 365 L308 275 L422 275 L432 365 Z"
              fill="url(#laptopGrad)"
              stroke="#4D4244"
              strokeWidth="2"
            />

            {/* Laptop Edge Metallic Rim */}
            <path
              d="M308 275 L422 275"
              stroke="#D8CFC3"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* NK Monogram on Back of Laptop Lid */}
            <text
              x="365"
              y="328"
              fill="#FFFFFF"
              fontFamily="'Playfair Display', Georgia, serif"
              fontSize="20"
              fontWeight="900"
              letterSpacing="1"
              textAnchor="middle"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
            >
              NK
            </text>

            {/* Robot Hands Resting on Keyboard Base */}
            {/* Left Hand */}
            <ellipse cx="338" cy="363" rx="8" ry="5" fill="#E8E2D6" stroke="#3D3536" strokeWidth="1.2" />
            {/* Right Hand */}
            <ellipse cx="395" cy="363" rx="8" ry="5" fill="#E8E2D6" stroke="#3D3536" strokeWidth="1.2" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
