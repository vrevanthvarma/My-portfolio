# Vejandla Revanth Varma — Portfolio

## Problem Statement (Original)
> https://backend-ai-devrel.preview.emergentagent.com/?utm_source=share this is a link of the portfolio so create full end to end resdy to use portfolio like this

User also uploaded `Revanth_Varma_Sarvam_Resume.pdf` — content sourced from both the reference site and resume.

## Architecture
- **Backend**: FastAPI + Motor (MongoDB async). Endpoints under `/api`:
  - `GET /api/health` — health check
  - `GET /api/portfolio` — full structured portfolio data
  - `POST /api/contact` — create contact message (Pydantic email validation)
  - `GET /api/contact` — list submitted contact messages
  - `POST /api/status`, `GET /api/status` — legacy status checks
- **Frontend**: React 19 + Tailwind + Shadcn UI + Framer Motion + Sonner toasts.
- **Database**: MongoDB collection `contact_messages` storing form submissions; `status_checks` retained.

## Design
- Archetype: Swiss High-Contrast / Developer Terminal (dark theme, emerald accents, IDE feel).
- Fonts: JetBrains Mono (headings/code), IBM Plex Sans (body).
- See `/app/design_guidelines.json`.

## What's been implemented (2026-12)
- Sticky responsive nav with smooth-scroll + mobile menu
- Hero with code-editor profile snippet, stats, CTAs (Explore Projects, LinkedIn, GitHub, Resume), animated grid + glow background
- Skills section: 4 grouped cards (Languages, Frameworks & Libraries, Cloud & Tools, DevRel)
- Projects section: 3 cards with filter (All / AI · ML / LLM · DevRel), metrics, tech badges, View Code links
- Experience timeline: 3 items (IIIT Hyderabad, KMEC, Sports Talent project)
- Contact section: terminal block + 3 social rows + working form (POSTs to /api/contact, sonner toasts)
- Footer with social icons
- All interactive elements have `data-testid` attrs in `/app/frontend/src/constants/testIds/portfolio.js`

## User Personas
- Recruiters / hiring managers (skim hero + projects + resume)
- Engineering teams evaluating DevRel fit (read code snippets, project metrics, GitHub)
- Collaborators (use contact form)

## Test Results (iteration 1)
- Backend: 7/7 pytest cases pass (health, portfolio, contact CRUD, validation)
- Frontend: 10/10 UI flows pass (hero, nav scroll, filters, contact form happy + error paths)

## Backlog
- P1: Admin view to read contact messages in-app
- P1: Add Open Graph / favicon metadata + social card
- P2: Blog / Writings section for DevRel articles
- P2: GitHub stats / pinned repos widget (live data)
- P2: Light/dark theme toggle (currently dark-only)
- P2: i18n (English default)
