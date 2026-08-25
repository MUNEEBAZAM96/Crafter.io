import type { ComponentType } from "react";
import { ArrowRight, Mail, Phone as PhoneIcon } from "lucide-react";
import { contact, mailto, social, telHref } from "@/lib/data";
import { STAGGER } from "@/lib/motion";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/section";
import { Reveal } from "./ui/reveal";
import { Magnetic } from "./motion/magnetic";
import { LinkedInButton, LinkedInGlyph } from "./ui/linkedin-button";

type Channel = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

/** LinkedIn only appears once VITE_LINKEDIN_URL is set. */
const channels: Channel[] = [
  { icon: Mail, label: "Email", value: contact.email, href: mailto },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: contact.phoneDisplay,
    href: telHref,
  },
  ...(social.linkedin
    ? [
        {
          icon: LinkedInGlyph,
          label: "LinkedIn",
          value: "Connect on LinkedIn",
          href: social.linkedin,
          external: true,
        } satisfies Channel,
      ]
    : []),
];

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-[#0d1113] px-6 py-14 sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal
              as="h2"
              className="text-balance text-3xl font-semibold tracking-[-0.02em] text-white sm:text-5xl sm:leading-[1.08]"
            >
              Have an idea worth building?
            </Reveal>
            <Reveal
              as="p"
              delay={STAGGER}
              className="mx-auto mt-5 max-w-md text-pretty text-lg leading-relaxed text-white/60"
            >
              Let&apos;s turn your idea into a real product.
            </Reveal>

            {/* Contact channels — each one is directly actionable. */}
            <ul className="mx-auto mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
              {channels.map(
                ({ icon: Icon, label, value, href, external }, i) => (
                  <Reveal as="li" key={label} delay={STAGGER * (i + 2)}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08]"
                    >
                      <Icon aria-hidden className="size-4 text-brand-300" />
                      <span className="text-[0.6875rem] font-medium uppercase tracking-wide text-white/40">
                        {label}
                      </span>
                      <span className="break-all text-sm font-medium text-white/90">
                        {value}
                      </span>
                    </a>
                  </Reveal>
                ),
              )}
            </ul>

            <Reveal
              delay={STAGGER * 5}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Magnetic className="w-full sm:w-auto">
                <ButtonLink
                  href={mailto}
                  size="lg"
                  variant="inverse"
                  className="group w-full sm:w-auto"
                >
                  Start a Conversation
                  <ArrowRight className="size-4 transition-transform duration-[var(--duration-micro)] ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
                </ButtonLink>
              </Magnetic>

              <Magnetic className="w-full sm:w-auto">
                <LinkedInButton
                  size="lg"
                  variant="ghostInverse"
                  className="w-full sm:w-auto"
                />
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
