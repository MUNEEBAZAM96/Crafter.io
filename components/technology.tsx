import { technologies } from "@/lib/content";
import { Container, SectionHeading } from "./ui/section";
import { Reveal } from "./ui/reveal";

export function Technology() {
  return (
    <section id="technology" className="py-20 sm:py-28">
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
              delay={(i % 4) * 70}
              className="group bg-surface p-6 transition-colors duration-300 hover:bg-elevated"
            >
              <span
                aria-hidden
                className="block h-1 w-8 rounded-full bg-accent/25 transition-all duration-300 group-hover:w-12 group-hover:bg-accent"
              />
              <p className="mt-4 text-[0.9375rem] font-semibold tracking-tight">
                {tech.name}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{tech.note}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
