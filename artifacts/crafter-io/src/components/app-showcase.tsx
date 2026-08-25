

import { useRef, type CSSProperties } from "react";
import { ArrowUpRight, CircleDot } from "lucide-react";
import { apps } from "@/lib/data";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Container, SectionHeading } from "./ui/section";
import { Reveal } from "./ui/reveal";
import { AppIcon } from "./ui/app-icon";
import { GooglePlayButton } from "./ui/google-play-button";
import { Phone } from "./ui/phone";
import { screens } from "./ui/app-screens";
import { Magnetic } from "./motion/magnetic";
import { TiltCard } from "./motion/tilt-card";
import { useIsDesktop, usePrefersReducedMotion } from "./motion/use-motion";
import { useScrollStory } from "./motion/use-scroll-story";
import { BrandMoment } from "./brand-moment";

/**
 * Featured Products — the scroll-driven story.
 *
 * Desktop: the device stays pinned while scroll advances the copy through the
 * three products, the screen inside it cross-fading continuously rather than
 * switching at thresholds (see `useScrollStory`).
 *
 * Below `lg`: the identical markup falls back to a plain stacked list, each
 * entry carrying its own device. The pinned layout is applied entirely with
 * `lg:` classes, so the server and client agree on first paint and nothing
 * reflows on hydration — JS only ever overrides opacity and transform.
 */
export function AppShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);
  const screenRefs = useRef<(HTMLElement | null)[]>([]);

  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  // The driver must be off below `lg`: there the track has auto height and
  // every stage is in normal flow, so writing fractional opacities would fade
  // out content the visitor is trying to read.
  const driven = isDesktop && !reduced;
  const stage = useScrollStory({
    trackRef,
    stageRefs,
    screenRefs,
    count: apps.length,
    enabled: driven,
  });
  const active = apps[stage];

  return (
    <section
      id="projects"
      data-motion={reduced ? "reduced" : undefined}
      className="border-y border-line bg-elevated py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Project experience"
          title="Featured Products"
          subtitle="The problem behind each app, the stack it runs on, and where it stands today."
        />
      </Container>

      {/* Tall track: its scroll travel is the story's timeline. */}
      <div ref={trackRef} className="showcase-track relative mt-14 lg:h-[300vh]">
        <div className="showcase-pin lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:items-center">
          <Container>
            <div className="grid w-full items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              {/* ---- Pinned device (desktop) ---- */}
              <div className="showcase-anchor relative hidden justify-center lg:flex">
                {/* Depth: the glow, the frame and the UI each move a few px at
                    different rates across the story. `--story-p` is published
                    on the track by the hook and inherits down to here. */}
                <div
                  aria-hidden
                  className="absolute inset-8 rounded-[3rem] blur-3xl transition-[background] duration-700 ease-[var(--ease-out-expo)]"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${active.hue.from}2e, transparent 70%)`,
                    transform: "translateY(calc(var(--story-p, 0) * 8px))",
                  }}
                />
                <TiltCard
                  intensity={4}
                  highlight={false}
                  className="relative [transform:translateY(calc(var(--story-p,0)*-6px))]"
                >
                  <Phone tone={screens[active.slug].tone} className="max-w-[15rem]">
                    <div className="relative h-full">
                      {apps.map((app, i) => {
                        const { Screen } = screens[app.slug];
                        return (
                          <div
                            key={app.slug}
                            ref={(el) => {
                              screenRefs.current[i] = el;
                            }}
                            aria-hidden={i !== stage}
                            className={cn(
                              // Class state is the pre-hydration fallback; the
                              // hook's inline styles take over from there.
                              "absolute inset-0 stage",
                              i === stage && "stage-active",
                              i < stage && "stage-past",
                            )}
                          >
                            <div
                              className="depth-layer h-full"
                              style={{ "--depth": "7px" } as CSSProperties}
                            >
                              <Screen />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Phone>
                </TiltCard>
              </div>

              {/* ---- Stages ---- */}
              <div className="showcase-stages relative flex flex-col gap-16 lg:block lg:min-h-[30rem]">
                {apps.map((app, i) => {
                  const { Screen, tone } = screens[app.slug];
                  const hasCaseStudy = app.projectUrl !== "#projects";

                  return (
                    <article
                      key={app.slug}
                      ref={(el) => {
                        stageRefs.current[i] = el;
                      }}
                      className={cn(
                        "showcase-stage lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center lg:stage",
                        i === stage && "lg:stage-active",
                        i < stage && "lg:stage-past",
                      )}
                    >
                      {/* Per-stage device, for the stacked layout only. */}
                      <div className="showcase-stage-device mb-8 flex justify-center lg:hidden">
                        <Phone tone={tone} className="max-w-[12.5rem]">
                          <Screen />
                        </Phone>
                      </div>

                      <div className="flex items-center gap-3.5">
                        <AppIcon app={app} size="md" />
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            {app.name}
                          </h3>
                          <p className="text-sm text-ink-muted">{app.subtitle}</p>
                        </div>
                      </div>

                      <p className="mt-4 text-lg font-medium text-accent-ink">
                        {app.tagline}
                      </p>

                      <p className="mt-4 max-w-xl text-pretty leading-relaxed text-ink-soft">
                        {app.description}
                      </p>

                      <ul className="mt-6 flex max-w-xl flex-wrap gap-2">
                        {app.features.map((feature) => (
                          <li
                            key={feature}
                            className="rounded-full border border-line bg-surface px-3 py-1 text-[0.8125rem] font-medium text-ink-soft"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {app.disclaimer ? (
                        <p className="mt-5 max-w-xl text-[0.8125rem] leading-relaxed text-ink-muted">
                          {app.disclaimer}
                        </p>
                      ) : null}

                      <div className="mt-7 flex max-w-xl flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                          <CircleDot
                            aria-hidden
                            className="size-3.5 text-accent-ink"
                            strokeWidth={2.5}
                          />
                          {app.status}
                        </span>

                        {hasCaseStudy ? (
                          <a
                            href={app.projectUrl}
                            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink transition-opacity duration-[var(--duration-micro)] hover:opacity-75"
                          >
                            Read the {app.name} case study
                            <ArrowUpRight className="size-3.5 transition-transform duration-[var(--duration-micro)] ease-[var(--ease-out-expo)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </a>
                        ) : null}

                        <Magnetic>
                          <GooglePlayButton url={app.playStoreUrl} />
                        </Magnetic>
                      </div>
                    </article>
                  );
                })}

                {/* Progress rail — the only affordance telling desktop
                    visitors this section holds more than one product. */}
                <ol
                  aria-hidden
                  className="mt-10 hidden gap-2 lg:absolute lg:-left-10 lg:top-1/2 lg:mt-0 lg:flex lg:-translate-y-1/2 lg:flex-col"
                >
                  {apps.map((app, i) => (
                    <li
                      key={app.slug}
                      className={cn(
                        "h-8 w-0.5 rounded-full transition-colors duration-[var(--duration-ui)]",
                        i === stage ? "bg-accent" : "bg-line-strong",
                      )}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        {/* `group` is load-bearing: BrandMoment's transitions key off the
            `.is-visible` class this Reveal adds. */}
        <Reveal delay={STAGGER} className="group">
          <BrandMoment />
        </Reveal>
      </Container>
    </section>
  );
}
