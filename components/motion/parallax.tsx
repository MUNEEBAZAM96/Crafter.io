"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { PARALLAX_RANGE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "./use-motion";

/* ------------------------------------------------------------------
   Shared scroll controller — one listener and one frame for every parallax
   element on the page, same pattern as the magnetic registry.
------------------------------------------------------------------- */

type Entry = { el: HTMLElement; speed: number };

const entries = new Set<Entry>();
let frame: number | null = null;
let listening = false;

function apply() {
  frame = null;
  const viewport = window.innerHeight;

  for (const { el, speed } of entries) {
    const rect = el.getBoundingClientRect();

    // Skip anything off-screen: no work for the 90% of the page you can't see.
    if (rect.bottom < -viewport || rect.top > viewport * 2) continue;

    // -1 → 1 as the element travels from below the fold to above it.
    const progress =
      (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);
    const offset = Math.max(-1, Math.min(1, progress)) * PARALLAX_RANGE * speed;

    el.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
  }
}

function schedule() {
  if (frame === null) frame = requestAnimationFrame(apply);
}

function start() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  schedule();
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
}

/* ------------------------------------------------------------------ */

type ParallaxProps = {
  children: ReactNode;
  /**
   * Multiplier on the 20px base range. Negative moves against the scroll.
   * Anything past ±1 stops reading as depth and starts reading as a bug.
   */
  speed?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Translates its child by up to ±20px as it crosses the viewport.
 *
 * Transform only, so it composites on the GPU and never triggers layout.
 * Inert under `prefers-reduced-motion`.
 */
export function Parallax({
  children,
  speed = 0.5,
  className,
  as: Tag = "div",
}: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (reduced || !node) return;

    const entry: Entry = { el: node, speed };
    entries.add(entry);
    start();

    return () => {
      entries.delete(entry);
      node.style.removeProperty("--parallax-y");
      if (entries.size === 0) stop();
    };
  }, [reduced, speed]);

  return (
    <Tag
      ref={ref}
      className={cn(
        !reduced && "translate-y-[var(--parallax-y,0px)] will-change-transform",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
