# Rebuild Sports & Fitness Center — Website

Mobile-first site for **Rebuild Sports & Fitness Center** (@rebuildfitnessstudio) — a strength and
conditioning floor in **Lal Baug, Parel, Mumbai 400012**. Primary conversion: browse the programme
board → add sessions to a plan → **book on WhatsApp** (no payment gateway, by design).

**Live preview:** https://zeeshanshaikh95.github.io/rebuild-fitness/ (GitHub Pages — static catalogue
snapshot, no admin; see [Hosting](#hosting--live-url)).

Built to the same house architecture as the client's other sites (React SPA + Express API + MongoDB,
protected admin panel, WhatsApp ordering), with a completely different design system: **forge black,
safety orange and turf blue**, condensed uppercase type, a two-line hero photo slider and a
gym-specific programme model.

> **Data policy:** the logo, photographs, address, phone number, hours and programs all come from the
> studio's own public presence. **No price is invented** — every program ships as *"price on
> request"*, matching how the studio quotes at the desk and on WhatsApp, and every price can be
> filled in from Admin → Programs. Programs are descriptive working names built from the equipment
> and services the studio publicly offers; rename or remove them in Admin → Programs. Reviews are
> deliberately empty until real members write them.

## Hosting / live URL

| Environment | URL | What works |
| GitHub Pages (live) | https://zeeshanshaikh95.github.io/rebuild-fitness/ | Programs, disciplines, program pages, plan, WhatsApp/Instagram booking, hero slider |
| Local (`npm run dev`) | http://localhost:5173 | Everything, including `/admin` and analytics |

Pages is static, so it cannot run the Express API. The Pages build reads a committed snapshot of the
catalogue (`client/public/demo/catalogue.json`, enabled by `VITE_DEMO_CATALOGUE=true`) instead of
showing empty states. Regenerate it after editing the seed catalogue:

```shell
npm run demo:snapshot        # builds the snapshot from server/src/seed/catalogueData.ts
```

Consequences of the preview build: the admin panel has no API behind it, and review/analytics writes
are skipped. To run it as a real site with a working admin, host the API and set the `VITE_API_URL`
repository variable plus `VITE_DEMO_CATALOGUE=false` — see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Push to `main` and `.github/workflows/deploy-pages.yml` rebuilds and redeploys automatically.

## Tech stack

| Layer | Technology |
| Frontend | React 18 + Vite 6 + TypeScript, Tailwind CSS 3, React Router 6, react-helmet-async |
| Backend | Node + Express 4 + TypeScript, Zod validation |
| Database | MongoDB + Mongoose 8 (Atlas in production; a bundled local mongod for dev) |
| Auth | JWT bearer tokens + bcrypt (12 rounds), protected `/api/admin/*` |
| Security | Helmet, CORS allow-list, rate limiting, Zod validation, secrets via env |
| Media | Multer uploads served from `/uploads` (swap in Cloudinary/S3 when the volume grows) |
| Hosting | Static SPA build + Node API + MongoDB Atlas |

## Structure

```
├── client/                  React SPA
│   ├── public/              the studio's own photographs, logo, favicon, robots, sitemap
│   │   └── demo/            catalogue.json — the snapshot the Pages build serves
│   └── src/
│       ├── admin/           Protected admin panel (lazy-loaded bundle)
│       ├── api/             Typed API client + endpoint map + demo snapshot reader
│       ├── components/      HeroSlider, ServiceCard, MiniCart, Wordmark, layout…
│       ├── context/         Plan / Settings / Toast providers
│       ├── hooks/           useApi, usePageView
│       ├── lib/             WhatsApp builder, analytics, formatting, brand assets
│       └── pages/           Public pages
├── server/
│   └── src/
│       ├── config/          Env config + Mongo connection
│       ├── controllers/     Public + admin handlers
│       ├── middleware/      Auth, errors, rate limits, uploads
│       ├── models/          Mongoose schemas
│       ├── routes/          /api and /api/admin routers
│       ├── seed/            Bootstrap, starter catalogue, snapshot builder
│       ├── services/        Settings singleton
│       ├── utils/           asyncHandler, slugify
│       └── validation/      Zod schemas for every write
└── .env.example
```

## Quick start

Prerequisites: Node 20+.

```shell
npm install

# 1 — configure the API
cp .env.example server/.env        # then edit JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 2 — local database (downloads a mongod binary on first run, persists in server/.data/mongo)
npm run dev:db

# 3 — in a second terminal: bootstrap admin + settings + starter catalogue
npm run seed

# 4 — run the API and the client
npm run dev
# Client: http://localhost:5173     API: http://localhost:4000/api/health
```

