import { apps, navLinks, site } from "@/lib/content";
import { Container } from "./ui/section";
import { Logo } from "./ui/logo";

const externalLinks = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Google Play", href: site.social.playStore },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-elevated">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-pretty leading-relaxed text-ink-soft">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.9375rem] text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2.5">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.9375rem] text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.9375rem] text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
            {apps.map((app) => (
              <li key={app.slug}>{app.name}</li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
