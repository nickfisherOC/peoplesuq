# People Suq

**Real People. Real Conversations.**

The website for **People Suq** — a media and community platform that brings
attention to the issues affecting our communities through stories,
conversations, media, and action.

People Suq is part of a connected family of brands:

- **SUQ MEDIA** — the business (commercial media services)
- **People Suq** — the voice (this site)
- **Markin K Kossowski Foundation** — community impact

---

## Tech stack

- **[Next.js 15](https://nextjs.org/)** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- File-based, typed content (no CMS required to start; easy to swap in later)

Chosen for SEO (SSR/SSG + metadata + sitemap), speed, accessibility, reusable
components, and clean paths to Shopify / YouTube / Spotify / a CMS.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Project structure

```
src/
  app/                     # Routes (App Router)
    page.tsx               # Home
    podcast/               # Podcast hub + [slug] episode pages
    issues/                # Issues hub + [slug] issue pages
    stories/               # Stories feed + [slug] + /share
    merch/                 # Merch (Shopify-ready)
    impact/                # Community impact + Foundation
    about/  contact/       # About, Contact
    get-involved/          # "Join the Conversation" hub
    privacy/  terms/       # Legal (template placeholders)
    sitemap.ts robots.ts   # SEO
    icon.svg               # Favicon
    globals.css            # Design system (brand tokens, typography)
  components/              # Reusable UI (Header, Footer, cards, MediaFrame…)
  content/                # Typed content collections (the "CMS" for now)
    types.ts issues.ts episodes.ts stories.ts products.ts
  lib/
    site.ts               # Nav, social, listen links, contact, partner links
```

## Brand & design system

Defined in [`src/app/globals.css`](src/app/globals.css):

- **Purple** (`purple-*`) — primary brand colour
- **Orange** (`orange-*`) — emphasis, CTAs, highlights, accents
- **Ink / charcoal / graphite** — dark grounds
- Display type: **Archivo** (`.headline`, `.eyebrow`); body: **Inter**

Continuity with SUQ MEDIA's palette, used in a bolder, more editorial way.

### Placeholder imagery

Rather than generic stock photos, empty image slots render **branded duotone
graphic placeholders** ([`MediaFrame`](src/components/MediaFrame.tsx)). To use a
real photo, set the content item's `image.src` to a local `/public` path or a
remote URL (add the host to `images.remotePatterns` in
[`next.config.ts`](next.config.ts)).

## Editing content

All content lives in `src/content/*` as typed modules. Add/edit an entry and the
site, sitemap, and related-content links update automatically.

- **Issues** (`issues.ts`) — real topic hubs (full copy).
- **Episodes** (`episodes.ts`), **Stories** (`stories.ts`), **Products**
  (`products.ts`) — currently **clearly-marked placeholders** (`isPlaceholder:
  true`, shown with a "Sample" tag). Replace with real content and remove the
  flag.

> No real people, organizations, statistics, or Foundation initiatives are
> invented anywhere — placeholders are used until real content is provided.

## Wiring up integrations later

- **Podcast (YouTube / Spotify / Apple):** set per-episode `youtubeId` (enables
  an embedded player) and `links` in `episodes.ts`; set global fallbacks in
  `lib/site.ts` (`listenLinks`).
- **Shopify (merch):** set each product's `shopUrl` in `products.ts` (buy link
  or product URL). The card automatically becomes a real "Shop" link. For a full
  catalog, `products.ts` can be replaced by a Shopify Storefront API fetch —
  the `Product` type is the contract.
- **CMS:** any headless CMS can populate the same `content/*` shapes
  (`src/content/types.ts`) — pages don't need to change.
- **Partner links:** update `connectedBrands` (SUQ MEDIA + Foundation) and
  `social` in `lib/site.ts`.

## Deploying to Vercel

The app runs as a full Next.js app (SSR, the `/api/cart` route, image
optimization), so it's hosted on **Vercel**, with Network Solutions kept only as
the domain registrar / DNS.

