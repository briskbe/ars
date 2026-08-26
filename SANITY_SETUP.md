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
| Contactformulier — berichten | `submission` (collection) | Alle inzendingen van het contactformulier, gesorteerd op nieuw / gelezen / afgehandeld |
| Sollicitaties — op een vacature | `application` (collection) | Sollicitaties via de knop *Solliciteren* bij een vacature, met CV |
| Sollicitaties — spontaan | `application` (collection) | Open sollicitaties via het formulier onderaan de vacaturepagina |
| Site-instellingen | `siteSettings` (singleton) | Logo, navigation, contact details, footer, address, hours, map URLs |
| Homepagina | `homePage` (singleton) | All sections of `/`: hero copy + image, services intro, about, why-us, jobs banner, contact intro |
| Contactpagina | `contactPage` (singleton) | All sections of `/contact`: hero, contact cards, form copy, dropdown service options, map header |
| Vacaturepagina | `vacaturesPage` (singleton) | All sections of `/vacatures`: hero, benefits cards, listings headers, application copy |
| Diensten | `service` (collection) | The 8 service cards — drag to reorder, add/remove freely |
| Vacatures | `vacature` (collection) | All job postings (internal + subcontractor). Toggle `Actief` to hide |

Icons are picked from a fixed list (lucide-react) — see
`sanity/lib/iconList.ts` to add more options.

## De drie postvakken

Alle formulieren op de site komen binnen in de Studio, elk in een eigen
postvak bovenaan het menu:

| Postvak | Gevoed door |
| --- | --- |
| **Contactformulier — berichten** | het contactformulier op `/contact` én dat onderaan de homepagina |
| **Sollicitaties — op een vacature** | de knop *Solliciteren* bij een specifieke vacature |
| **Sollicitaties — spontaan** | het formulier *Open sollicitatie* onderaan `/vacatures` |

Elk document zegt zelf waar het vandaan komt. Bovenaan staat **Binnengekomen
via** — bijvoorbeeld "Contactformulier — contactpagina" of
"Sollicitatieformulier — op een specifieke vacature" — en in de lijst staat
dezelfde herkomst onder elke naam. Bij een sollicitatie op een vacature staat
daar de functietitel; bij een spontane sollicitatie staat er "Open
sollicitatie" en of er een CV bij zit.

Elk postvak heeft dezelfde vier weergaven: **Nieuw**, **Gelezen**,
**Afgehandeld** en **Alle**.

Open een bericht en gebruik de knoppen onderaan om de status te wijzigen:
*Markeer als gelezen*, *Afgehandeld*, *Terug naar nieuw*. Die wijziging is
meteen actief — er is geen publiceerstap. Onder **Opvolging** staat een veld
voor interne notities; dat is alleen zichtbaar in de CMS.

Definitief wissen kan met **Bericht verwijderen** of **Sollicitatie
verwijderen**, in hetzelfde knoppenmenu onderaan (klik op het pijltje naast de
hoofdknop). Er volgt eerst een bevestiging — daarna is het echt weg, zonder
prullenbak. Bij een sollicitatie verdwijnt ook het CV.

Wat de bezoeker invulde staat als alleen-lezen in het document: het is een
verslag van wat binnenkwam, geen document om aan te passen. Nieuwe berichten
en sollicitaties kunnen niet handmatig aangemaakt worden — ze komen uitsluitend
van de site.

### E-mailmeldingen

Bij elk nieuw bericht en elke nieuwe sollicitatie kan er automatisch een mail
naar het team gaan. Daar is geen aparte maildienst voor nodig: de site logt in
op de eigen mailbox (bijvoorbeeld `info@ars-metals.be`) en verstuurt van
daaruit.

Wie de melding krijgt, staat in de CMS: **Site-instellingen → Meldingen naar**.
Meerdere adressen kunnen; leeg laten gebruikt het e-mailadres van de site.

De inloggegevens van de mailbox horen in de Vercel-omgevingsvariabelen:

| Variabele | Waarde |
| --- | --- |
| `SMTP_HOST` | de mailserver van je provider |
| `SMTP_PORT` | `587` (of `465` voor directe SSL) |
| `SMTP_USER` | het volledige e-mailadres |
| `SMTP_PASS` | het wachtwoord, of een app-wachtwoord |
| `SMTP_FROM` | optioneel; standaard hetzelfde als `SMTP_USER` |

