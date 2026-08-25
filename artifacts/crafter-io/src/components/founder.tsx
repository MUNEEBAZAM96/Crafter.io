import { Mail, Phone as PhoneIcon } from "lucide-react";
import { bookingUrl, contact, founder, mailto, telHref } from "@/lib/data";
import { STAGGER } from "@/lib/motion";
import { Container, Eyebrow } from "./ui/section";
import { Reveal } from "./ui/reveal";
import { Magnetic } from "./motion/magnetic";
import { ButtonLink } from "./ui/button";
import { LinkedInButton } from "./ui/linkedin-button";

export function Founder() {
  return (
    <section
      id="founder"
      className="border-y border-line bg-elevated py-20 sm:py-28"
    >
      <Container>
        {/* The bio comes first in the DOM so the section's h2 precedes the
            profile card's h3; `lg:order-first` puts the card back on the left
            visually. */}
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          {/* ---- Bio ---- */}
          <div className="lg:order-last">
            <Reveal>
              <Eyebrow>Founder</Eyebrow>
              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Meet the person behind Crafter.io
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-soft">
                {founder.bio}
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-ink-soft">
                {founder.detail}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <h3 className="mt-10 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Areas of focus
              </h3>
              <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {founder.focus.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item}
                    delay={i * (STAGGER / 2)}
                    className="bg-surface px-4 py-3.5 text-[0.9375rem] font-medium text-ink-soft transition-colors duration-[var(--duration-ui)] hover:bg-elevated hover:text-ink"
                  >
                    {item}
                  </Reveal>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <ButtonLink href={bookingUrl}>Start a Conversation</ButtonLink>
                </Magnetic>
                <Magnetic>
                  <LinkedInButton variant="secondary" />
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* ---- Profile card ---- */}
          <Reveal delay={STAGGER} className="group lg:order-first">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/10 blur-3xl"
              />

              {/* Monogram stands in for a photo — no stock imagery by design. */}
              <div
                aria-hidden
                className="relative grid size-20 scale-95 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-2xl font-semibold tracking-tight text-white shadow-[0_8px_24px_-12px_rgb(0_0_0/0.4)] transition-transform duration-[var(--duration-reveal)] ease-[var(--ease-out-expo)] delay-150 group-[.is-visible]:scale-100"
              >
                {founder.initials}
              </div>

              <h3 className="relative mt-6 text-xl font-semibold tracking-tight">
                {founder.name}
              </h3>
              <p className="relative mt-1 text-sm font-medium text-accent-ink">
                {founder.role} — Crafter.io
              </p>

              <dl className="relative mt-7 space-y-3 border-t border-line pt-6 text-sm">
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Email</dt>
                  <Mail
                    aria-hidden
                    className="size-4 shrink-0 text-ink-muted"
                  />
                  <dd className="min-w-0">
                    <a
                      href={mailto}
                      className="block truncate text-ink-soft transition-colors duration-200 hover:text-ink"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Phone</dt>
                  <PhoneIcon
                    aria-hidden
                    className="size-4 shrink-0 text-ink-muted"
                  />
                  <dd>
                    <a
                      href={telHref}
                      className="text-ink-soft transition-colors duration-200 hover:text-ink"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="relative mt-6">
                <LinkedInButton size="sm" className="w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
