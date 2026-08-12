# Crafter.io

Marketing site for Crafter.io — an independent app studio building mobile
applications and AI-powered experiences.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. The whole
site is one statically-prerendered page.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see Configuration
npm run dev                  # http://localhost:3000
```

| Script          | What it does                      |
| --------------- | --------------------------------- |
| `npm run dev`   | Dev server                        |
| `npm run build` | Production build                  |
| `npm run start` | Serve the production build        |
| `npm run lint`  | ESLint (flat config)              |

Typecheck with `npx tsc --noEmit`.

## Editing the site

**All copy, links and product data live in `lib/data/`** — components read from
it and never hardcode content.

| File         | Contains                                                        |
| ------------ | --------------------------------------------------------------- |
| `site.ts`    | Company identity, contact details, founder profile, navigation   |
| `apps.ts`    | The product catalogue and the Revive case study                  |
| `company.ts` | Intro statement, the four build stages, the technology list      |

### Adding a new app

1. Append an object to `apps` in `lib/data/apps.ts`.
2. Add a matching entry to the `screens` registry in
   `components/ui/app-screens.tsx` (the phone mockup).

The apps grid, projects index, hero card stack, footer and structured data all
derive from that array — nothing else needs changing.

## Configuration

Copy `.env.example` to `.env.local`. Every variable is optional, and the UI
**hides** the corresponding link when one is unset rather than rendering a
placeholder or a broken URL.

| Variable                     | Effect when unset                                  |
| ---------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_LINKEDIN_URL`   | Every "Connect on LinkedIn" button is hidden        |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Play Store buttons without a listing URL are hidden |
| `NEXT_PUBLIC_SITE_URL`       | Canonical/OG URLs fall back to `https://crafter.io` |

Per-app Play Store listing URLs live in `apps.ts` as `playStoreUrl`. An app
with `playStoreUrl: null` shows no Play Store CTA, and its `status` should stay
`"In development"` until it is genuinely published.

## Content rules

The site deliberately contains **no invented data** — no download counts,
ratings, user numbers, testimonials, awards or partnerships, and no claim that
an app is published while it isn't. Add real figures only when you have them.

Revive touches addiction recovery, so its copy stays non-clinical and its
`disclaimer` field ("a self-help support tool, not medical care…") renders
anywhere the app is described at length.

App mockups are CSS-drawn design references, not screenshots, and the UI says
so where it shows them.

## Notes

Further architectural detail — design tokens, the two animation systems,
accessibility and layout constraints — is in `CLAUDE.md`.