Veelgebruikte providers:

- **Google Workspace** — `smtp.gmail.com`, poort `587`. Vereist een
  *app-wachtwoord*: 2-factor-authenticatie aanzetten en er daarna één
  aanmaken. Het gewone wachtwoord werkt niet.
- **Microsoft 365** — `smtp.office365.com`, poort `587`. SMTP AUTH staat
  standaard **uit** en moet per mailbox aangezet worden in het
  beheerdersportaal.
- **Klassieke hosting (Combell, One.com, …)** — meestal `smtp.<jouwdomein>` of
  de mailserver uit de handleiding van je host, poort `587` of `465`, met het
  gewone mailboxwachtwoord.

Zonder deze variabelen worden er geen meldingen verstuurd — de formulieren
blijven gewoon werken en alles komt nog steeds in de CMS. Mislukt het
versturen, dan blijft de inzending ook bewaard: de melding is extra, nooit de
enige kopie. In de Vercel-logs staat dan waarom.

De mail heeft *reply-to* op de afzender staan, dus rechtstreeks antwoorden komt
bij de bezoeker of sollicitant terecht. Bij een sollicitatie zit er een link
naar het CV in, en elke melding heeft een link die het document meteen in de
CMS opent.

### CV's

Een meegestuurd CV staat als bestand in de sollicitatie; klik erop om het te
openen of te downloaden. Toegestaan zijn PDF, DOC en DOCX tot **4 MB** — die
grens komt van Vercel, dat grotere uploads weigert voor ze de server bereiken.
Een te groot bestand wordt al in de browser tegengehouden met een duidelijke
melding, dus niemand verliest zijn sollicitatie aan een mislukte upload.

Bij een sollicitatie op een vacature is een CV verplicht; bij een spontane
sollicitatie niet. De vacature wordt ook als titel bewaard, niet alleen als
verwijzing — zo blijft zichtbaar waarop iemand solliciteerde, ook nadat die
vacature is ingevuld en verwijderd.

### Hoe het technisch werkt

Het contactformulier post naar `/api/contact`, de sollicitatieformulieren naar
`/api/sollicitatie` (Next.js route handlers). Die valideren de velden, uploaden
een eventueel CV als bestand naar Sanity en maken een `submission`- of
`application`-document aan met een schrijftoken. Daarvoor is `SANITY_API_WRITE_TOKEN` nodig in de omgeving —
**ook op Vercel**, niet alleen lokaal. Zonder dat token krijgt de bezoeker een
foutmelding te zien in plaats van een valse bevestiging.

Elk formulier bevat een verborgen honeypot-veld: bots vullen het in, mensen
zien het niet. Zulke inzendingen worden stilzwijgend genegeerd.

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
    writeClient.ts        # write-enabled client, server-side only
    inboxActions.ts       # status + delete buttons for both inbox types
    notify.ts             # SMTP notification mail via the site's own mailbox
    formatSubmittedAt.ts  # date formatting shared by the inbox previews
  schemas/
    objects/              # reusable inline objects
    documents/            # singletons + collections
    index.ts              # registers everything
scripts/
  seed-sanity.ts          # one-off seeder (run once after init)
app/studio/[[...tool]]/   # Next.js route that mounts the Studio
app/api/contact/route.ts       # contact form posts -> submission documents
app/api/sollicitatie/route.ts  # application posts + CV upload -> application documents
app/components/useContactForm.ts      # shared state for the two contact forms
app/components/useApplicationForm.ts  # shared state for the two application forms
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
- **Formulier geeft een foutmelding**: `SANITY_API_WRITE_TOKEN` ontbreekt of
  is verlopen. Check de Vercel-omgevingsvariabelen en de serverlogs — bij een
  mislukte opslag wordt het bericht daar gelogd, zodat het niet verloren gaat.
- **CV-upload mislukt**: bestanden boven 4 MB worden geweigerd (limiet van
  Vercel). Alleen PDF, DOC en DOCX zijn toegestaan.
- **Studio shows "CORS error"** in production: add your domain to
  sanity.io/manage → API → CORS Origins.
- **Edits don't appear within 60s**: hard-refresh — the ISR tag is `sanity`
  and revalidates on the next request after the timeout.
