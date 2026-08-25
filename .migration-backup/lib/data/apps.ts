/**
 * The product catalogue.
 *
 * Adding a fourth app should mean appending one object here — the apps grid,
 * projects list, footer, hero icon row and structured data all derive from
 * this array. Only `screen` needs a matching entry in `components/ui/
 * app-screens.tsx`.
 */

export type AppStatus = "Live on Google Play" | "In development" | "Beta";

export type App = {
  slug: "revive" | "hydro" | "awaz-khata";
  name: string;
  /** Urdu/native rendering shown alongside the name where it applies. */
  nativeName?: string;
  subtitle: string;
  tagline: string;
  description: string;
  category: string;
  platform: string;
  status: AppStatus;
  /** The user problem the product exists to solve. */
  problem: string;
  features: readonly string[];
  tech: readonly string[];
  /**
   * Play Store listing URL. `null` while unpublished — the UI hides the Play
   * Store CTA entirely rather than linking somewhere that doesn't exist.
   */
  playStoreUrl: string | null;
  /** In-page anchor for the app's deeper section. */
  projectUrl: string;
  /** Exactly one app should be flagged — it drives the flagship treatment. */
  featured: boolean;
  /** Seeds the generated icon and mockup accent. */
  hue: { from: string; to: string };
  /**
   * Rendered wherever the product is described, when the product touches a
   * sensitive domain and needs qualifying language.
   */
  disclaimer?: string;
};

export const apps: readonly App[] = [
  {
    slug: "revive",
    name: "Revive",
    subtitle: "Recovery Companion",
    tagline: "Private support, every single day.",
    description:
      "A private, judgment-free mobile app designed to support people through addiction recovery with habit-building tools, recovery tracking, an AI recovery coach, mind-training games, and always-available safety features.",
    category: "Health & Wellbeing",
    platform: "Android",
    status: "In development",
    problem:
      "Recovery journeys are hard to sustain day to day, and the moments people most need support are rarely the moments help is easy to reach. Revive keeps a private, always-available structure in the user's pocket.",
    features: [
      "Recovery journey",
      "Daily check-ins",
      "AI recovery coach",
      "Mind-training games",
      "Panic Mode",
      "Crisis resources",
      "Progress tracking",
      "Local-first architecture",
    ],
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "NativeWind",
      "SQLite",
      "Supabase",
      "Clerk",
      "Zustand",
    ],
    playStoreUrl: null,
    projectUrl: "#revive",
    featured: false,
    hue: { from: "#3fbc9f", to: "#0d6759" },
    disclaimer:
      "Revive is a self-help support tool, not medical care and not a substitute for professional treatment.",
  },
  {
    slug: "hydro",
    name: "Hydro",
    subtitle: "Hydration Tracking",
    tagline: "Drink better, daily.",
    description:
      "A mobile app for building better hydration habits — log intake in a tap, set a daily target, and get reminders that fit the day rather than interrupt it.",
    category: "Health & Fitness",
    platform: "Android",
    status: "In development",
    problem:
      "Most people under-hydrate simply because nothing reminds them at the right moment. Hydro makes logging a two-second interaction and does the remembering.",
    features: [
      "Daily intake target",
      "One-tap logging",
      "Reminders",
      "Progress history",
    ],
    tech: ["React Native", "Expo", "TypeScript"],
    playStoreUrl: null,
    projectUrl: "#projects",
    featured: false,
    hue: { from: "#56b8f0", to: "#1c5f9e" },
  },
  {
    slug: "awaz-khata",
    name: "Awaz Khata",
    nativeName: "آواز کھاتا",
    subtitle: "Voice-First Finance",
    tagline: "Your personal finances, just by speaking.",
    description:
      "A voice-first personal finance assistant designed for Pakistani users. Record and manage financial transactions naturally through Urdu, Roman Urdu, English, or mixed speech.",
    category: "Finance · AI",
    platform: "Android",
    status: "In development",
    problem:
      "Households and small shops track money in paper registers because typing every entry is slower than saying it out loud. Awaz Khata listens instead, in the language the entry was thought in.",
    features: [
      "Voice-first interaction",
      "Urdu, Roman Urdu & English",
      "Voice transaction recording",
      "Udhaar management",
      "AI-powered intent understanding",
      "Personal finance tracking",
    ],
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express",
      "AI / LLMs",
      "Voice AI",
    ],
    playStoreUrl: null,
    projectUrl: "#awaz-khata",
    featured: true,
    hue: { from: "#f0a04b", to: "#0d6759" },
  },
];

