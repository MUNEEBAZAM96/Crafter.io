import { Quote } from "lucide-react";
import { awazKhataFeatures, featuredApp } from "@/lib/content";
import { icons, type IconName } from "@/lib/icons";
import { Container, Eyebrow } from "./ui/section";
import { Reveal } from "./ui/reveal";
import { AppIcon } from "./ui/app-icon";
import { GooglePlayButton } from "./ui/google-play-button";
import { Phone } from "./ui/phone";
import { AwazKhataScreen } from "./ui/app-screens";

export function AwazKhata() {
  return (
    <section
      id="awaz-khata"
      className="relative overflow-hidden border-y border-line bg-elevated py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent)]"
      />

      <Container className="relative">
        {/* ---- Case-study header ---- */}
        <Reveal className="max-w-2xl">
          <Eyebrow>Flagship project</Eyebrow>

          <div className="mt-6 flex items-center gap-4">
            <AppIcon app={featuredApp} size="lg" />
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                {featuredApp.name}
              </h2>
              <p dir="rtl" lang="ur" className="mt-1 text-lg text-ink-muted">
                {featuredApp.nativeName}
              </p>
            </div>
          </div>

          <p className="mt-7 text-balance text-2xl font-medium leading-snug tracking-[-0.01em] text-accent-ink sm:text-[1.75rem]">
            {featuredApp.tagline}
          </p>

          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            Awaz Khata is a voice-first finance assistant designed around the way
            Pakistani users naturally communicate. Instead of forcing people
            through forms and dropdowns, it listens — in Urdu, Roman Urdu,
            English or the mix of all three that real conversations are made of —
            and turns what it hears into a clean, structured ledger.
          </p>
        </Reveal>

        {/* ---- Device + feature grid ---- */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          {/* Sticky lives on the outer element; the reveal transform stays on
              an inner wrapper so the two don't fight over `transform`. */}
          <div className="lg:sticky lg:top-28">
            <Reveal className="relative flex justify-center">
              <div
                aria-hidden
                className="absolute inset-x-6 top-10 bottom-10 rounded-[3rem] bg-accent/10 blur-3xl"
              />
              <Phone className="relative animate-float sm:max-w-[17rem]">
                <AwazKhataScreen />
              </Phone>
            </Reveal>
          </div>

          <div>
            <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
              {awazKhataFeatures.map((feature, i) => {
                const Icon = icons[feature.icon as IconName];
                return (
                  <Reveal
                    key={feature.title}
                    as="li"
                    delay={i * 70}
                    className="group bg-surface p-6 transition-colors duration-300 hover:bg-elevated"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-ink transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-[1.15rem]" strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 text-[0.9375rem] font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {feature.body}
                    </p>
                  </Reveal>
                );
              })}
            </ul>

            {/* Example utterance — illustrates the product, not a testimonial. */}
            <Reveal delay={120}>
              <figure className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-7">
                <Quote
                  aria-hidden
                  className="size-5 text-accent-ink/40"
                  strokeWidth={2}
                />
                <blockquote className="mt-3">
                  <p
                    dir="rtl"
                    lang="ur"
                    className="text-xl leading-relaxed tracking-normal"
                  >
                    اسلم کو دو ہزار ادھار دیا
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">
                    &ldquo;Aslam ko do hazar udhaar diya&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-sm text-ink-soft">
                  <span className="text-ink-muted">Recorded as</span>
                  {["Credit given", "Rs 2,000", "Aslam", "Udhaar"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.75rem] font-medium text-accent-ink"
                    >
                      {chip}
                    </span>
                  ))}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={160} className="mt-8">
              <GooglePlayButton
                url={featuredApp.playStoreUrl}
                variant="full"
                className="w-full justify-center sm:w-auto sm:justify-start"
              />
              <p className="mt-3 text-sm text-ink-muted">
                View on Google Play — available for Android.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
