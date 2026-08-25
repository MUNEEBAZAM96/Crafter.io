# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server on http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint (flat config, eslint.config.mjs)
```

No test runner is configured yet.

## Architecture

Next.js 16 App Router, React 19, TypeScript `strict`, Tailwind CSS v4. A single statically-prerendered marketing page: `app/page.tsx` composes ~12 section components from `components/`, which build on primitives in `components/ui/`.

Notes that aren't obvious from the file tree:

- **All copy, links and data live in `lib/data/`** — components never hardcode content. `site.ts` (identity, contact, founder, nav), `apps.ts` (product catalogue + the Revive case study), `company.ts` (intro, process, stack). Import from the `@/lib/data` barrel.
- **Adding an app** means appending one object to `apps` in `lib/data/apps.ts`; the apps grid, projects index, hero stack, footer and JSON-LD all derive from it. The only extra step is a matching entry in the `screens` registry in `components/ui/app-screens.tsx`.
- **External URLs come from the environment, never from a literal.** `NEXT_PUBLIC_LINKEDIN_URL` and `NEXT_PUBLIC_PLAY_STORE_URL` (see `.env.example`) are `null` when unset, and `LinkedInButton` / `GooglePlayButton` return `null` rather than render a dead link. Don't reintroduce a hardcoded fallback URL.
- **Content references icons by name** (`icon: "mic"`), resolved through the registry in `lib/icons.ts`. Add new icons there before using them in content. Note `lucide-react` v1 dropped brand marks — the LinkedIn glyph is inlined in `components/ui/linkedin-button.tsx`.
- **The site deliberately contains no invented metrics** — no testimonials, ratings, download counts, awards or user numbers, and no claim that an app is published while its `playStoreUrl` is `null`. Keep it that way; add real numbers only when supplied.
- **Revive is described in non-clinical language.** Its `disclaimer` field ("a self-help support tool, not medical care…") must render anywhere the app is described at length — currently the apps grid, the case study's safety block and the projects index.
- **Tailwind v4 has no `tailwind.config.js`.** Design tokens live in `app/globals.css`: a fixed `--color-brand-*` scale in `@theme`, plus semantic tokens (`canvas`, `surface`, `elevated`, `ink`, `ink-soft`, `ink-muted`, `line`, `accent`, …) mapped through `@theme inline` and flipped for dark mode under `prefers-color-scheme`. Use the semantic tokens in components, not raw colors.
- **`--accent-fg` is the text color that sits on an accent fill** — white in light mode, near-black in dark, because the brightened dark-mode accent fails contrast against white. Never pair `bg-accent` with `text-white`.
- **Tailwind resolves conflicting utilities by stylesheet order, not attribute order**, so `className` overrides of a component's base classes are unreliable. Dark panels (flagship card, final CTA) use real variants instead: `ButtonLink`'s `inverse` / `ghostInverse` and `GooglePlayButton`'s `tone="onDark"`.
- **The motion system.** Durations and easing are CSS custom properties in `globals.css` (`--duration-micro|ui|reveal|hero`, `--ease-out-expo`, `--ease-spring`); components reference them as `duration-[var(--duration-ui)]` rather than importing numbers. `lib/motion.ts` holds only the amplitudes for JS-driven effects. If an animation needs a duration that isn't a token, the duration is probably wrong.
- **Two entrance systems, by position on the page.** Above the fold uses the `enter` utility — a pure-CSS keyframe staggered with `--enter-delay`, so the hero ships zero client JS. Below the fold uses `components/ui/reveal.tsx`, one shared IntersectionObserver that adds `.is-visible`. Both are custom `@utility` rules neutralized by `prefers-reduced-motion`. `reveal` animates `transform`, so don't put `position: sticky` on the same element (see `components/awaz-khata.tsx` for the nesting workaround).
- **Not every section animates, on purpose.** `components/intro.tsx` is deliberately static — it follows the hero's load sequence, and animating it too would make the first two screens both arrive from nowhere. Don't "fix" it by adding a reveal.
- **Pointer effects all gate on `useFinePointerMotion()`** (`components/motion/use-motion.ts`): `(hover: hover) and (pointer: fine)` *and* not reduced-motion. Nothing attaches listeners on touch. `TiltCard` and `PointerScene` publish `--px`/`--py`; descendants opt into parallax with the `depth-layer` utility plus their own `--depth`. `Magnetic` and `Parallax` each use a single shared window listener with a cached rect map rather than one listener per element.
- **The scroll story never writes scroll.** `useScrollStory` reads position and interpolates — no `preventDefault`, no `scrollTo`. Per-frame work writes opacity/transform straight to the DOM; React state holds only the nearest stage index (used for the device tone and `aria-hidden`), so a full pass costs two renders.
- **The showcase's pinned layout is applied with `lg:` classes**, so server and client agree on first paint and nothing reflows on hydration — JS only ever overrides opacity and transform. Reduced-motion can't be undone by a media query in that scheme, so the section stamps `data-motion="reduced"` and the `[data-motion="reduced"] .showcase-*` rules in `globals.css` unwind the pin. Those selectors target plain marker classes, never `lg:stage`, which compiles to `.lg\:stage` inside a media query and would never match. **The story driver must stay gated on `useIsDesktop()`** — below `lg` the track has auto height and the stages are in normal flow, so running the driver there would fade out content the visitor is reading.
- **App mockups are pure CSS/React** (`components/ui/phone.tsx`, `app-screens.tsx`, `app-icon.tsx`) — there are no screenshot or icon image assets, and the UI says so where it shows them. Swap for `next/image` when real assets land. The `screens` registry pairs each app with a `PhoneTone`: light-background screens need `tone="light"` or the status bar and home indicator render white-on-white.
- Navbar scroll-spy and section anchors are coupled: `navLinks` hrefs in `lib/data/site.ts` must match `id`s on the `<section>` elements, and `section[id]` carries `scroll-margin-top` in `globals.css` to clear the fixed navbar.
- **The Projects section renders a phone mockup only for apps without their own section** (derived from `projectUrl !== "#projects"`), which is what keeps the page from becoming a wall of devices.
- **`npm run prebuild` deletes AppleDouble `._*` files from `.next`.** This repo lives on an exFAT volume where macOS writes them next to Turbopack's cache directory; the cache loader then tries to parse `._v16.3.0-…` as a version and every second build fails with "Failed to open database". Don't remove that script while the repo lives here.
- **Fonts** are loaded with `next/font/google` in `app/layout.tsx` and exposed as the CSS variables `--font-geist-sans` / `--font-geist-mono`, wired to `font-sans` / `font-mono` through `@theme inline`.
- **`LayoutProps<"/">`** in `app/layout.tsx` is a Next.js-generated type from `.next/types` (typed routes). Regenerating types requires a `dev` or `build` run; type errors referencing these after adding routes usually mean the build hasn't run.
- **Import alias:** `@/*` maps to the repo root (`tsconfig.json`).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
