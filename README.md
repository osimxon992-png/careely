# Careerly

A job marketplace and career platform for job seekers, employers, and
(eventually) students and admins. This is an **MVP build** covering Phase 1
(foundation) and Phase 2 (core marketplace) of the full product plan — see
"Roadmap" below for what's not built yet.

## Stack

- React 19 + Vite, React Router, Tailwind CSS v4, Lucide icons, react-hot-toast
- Supabase (Postgres + Auth + RLS) for the backend
- i18n: Uzbek / English / Russian, centralized in `src/i18n/translations.js`

## Getting started

```bash
npm install
cp .env.example .env   # then fill in Supabase credentials (see below)
npm run dev
```

The app **runs without Supabase configured** — it falls back to clearly
labeled demo job data, and disables sign-up/sign-in with a visible warning
until you connect a real project.

## Supabase setup

1. Create a project at https://app.supabase.com.
2. Copy its Project URL and anon public key into `.env`:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
3. Run the migration in `supabase/migrations/0001_init.sql` via the Supabase
   SQL editor (or `supabase db push` if using the CLI). This creates the
   schema and all Row Level Security policies.
4. (Optional) Review `supabase/seed.sql` for how to add fictional demo data
   to your own dev database — it's commented out by default since it needs
   real `auth.users` ids first.
5. In Supabase Auth settings, enable email confirmations as desired.

## AI features

Not yet implemented in this MVP (resume AI assistance, career assistant,
job-matching explanations). When added, the API key must live only in a
Supabase Edge Function / server environment — never in `VITE_*` env vars,
which are bundled into the client. `.env.example` documents this.

## What's implemented (MVP)

- Public site: homepage, job search/filters, job details, internships,
  static pages (about/contact/privacy/terms/pricing/companies/career-advice)
- Auth: sign up (role selection), log in, log out, password reset,
  protected routes, lightweight onboarding
- Job seeker: dashboard, profile editor, saved jobs, applications list,
  settings/language switcher
- Employer: dashboard, company profile, job posting (draft/publish),
  per-job applicant list with stage updates
- Database: normalized schema + RLS policies enforcing that users can only
  read/write their own data, employers only manage their own company's jobs
  and applications, admins are never self-assignable
- i18n (uz/en/ru), empty/loading states, demo-mode fallback everywhere data
  would otherwise be fabricated

## What's NOT implemented yet (be aware before demoing as "done")

- Resume builder, PDF export, AI career assistant / job matching
- Messaging, notifications delivery (table exists, no UI/triggers yet)
- Admin panel is a protected placeholder only — no moderation tools
- Payments/subscriptions — pricing page is informational only, no checkout
- File uploads (resumes, logos, avatars) — not wired to Supabase Storage yet
- Automated tests
- Company verification review workflow (status field exists; no admin UI)

## Verified so far

- `npm run build` succeeds (Vite production build, no errors)
- Dev server serves all routes (public, protected redirect-to-login, job
  detail) with HTTP 200 — not yet visually verified in a browser (no
  browser automation tool was available in this session)

## Project structure

```
src/
  components/   shared UI (JobCard, Navbar, ProtectedRoute, ...)
  context/      AuthContext
  i18n/         LocaleContext + translations.js
  lib/          supabase client, jobs data access
  pages/
    public/     homepage, jobs, job details, static pages
    auth/       login, signup, forgot-password, onboarding
    seeker/     dashboard, profile, applications, saved jobs, settings
    employer/   dashboard, company profile, job CRUD, applications
    admin/      placeholder dashboard
supabase/
  migrations/   SQL schema + RLS
  seed.sql      demo data template (fictional, commented out)
```
