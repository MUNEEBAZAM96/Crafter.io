

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Capability gates for the motion system.
 *
 * Every pointer-driven effect asks `useFinePointerMotion()` first, so the
 * decision to animate lives in one place: no effect attaches listeners on a
 * touch device or for a visitor who asked for reduced motion.
 */

function useMediaQuery(query: string): boolean {
  // Start false so the server and the first client render agree; effects that
  // depend on this are enhancements, never the content itself.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);

    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True only for a real mouse/trackpad on a visitor who accepts motion. */
export function useFinePointerMotion(): boolean {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = usePrefersReducedMotion();
  return fine && !reduced;
}

/** Desktop breakpoint, matching Tailwind's `lg`. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/**
 * Coalesces high-frequency updates into one write per animation frame.
 *
 * Pointer and scroll handlers call `schedule(fn)` as often as they like; the
 * DOM is touched at most once per frame, and any pending frame is cancelled
 * on unmount.
 */
export function useRafScheduler() {
  const frame = useRef<number | null>(null);
  const pending = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return useCallback((fn: () => void) => {
    pending.current = fn;
    if (frame.current !== null) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      pending.current?.();
      pending.current = null;
    });
  }, []);
}
