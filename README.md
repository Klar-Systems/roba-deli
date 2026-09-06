# Roba Deli — website (Next.js)

Premium marketing site for **Roba Deli**, Helsinki's New-York-style sandwich deli on Iso
Roobertinkatu 1. Dark + gold "quiet-luxury" brand, English, sandwich-led.

**Stack:** Next.js (App Router) · TypeScript · Tailwind. Built to import & edit natively in v0.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/
  layout.tsx        # fonts (Montserrat + Inter), metadata
  globals.css       # design system (dark/gold), all component styles, animations
  page.tsx          # composes the sections
components/          # Nav, Hero (scroll-scrub), Deals, Menu (tabs), Craft,
                     # Smoothies (twirl), Reviews, Gallery, Visit, Footer, ScrollFX
lib/data.ts         # menu + prices, smoothies, deals, reviews, gallery (typed)
public/images/      # logo (transparent), food/smoothie/gallery images
content/            # menu/about/contact source-of-truth + original menu artwork
IMAGE-PROMPTS.md    # AI prompts for clean replacement imagery
```

## Signature features

- **Cheese-scrape hero** (`components/Hero.tsx`) — a pinned, scroll-driven hero. It scrubs the
  still `signature-raclette-real.png` (zoom + melt overlay). Drop in `public/images/hero-scrape.mp4`
  (+ optional `.webm`) and it auto-switches to true frame-by-frame cheese-melt-on-scroll.
- **Smoothies "alive"** (`components/Smoothies.tsx` + `ScrollFX`) — cups twirl in on scroll, float,
  and spin on hover.
- Soft reveals, parallax, gold hover states. All respect `prefers-reduced-motion`.

## Menu — which file is the truth

`lib/data.ts` is authoritative and is what robadeli.fi serves; `content/menu.md`
mirrors it. The three `content/menu-*.png` board photos are the **June 2026**
in-store screens, superseded by the owner-approved content of 2026-07-04
(`432ec02`). Do not transcribe from the photos. See `content/menu.md`.

## To finalize

1. Replace placeholder imagery via `IMAGE-PROMPTS.md` (esp. `hero-scrape.mp4`).
