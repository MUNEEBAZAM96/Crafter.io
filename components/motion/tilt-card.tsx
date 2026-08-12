"use client";

import { useRef, type ReactNode } from "react";
import { POINTER } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useFinePointerMotion, useRafScheduler } from "./use-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Degrees of rotation at the card's corner. Keep it under ~6. */
  intensity?: number;
  /** Cursor-following highlight inside the card. */
  highlight?: boolean;
  /** Lift on hover, in px. */
  lift?: number;
};

/**
 * Subtle 3D tilt toward the cursor, plus a highlight that tracks it.
 *
 * The card also publishes `--px` / `--py` (normalised -1 → 1), so any
 * descendant can add its own parallax by setting `--depth` and taking the
 * `depth-layer` utility — that's what gives the phone mockups their internal
 * depth without a second listener.
 *
 * Pointer-only: on touch devices and under `prefers-reduced-motion` no
 * listeners are attached and the card renders as a plain container.
 */
export function TiltCard({
  children,
  className,
  intensity = POINTER.tiltDegrees,
  highlight = true,
  lift = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useFinePointerMotion();
  const schedule = useRafScheduler();

  const write = (vars: Record<string, string>) => {
    const node = ref.current;
    if (!node) return;
    for (const [key, value] of Object.entries(vars)) {
      node.style.setProperty(key, value);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    // Read geometry from the event's own target box, then defer every write
    // to the next frame so a fast pointer can't thrash layout.
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    schedule(() =>
      write({
        "--px": (px * 2 - 1).toFixed(3),
        "--py": (py * 2 - 1).toFixed(3),
        "--mx": `${(px * 100).toFixed(2)}%`,
        "--my": `${(py * 100).toFixed(2)}%`,
      }),
    );
  };

  const handlePointerLeave = () => {
    if (!enabled) return;
    schedule(() => write({ "--px": "0", "--py": "0" }));
  };

  return (
    <div
      ref={ref}
      onPointerMove={enabled ? handlePointerMove : undefined}
      onPointerLeave={enabled ? handlePointerLeave : undefined}
      data-tilt={enabled ? "on" : undefined}
      style={
        {
          "--tilt": `${intensity}deg`,
          "--lift": `${lift}px`,
        } as React.CSSProperties
      }
      className={cn(
        "group/tilt relative [transform-style:preserve-3d]",
        // Rest state and the return journey share this transition; during the
        // move the pointer supplies new values every frame, so it reads as
        // continuous rather than stepped.
        "transition-transform duration-[var(--duration-ui)] ease-[var(--ease-spring)]",
        enabled &&
          "[transform:perspective(900px)_rotateX(calc(var(--py,0)*var(--tilt)*-1))_rotateY(calc(var(--px,0)*var(--tilt)))_translateZ(0)]",
        enabled && "hover:[--lift-active:1]",
        className,
      )}
    >
      {children}

      {highlight && enabled ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0",
            "transition-opacity duration-[var(--duration-ui)] ease-[var(--ease-out-expo)]",
            "group-hover/tilt:opacity-100",
          )}
          style={{
            background:
              "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%)",
          }}
        />
      ) : null}
    </div>
  );
}
