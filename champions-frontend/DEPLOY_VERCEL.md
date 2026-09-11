# Deploying Save A Life Champions on Vercel

You already have two Vercel projects for the main site:
- `save-a-life-project-original-fronte` → savealifeafrica.org
- `save-a-life-project-original-backen` → the API

This guide adds a **third** Vercel project for `champions-frontend`, and
tells you what to redeploy on the other two.

---

## 1. Redeploy the backend (picks up the new `/api/champions/*` routes)

The backend project doesn't change deployment settings — you just need to
push these files (already included in this package) and let Vercel
redeploy as usual:

- `backend/server/controllers/championController.ts`
- `backend/server/routes/championRoutes.ts`
- `backend/server.ts`
- `backend/cors-config.ts`
- `backend/migrate_champions.ts`

**Before or right after the deploy, run the migration once** against your
production database (it's additive — safe to run any time):

```bash
cd backend
# Make sure your .env / Vercel env vars point at the PRODUCTION database
npx tsx migrate_champions.ts
```

You should see:
```
Added champions_featured column.
Added champions_qr_override column.
champion_challenges table ready.
Champions migration completed successfully!
```

No new environment variables are needed on the backend — it reuses your
existing `DB_*` / database connection settings.

---

## 2. Redeploy the main frontend (picks up the new admin "Champions" page)

Same deal — no new settings, just push:

- `frontend/src/pages/admin/ChampionManager.tsx`
- `frontend/src/services/championAdminService.ts`
- `frontend/src/App.tsx`
- `frontend/src/components/admin/AdminSidebar.tsx`
- `frontend/src/components/admin/AdminSidebarSimple.tsx`

After it redeploys, log in as an admin and you'll see a new **Champions**
item in the sidebar.

---

## 3. Create the new Vercel project for `champions-frontend`

1. Push the `champions-frontend/` folder to its own GitHub repo (or a
   subfolder of an existing monorepo — either works with Vercel).
2. In Vercel: **Add New → Project** → import that repo.
3. Framework preset: **Vite**. Root directory: wherever `package.json`
   lives (repo root, or `champions-frontend/` if it's a monorepo).
4. Build command: `npm run build` (default). Output directory: `dist`
   (default).
5. **Environment Variables** (Project Settings → Environment Variables):

   | Name | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `/api` |
   | `VITE_MAIN_SITE_URL` | `https://savealifeafrica.org` |

   Using `/api` (not a full URL) works because `vercel.json` in this
   project already rewrites `/api/*` on this domain straight to your
   backend project (`save-a-life-project-original-backen.vercel.app`) —
   same pattern the main frontend already uses. This means **no CORS
   headers are needed in production** for this path. Double-check the
   destination URL in `champions-frontend/vercel.json` matches your real
   backend deployment URL before deploying.

6. Deploy. You'll get a `*.vercel.app` preview URL first — check it works
   end to end (hero loads, leaderboard populates, etc.) before pointing
   the real domain at it.

---

## 4. Point savealifechampions.org at it

In the new Vercel project: **Settings → Domains → Add** →
`savealifechampions.org` (and `www.savealifechampions.org` if you want
both). Vercel will show you the DNS records to add at your registrar —
typically an `A` record to `76.76.21.21` and/or a `CNAME` for `www` to
`cname.vercel-dns.com`. Add those in your DNS provider and wait for
propagation (Vercel's dashboard will show a green checkmark once it's
verified and SSL is issued).

The `cors-config.ts` change already allow-lists both
`https://savealifechampions.org` and `https://www.savealifechampions.org`
directly against the backend, as a fallback for any request that doesn't
go through the `/api` rewrite (e.g. if you ever call the backend from
somewhere other than this frontend).

---

## 5. Turn a campaign into "the" Champions campaign

1. Log into the main admin panel → **Champions** (new sidebar item).
2. Pick the campaign you want to power the public hero/leaderboard, hit
   **Save Champions Settings**. This sets `champions_featured` on that
   campaign — savealifechampions.org will start showing it within ~15
   seconds (it's cached that briefly).
3. Optionally add a **QR code destination override** if you want the
   `/live` TV-mode QR code to point somewhere other than the default
   donate link (e.g. straight to `https://savealifechampions.org/live`
   itself, or a short link you're using on-air).
4. Add a **Challenge** if you want the "Tonight's Challenge" section to
   show up.

If you don't set a featured campaign, the site automatically falls back
to your most recently posted `active`/`urgent` campaign — so nothing
breaks if this step is skipped.

---

## 6. Smoke test before going live on TV

- [ ] `https://savealifechampions.org` loads the hero with the right
      campaign image/video
- [ ] Leaderboard shows real Champions (donate a small test amount to
      confirm points/leaderboard/activity feed all update)
- [ ] `https://savealifechampions.org/live` looks right on a large screen
      / projector
- [ ] QR code on `/live` scans to the right destination
- [ ] "Donate Now" sends you to the correct campaign on
      savealifeafrica.org and completes payment normally
- [ ] "See Our Work" links to savealifeafrica.org
- [ ] A test Champion's `/champions/:id` profile page loads and "Share"
      works
