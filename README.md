# Shubham Pant — Portfolio

"Terminal Orbit" — a dark, terminal-sparse portfolio for a backend engineer,
with a Three.js orbital hero scene that maps the **Chronos** distributed job
scheduler.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS 3.4** with CSS-variable design tokens
- **Three.js** via **@react-three/fiber** + **@react-three/drei**
- **Framer Motion** (scroll reveal + mouse parallax)
- Deploys to **Vercel**

## Develop

Requires **Node 20** and **pnpm 9**.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
```

## Structure

```
app/(marketing)/   routes: / · /work · /work/[slug] · /about · /contact · /writing
components/        ui primitives, sections, three/ (WebGL scene + SVG fallback)
content/           bio, stack, timeline, projects, chronos-features
lib/               helpers (cn, site config)
```

## Notes

- The hero scene lazy-loads (never blocks first paint) and falls back to a
  static SVG on mobile and for `prefers-reduced-motion`.
- All motion (reveal, parallax, orbit) is disabled under `prefers-reduced-motion`.
- Set `NEXT_PUBLIC_SITE_URL` in the deploy environment for absolute OG/sitemap URLs.
