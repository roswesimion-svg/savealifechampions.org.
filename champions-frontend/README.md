# Save A Life Champions — Frontend

Standalone frontend for **savealifechampions.org**. This is a separate app/
domain from the main Save A Life Africa site, but it has **no database of
its own** — it calls the same backend as savealifeafrica.org, via a small
additive `/api/champions/*` module (see `backend-changes/` in the project
root, or `backend/server/controllers/championController.ts` in the main
repo).

## Local development

```bash
cp .env.example .env
# edit .env: point VITE_API_BASE_URL at your running backend
npm install
npm run dev
```

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the existing Save A Life backend API, e.g. `https://api.savealifeafrica.org/api` |
| `VITE_MAIN_SITE_URL` | Main site URL — used for "Donate Now", the QR code, and the "See Our Work" section |

## Routes

- `/` — the main Champions experience (hero, live stats, leaderboard, live
  activity, before/after impact slider, challenge, levels, badges, "See Our
  Work" → savealifeafrica.org).
- `/live` — simplified TV/broadcast-mode layout (for OBS, projectors, TV
  screens) with a QR code.
- `/champions/:id` — a Champion's shareable public profile.

## What this app intentionally does NOT do

- **No payment processing.** "Donate Now" and the QR code link out to the
  existing, already-built donation flow on savealifeafrica.org
  (`/campaigns/:slug`), so M-Pesa/Stripe/PayPal logic is never duplicated.
- **No public donation amounts**, anywhere — every backend endpoint this
  app calls strips individual monetary amounts server-side, not just in
  the UI (see `getChampionLeaderboard` / `getChampionActivity` in
  `championController.ts`).

## Backend requirements

Requires the `champions` migration to have been run once against the main
backend's database:

```bash
cd backend
npx tsx migrate_champions.ts
```

This adds two nullable columns to `campaigns` (`champions_featured`,
`champions_qr_override`) and a new `champion_challenges` table. Nothing
existing is altered or removed.

## Admin

Which campaign drives the Champions hero, its QR destination, and
challenges are managed from the existing Save A Life admin panel under
**Champions** in the sidebar (`/management-hub/champions`,
`/management-adm/champions`, `/management-mod/champions` depending on
role) — gated by the existing `manage_campaigns` permission. No separate
admin login.
