import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/lib/content";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/section";
import { Reveal } from "./ui/reveal";

export function CTA() {
  return (
    <section id="contact" className="pb-20 pt-4 sm:pb-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-[#0d1113] px-7 py-14 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-white sm:text-5xl sm:leading-[1.08]">
                Have an idea worth building?
              </h2>
              <p className="mx-auto mt-5 max-w-md text-pretty text-lg leading-relaxed text-white/60">
                Let&apos;s turn your idea into a real product.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href={`mailto:${site.email}`}
                  size="lg"
                  variant="inverse"
                  className="group w-full sm:w-auto"
                >
                  Let&apos;s Talk
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${site.email}`}
                  size="lg"
                  variant="ghostInverse"
                  className="w-full sm:w-auto"
                >
                  <Mail className="size-4" />
                  {site.email}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
