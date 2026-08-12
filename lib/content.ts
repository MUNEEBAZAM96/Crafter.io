/**
 * Single source of truth for every piece of copy, link and data point on the
 * site. Edit values here — components read from this file and never hardcode
 * content.
 *
 * `TODO:` markers flag placeholders that need a real value before launch.
 */

export const site = {
  name: "Crafter.io",
  tagline: "Building useful technology, one app at a time.",
  description:
    "Crafter.io is an app-building studio creating simple, useful and innovative mobile experiences for real-world problems.",
  // TODO: replace with the production domain once the site is deployed.
  url: "https://crafter.io",
  email: "hello@crafter.io", // TODO: confirm contact address
  social: {
    linkedin: "https://www.linkedin.com/company/crafter-io", // TODO: confirm URL
    playStore: "https://play.google.com/store/apps/developer?id=Crafter.io", // TODO: confirm developer page URL
  },
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Apps", href: "#apps" },
  { label: "About", href: "#about" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Stats — qualitative by design. No invented download or user numbers. */
/* ------------------------------------------------------------------ */

export const stats = [
  {
    value: "3+",
    label: "Apps built",
    detail: "Shipped products, not concepts",
  },
  {
    value: "Live",
    label: "On Google Play",
    detail: "Published and publicly available",
  },
  {
    value: "Growing",
    label: "User base",
    detail: "Expanding with every release",
  },
  {
    value: "Real",
    label: "Problems solved",
    detail: "Built for everyday use cases",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Apps                                                                */
/* ------------------------------------------------------------------ */

export type AppStatus = "Live on Google Play" | "In development" | "Beta";

export type App = {
  slug: "revive" | "hydro" | "awaz-khata";
  name: string;
  /** Latin transliteration shown under the name where useful. */
  nativeName?: string;
  tagline: string;
  description: string;
  category: string;
  platform: string;
  status: AppStatus;
  problem: string;
  tech: readonly string[];
  /** Null until the listing URL is confirmed — the UI degrades gracefully. */
  playStoreUrl: string | null;
  /** Internal case-study or project link. */
  projectUrl: string;
  featured: boolean;
  /** Drives the generated icon + mockup accent for this app. */
  hue: { from: string; to: string };
};

export const apps: readonly App[] = [
  {
    slug: "revive",
    name: "Revive",
    tagline: "Build habits that hold.",
    description:
      "A recovery companion designed to help users build healthier habits and stay consistent with their personal goals.",
    category: "Health & Wellbeing",
    platform: "Android",
    status: "Live on Google Play",
    problem:
      "Recovery and habit change fail without daily structure. Revive turns long-term goals into a simple, repeatable daily loop.",
    tech: ["React Native", "Expo", "TypeScript"],
    playStoreUrl: null, // TODO: add Play Store listing URL
    projectUrl: "#showcase", // TODO: link to a dedicated case study page
    featured: false,
    hue: { from: "#3fbc9f", to: "#0d6759" },
  },
  {
    slug: "hydro",
    name: "Hydro",
    tagline: "Drink better, daily.",
    description:
      "A mobile app focused on helping users build better hydration habits and stay on top of their daily water intake.",
    category: "Health & Fitness",
    platform: "Android",
    status: "Live on Google Play",
    problem:
      "Most people under-hydrate simply because nothing reminds them. Hydro makes intake tracking a two-second interaction.",
    tech: ["React Native", "Expo", "TypeScript"],
    playStoreUrl: null, // TODO: add Play Store listing URL
    projectUrl: "#showcase", // TODO: link to a dedicated case study page
    featured: false,
    hue: { from: "#56b8f0", to: "#1c5f9e" },
  },
  {
    slug: "awaz-khata",
    name: "Awaz Khata",
    nativeName: "آواز کھاتا",
    tagline: "Your personal finances, just by speaking.",
    description:
      "A voice-first personal finance assistant built for Pakistani users. Record and manage financial transactions simply by speaking in Urdu, Roman Urdu, English, or mixed speech.",
    category: "Finance · AI",
    platform: "Android",
    status: "Live on Google Play",
    problem:
      "Small business owners and households track money in paper registers. Typing every entry is slower than talking — so Awaz Khata listens instead.",
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "LLMs", "Voice AI"],
    playStoreUrl: null, // TODO: add Play Store listing URL
    projectUrl: "#awaz-khata",
    featured: true,
    hue: { from: "#f0a04b", to: "#0d6759" },
  },
];

export const featuredApp = apps.find((a) => a.featured)!;

/* Awaz Khata deep-dive capabilities. */
export const awazKhataFeatures = [
  {
    icon: "mic",
    title: "Urdu voice interaction",
    body: "Speak naturally in Urdu and the app captures the transaction — no forms, no typing.",
  },
  {
    icon: "languages",
    title: "Roman Urdu support",
    body: "Handles Roman Urdu, English and code-mixed speech the way people actually talk.",
  },
  {
    icon: "receipt",
    title: "Voice transaction recording",
    body: "One tap, one sentence. Amount, party and category are parsed and filed automatically.",
  },
  {
    icon: "wallet",
    title: "Personal finance tracking",
    body: "Daily, weekly and monthly views of where the money actually goes.",
  },
  {
    icon: "users",
    title: "Customer credit / udhaar",
    body: "Track who owes what, settle balances and keep a clean ledger per customer.",
  },
  {
    icon: "sparkles",
    title: "AI-powered intent understanding",
    body: "Language models resolve ambiguous phrasing into structured, correct entries.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Achievements — milestones only, no invented awards or metrics.      */
/* ------------------------------------------------------------------ */

export const achievements = [
  {
    icon: "rocket",
    title: "Apps launched",
    body: "Three products designed, built and shipped end to end by the Crafter.io team.",
  },
  {
    icon: "store",
    title: "Google Play presence",
    body: "Published to the Play Store and available to real users on Android.",
  },
  {
    icon: "trophy",
    title: "Hackathon participation",
    body: "Ideas pressure-tested in hackathon settings, then carried through to production.",
    // TODO: name the specific hackathon(s) once confirmed.
  },
  {
    icon: "brain",
    title: "AI-powered applications",
    body: "Shipping products where language models and voice do real work for the user.",
  },
  {
    icon: "heart",
    title: "Built for real users",
    body: "Products aimed at everyday problems — habits, health and household finance.",
  },
  {
    icon: "globe",
    title: "Built for local context",
    body: "Designed around how Pakistani users actually speak, record and manage money.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* About / approach / tech                                             */
/* ------------------------------------------------------------------ */

export const aboutFocus = [
  { icon: "smartphone", label: "Mobile applications" },
  { icon: "sparkles", label: "AI-powered experiences" },
  { icon: "mic", label: "Voice interfaces" },
  { icon: "gauge", label: "Consumer productivity" },
  { icon: "target", label: "Real-world problem solving" },
] as const;

export const approach = [
  {
    step: "01",
    title: "Discover",
    body: "Understand the problem.",
    detail:
      "We start with the person, the friction and the context — not with a feature list.",
  },
  {
    step: "02",
    title: "Design",
    body: "Create a simple and intuitive experience.",
    detail:
      "Interfaces that stay obvious on the tenth use, not just the first.",
  },
  {
    step: "03",
    title: "Build",
    body: "Develop with modern technologies.",
    detail:
      "Typed, tested and built on a stack that ships fast without cutting corners.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Ship, learn and improve.",
    detail:
      "Release to real users, watch how they behave and iterate on what we learn.",
  },
] as const;

export const technologies = [
  { name: "React Native", note: "Cross-platform mobile" },
  { name: "Expo", note: "Build & release pipeline" },
  { name: "React", note: "Interface layer" },
  { name: "Next.js", note: "Web & marketing" },
  { name: "TypeScript", note: "End-to-end type safety" },
  { name: "Node.js", note: "Services & APIs" },
  { name: "AI / LLMs", note: "Intent understanding" },
  { name: "Voice AI", note: "Speech interfaces" },
] as const;
