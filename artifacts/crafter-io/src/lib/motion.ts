/**
 * The Crafter.io motion system, JS half.
 *
 * Durations and easing live only in `app/globals.css` as custom properties —
 * components reference them as `duration-[var(--duration-ui)]` rather than
 * importing numbers, so there is nothing to keep in sync. What's left here is
 * the budget for the JS-driven effects: deliberately small numbers, because
 * the difference between "premium" and "gimmick" is almost entirely
 * amplitude.
 */

/** Entrance choreography for the hero, in ms after first paint. */
export const HERO_SEQUENCE = {
  navbar: 0,
  badge: 60,
  headlineLineOne: 120,
  headlineLineTwo: 190,
  description: 260,
  actions: 330,
  visual: 300,
  footnote: 400,
} as const;

/** Stagger between siblings in a group. Fast enough not to feel like a queue. */
export const STAGGER = 80;

export const POINTER = {
  /** Max card rotation in degrees. Past ~6° the effect starts to read as a toy. */
  tiltDegrees: 5,
  /** Max travel for a magnetic button, in px. */
  magnetStrength: 7,
  /** How far outside the button the magnet starts pulling, in px. */
  magnetRadius: 90,
  /** Parallax depth per hero layer, in px, foreground first. */
  sceneDepths: [8, 5, 2],
} as const;

/** Scroll parallax range, in px. Anything larger reads as a glitch. */
export const PARALLAX_RANGE = 20;
