/**
 * Company identity, contact details and navigation.
 *
 * Everything a visitor can read or click is defined here — components never
 * hardcode copy. Values that depend on external accounts (LinkedIn, the Play
 * Store developer page) are resolved from the environment so the site never
 * ships a fabricated link.
 */

export const site = {
  name: "Crafter.io",
  tagline: "Building useful technology, one app at a time.",
  positioning: "Independent App Studio",
  headline: "Building Apps That Solve Real Problems.",
  description:
    "Crafter.io is an app-building studio creating modern mobile applications and AI-powered experiences for real-world problems.",
  heroSupport:
    "Crafter.io designs and builds modern mobile applications and AI-powered experiences that turn everyday problems into useful products.",
  /** Set VITE_SITE_URL in production so canonical/OG URLs are absolute. */
  url: import.meta.env.VITE_SITE_URL ?? "https://crafter.io",
} as const;

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  email: "appcrafterstudio@gmail.com",
  /** E.164 for the tel: href; `phoneDisplay` is what humans read. */
  phone: "+923194404823",
  phoneDisplay: "+92 319 440 4823",
} as const;

export const mailto = `mailto:${contact.email}`;
export const telHref = `tel:${contact.phone}`;
export const bookingUrl =
  "https://calendar.notion.so/meet/muneebazam/un22h30fn";

/* ------------------------------------------------------------------ */
/* External profiles                                                   */
/* ------------------------------------------------------------------ */

/**
 * Both are optional on purpose. Every LinkedIn / Play Store affordance in the
 * UI is conditional on these being present, so an unset variable removes the
 * link rather than rendering a broken one.
 *
 * Set them as VITE_LINKEDIN_URL and VITE_PLAY_STORE_URL in the environment.
 */
export const social = {
  linkedin: import.meta.env.VITE_LINKEDIN_URL || null,
  /** Play Store developer page for the studio. */
  playStore: import.meta.env.VITE_PLAY_STORE_URL || null,
} as const;

/* ------------------------------------------------------------------ */
/* Founder                                                             */
/* ------------------------------------------------------------------ */

export const founder = {
  name: "Muneeb Azam",
  role: "Founder & App Developer",
  bio: "Muneeb Azam is a software developer and app builder focused on creating practical mobile products and exploring AI-powered experiences.",
  detail:
    "He works across the whole product — shaping the idea, designing the experience, writing the app and shipping it. Most of that work happens in React Native and TypeScript, increasingly with language models and voice doing real work inside the interface rather than sitting beside it.",
  /** Initials render the avatar; no stock photography by design. */
  initials: "MA",
  focus: [
    "Mobile app development",
    "React Native",
    "TypeScript",
    "AI-powered applications",
    "Voice interfaces",
    "Product development",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Navigation — hrefs must match `id`s on the page's <section> elements */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Apps", href: "#apps" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
