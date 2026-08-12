import { technologies } from "@/lib/data";
import { STAGGER } from "@/lib/motion";
import { Container, SectionHeading } from "./ui/section";
import { Reveal } from "./ui/reveal";

export function Technology() {
  return (
    <section
      id="technology"
      className="border-y border-line bg-elevated py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Stack"
          title="Technology we build on"
          subtitle="A deliberately small stack, used well across every product."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech, i) => (
            <Reveal
              key={tech.name}
              as="li"
              delay={(i % 4) * STAGGER}
              className="group relative bg-surface p-6 transition-colors duration-[var(--duration-ui)] hover:bg-elevated"
            >
              <span
                aria-hidden
                className="block h-1 w-8 rounded-full bg-accent/25 transition-[width,background-color] duration-[var(--duration-ui)] ease-[var(--ease-out-expo)] group-hover:w-12 group-hover:bg-accent"
              />
              <p className="mt-4 text-[0.9375rem] font-semibold tracking-tight transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out-expo)] group-hover:translate-x-0.5">
                {tech.name}
              </p>
              <p className="mt-1 text-sm text-ink-muted transition-colors duration-[var(--duration-ui)] group-hover:text-ink-soft">
                {tech.note}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
