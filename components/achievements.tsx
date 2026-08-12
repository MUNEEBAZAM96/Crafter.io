import { achievements } from "@/lib/content";
import { icons, type IconName } from "@/lib/icons";
import { Container, SectionHeading } from "./ui/section";
import { Reveal } from "./ui/reveal";

export function Achievements() {
  return (
    <section
      id="achievements"
      className="border-y border-line bg-elevated py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Milestones"
          title="Built. Shipped. Growing."
          subtitle="Where Crafter.io stands today — measured in products released, not vanity metrics."
        />

        <ul className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => {
            const Icon = icons[item.icon as IconName];
            return (
              <Reveal
                key={item.title}
                as="li"
                delay={(i % 3) * 90}
                className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_16px_36px_-24px_rgb(0_0_0/0.28)] sm:p-7"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent-ink transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