`npm run dev:all` runs the database, API and client together.

**Admin panel:** http://localhost:5173/admin — sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from
`server/.env`. A freshly bootstrapped account must choose a new password before the panel opens.

## Admin panel

* **Overview** — 7/30/90-day page views, program views, plan adds, booking messages, top programs and
  referrers, plus a warning when no WhatsApp number is configured.
* **Programs** — full CRUD, multi-image upload/reorder, options (session length, pack size, class
  tier) with per-option price and availability, popular / featured / new flags, archive & restore,
  SEO fields, display order.
* **Categories** — CRUD, reordering, live program counts. Deleting a category keeps its programs.
* **Reviews** — add, edit, approve, hide, delete. Only approved reviews reach the site.
* **Gallery** — images for the homepage strip and gallery page, with captions and links.
* **Settings** — identity, WhatsApp number, **hero slider slides**, announcement bar, studio story,
  enquiry templates, membership and cancellation copy.
* **Security** — forced first-login password change, 10 login attempts / 15 min, JWT re-validated
  against the database on every request, Zod validation on all writes.

## Booking behaviour

* Every booking button builds a `wa.me` link to **+91 85919 15437** (the number published on the
  studio's listing) with a pre-filled message listing the programs, options, quantities and
  estimated total.
* If the number is ever cleared in Settings, buttons fall back to the studio's Instagram DMs so the
  site is never a dead end.
* Prices are nullable end to end: blank means “Price on request”, never ₹0.

## Brand assets

* **Logo** — the studio's supplied mark (REBUILD between dumbbells, SPORTS AND FITNESS CENTER
  underneath) is used as artwork and never redrawn: `client/public/images/rebuild-logo.png` is the
  original, `-trim` is the transparent cut, `-chalk` is the chalk/orange cut used on dark surfaces,
  and `-light` is the transparent original for light surfaces. Favicons and the Apple touch icon are
  generated from the mark, and `og-image.jpg` is the logo over a darkened floor photograph.
* **Photography** — the seven photographs in `client/public/images/` are the studio's own floor,
  rig, sprint turf, conditioning machines and recovery room. Replace or add more through Admin →
  Programs and Admin → Gallery.
* **Palette** — rubber-floor black (`#08090A`), safety orange sampled from the logo (`#FF7A1A`),
  turf blue from the sprint track (`#1F45DA`), chalk type. Barlow Condensed for display, Inter for
  body, JetBrains Mono for index numbers; hard edges, hairlines and marking tape instead of cards.
* **Hero** — a cross-fading photo slider with a two-line condensed headline (the second line in
  orange), a clickable slide rail, progress bar, arrows, dots, keyboard and swipe support. Autoplay
  pauses on hover/focus and is disabled under `prefers-reduced-motion`.

## Scripts

| Command | Purpose |
| `npm run dev` | API + client together |
| `npm run dev:all` | Database + API + client in one terminal |
| `npm run dev:db` | Local dev MongoDB (persists in server/.data/mongo) |
| `npm run seed` | Bootstrap admin + settings, add the starter catalogue if empty |
| `npm run seed:reset` | Wipe catalogue records and re-create them |
| `npm run demo:snapshot` | Rebuild the static catalogue snapshot from the seed data |
| `npm run demo:catalogue` | Rebuild the snapshot from a running API instead |
| `npm run build` | Typecheck + build both workspaces |
| `npm run typecheck` | TypeScript project-wide |

## Environment variables

| Variable | Purpose |
| `PORT` | API port (4000) |
| `MONGODB_URI` | Mongo connection string |
| `JWT_SECRET` | Long random string for signing admin JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (12h) |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |
| `PUBLIC_SITE_URL` / `PUBLIC_API_URL` | Canonical URLs |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First admin account (seed only) |
| `UPLOAD_MAX_BYTES` / `UPLOAD_MAX_FILES` | Upload limits |

Client (optional): `VITE_API_URL`, `VITE_PUBLIC_SITE_URL`, `VITE_DEMO_CATALOGUE`.

## Roadmap to production

1. Confirm membership and pack prices, then fill them in Admin → Programs (or leave “price on
   request”).
2. Replace the descriptive program names with the studio's own names for its plans.
3. Add real member reviews through Admin → Reviews as they come in.
4. Set `JWT_SECRET`, a strong admin password and `CORS_ORIGINS` on the host; deploy the SPA build
   and API, and point MongoDB at Atlas.
5. Swap the Google Maps search link for the exact place URL in Admin → Settings if one is claimed.