1. On [vercel.com](https://vercel.com), **Add New → Project** and import the
   GitHub repo (`nickfisherOC/peoplesuq`). Vercel auto-detects Next.js — no build
   settings to change.
2. Add **Environment Variables** (Project → Settings → Environment Variables).
   These are NOT in the repo (`.env.local` is git-ignored), so they must be added
   here — copy the values from your local `.env.local`:
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_STOREFRONT_TOKEN`
   - `SHOPIFY_EXCLUDE_COLLECTIONS` (`frontpage`)
   - `SHOPIFY_PRODUCT_HANDLES` (optional safety net)
3. **Deploy** → you get a `*.vercel.app` URL to verify.
4. Add the custom domain (Project → Settings → Domains → `peoplesuq.com` + `www`)
   and set the DNS records Vercel shows you at Network Solutions. Vercel issues
   SSL automatically once DNS resolves.

Pushing to `main` triggers an automatic redeploy.

## Migrated from SUQ MEDIA

Real content and assets have been migrated from suqmedia.com and the Foundation
site, then adapted to the People Suq voice:

- **Podcast** — Season One: six real, planned episodes (`episodes.ts`, all
  `comingSoon`), real hosts/co-founders Kerry & Krzysztof (`people.ts`) with
  real photos, the "Become a guest" flow, and the "Conversations that matter"
  positioning.
- **Foundation** — real name (*Markin K Kossowski Foundation for Hope*), tagline
  (*Restoring Hope. Rebuilding Lives.*), NGO description, live URL, and emblem
  (`/public/images/foundation-emblem.svg`). The **40%-of-every-dollar** pledge is
  attributed to SUQ MEDIA (the commercial arm), not People Suq.
- **Merch** — the two genuinely People Suq-branded products (Tee, Crewneck) with
  real images. SUQ MEDIA hoodie/cap and the custom-apparel service stay on SUQ
  MEDIA (linked, not copied).
- **Impact** — eight real community partners (`partners.ts`, logos in
  `/public/images/partners`).
- **Assets** in `/public/images` (podcast logo, host photos, product shots,
  SUQ MEDIA + Foundation logos, partner logos).

Commercial SUQ MEDIA content (music, custom-apparel service, studio rental,
sponsorship/media-kit) was deliberately **not** migrated — People Suq links back
to SUQ MEDIA for those.

## Wiring up integrations later

- **Podcast (YouTube / Spotify / Apple):** set per-episode `youtubeId` (enables
  an embedded player) and `links` in `episodes.ts`; set global fallbacks in
  `lib/site.ts` (`listenLinks`). Set `date`/`durationMinutes` and clear
  `comingSoon` as each episode publishes.
- **Shopify (merch):** already integrated — see **Connecting Shopify** below.
- **CMS:** any headless CMS can populate the same `content/*` shapes
  (`src/content/types.ts`) — pages don't need to change.
- **Partner links:** add `href` to each entry in `partners.ts`; update
  `connectedBrands` (SUQ MEDIA + Foundation) in `lib/site.ts`.

## Connecting Shopify

The merch shop is fully integrated with the Shopify **Storefront API**: products
are pulled live, an on-site cart is provided, and checkout hands off to
Shopify's hosted, PCI-compliant checkout (the app never handles payment data).
Everything is env-gated — with no token set, the site falls back to the local
placeholder merch and hides the cart.

**To go live:**

1. In Shopify admin → **Settings → Apps and sales channels → Develop apps →
   Create an app**.
2. Under **Configuration → Storefront API**, enable:
   `unauthenticated_read_product_listings`,
   `unauthenticated_read_product_inventory`,
   `unauthenticated_read_checkouts`, `unauthenticated_write_checkouts`.
3. **Install** the app and copy the **Storefront API access token**.
4. Create a **collection** for People Suq / cause merch (so SUQ MEDIA's
   commercial apparel never appears here) and note its handle.
5. Fill in `.env.local` (already created, git-ignored):

   ```
   SHOPIFY_STORE_DOMAIN=0i9uvm-p2.myshopify.com
   SHOPIFY_STOREFRONT_TOKEN=<paste token>
   SHOPIFY_COLLECTION_HANDLE=<your-collection-handle>
   ```

6. Restart the dev server. The cart appears, products go live, and checkout
   works.

Product data flows through `src/lib/shopify.ts` → `src/lib/merch.ts`; the cart
lives in `src/components/cart/*` and the API route `src/app/api/cart`. Product
imagery comes from `cdn.shopify.com` (already allow-listed in `next.config.ts`).

## Before launch

- [ ] Add real listen links (YouTube / Spotify / Apple) + social handles in
      `lib/site.ts` — SUQ MEDIA's were placeholders, so these are still `#`
- [ ] Swap `contact` email for a dedicated People Suq inbox (currently the real
      `info@suqmedia.com`)
- [ ] Populate real Stories (still clearly-marked placeholders — no real
      community stories existed to migrate yet)
- [ ] Publish episodes: add video/audio links, dates, durations; clear
      `comingSoon`
- [ ] Add the Shopify Storefront token to `.env.local` to make the shop live
      (see **Connecting Shopify**)
- [ ] Have **Privacy** and **Terms** reviewed by a professional (templates)
- [ ] Confirm the production domain in `lib/site.ts` (`site.url`)
