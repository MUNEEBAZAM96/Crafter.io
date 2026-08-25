

import { useEffect, useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import { contact, mailto, navLinks } from "@/lib/data";
import { HERO_SEQUENCE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { ButtonLink } from "./ui/button";
import { Logo } from "./ui/logo";
import { Magnetic } from "./motion/magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");

  // Condense the bar once the page starts moving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever section owns the upper third of the screen.
  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter((el): el is Element => Boolean(el));

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock background scroll and wire Escape while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      {/* The entrance sits on the nav, not the fixed header: animating the
          header would leave `will-change` on a permanently-composited bar. */}
      <nav
        aria-label="Main"
        style={{ "--enter-delay": `${HERO_SEQUENCE.navbar}ms` } as CSSProperties}
        className={cn(
          "enter mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 transition-[height] duration-300 sm:px-8",
          scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20",
        )}
      >
        <a
          href="#home"
          className="rounded-lg transition-opacity duration-200 hover:opacity-70"
          aria-label="Crafter.io — home"
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  active === link.href
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ease-out",
                    active === link.href ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-flex">
            <ButtonLink href="#contact" size="sm">
              Let&apos;s Talk
            </ButtonLink>
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-200 hover:bg-elevated md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* ---- Mobile sheet ----
          Stays mounted so it can animate; `inert` keeps the closed panel out
          of the tab order and the accessibility tree. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full origin-top border-b border-line bg-canvas/95 backdrop-blur-xl md:hidden",
          "transition-[opacity,transform] duration-300 ease-out",
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                className={cn(
                  "flex items-center justify-between border-b border-line py-4 text-base font-medium",
                  "transition-[opacity,transform] duration-300 ease-out",
                  active === link.href ? "text-ink" : "text-ink-soft",
                  open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                )}
              >
                {link.label}
                {active === link.href ? (
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                ) : null}
              </a>
            </li>
          ))}

          <li className="flex flex-col gap-2 pt-5 pb-2">
            <ButtonLink
              href="#contact"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Let&apos;s Talk
            </ButtonLink>
            <a
              href={mailto}
              onClick={() => setOpen(false)}
              className="text-center text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {contact.email}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
