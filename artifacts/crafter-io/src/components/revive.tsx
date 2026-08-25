import { Info } from "lucide-react";
import { getApp, reviveCaseStudy } from "@/lib/data";
import { STAGGER } from "@/lib/motion";
import { icons, type IconName } from "@/lib/icons";
import { Container, Eyebrow } from "./ui/section";
import { Reveal } from "./ui/reveal";
import { AppIcon } from "./ui/app-icon";
import { GooglePlayButton } from "./ui/google-play-button";
import { Phone } from "./ui/phone";
import { reviveScreens } from "./ui/app-screens";
import { Magnetic } from "./motion/magnetic";

const revive = getApp("revive");

/**
 * Case study for Revive. The product touches addiction recovery, so the
 * language stays deliberately non-clinical and the disclaimer appears both
 * beside the safety features and on every card that describes the app.
 */
export function Revive() {
  return (
    <section
      id="revive"
      className="border-y border-line bg-elevated py-20 sm:py-28"
    >
      <Container>
        {/* ---- Header ---- */}
        <Reveal className="max-w-2xl">
          <Eyebrow>Case study</Eyebrow>

          <div className="mt-6 flex items-center gap-4">
            <AppIcon app={revive} size="lg" />
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                {revive.name}
              </h2>
              <p className="mt-1 text-lg text-ink-muted">{revive.subtitle}</p>
            </div>
          </div>

          <p className="mt-7 text-balance text-2xl font-medium leading-snug tracking-[-0.01em] text-accent-ink sm:text-[1.75rem]">
            {revive.tagline}
          </p>
        </Reveal>

        {/* ---- Problem / Product ---- */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {[reviveCaseStudy.problem, reviveCaseStudy.product].map(
            (block, i) => (
              <Reveal key={block.title} delay={i * 100}>
                <article className="h-full rounded-3xl border border-line bg-surface p-7 sm:p-8">
                  <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {block.title}
                  </h3>
                  <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
                    {block.body}
                  </p>
                </article>
              </Reveal>
            ),
          )}
        </div>

        {/* ---- Core experience ---- */}
        <div className="mt-20">
          <Reveal className="flex flex-col gap-4">
            <Eyebrow>Core experience</Eyebrow>
            <h3 className="max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Five screens carry the whole product.
            </h3>
            <p className="max-w-xl text-pretty leading-relaxed text-ink-soft">
              Interface mockups — the app is in development and these are design
              references, not screenshots of a shipped build.
            </p>
          </Reveal>

          {/* Scroll-snapped rail on small screens; full row on desktop. */}
          <ul
            className={[
              "mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "-mx-5 px-5 sm:-mx-8 sm:px-8",
              "lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0",
            ].join(" ")}
          >
            {reviveCaseStudy.experience.map((item, i) => {
              const Screen = reviveScreens[item.key];
              return (
                <Reveal
                  key={item.key}
                  as="li"
                  delay={i * STAGGER}
                  className="flex w-[13rem] shrink-0 snap-center flex-col lg:w-auto"
                >
                  <div className="flex justify-center">
                    <Phone
                      tone="light"
                      className="max-w-[11.5rem] transition-transform duration-500 ease-out hover:-translate-y-2 lg:max-w-none"
                    >
                      <Screen />
                    </Phone>
                  </div>
                  <h4 className="mt-5 text-center text-[0.9375rem] font-semibold tracking-tight lg:text-left">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-center text-sm leading-relaxed text-ink-muted lg:text-left">
                    {item.body}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* ---- Safety ---- */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <Reveal>
            <Eyebrow>Safety</Eyebrow>
            <h3 className="mt-5 text-balance text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Built for the hardest moments.
            </h3>
            <p className="mt-5 text-pretty leading-relaxed text-ink-soft">
              The features people need least often are the ones that have to
              work instantly. Support is one tap from anywhere in the app.
            </p>

            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-line bg-elevated p-5">
              <Info
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-accent-ink"
                strokeWidth={2.2}
              />
              <p className="text-[0.875rem] leading-relaxed text-ink-soft">
                {revive.disclaimer}
              </p>
            </div>

            <div className="mt-7">
              <Magnetic>
                <GooglePlayButton url={revive.playStoreUrl} variant="full" />
              </Magnetic>
            </div>
          </Reveal>

          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {reviveCaseStudy.safety.map((item, i) => {
              const Icon = icons[item.icon as IconName];
              return (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={i * STAGGER}
                  className="group bg-surface p-6 transition-colors duration-300 hover:bg-elevated"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-ink transition-transform duration-300 ease-out group-hover:scale-105">
                    <Icon
                      aria-hidden
                      className="size-[1.15rem]"
                      strokeWidth={2}
                    />
                  </span>
                  <h4 className="mt-4 text-[0.9375rem] font-semibold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* ---- Stack ---- */}
        <Reveal delay={80} className="mt-14 border-t border-line pt-8">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Built with
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {revive.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-200 hover:border-line-strong hover:text-ink"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
