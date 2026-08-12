"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "./ui/button";
import { Logo } from "./ui/logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");

  // Condense the bar once the hero starts leaving the viewport.
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8"
      >
        <a
          href="#home"
          className="rounded-lg transition-opacity hover:opacity-80"
          aria-label="Crafter.io — home"
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
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
                    "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                    active === link.href ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink href="#apps" size="sm" className="hidden sm:inline-flex">
            Explore Our Apps
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:bg-elevated lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-canvas lg:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3.5 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <ButtonLink
              href="#apps"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Explore Our Apps
            </ButtonLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
