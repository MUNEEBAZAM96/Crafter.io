import { aboutFocus, aboutStatement, apps } from "@/lib/data";
import { STAGGER } from "@/lib/motion";
import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { Container, Eyebrow } from "./ui/section";
import { Reveal } from "./ui/reveal";
import { AppIcon } from "./ui/app-icon";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>About us</Eyebrow>
            </Reveal>

            {/* Each line lands on its own as the section scrolls in. The last
                line carries the accent, so the statement resolves rather than
                just stopping. */}
            <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {aboutStatement.map((line, i) => (
                <Reveal
                  as="span"
                  key={line}
                  delay={i * STAGGER}
                  className={cn(
                    "block",
                    i === aboutStatement.length - 1 && "text-accent-ink",
                  )}
                >
                  {line}
                </Reveal>
              ))}
            </h2>

            <Reveal delay={STAGGER * 3}>
              <p className="mt-8 text-pretty text-lg leading-relaxed text-ink-soft">
                Crafter.io is a technology startup focused on designing and
                building mobile applications that combine thoughtful UX, modern
                technology and practical problem solving.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-ink-soft">
                We work in small, focused cycles: find a problem people actually
                have, design the shortest path through it, and ship something
                real. Every product we release has to earn its place on
                someone&apos;s home screen.
              </p>
            </Reveal>

            <Reveal delay={STAGGER * 4}>
              <ul className="mt-9 flex flex-wrap gap-2.5">
                {aboutFocus.map((focus) => {
                  const Icon = icons[focus.icon as IconName];
                  return (
                    <li
                      key={focus.label}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-line-strong hover:text-ink"
                    >
                      <Icon
                        aria-hidden
                        className="size-4 text-accent-ink"
                        strokeWidth={2}
                      />
                      {focus.label}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Visual: the product shelf */}
          <Reveal delay={160}>
            <div className="relative rounded-3xl border border-line bg-surface p-7 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl bg-grid opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent)]"
              />

              <p className="relative text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                What we&apos;re building
              </p>

              <ul className="relative mt-5 divide-y divide-line">
                {apps.map((app) => (
                  <li key={app.slug} className="flex items-center gap-4 py-4">
                    <AppIcon app={app} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.9375rem] font-semibold tracking-tight">
                        {app.name}
                      </p>
                      <p className="truncate text-sm text-ink-muted">
                        {app.tagline}
                      </p>
                    </div>
                    <span className="hidden shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] font-medium text-accent-ink sm:block">
                      {app.subtitle}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="relative mt-5 border-t border-line pt-5 text-sm leading-relaxed text-ink-muted">
                Mobile-first products, built end to end — design, engineering
                and release.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
