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

Next.js 16 App Router, React 19, TypeScript `strict`, Tailwind CSS v4. A single statically-prerendered marketing page: `app/page.tsx` composes ~11 section components from `components/`, which build on primitives in `components/ui/`.

Notes that aren't obvious from the file tree:

- **All copy, links and data live in `lib/content.ts`** — components never hardcode content. Edit that file to change the site. Unconfirmed values are marked with `TODO:` comments (Play Store listing URLs, LinkedIn, contact email, domain). `playStoreUrl` is intentionally `string | null`; `GooglePlayButton` falls back to the developer page so a CTA is never a dead end.
- **Content references icons by name** (`icon: "mic"`), resolved through the registry in `lib/icons.ts`. Add new icons there before using them in content.
- **The site deliberately contains no invented metrics.** Stats are qualitative ("Live", "Growing") and there are no testimonials, ratings or download counts. Keep it that way — add real numbers only when supplied.
- **Tailwind v4 has no `tailwind.config.js`.** Design tokens live in `app/globals.css`: a fixed `--color-brand-*` scale in `@theme`, plus semantic tokens (`canvas`, `surface`, `elevated`, `ink`, `ink-soft`, `ink-muted`, `line`, `accent`, …) mapped through `@theme inline` and flipped for dark mode under `prefers-color-scheme`. Use the semantic tokens in components, not raw colors.
- **`--accent-fg` is the text color that sits on an accent fill** — white in light mode, near-black in dark, because the brightened dark-mode accent fails contrast against white. Never pair `bg-accent` with `text-white`.
- **Tailwind resolves conflicting utilities by stylesheet order, not attribute order**, so `className` overrides of a component's base classes are unreliable. Dark panels (flagship card, final CTA) use real variants instead: `ButtonLink`'s `inverse` / `ghostInverse` and `GooglePlayButton`'s `tone="onDark"`.
- **Scroll animation** is `components/ui/reveal.tsx` — an IntersectionObserver that adds `.is-visible`; the `reveal`/`is-visible` pair are custom `@utility` rules. `prefers-reduced-motion` neutralizes all animation in `globals.css`. Note `reveal` animates `transform`, so don't put `position: sticky` on the same element (see `components/awaz-khata.tsx` for the nesting workaround).
- **App mockups are pure CSS/React** (`components/ui/phone.tsx`, `app-screens.tsx`, `app-icon.tsx`) — there are no screenshot or icon image assets. Swap these for `next/image` when real assets land.
- Navbar scroll-spy and section anchors are coupled: `navLinks` hrefs in `lib/content.ts` must match `id`s on the `<section>` elements, and `section[id]` carries `scroll-margin-top` in `globals.css` to clear the fixed navbar.
- **Fonts** are loaded with `next/font/google` in `app/layout.tsx` and exposed as the CSS variables `--font-geist-sans` / `--font-geist-mono`, wired to `font-sans` / `font-mono` through `@theme inline`.
- **`LayoutProps<"/">`** in `app/layout.tsx` is a Next.js-generated type from `.next/types` (typed routes). Regenerating types requires a `dev` or `build` run; type errors referencing these after adding routes usually mean the build hasn't run.
- **Import alias:** `@/*` maps to the repo root (`tsconfig.json`).
