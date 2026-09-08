import { Suspense, lazy } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { useCanRender3D } from "../hooks/useCapabilities";

const SignalCore = lazy(() => import("./SignalCore"));

function RoleCycle() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      {profile.roles.map((role, i) => (
        <motion.span
          key={role}
          className="absolute inset-0 font-display text-[var(--teal)]"
          initial={false}
          animate={{ y: i === index ? 0 : i < index ? "-100%" : "100%", opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {role}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const canRender3D = useCanRender3D();

  return (
    <section id="top" className="relative flex min-h-screen items-center bg-grid pt-24">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 sm:grid-cols-[1fr_280px]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            {profile.location}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 font-display text-xl text-[var(--muted)] sm:text-2xl">
            <RoleCycle />
          </p>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-7 text-[var(--muted)]">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-md bg-[var(--teal)] px-5 py-2.5 text-sm font-medium text-[#0d1117] transition hover:brightness-110"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="rounded-md border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition hover:border-[var(--teal)]"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="hidden h-[280px] w-[280px] sm:block">
          {canRender3D ? (
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)]">
                  <span className="font-mono text-xs text-[var(--muted)]">loading…</span>
                </div>
              }
            >
              <SignalCore />
            </Suspense>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)]">
              <span className="font-mono text-3xl text-[var(--teal)]">{profile.name.charAt(0)}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
