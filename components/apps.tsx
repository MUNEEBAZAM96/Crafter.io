import { ArrowUpRight } from "lucide-react";
import { apps, featuredApp } from "@/lib/content";
import { Container, SectionHeading } from "./ui/section";
import { Reveal } from "./ui/reveal";
import { AppIcon } from "./ui/app-icon";
import { GooglePlayButton } from "./ui/google-play-button";
import { ButtonLink } from "./ui/button";
import { Phone } from "./ui/phone";
import { AwazKhataScreen } from "./ui/app-screens";

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[0.6875rem] font-medium uppercase tracking-wide text-ink-muted">
        {label}
      </dt>
      <dd className="text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

export function Apps() {
  const secondary = apps.filter((app) => !app.featured);

  return (
    <section id="apps" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our work"
          title="Our Apps"
          subtitle="Products we've built to solve real problems."
        />

        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-2">
          {/* ---- Flagship card ---- */}
          <Reveal className="lg:col-span-2">
            <article className="group relative overflow-hidden rounded-3xl border border-line bg-[#0d1113] text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-24 size-[26rem] rounded-full bg-accent/20 blur-3xl"
              />

              <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-brand-300">
                      Flagship
                    </span>
                    <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.6875rem] font-medium text-white/60">
                      {featuredApp.status}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <AppIcon app={featuredApp} size="lg" />
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {featuredApp.name}
                      </h3>
                      <p
                        dir="rtl"
                        lang="ur"
                        className="mt-0.5 text-base text-white/50"
                      >
                        {featuredApp.nativeName}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 max-w-lg text-pretty leading-relaxed text-white/70">
                    {featuredApp.description}
                  </p>

                  <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-[0.6875rem] font-medium uppercase tracking-wide text-white/40">
                        Category
                      </dt>
                      <dd className="text-sm font-medium">
                        {featuredApp.category}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-[0.6875rem] font-medium uppercase tracking-wide text-white/40">
                        Platform
                      </dt>
                      <dd className="text-sm font-medium">
                        {featuredApp.platform}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <ButtonLink
                      href={featuredApp.projectUrl}
                      variant="inverse"
                      className="group/cta"
                    >
                      View Project
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </ButtonLink>
                    <GooglePlayButton
                      url={featuredApp.playStoreUrl}
                      tone="onDark"
                    />
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <Phone className="max-w-[13.5rem] transition-transform duration-500 group-hover:-translate-y-2 sm:max-w-[15rem]">
                    <AwazKhataScreen />
                  </Phone>
                </div>
              </div>
            </article>
          </Reveal>

          {/* ---- Secondary cards ---- */}
          {secondary.map((app, i) => (
            <Reveal key={app.slug} delay={i * 110}>
              <article className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.28)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <AppIcon app={app} size="md" />
                  <span className="rounded-full border border-line bg-elevated px-2.5 py-1 text-[0.6875rem] font-medium text-ink-muted">
                    {app.status}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {app.name}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-accent-ink">
                  {app.tagline}
                </p>

                <p className="mt-4 text-pretty text-[0.9375rem] leading-relaxed text-ink-soft">
                  {app.description}
                </p>

                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  <MetaRow label="Category" value={app.category} />
                  <MetaRow label="Platform" value={app.platform} />
                </dl>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                  <ButtonLink
                    href={app.projectUrl}
                    size="sm"
                    variant="secondary"
                    className="group/cta"
                  >
                    View Project
                    <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </ButtonLink>
                  <GooglePlayButton url={app.playStoreUrl} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
