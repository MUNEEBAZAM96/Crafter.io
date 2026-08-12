import { ArrowRight, ArrowUpRight } from "lucide-react";
import { apps, featuredApp, site } from "@/lib/content";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/section";
import { Reveal } from "./ui/reveal";
import { AppIcon } from "./ui/app-icon";
import { Phone } from "./ui/phone";
import { AwazKhataScreen } from "./ui/app-screens";

export function Hero() {
  const [revive, hydro] = apps;

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      {/* Backdrop: fine grid fading out, plus one soft accent bloom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ---- Copy ---- */}
          <div className="max-w-xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-accent animate-pulse-ring" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                App studio · Building on Android
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-[4rem]">
                Building apps that make a{" "}
                <span className="relative whitespace-nowrap text-accent-ink">
                  difference
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
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft">
                {site.description}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="#apps" size="lg" className="group">
                  Explore Our Apps
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink href="#about" size="lg" variant="secondary">
                  About Crafter.io
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex items-center gap-4 border-t border-line pt-6">
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
                  Three products live on Google Play,
                  <br className="hidden sm:block" /> with more in the workshop.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---- Visual composition ---- */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto flex max-w-md justify-center pb-10 pt-4 lg:pb-0">
              {/* Halo behind the device */}
              <div
                aria-hidden
                className="absolute inset-x-8 top-8 bottom-8 rounded-[3rem] bg-gradient-to-b from-accent/10 to-transparent blur-2xl"
              />

              <Phone className="relative z-10 animate-float">
                <AwazKhataScreen />
              </Phone>

              {/* Floating card — Revive */}
              <div
                className="absolute -left-2 top-12 z-20 hidden animate-float-slow items-center gap-2.5 rounded-2xl border border-line bg-surface/95 p-3 shadow-lg backdrop-blur sm:flex"
                style={{ animationDelay: "-2.5s" }}
              >
                <AppIcon app={revive} size="sm" />
                <span className="pr-1">
                  <span className="block text-[0.8125rem] font-semibold leading-tight">
                    {revive.name}
                  </span>
                  <span className="block text-[0.6875rem] text-ink-muted">
                    {revive.category}
                  </span>
                </span>
              </div>

              {/* Floating card — Hydro */}
              <div
                className="absolute -right-1 bottom-24 z-20 hidden animate-float items-center gap-2.5 rounded-2xl border border-line bg-surface/95 p-3 shadow-lg backdrop-blur sm:flex"
                style={{ animationDelay: "-4s" }}
              >
                <AppIcon app={hydro} size="sm" />
                <span className="pr-1">
                  <span className="block text-[0.8125rem] font-semibold leading-tight">
                    {hydro.name}
                  </span>
                  <span className="block text-[0.6875rem] text-ink-muted">
                    {hydro.category}
                  </span>
                </span>
              </div>

              {/* Floating chip — flagship pointer */}
              <div
                className="absolute -right-3 top-4 z-20 hidden animate-float-slow rounded-full border border-line bg-surface/95 px-3 py-1.5 shadow-md backdrop-blur md:block"
                style={{ animationDelay: "-1s" }}
              >
                <span className="flex items-center gap-1.5 text-[0.6875rem] font-medium text-ink-soft">
                  <ArrowUpRight className="size-3 text-accent-ink" />
                  {featuredApp.name} · Voice-first
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
