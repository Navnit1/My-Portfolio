import { useEffect, useState } from "react";

/** True if the user has requested reduced motion at the OS level. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return reduced;
}

/**
 * Heuristic for "should we render the heavy 3D canvas". Falls back to a
 * static treatment on narrow viewports or devices that report low cores,
 * and always respects reduced-motion.
 */
export function useCanRender3D() {
  const reducedMotion = usePrefersReducedMotion();
  const [narrow, setNarrow] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 640;
  });
  const [lowPower] = useState(() => {
    if (typeof navigator === "undefined") return false;
    const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency;
    return typeof cores === "number" && cores > 0 && cores <= 2;
  });

  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return !reducedMotion && !narrow && !lowPower;
}
