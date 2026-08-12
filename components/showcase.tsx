import { CircleDot } from "lucide-react";
import { apps } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container, SectionHeading } from "./ui/section";
import { Reveal } from "./ui/reveal";
import { AppIcon } from "./ui/app-icon";
import { GooglePlayButton } from "./ui/google-play-button";
import { Phone } from "./ui/phone";
import { screens } from "./ui/app-screens";

export function Showcase() {
  return (
    <section id="showcase" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Inside the products"
          title="A closer look at what we ship"
          subtitle="The problem behind each app, the stack it runs on, and where it stands today."
        />

        <div className="mt-14 flex flex-col gap-5">
          {apps.map((app, i) => {
            const Screen = screens[app.slug];
            const flipped = i % 2 === 1;

            return (
              <Reveal key={app.slug} delay={i * 60}>
                <article
                  className={cn(
                    "group grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-10 lg:grid-cols-2 lg:gap-14",
                    "transition-all duration-300 hover:border-line-strong hover:shadow-[0_20px_50px_-30px_rgb(0_0_0/0.3)]",
                  )}
                >
                  {/* Mockup */}
                  <div
                    className={cn(
                      "relative flex justify-center",
                      flipped && "lg:order-2",
                    )}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-6 rounded-[3rem] blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                      style={{
                        background: `radial-gradient(circle at 50% 40%, ${app.hue.from}33, transparent 70%)`,
                      }}
                    />
                    <Phone className="relative max-w-[13rem] transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:max-w-[14rem]">
                      <Screen />
                    </Phone>
                  </div>

                  {/* Details */}
                  <div className={cn(flipped && "lg:order-1")}>
                    <div className="flex items-center gap-3.5">
                      <AppIcon app={app} size="md" />
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                          {app.name}
                        </h3>
                        <p className="text-sm text-ink-muted">{app.category}</p>
                      </div>
                    </div>

                    <p className="mt-5 text-pretty leading-relaxed text-ink-soft">
                      {app.description}
                    </p>

                    <div className="mt-6 rounded-2xl border border-line bg-elevated p-4">
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-ink-muted">
                        Problem solved
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                        {app.problem}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-ink-muted">
                        Built with
                      </p>
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {app.tech.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-line bg-canvas px-3 py-1 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-200 hover:border-line-strong hover:text-ink"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                        <CircleDot
                          aria-hidden
                          className="size-3.5 text-accent-ink"
                          strokeWidth={2.5}
                        />
                        {app.status}
                      </span>
                      <GooglePlayButton url={app.playStoreUrl} />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
