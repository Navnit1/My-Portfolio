import { useEffect, useMemo, useState, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/profile";
import { usePrefersReducedMotion, useCanRender3D } from "../hooks/useCapabilities";

const SignalCore = lazy(() => import("./SignalCore"));

const GREETINGS = ["HELLO", "नमस्ते", "BONJOUR", "HOLA", "こんにちは"];

const TYPED_LINES = [
  `NAME: ${profile.name}`,
  `ROLE: ${profile.title}`,
  `EDUCATION: ${profile.education[0]?.institution ?? "—"}`,
  `FOCUS: MERN Stack · REST APIs · DSA`,
  `STATUS: Open to SDE / Full Stack roles`,
];

/** Types one line of text out, character by character, then calls onDone. */
function useTypewriter(lines: string[], active: boolean, speed = 18) {
  const [display, setDisplay] = useState<string[]>([]);
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    const shown: string[] = [];

    function tick() {
      if (cancelled) return;
      if (lineIndex >= lines.length) return;
      const line = lines[lineIndex];
      charIndex++;
      shown[lineIndex] = line.slice(0, charIndex);
      setDisplay([...shown]);
      if (charIndex >= line.length) {
        lineIndex++;
        charIndex = 0;
        setTimeout(tick, 220);
      } else {
        setTimeout(tick, speed);
      }
    }
    tick();
    return () => {
      cancelled = true;
    };
  }, [active, lines, speed]);
  return display;
}

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const canRender3D = useCanRender3D();
  const [phase, setPhase] = useState<"greetings" | "name" | "panel" | "done">("greetings");
  const [greetingIndex, setGreetingIndex] = useState(0);

  // Skip entirely for reduced-motion users, and let anyone skip manually.
  useEffect(() => {
    if (reducedMotion) {
      setPhase("done");
      onDone();
    }
  }, [reducedMotion, onDone]);

  useEffect(() => {
    if (phase !== "greetings") return;
    if (greetingIndex >= GREETINGS.length - 1) {
      const t = setTimeout(() => setPhase("name"), 550);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setGreetingIndex((i) => i + 1), 420);
    return () => clearTimeout(t);
  }, [phase, greetingIndex]);

  useEffect(() => {
    if (phase !== "name") return;
    const t = setTimeout(() => setPhase("panel"), 1400);
    return () => clearTimeout(t);
  }, [phase]);

  const typed = useTypewriter(TYPED_LINES, phase === "panel");

  useEffect(() => {
    if (phase !== "panel") return;
    if (typed.length === TYPED_LINES.length && typed[TYPED_LINES.length - 1] === TYPED_LINES[TYPED_LINES.length - 1]) {
      const t = setTimeout(() => {
        setPhase("done");
        onDone();
      }, 1100);
      return () => clearTimeout(t);
    }
  }, [phase, typed, onDone]);

  const skip = useMemo(
    () => () => {
      setPhase("done");
      onDone();
    },
    [onDone],
  );

  if (phase === "done" || reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)] bg-grid">
      <button
        onClick={skip}
        className="absolute right-6 top-6 font-mono text-xs text-[var(--muted)] transition hover:text-[var(--teal)]"
      >
        skip intro →
      </button>

      <AnimatePresence mode="wait">
        {phase === "greetings" && (
          <motion.h1
            key={GREETINGS[greetingIndex]}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="font-display text-5xl font-medium tracking-tight text-[var(--text)] sm:text-7xl"
          >
            {GREETINGS[greetingIndex]}
          </motion.h1>
        )}

        {phase === "name" && (
          <motion.div
            key="name"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="px-6 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--teal)]">
              initializing portfolio
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              Hi, I&rsquo;m {profile.name}
            </h1>
          </motion.div>
        )}

        {phase === "panel" && (
          <motion.div
            key="panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid w-full max-w-4xl grid-cols-1 items-center gap-10 px-6 sm:grid-cols-[minmax(0,220px)_1fr]"
          >
            <div className="mx-auto h-[220px] w-[220px]">
              {canRender3D ? (
                <Suspense fallback={<div className="h-full w-full rounded-full border border-[var(--line)] bg-[var(--surface)]" />}>
                  <SignalCore speaking />
                </Suspense>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)]">
                  <span className="font-mono text-2xl text-[var(--teal)]">{profile.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)]/80 p-6 font-mono text-sm leading-7 text-[var(--text)] backdrop-blur">
              {TYPED_LINES.map((line, i) => (
                <div key={line} className="min-h-[1.75rem]">
                  {typed[i] !== undefined ? typed[i] : ""}
                  {typed[i] !== undefined && typed[i].length < line.length && (
                    <span className="blink text-[var(--teal)]">_</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
