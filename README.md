# Ember & Oak — Restaurant Site + Admin

A restaurant website with a menu, reservations, contact form, and a
password-protected admin panel for managing menu items, reservations, and
messages.

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS ·
shadcn/ui (Base UI) · Prisma 7 · Postgres

## Project structure

- `src/app/(site)` — public pages (home, menu, about, gallery, contact,
  reservations)
- `src/app/admin` — admin panel, gated by `src/proxy.ts` (Next's
  middleware/proxy) checking a signed session cookie
- `prisma/schema.prisma` — `MenuItem`, `Reservation`, `ContactMessage` models
- `src/lib/db.ts` — Prisma client, using the `@prisma/adapter-pg` driver
  adapter (Prisma 7 requires an explicit adapter instead of a schema `url`)

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Point `DATABASE_URL` (and `DIRECT_URL`) in `.env` at a Postgres database.
   For quick local testing without an account anywhere, you can run Postgres
   in Docker:

   ```bash
   docker run --name restaurant-db -e POSTGRES_PASSWORD=postgres \
     -p 5432:5432 -d postgres:16
   ```

   then set `.env`:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
   DIRECT_URL="postgresql://postgres:postgres@localhost:5432/postgres"
   ADMIN_PASSWORD="changeme"
   ADMIN_SESSION_SECRET="dev-secret"
   ```

3. Apply the schema and seed sample menu items:

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` for the site and `http://localhost:3000/admin`
   for the admin panel (password = whatever you set as `ADMIN_PASSWORD`).

## Deploying for free (Vercel + Neon)

### 1. Create a free Postgres database on Neon

1. Go to [neon.com](https://neon.com) and sign up (free tier is generous —
   no credit card required).
2. Create a project. Neon gives you a database immediately.
3. In the project's **Connection Details**, copy two connection strings:
   - the **pooled** connection (hostname contains `-pooler`) → this becomes
     `DATABASE_URL`
   - the **direct** connection (no `-pooler`) → this becomes `DIRECT_URL`
     (used only for running migrations, which don't play well with
     connection poolers)

### 2. Push this project to GitHub

```bash
git init   # if not already a repo
git add -A
git commit -m "Initial commit"
gh repo create restaurant-app --source=. --public --push
```

(Or create the repo on github.com and `git push` to it — whatever you
normally do.)

### 3. Import the project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
   Framework preset should auto-detect as Next.js.
2. Before deploying, add these Environment Variables (Project Settings →
   Environment Variables):
   - `DATABASE_URL` — the pooled Neon connection string
   - `DIRECT_URL` — the direct Neon connection string
   - `ADMIN_PASSWORD` — a password only you know
   - `ADMIN_SESSION_SECRET` — a random string, e.g. output of
     `openssl rand -hex 32`
3. Deploy. The build runs `prisma migrate deploy` automatically (see the
   `build` script in `package.json`), which creates the tables on Neon the
   first time it runs.

### 4. Seed the production database (optional)

To load the sample menu items into your live database, run the seed script
locally against the production `DATABASE_URL`/`DIRECT_URL`:

```bash
DATABASE_URL="<neon pooled url>" DIRECT_URL="<neon direct url>" npx prisma db seed
```

Or just add your own menu items through `/admin/menu` once deployed.

### Free-tier notes

- **Vercel Hobby plan**: free, includes the Next.js hosting, serverless
  functions, and HTTPS on a `*.vercel.app` domain.
- **Neon free tier**: free Postgres with generous storage/compute limits for
  a small app like this; no credit card needed to start.
- Nothing here requires a paid plan to run in production.

## Admin panel

Visit `/admin/login` and enter `ADMIN_PASSWORD`. From there you can:

- **Menu** (`/admin/menu`) — add, edit, delete, and toggle availability of
  menu items
- **Reservations** (`/admin/reservations`) — view requests and update status
  (pending/confirmed/cancelled)
- **Messages** (`/admin/messages`) — read and manage contact form submissions

Auth is a single shared password (no per-user accounts) — appropriate for a
single-owner restaurant. The session is a signed, httpOnly cookie checked in
`src/proxy.ts` before any `/admin/*` route renders.
