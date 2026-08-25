

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useFinePointerMotion, useRafScheduler } from "./use-motion";

/**
 * Publishes the pointer's position over a region as `--px` / `--py`
 * (normalised -1 → 1) without transforming the region itself.
 *
 * Descendants opt in by taking the `depth-layer` utility and setting their own
 * `--depth`, which is what gives the hero's card stack three parallax planes
 * from a single listener.
 *
 * Tracking is relative to the region's own box, so the effect stays local — a
 * pointer on the far side of the page doesn't drag the cards with it.
 */
export function PointerScene({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useFinePointerMotion();
  const schedule = useRafScheduler();

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    schedule(() => {
      node.style.setProperty("--px", px.toFixed(3));
      node.style.setProperty("--py", py.toFixed(3));
    });
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    schedule(() => {
      node.style.setProperty("--px", "0");
      node.style.setProperty("--py", "0");
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={enabled ? handleMove : undefined}
      onPointerLeave={enabled ? handleLeave : undefined}
      className={cn("relative", className)}
    >
      {children}
    </div>
  );
}
