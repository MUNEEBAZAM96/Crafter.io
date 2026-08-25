

import { useEffect, useRef } from "react";
import { useRafScheduler } from "./use-motion";

/**
 * Hairline reading-progress bar pinned to the top of the viewport.
 *
 * Driven by `transform: scaleX` on a pre-rendered element, so it never
 * triggers layout and can't shift the page. Kept for reduced-motion visitors
 * — it reports position rather than decorating, and it doesn't move on its
 * own.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const schedule = useRafScheduler();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () =>
      schedule(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
        node.style.transform = `scaleX(${progress.toFixed(4)})`;
      });

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [schedule]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-0.5"
    >
      <div
        ref={ref}
        className="h-full origin-left scale-x-0 bg-accent will-change-transform"
      />
    </div>
  );
}
