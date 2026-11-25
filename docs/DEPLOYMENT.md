# Deployment Guide (free-tier friendly)

The stack splits into three independently deployable pieces:

```
GitHub Pages (static React build)
        │  HTTPS fetch /api/*
        ▼
Render free web service (Express API)
        │  Mongoose
        ▼
MongoDB Atlas M0 (free, permanent)
```

The **Pages build is already live** (static catalogue snapshot, no admin).
Everything below is what turns it into a shop with a working admin panel.

## 1. MongoDB Atlas (free M0)

1. Sign up at <https://cloud.mongodb.com> and create a **Free M0** cluster — pick the provider/region
   closest to the audience.
2. **Database Access** → add a user (e.g. `rebuildapp`) with *Autogenerate Secure Password*.
   **Network Access** → *Allow access from anywhere* (`0.0.0.0/0`), because Render's free tier uses
   rotating egress IPs.
3. Clusters → **Connect** → *Drivers* → *Node.js* → copy the connection string, substitute the
   password (URL-encode `@ : / ? # [ ] %`), append the database name **and `authSource=admin`**:

   `…mongodb.net/rebuild-fitness?authSource=admin&retryWrites=true&w=majority`

   `authSource=admin` is required — Atlas stores database users in `admin`, and a database name in
   the path otherwise makes the driver authenticate against that database and fail with
   `code 8000 / bad auth`.

## 2. Backend (Render free web service)

**Option A — Blueprint (recommended):** Render dashboard → New + → Blueprint → pick this repo.
Render reads `render.yaml` (rootDir `server`, health check `/api/health`, auto-deploy on push). Fill
in the `sync: false` values: `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (leave `JWT_SECRET`
alone — Render generates it).

**Option B — manual:** Web Service with the same settings as the blueprint: root directory
`server`, build `MONGOMS_DISABLE_POSTINSTALL=1 npm ci --include=dev && npm run build`, start
`npm start`, health check `/api/health`, and the env vars from [.env.example](../.env.example).

- **Health check:** `GET /api/health`
- **CORS:** `https://zeeshanshaikh95.github.io,http://localhost:5173`
- **Uploads:** without `CLOUDINARY_*` the API stores uploads on local disk (`server/uploads`,
  ephemeral on Render). Configure Cloudinary to keep images across redeploys.

## 3. Frontend (GitHub Pages)

Fully automated: `.github/workflows/deploy-pages.yml` builds and deploys on every push to `main`
that touches the client.

- **API URL wiring:** set the repository variable `VITE_API_URL` (Settings → Secrets and variables →
  Actions → Variables) to the Render URL, e.g. `https://rebuild-fitness-api.onrender.com`.
- **Turn off the snapshot:** set the repository variable `VITE_DEMO_CATALOGUE` to `false` once the
  API is live, otherwise the site keeps reading the committed catalogue snapshot.
- SPA deep links resolve through `404.html` (copied by the workflow).
- `robots.txt` / `sitemap.xml` / static OG tags already point at the Pages URL; swap in a custom
  domain there if one is purchased later.

## 4. Post-deploy checklist

- [ ] `https://<api>/api/health` returns `{"ok":true}`
- [ ] Admin login works from the Pages domain (CORS)
- [ ] WhatsApp number set in Admin → Settings; test a plan message
- [ ] Prices filled in Admin → Programs (or intentionally left as “price on request”)
- [ ] Real member reviews approved in Admin → Reviews
- [ ] Admin password changed from the seeded value (forced on first login)
- [ ] `VITE_DEMO_CATALOGUE=false` and `VITE_API_URL` set, then redeploy Pages
