# Fathu Dives — Dive the Wild Heart of Dhangethi

A production-quality website for **Fathu Dives**, a locally operated scuba diving
centre on Dhangethi Island, South Ari Atoll, Maldives. Built as a complete
island-and-diving experience: whale shark and manta encounters, dive packages,
courses, dive sites, an island destination guide, a booking-enquiry workflow,
and a protected admin portal.

> All copy, pricing, imagery and reviews are polished **placeholders** designed to
> be replaced with the client's final content. Prices are clearly labelled as
> temporary throughout.

## Tech stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS v4** with a custom ocean/island design system
- **shadcn/ui** (base-ui) components + **Lucide** icons
- **Motion for React** for subtle, reduced-motion-aware animation
- **next/font** — Cormorant Garamond (display) + Manrope (body)
- **Supabase-ready** architecture (auth, database, RLS) with a mock-data fallback
- Vercel-ready deployment

## Getting started

```bash
pnpm install
pnpm dev
```

The site runs immediately on **typed sample data** — no database required. Open
[http://localhost:3000](http://localhost:3000).

### Admin portal

Visit [`/admin`](http://localhost:3000/admin). Until Supabase is connected, use
the demo login:

- **Email:** `admin@fathudives.com`
- **Password:** `demo`

## Project structure

```
app/
  (site)/                 # Public website (shared header/footer/floating CTA)
    page.tsx              # Homepage
    dive-packages/        # Listing + /[slug] detail
    dive-courses/         # Listing + /[slug] detail
    dive-sites/           # Listing + /[slug] detail
    discover-dhangethi/   # Destination guide
    about/  gallery/  contact/
    privacy/ terms/ cancellation/
  admin/                  # Protected portal (login, dashboard, management)
  actions/                # Server actions (enquiry, auth, admin)
  sitemap.ts  robots.ts
components/
  home/                   # Homepage sections
  packages/ dive-sites/ courses/   # Feature components
  site/                   # Shared UI (header, footer, cards, gallery, forms…)
  admin/                  # Admin UI
  ui/                     # shadcn primitives
lib/
  data/                   # Data-access layer + mock data (swap for Supabase)
  supabase/               # Browser + server clients, DB types
  media.ts                # ← Central media manifest (see below)
  site-config.ts          # Contact details, nav, socials
  types.ts  constants.ts  utils.ts
supabase/
  schema.sql              # Full schema + RLS policies
```

## Replacing placeholder media

**All image and video references live in one file:** [`lib/media.ts`](lib/media.ts).
Changing a URL there updates it everywhere — you never edit components to swap
media.

```ts
// lib/media.ts
export const media = {
  hero: {
    video: '',                       // add a hosted .mp4 URL to enable the hero video
    poster: '/images/hero-ocean.png',
  },
  experiences: { whaleShark: '/images/whale-shark.png', /* … */ },
  // …
}
```

- **Images** live in `public/images/`. Replace the files (keep the names) or point
  `media.ts` at new paths / a CDN / Supabase Storage.
- **Hero video:** set `media.hero.video` to a hosted MP4 (Supabase Storage, Mux,
  Cloudflare Stream, etc.). While empty, the poster image is shown. **Large video
  files are intentionally not committed to the repo.**
- **Gallery videos:** add items with `mediaType: 'video'`, a `posterUrl`, and a
  hosted `videoUrl` in `lib/data/gallery.ts` (or via Supabase later).
- All images use `next/image` with descriptive alt text.

## Connecting Supabase

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor. It creates
   all tables, enums, triggers, indexes and **Row Level Security** policies:
   - Public visitors can **read active content** and **insert enquiries**.
   - Only authenticated **admin** users can manage content or read enquiries.
3. Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=       # server only — never exposed to the browser
   NEXT_PUBLIC_SITE_URL=https://fathudives.com
   ```
4. Sign up a user through Supabase Auth, then promote them:
   ```sql
   update public.profiles set role = 'super_admin' where email = 'you@example.com';
   ```

The data-access layer in `lib/data/` automatically uses Supabase when the env
vars are present and falls back to mock data otherwise, so the UI never breaks
during the transition.

## Booking & payments

The booking flow is **enquiry-first**: select a package → enter travel and diver
details → submit → admin reviews and replies with a quotation/confirmation. The
schema includes a `bookings` table and payment fields (`payment_provider`,
`deposit_paid`, …) **prepared** for a future deposit step (BML, Stripe, or another
approved provider). No payment gateway is connected yet.

## SEO & accessibility

- Per-page + dynamic metadata, Open Graph & Twitter cards, canonical URLs
- `sitemap.xml`, `robots.txt`, breadcrumbs, semantic headings
- JSON-LD structured data: LocalBusiness, FAQ, and Tour/Product where relevant
- Keyboard-accessible nav, mobile menu and lightbox; visible focus states;
  reduced-motion support; labelled, validated forms

## Deployment

Deploy to Vercel. Add the environment variables from `.env.example` in the
Vercel project settings. The site builds and runs without them (mock data), and
lights up the database + admin persistence once they're present.

---

**Born in Dhangethi. Guided by the ocean.**
"# fathudives" 
