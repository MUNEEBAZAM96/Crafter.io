import { approach } from "@/lib/content";
import { Container, SectionHeading } from "./ui/section";
import { Reveal } from "./ui/reveal";

export function Approach() {
  return (
    <section
      id="approach"
      className="border-y border-line bg-elevated py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="Our approach"
          subtitle="Four steps, repeated until the product is genuinely useful."
        />

        <ol className="relative mt-14 grid gap-5 lg:grid-cols-4">
          {/* Connective line across the row on large screens */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-line-strong lg:block"
          />

          {approach.map((step, i) => (
            <Reveal
              key={step.step}
              as="li"
              delay={i * 100}
              className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_16px_36px_-24px_rgb(0_0_0/0.28)] sm:p-7"
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong bg-canvas text-sm font-semibold tabular-nums text-accent-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                  {step.step}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden />
              </span>

              <h3 className="mt-6 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[0.9375rem] font-medium text-ink-soft">
                {step.body}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {step.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
