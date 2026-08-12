import { stats } from "@/lib/content";
import { Container } from "./ui/section";
import { Reveal } from "./ui/reveal";

export function Stats() {
  return (
    <section aria-label="Crafter.io at a glance" className="py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 90}
              className="group bg-surface p-6 transition-colors duration-300 hover:bg-elevated sm:p-8"
            >
              <p className="text-3xl font-semibold tracking-[-0.03em] text-accent-ink sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.9375rem] font-medium text-ink">
                {stat.label}
              </p>
              <p className="mt-1 text-sm leading-snug text-ink-muted">
                {stat.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
