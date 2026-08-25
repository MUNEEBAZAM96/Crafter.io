import { intro } from "@/lib/data";
import { icons, type IconName } from "@/lib/icons";
import { Container } from "./ui/section";

/**
 * The statement that follows the hero.
 *
 * Deliberately static — no scroll reveal. It sits immediately below the
 * hero's load sequence, and animating it too would mean the visitor's first
 * two screens are both things arriving from nowhere. Holding still here is
 * what makes the reveals further down read as intentional.
 */
export function Intro() {
  return (
    <section aria-label="What Crafter.io does" className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {intro.title}
          </h2>

          <div>
            <p className="text-pretty text-lg leading-relaxed text-ink-soft">
              {intro.body}
            </p>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
              {intro.points.map((point) => {
                const Icon = icons[point.icon as IconName];
                return (
                  <li
                    key={point.title}
                    className="group bg-surface p-6 transition-colors duration-[var(--duration-ui)] hover:bg-elevated"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-ink transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out-expo)] group-hover:scale-105">
                      <Icon aria-hidden className="size-[1.15rem]" strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 text-[0.9375rem] font-semibold tracking-tight">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {point.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