/** The flagship product. Falls back to the first app if no flag is set. */
export const featuredApp = apps.find((app) => app.featured) ?? apps[0];

export const getApp = (slug: App["slug"]): App =>
  apps.find((app) => app.slug === slug) ?? apps[0];

/* ------------------------------------------------------------------ */
/* Awaz Khata — capability detail                                      */
/* ------------------------------------------------------------------ */

export const awazKhataFeatures = [
  {
    icon: "mic",
    title: "Voice-first interaction",
    body: "Speak the entry the way you'd say it out loud. No forms, no dropdowns, no typing.",
  },
  {
    icon: "languages",
    title: "Urdu & Roman Urdu",
    body: "Understands Urdu, Roman Urdu, English and the code-mixed speech real conversations are made of.",
  },
  {
    icon: "receipt",
    title: "Voice transaction recording",
    body: "One sentence in, one structured entry out — amount, party and category parsed automatically.",
  },
  {
    icon: "users",
    title: "Udhaar management",
    body: "Track who owes what, settle balances and keep a clean running ledger for each customer.",
  },
  {
    icon: "sparkles",
    title: "AI-powered intent understanding",
    body: "Language models resolve ambiguous phrasing into the entry the user actually meant.",
  },
  {
    icon: "wallet",
    title: "Personal finance tracking",
    body: "Daily, weekly and monthly views of where the money actually went.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Revive — case study                                                 */
/* ------------------------------------------------------------------ */

export const reviveCaseStudy = {
  problem: {
    title: "The problem",
    body: "Recovery journeys can be difficult to manage consistently, especially when users need private, judgment-free support. The hardest moments tend to arrive without warning, and often at times when reaching another person feels impossible.",
  },
  product: {
    title: "The product",
    body: "Revive combines recovery tracking, daily check-ins, an AI coach, mind-training games, progress visualization and safety resources into one private mobile experience — built local-first, so the user's history stays on their device.",
  },
  /** Each key must exist in `reviveScreens` in components/ui/app-screens.tsx. */
  experience: [
    {
      key: "dashboard",
      title: "Dashboard",
      body: "Today at a glance — streak, check-in status and the next small thing to do.",
    },
    {
      key: "journey",
      title: "Journey",
      body: "The recovery timeline, milestone by milestone, so progress stays visible.",
    },
    {
      key: "coach",
      title: "Coach",
      body: "An AI recovery coach available at any hour, for the conversations that can't wait.",
    },
    {
      key: "community",
      title: "Community",
      body: "Shared encouragement from people on the same path, without identities attached.",
    },
    {
      key: "settings",
      title: "Settings",
      body: "Privacy, reminders and data controls — the user decides what leaves the device.",
    },
  ],
  safety: [
    {
      icon: "shield",
      title: "Panic Mode",
      body: "One tap from anywhere in the app opens immediate support for a high-risk moment.",
    },
    {
      icon: "wind",
      title: "Grounding exercise",
      body: "A guided breathing and grounding sequence to work through an urge as it peaks.",
    },
    {
      icon: "lifeBuoy",
      title: "Crisis resources",
      body: "Direct access to helplines and emergency contacts, reachable without hunting for them.",
    },
    {
      icon: "calendarCheck",
      title: "Daily check-ins",
      body: "A short, honest daily prompt that surfaces patterns before they become setbacks.",
    },
  ],
} as const;
