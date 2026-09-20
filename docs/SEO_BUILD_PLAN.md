# RapidRims SEO public routes — build plan

This file is the source of truth for the public-route SEO PR. Do not expand past it.

Repo: `jackschu88/rapidrimsllc`  
Live: https://rapidrimsllc.vercel.app  
Stack: Vite + TanStack Router/Start + React 19 + Tailwind. Routes in `src/routes/`.

**Do not** convert to Next.js.  
**Do not** touch login / CRM / PGlite / auth.

## Offer (what we actually do)

One-tech mobile on-car curb rash / cosmetic lip repair. Wheel stays on. Photo quote. Veteran-owned. Las Vegas Valley.

## Do not build

- Powder coating
- Cracked rims / weld / reman
- Fake brands or extra phones
- City doorway pages (`/wheel-repair-henderson` etc.)
- BMW / Porsche / Model 3 / Y / S / X farms
- Stock photos
- Keyword-stuffed name
- New frameworks

## Prices (keep exact)

- Light (1–2 lip spots): $100/rim
- Heavier on-car (grind, sand, polish or paint): $125–$150/rim
- Two+ same visit: $90–$100 each
- Veteran 10% with ID
- Real number is from photos. Some jobs are beyond on-car — say that.

## Bent / leaks

No product page. One sentence: send a photo; structural/crack may be a shop or replace.

## This PR — routes only

| Path | File | Notes |
|------|------|--------|
| `/` | tighten `src/routes/index.tsx` | do not rebuild |
| `/curb-rash-repair` | new | |
| `/mobile-rim-repair-las-vegas` | new | |
| `/service-area` | new | one page, all cities |
| `/pricing` | new | same numbers + FAQ |
| `/tesla-wheel-repair` | new | **only if** Tesla photos already exist in `public/` |

Cities on the service-area page (not separate URLs): Las Vegas, Henderson, North Las Vegas, Summerlin, Spring Valley, Enterprise.

Shared pieces: `QuoteCta` (text photos / existing number), `PriceBands`, `ServiceCities`, `JsonLd`. Match current look.

Each route: unique title + description + canonical (`https://rapidrimsllc.vercel.app` for now) using the same head pattern as `__root.tsx` / `index.tsx`. LocalBusiness JSON-LD; FAQPage on curb-rash, mobile, pricing. Offered services in schema must not include powder coat or cracks.

`public/sitemap.xml` + `public/robots.txt` (or existing server pattern). Include the new URLs. Disallow `/login` and `/api/*`.

Nav: Home, Curb rash, Mobile, Service area, Pricing.

## Done when

- `npm run typecheck` and `npm run build` pass
- CTA on every new page
- Zero powder-coat / cracked-rim service claims
- Auth untouched
- Branch `seo-public-routes` → PR to `main`

## Not this PR

GBP, reviews, ads, custom domain, case-study CMS.

If a later change adds Henderson clones or powder coat, this plan is being ignored.
