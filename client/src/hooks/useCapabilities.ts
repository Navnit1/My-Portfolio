import { useEffect, useState } from "react";

/** True if the user has requested reduced motion at the OS level. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

/**
 * Heuristic for "should we render the heavy 3D canvas". Falls back to a
 * static gradient/SVG treatment on narrow viewports or devices that report
 * few logical cores, and always respects reduced-motion.
 */
export function useCanRender3D() {
  const reducedMotion = usePrefersReducedMotion();
  const [narrow, setNarrow] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency;
    if (typeof cores === "number" && cores > 0 && cores <= 2) setLowPower(true);
    return () => window.removeEventListener("resize", check);
  }, []);

  return !reducedMotion && !narrow && !lowPower;
}
