"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { POINTER } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useFinePointerMotion } from "./use-motion";

/* ------------------------------------------------------------------
   Shared pointer controller

   Magnetism has to respond before the cursor arrives, so it can't be driven
   by the element's own pointer events. One window listener serves every
   magnetic button on the page; rects are cached and refreshed on scroll and
   resize so the per-frame work is arithmetic only, never layout.
------------------------------------------------------------------- */

type Entry = { el: HTMLElement; strength: number; radius: number; rect: DOMRect };

const entries = new Map<HTMLElement, Entry>();
let frame: number | null = null;
let listening = false;
let pointer = { x: 0, y: 0 };

function measure() {
  for (const entry of entries.values()) {
    entry.rect = entry.el.getBoundingClientRect();
  }
}

function apply() {
  frame = null;

  for (const { el, rect, strength, radius } of entries.values()) {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = pointer.x - cx;
    const dy = pointer.y - cy;

    // Fall-off measured from the element's edge, so wide buttons don't need a
    // bigger radius than tall ones to feel the same.
    const reach = Math.hypot(
      Math.max(Math.abs(dx) - rect.width / 2, 0),
      Math.max(Math.abs(dy) - rect.height / 2, 0),
    );

    if (reach > radius) {
      el.style.setProperty("--magnet-x", "0px");
      el.style.setProperty("--magnet-y", "0px");
      continue;
    }

    const pull = 1 - reach / radius;
    const distance = Math.hypot(dx, dy) || 1;
    const travel = strength * pull;

    el.style.setProperty("--magnet-x", `${((dx / distance) * travel).toFixed(2)}px`);
    el.style.setProperty("--magnet-y", `${((dy / distance) * travel).toFixed(2)}px`);
  }
}

function onPointerMove(event: PointerEvent) {
  pointer = { x: event.clientX, y: event.clientY };
  if (frame === null) frame = requestAnimationFrame(apply);
}

function onViewportChange() {
  measure();
  if (frame === null) frame = requestAnimationFrame(apply);
}

function start() {
  if (listening) return;
  listening = true;
  measure();
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onViewportChange, { passive: true });
  window.addEventListener("resize", onViewportChange, { passive: true });
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("scroll", onViewportChange);
  window.removeEventListener("resize", onViewportChange);
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
}

function register(el: HTMLElement, strength: number, radius: number) {
  entries.set(el, { el, strength, radius, rect: el.getBoundingClientRect() });
  start();

  return () => {
    entries.delete(el);
    el.style.removeProperty("--magnet-x");
    el.style.removeProperty("--magnet-y");
    if (entries.size === 0) stop();
  };
}

/* ------------------------------------------------------------------ */

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
};

/**
 * Draws its child a few pixels toward an approaching cursor.
 *
 * Wraps rather than replaces the button, so `ButtonLink` keeps its own
 * semantics, focus ring and hover styles — and keyboard focus is untouched,
 * since nothing here responds to anything but a pointer.
 *
 * Pointer-only — on touch and under `prefers-reduced-motion` this renders a
 * plain wrapper with no listeners.
 */
export function Magnetic({
  children,
  className,
  strength = POINTER.magnetStrength,
  radius = POINTER.magnetRadius,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabled = useFinePointerMotion();

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node) return;
    return register(node, strength, radius);
  }, [enabled, strength, radius]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex",
        enabled && [
          "translate-x-[var(--magnet-x,0px)] translate-y-[var(--magnet-y,0px)]",
          "transition-transform duration-[var(--duration-ui)] ease-[var(--ease-spring)]",
        ],
        className,
      )}
    >
      {children}
    </span>
  );
}
