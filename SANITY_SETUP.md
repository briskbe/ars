# Sanity CMS — Setup Guide

The site is now driven by [Sanity](https://www.sanity.io/) as a headless CMS,
embedded in the same Next.js app and deployable to Vercel as a single project.

The admin (Studio) lives at **`/studio`** in the running app — sign in with
your Sanity account to manage all content.

---

## 1. Create a Sanity project

You only need to do this once.

```bash
npx sanity@latest init --env
```

Choose:
- **Create new project** → name it `ARS Metals`
- **Dataset**: `production`
- **Output path**: keep default (the wizard writes a `.env`/`.env.local` for you)
- **TypeScript schema**: it asks if you want example schemas — say **No**, our
  schemas already live under `sanity/schemas/`

This creates a project on sanity.io and gives you a **Project ID** + a free
plan with one admin user (Solo).

## 2. Configure environment variables

Copy `.env.example` → `.env.local` and fill in the values from the previous
step:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01

# Only needed for the seed script — sanity.io/manage → API → Tokens
SANITY_API_WRITE_TOKEN=sk...
```

## 3. Seed the dataset with the original site content

The seed script populates Sanity with all the copy, services, and vacatures
that were previously hard-coded. Without this step the pages will render with
fallback text only.

```bash
npm run sanity:seed
```

You should see ✓ for siteSettings, homePage, contactPage, vacaturesPage,
8 services and 6 vacatures.

## 4. Run locally

```bash
npm run dev
```

- App: <http://localhost:3000>
- CMS:  <http://localhost:3000/studio>

Edit anything in the Studio, click **Publish**, and the page revalidates
within 60 seconds (configured in `sanity/lib/fetch.ts`).

## 5. Deploy to Vercel

1. Push the repo (already on `claude/integrate-craft-cms-dCpV4`).
2. Import the project in Vercel.
3. Add the same env vars from `.env.local` under **Project → Settings →
   Environment Variables**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_WRITE_TOKEN` *(only needed if you re-run the seed from CI;
     not required for the live site)*
4. In sanity.io/manage → **API → CORS Origins**, add your Vercel domain
   (e.g. `https://ars-metals.vercel.app`) so the embedded Studio can talk to
   Sanity from production.
5. Deploy. The Studio is now reachable at `https://your-domain/studio`.

That's it — fully on Vercel, no separate VPS, no database to manage.

---

## What can the admin edit?

Inside `/studio`:

| Section | Document type | What it controls |
| --- | --- | --- |
| Site-instellingen | `siteSettings` (singleton) | Logo, navigation, contact details, footer, address, hours, map URLs |
| Homepagina | `homePage` (singleton) | All sections of `/`: hero copy + image, services intro, about, why-us, jobs banner, contact intro |
| Contactpagina | `contactPage` (singleton) | All sections of `/contact`: hero, contact cards, form copy, dropdown service options, map header |
| Vacaturepagina | `vacaturesPage` (singleton) | All sections of `/vacatures`: hero, benefits cards, listings headers, application copy |
| Diensten | `service` (collection) | The 8 service cards — drag to reorder, add/remove freely |
| Vacatures | `vacature` (collection) | All job postings (internal + subcontractor). Toggle `Actief` to hide |

Icons are picked from a fixed list (lucide-react) — see
`sanity/lib/iconList.ts` to add more options.

## Folder layout

```
sanity.config.ts          # Studio config (mounted at /studio)
sanity.cli.ts             # for `sanity deploy` / `sanity dataset` commands
sanity/
  env.ts                  # env-var helpers
  structure.ts            # left-rail structure for Studio
  lib/
    client.ts             # next-sanity client (read-only, public)
    fetch.ts              # server fetch with ISR (60s revalidate)
    image.ts              # urlFor() builder for image assets
    queries.ts            # GROQ queries used by pages
    iconList.ts           # whitelist of available icon names
    types.ts              # TypeScript types matching the GROQ shapes
  schemas/
    objects/              # reusable inline objects
    documents/            # singletons + collections
    index.ts              # registers everything
scripts/
  seed-sanity.ts          # one-off seeder (run once after init)
app/studio/[[...tool]]/   # Next.js route that mounts the Studio
```

## Common tasks

- **Add a new service**: Studio → Diensten → +. Pick an icon, fill title +
  description, set order.
- **Add a new vacature**: Studio → Vacatures → +. Choose category
  (intern/onderaannemer), pick icon, add requirements one per line.
- **Hide a vacature temporarily**: edit it, toggle off `Actief`, publish.
- **Change phone number / email / address site-wide**: Studio →
  Site-instellingen. All three pages pull from this single record.
- **Swap the hero image**: Studio → Homepagina → Hero → Hero — afbeelding.
  Same on Contact / Vacatures.

## Troubleshooting

- **"Missing environment variable" at build time**: `.env.local` is not set
  or Vercel envs are missing. The Studio route also needs them.
- **Studio shows "CORS error"** in production: add your domain to
  sanity.io/manage → API → CORS Origins.
- **Edits don't appear within 60s**: hard-refresh — the ISR tag is `sanity`
  and revalidates on the next request after the timeout.
