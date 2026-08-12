"use client";

import { useEffect, useRef } from "react";
import { useFinePointerMotion, useRafScheduler } from "./use-motion";

/**
 * A soft accent light that follows the pointer across the page.
 *
 * Deliberately faint — it should register as the page being lit rather than
 * as a cursor effect. Renders nothing at all on touch devices or under
 * `prefers-reduced-motion`.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useFinePointerMotion();
  const schedule = useRafScheduler();

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    const onMove = (event: PointerEvent) => {
      schedule(() => {
        node.style.setProperty("--x", `${event.clientX}px`);
        node.style.setProperty("--y", `${event.clientY}px`);
        // Held back until the first move so the light doesn't sit in the
        // top-left corner on load.
        node.style.opacity = "1";
      });
    };

    const onLeave = () => schedule(() => (node.style.opacity = "0"));

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, schedule]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-500 ease-[var(--ease-out-expo)]"
      style={{
        background:
          "radial-gradient(520px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--accent) 7%, transparent), transparent 70%)",
      }}
    />
  );
}
