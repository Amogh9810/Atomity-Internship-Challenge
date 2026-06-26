# Atomity — Marketing Website

The official marketing website for **Atomity**, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

> Internal Repository: `https://git.atomity.de/atomity/frontend/base_repo`

---

# Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui, Base UI |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge |
| Linting | ESLint |
| Runtime | Node.js 24+ |

---

# Project Structure

```text
src/
├── app/
│   ├── (main)/        # Marketing pages
│   ├── (auth)/        # Try Now flow
│   ├── (docs)/        # Careers & Legal
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── blog/
│   ├── careers/
│   ├── deploy/
│   ├── legal/
│   ├── partners/
│   ├── trynow/
│   ├── tutorial/
│   ├── ui/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── TopBanner.tsx
│   ├── FinalCTA.tsx
│   └── TrustBar.tsx
├── data/
├── fonts/
└── lib/

public/
legal-docs/
Dockerfile
package.json
```

---

# Getting Started

## Prerequisites

- Node.js >= 24
- npm

## Installation

```bash
git clone https://git.atomity.de/atomity/frontend/base_repo.git
cd base_repo
npm install
npm run dev
```

Runs at:

```text
http://localhost:3000
```

---

# Available Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Start development server |
| npm run build | Production build |
| npm run start | Run production build |
| npm run lint | Lint project |
| npm run typecheck | Run TypeScript checks |
| npm run check | Lint + Typecheck + Build |

---

# Route Groups

| Route Group | Purpose |
|-------------|---------|
| `(main)` | Marketing pages |
| `(auth)` | Try Now onboarding |
| `(docs)` | Careers & Legal documentation |

---

# Components

## Shared Components

- Navbar
- Footer
- TopBanner
- TrustBar
- FinalCTA

## Feature Components

- blog/
- careers/
- deploy/
- legal/
- partners/
- trynow/
- tutorial/
- ui/

---

# Design Tokens

All design tokens are defined in:

```text
src/app/globals.css
```

## Color Tokens

| Token |
|--------|
| --atomity-green |
| --atomity-black |
| --surface-page |
| --surface-dark |
| --surface-card-light |
| --text-primary |
| --text-secondary |
| --border-light |

## Typography

| Class | Usage |
|-------|-------|
| text-hero | Hero headings |
| text-h1 | Page headings |
| text-h2 | Section headings |
| text-h3 | Sub headings |
| text-body | Body text |
| text-body-sm | Small text |
| text-label | Labels |
| text-nav | Navigation |
| text-cta | CTA buttons |

Use design tokens instead of hardcoded colors or font values.

---

# API Integration

| Page | Backend API |
|------|-------------|
| Home | GET /api/home |
| Pricing | GET /api/pricing |
| Blog | GET /api/blog |
| Blog Details | GET /api/blog/:slug |
| Deploy | GET /api/apps |
| Partners | GET /api/partners |
| News | GET /api/news |
| Tutorials | GET /api/tutorials |
| Tutorial Details | GET /api/tutorials/:slug |
| Careers | GET /api/careers |
| Career Details | GET /api/careers/:id |
| Try Now | POST /api/signup |
| Legal | Static Content |

> Update the endpoint names if the backend implementation changes.

---

# Environment Variables

Create a `.env.local` file when required.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# Deployment

```bash
npm run build
npm run start
```

The project uses Docker for production deployments.

---

# Notes

- Keep reusable UI inside `components/ui`.
- Keep page-specific components inside their feature folder.
- Store static content inside `src/data`.
- Use the design tokens defined in `globals.css`.
- Keep components modular and reusable.
