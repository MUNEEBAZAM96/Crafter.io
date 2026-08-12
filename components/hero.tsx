import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { apps, site } from "@/lib/data";
import { HERO_SEQUENCE, POINTER } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/section";
import { AppIcon } from "./ui/app-icon";
import { HeroAppCard } from "./ui/hero-app-card";
import { Magnetic } from "./motion/magnetic";
import { PointerScene } from "./motion/pointer-scene";
import { Parallax } from "./motion/parallax";

/** Stagger helper — the hero animates from CSS on first paint, no observer. */
const enterAt = (ms: number) =>
  ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-4 sm:pt-36 sm:pb-8 lg:pt-40"
    >
      {/* Backdrop: fine grid fading out, plus one soft accent bloom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000,transparent)]"
      />
      <Parallax
        speed={-0.6}
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2"
      >
        <div
          aria-hidden
          className="size-full rounded-full bg-accent/[0.07] blur-3xl"
        />
      </Parallax>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ---- Copy ---- */}
          <div className="max-w-xl">
            <span
              style={enterAt(HERO_SEQUENCE.badge)}
              className="enter inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full rounded-full bg-accent animate-pulse-ring" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {site.positioning}
            </span>

            {/* Line-by-line reveal. Each line is its own block so it rises and
                sharpens independently — an editorial cadence rather than a
                single block fading in. */}
            <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]">
              <span
                style={enterAt(HERO_SEQUENCE.headlineLineOne)}
                className="enter block"
              >
                Building apps that solve
              </span>
              <span
                style={enterAt(HERO_SEQUENCE.headlineLineTwo)}
                className="enter block"
              >
                <span className="relative whitespace-nowrap text-accent-ink">
                  real problems
                  <svg
                    aria-hidden
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/35"
                  >
                    <path
                      d="M2 8c40-5 90-7 196-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </span>
            </h1>

            <p
              style={enterAt(HERO_SEQUENCE.description)}
              className="enter mt-7 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft"
            >
              {site.heroSupport}
            </p>

            <div
              style={enterAt(HERO_SEQUENCE.actions)}
              className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic>
                <ButtonLink href="#apps" size="lg" className="group">
                  Explore Our Apps
                  <ArrowRight className="size-4 transition-transform duration-[var(--duration-micro)] ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href="#contact" size="lg" variant="secondary">
                  Let&apos;s Work Together
                </ButtonLink>
              </Magnetic>
            </div>

            <div
              style={enterAt(HERO_SEQUENCE.footnote)}
              className="enter mt-10 flex items-center gap-4 border-t border-line pt-6"
            >
              <div className="flex -space-x-2.5">
                {apps.map((app) => (
                  <AppIcon
                    key={app.slug}
                    app={app}
                    size="sm"
                    className="ring-2 ring-canvas"
                  />
                ))}
              </div>
              <p className="text-sm leading-snug text-ink-muted">
                Three products in active development —
                <br className="hidden sm:block" /> recovery, hydration and
                voice-first finance.
              </p>
            </div>
          </div>

          {/* ---- Product stack ----
              Layered depth: the cards sit at three parallax depths and drift
              with the pointer. Rotation is dropped below `sm` so they stack
              cleanly, and PointerScene attaches nothing on touch devices. */}
          <div
            style={enterAt(HERO_SEQUENCE.visual)}
            className="enter relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-4 top-6 bottom-6 rounded-[3rem] bg-accent/10 blur-3xl"
            />

            <PointerScene>
              <ul className="relative flex flex-col gap-4 sm:gap-5">
                {apps.map((app, i) => (
                  <li
                    key={app.slug}
                    className={cn(
                      // Fan the stack outward from the middle card.
                      i === 0 && "sm:-rotate-[1.5deg] lg:-translate-x-4",
                      i === 1 && "sm:rotate-[0.75deg] lg:translate-x-6",
                      i === 2 && "sm:-rotate-[0.75deg] lg:-translate-x-2",
                    )}
                  >
                    <div
                      className="depth-layer"
                      style={
                        {
                          "--depth": `${POINTER.sceneDepths[i]}px`,
                        } as CSSProperties
                      }
                    >
                      <HeroAppCard app={app} />
                    </div>
                  </li>
                ))}
              </ul>
            </PointerScene>
          </div>
        </div>
      </Container>
    </section>
  );
}
