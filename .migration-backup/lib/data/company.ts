/**
 * How the studio works, and what it works with. No metrics, awards or
 * testimonials live here by design — see the note in CLAUDE.md.
 */

export const intro = {
  title: "From idea to shipped product.",
  body: "We build applications around real user problems — from recovery and wellness to voice-first personal finance.",
  points: [
    {
      icon: "target",
      title: "Problem first",
      body: "Every product starts from a friction someone actually lives with, not a feature list.",
    },
    {
      icon: "smartphone",
      title: "Mobile native",
      body: "Built with React Native and Expo, designed for the phone people already carry.",
    },
    {
      icon: "sparkles",
      title: "AI where it earns its place",
      body: "Language and voice models do real work inside the product — or they don't ship.",
    },
  ],
} as const;

/**
 * The studio statement, revealed one line at a time as the About section
 * scrolls into view. Kept as separate strings because each line is its own
 * reveal — don't collapse them into one paragraph.
 */
export const aboutStatement = [
  "We don't just build software.",
  "We build useful products.",
  "Designed around real problems.",
] as const;

export const approach = [
  {
    step: "01",
    title: "Discover",
    body: "Understand the problem and users.",
    detail:
      "We start with the person, the friction and the context — not with a feature list.",
  },
  {
    step: "02",
    title: "Design",
    body: "Turn the idea into a simple product experience.",
    detail:
      "Interfaces that stay obvious on the tenth use, not just the first.",
  },
  {
    step: "03",
    title: "Build",
    body: "Develop using modern technologies.",
    detail:
      "Typed end to end, built on a stack that ships fast without cutting corners.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Ship, learn, measure and improve.",
    detail:
      "Release to real users, watch how they behave, and iterate on what we learn.",
  },
] as const;

/**
 * The studio's stack. `note` describes the role each tool plays — not every
 * technology is used in every product; per-app stacks live in `apps.ts`.
 */
export const technologies = [
  { name: "React Native", note: "Cross-platform mobile" },
  { name: "Expo", note: "Build & release pipeline" },
  { name: "React", note: "Interface layer" },
  { name: "Next.js", note: "Web & marketing" },
  { name: "TypeScript", note: "End-to-end type safety" },
  { name: "Node.js", note: "Services & APIs" },
  { name: "Supabase", note: "Managed backend" },
  { name: "SQLite", note: "Local-first storage" },
  { name: "Clerk", note: "Authentication" },
  { name: "AI / LLMs", note: "Intent understanding" },
  { name: "Voice AI", note: "Speech interfaces" },
  { name: "Tailwind / NativeWind", note: "Styling system" },
] as const;

export const aboutFocus = [
  { icon: "smartphone", label: "Mobile applications" },
  { icon: "sparkles", label: "AI-powered experiences" },
  { icon: "mic", label: "Voice interfaces" },
  { icon: "gauge", label: "Consumer productivity" },
  { icon: "target", label: "Real-world problem solving" },
] as const;
