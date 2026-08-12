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

Next.js 16 App Router project (`app/`), React 19, TypeScript in `strict` mode, Tailwind CSS v4. Currently a `create-next-app` scaffold — `app/layout.tsx` and `app/page.tsx` are the only route files.

Notes that aren't obvious from the file tree:

- **Tailwind v4 has no `tailwind.config.js`.** Design tokens live in `app/globals.css` via `@import "tailwindcss"` plus an `@theme inline` block that maps CSS custom properties (`--background`, `--foreground`, the Geist font variables) to Tailwind color/font utilities. Add theme values there, not in a JS config. Dark mode is driven by `prefers-color-scheme` overriding the `:root` variables.
- **Fonts** are loaded with `next/font/google` in `app/layout.tsx` and exposed as the CSS variables `--font-geist-sans` / `--font-geist-mono`, wired to `font-sans` / `font-mono` through `@theme inline`.
- **`LayoutProps<"/">`** in `app/layout.tsx` is a Next.js-generated type from `.next/types` (typed routes). Regenerating types requires a `dev` or `build` run; type errors referencing these after adding routes usually mean the build hasn't run.
- **Import alias:** `@/*` maps to the repo root (`tsconfig.json`).
