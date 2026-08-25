import { apps, site } from "@/lib/data";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { AppIcon } from "./ui/app-icon";
import { Logo } from "./ui/logo";

/** Spread positions the icons start from, converging to near-overlap. */
const SPREAD = ["-translate-x-16", "translate-x-0", "translate-x-16"];
const SETTLED = [
  "group-[.is-visible]:-translate-x-7",
  "group-[.is-visible]:translate-x-0",
  "group-[.is-visible]:translate-x-7",
];

/**
 * Closes the showcase by resolving the three products into the studio behind
 * them: the icons converge, the connecting line draws, the wordmark arrives.
 *
 * Entirely CSS — the transitions key off the `.is-visible` class that the
 * parent `Reveal` already sets, so the whole moment costs no additional
 * JavaScript, observer or state.
 */
export function BrandMoment() {
  return (
    <div className="mt-20 border-t border-line pt-16 text-center sm:mt-28 sm:pt-20">
      {/* Icons converge toward the mark. */}
      <div className="relative mx-auto flex h-20 w-full max-w-xs items-center justify-center">
        {apps.map((app, i) => (
          <div
            key={app.slug}
            className={cn(
              "absolute transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out-expo)]",
              SPREAD[i],
              SETTLED[i],
              // Outer two settle behind the centre one as they arrive.
              i !== 1 && "opacity-70 group-[.is-visible]:opacity-100",
            )}
            style={{ transitionDelay: `${i * STAGGER}ms`, zIndex: i === 1 ? 2 : 1 }}
          >
            <AppIcon app={app} size="md" className="ring-4 ring-elevated" />
          </div>
        ))}
      </div>

      {/* Connecting stem, drawn downward once the icons have settled. */}
      <div
        aria-hidden
        className="mx-auto mt-2 h-10 w-px origin-top scale-y-0 bg-gradient-to-b from-line-strong to-transparent transition-transform duration-500 ease-[var(--ease-out-expo)] delay-[400ms] group-[.is-visible]:scale-y-100"
      />

      <div className="mt-4 flex justify-center opacity-0 blur-[4px] transition-[opacity,filter] duration-700 ease-[var(--ease-out-expo)] delay-[600ms] group-[.is-visible]:opacity-100 group-[.is-visible]:blur-0">
        <Logo />
      </div>

      <p className="mx-auto mt-6 max-w-md text-balance text-xl font-medium tracking-[-0.01em] opacity-0 transition-opacity duration-700 ease-[var(--ease-out-expo)] delay-[700ms] group-[.is-visible]:opacity-100 sm:text-2xl">
        Three products. One studio.
      </p>
      <p className="mx-auto mt-3 max-w-sm text-pretty leading-relaxed text-ink-muted opacity-0 transition-opacity duration-700 ease-[var(--ease-out-expo)] delay-[800ms] group-[.is-visible]:opacity-100">
        {site.tagline}
      </p>
    </div>
  );
}
