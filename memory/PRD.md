# Vejandla Revanth Varma — Portfolio + Admin CMS

## Problem Statement (Original)
> https://backend-ai-devrel.preview.emergentagent.com/?utm_source=share this is a link of the portfolio so create full end to end ready to use portfolio like this
>
> v2: Build a production-ready, full-stack Developer Portfolio Web Application with an integrated, no-code Admin Dashboard at /admin with password protection. Public site reads from DB; admin can edit Profile / Skills / Projects / Experience via forms; saves are instant.

## Architecture
- Backend (FastAPI + Motor/MongoDB): JWT-protected admin CRUD over a single `portfolio` doc.
  - Auth: POST `/api/auth/login`, GET `/api/auth/me`, bearer token (7d)
  - Public: GET `/api/portfolio`, POST `/api/contact`
  - Admin (Bearer required): PUT `/api/admin/portfolio` (bulk replace), `/profile`, `/skills`,
    POST/PUT/DELETE `/projects[/{id}]`, `/experience[/{id}]`, POST `/reset`, GET `/contact`
  - Idempotent admin seeding from `ADMIN_EMAIL` / `ADMIN_PASSWORD` env on startup; bcrypt hashes.
- Frontend (React 19 + Tailwind + Shadcn + Framer Motion + Sonner):
  - `PortfolioContext` fetches `/api/portfolio` and provides `refresh()`.
  - `AuthContext` stores JWT in localStorage; axios interceptor attaches `Authorization: Bearer`.
  - Routes: `/` (public portfolio), `/admin/login`, `/admin` (RequireAuth).
  - Admin: tabbed UI (Profile / Skills / Projects / Experience / Security) + sticky LiveSnapshot sidebar + Save & Update button (bulk PUT).

## Design
- Slate-navy (`#0b1220`) base, Teal-400 accents, JetBrains Mono headings/code, IBM Plex Sans body.
- Public nav: V-initial logo, About/Projects/Experience/Contact, “Let’s talk” pill, Admin link.
- Admin header: Back / Portfolio Admin / unsaved-pill / Preview / Reset / Save / Logout.

## What's been implemented (2026-12)
- Iteration 1: portfolio static MVP with contact form, sections (Hero/Skills/Projects/Experience/Contact/Footer).
- Iteration 2: CMS-driven backend, JWT auth, admin dashboard, slate/teal redesign, contact list admin-gated.

## Credentials
- `/app/memory/test_credentials.md` — admin@revanth.dev / revanth2026

## Test Results
- Iteration 1: backend 7/7, frontend 10/10 pass.
- Iteration 2: backend 18/18, frontend all flows pass (login, edit→save→public-reflects, logout).

## Backlog
- P1: Admin inbox UI for `/api/contact` (already auth-gated; just needs a page)
- P1: Password change form (re-uses existing seed mechanism for now)
- P2: Image uploads (project thumbnails / avatar) — Emergent storage or external CDN
- P2: Reorder projects/experience via drag handles
- P2: Per-user rate limiting on /api/auth/login
- P2: Blog / Writings section for DevRel articles
- P2: i18n
