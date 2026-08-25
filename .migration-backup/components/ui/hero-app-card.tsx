import { ArrowUpRight } from "lucide-react";
import type { App } from "@/lib/data";
import { cn } from "@/lib/cn";
import { AppIcon } from "./app-icon";

/**
 * Miniature product card for the hero stack. Each one is a compact preview of
 * a real app — icon, positioning and the two features that define it — rather
 * than a decorative shape.
 */
export function HeroAppCard({ app, className }: { app: App; className?: string }) {
  return (
    <a
      href={app.projectUrl}
      className={cn(
        "group relative flex items-center gap-4 overflow-hidden rounded-2xl",
        "border border-line bg-surface/90 p-4 backdrop-blur",
        "shadow-[0_12px_32px_-20px_rgb(0_0_0/0.35)]",
        // Idle drift was removed when the stack gained pointer parallax —
        // two simultaneous motions on one card read as jitter, not depth.
        "transition-[transform,border-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-expo)]",
        "hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_20px_44px_-24px_rgb(0_0_0/0.4)]",
        className,
      )}
    >
      {/* Accent wash keyed to the app's own hue. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full opacity-[0.14] blur-2xl transition-opacity duration-[var(--duration-ui)] group-hover:opacity-25"
        style={{ backgroundColor: app.hue.from }}
      />

      <AppIcon app={app} size="md" />

      <span className="relative min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span className="truncate text-[0.9375rem] font-semibold tracking-tight">
            {app.name}
          </span>
          <span className="shrink-0 text-[0.6875rem] text-ink-muted">
            {app.subtitle}
          </span>
        </span>

        <span className="mt-0.5 block truncate text-sm text-ink-soft">
          {app.tagline}
        </span>

        <span className="mt-2 flex flex-wrap gap-1.5">
          {app.features.slice(0, 2).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-elevated px-2 py-0.5 text-[0.6875rem] font-medium text-ink-muted"
            >
              {feature}
            </span>
          ))}
        </span>
      </span>

      <ArrowUpRight
        aria-hidden
        className="relative size-4 shrink-0 text-ink-muted transition-[transform,color] duration-[var(--duration-micro)] ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
      />
    </a>
  );
}
