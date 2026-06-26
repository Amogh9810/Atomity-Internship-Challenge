# Atomity — Marketing Website

The official marketing website for **Atomity**, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

> **Internal Repository:** `https://git.atomity.de/atomity/frontend/base_repo`

---

# Project Overview

This repository powers Atomity's public-facing marketing platform. It contains:

- Marketing pages (Home, Pricing, Blog, News, Tutorials, Deploy, Partners)
- Documentation-style sections for Careers and Legal
- Multi-step **Try Now** onboarding flow
- Shared UI components built using a centralized design system
- Static content managed through TypeScript data files

The project follows a feature-based structure with reusable UI components and a centralized design token system.

---

# Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Base UI |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge |
| Linting | ESLint |
| Runtime | Node.js 24+ |

---

# Project Structure

```text
src/
├── app/                 # App Router pages & layouts
│   ├── (main)/          # Marketing pages
│   ├── (auth)/          # Try Now flow
│   ├── (docs)/          # Careers & Legal
│   ├── globals.css      # Design tokens & global styles
│   └── layout.tsx
├── components/          # Shared & feature components
├── data/                # Static content
├── fonts/               # Local fonts
└── lib/                 # Utilities

public/                  # Images, logos & illustrations
legal-docs/              # Markdown legal documents
Dockerfile               # Production container
package.json
```

---

# Getting Started

### Prerequisites

- Node.js >= 24
- npm

### Installation

```bash
git clone https://git.atomity.de/atomity/frontend/base_repo.git
cd base_repo
npm install
npm run dev
```

Runs locally at **http://localhost:3000**

---

# Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type checking |
| `npm run check` | Lint + Typecheck + Build |

---

# Route Groups

| Group | Purpose |
|------|---------|
| `(main)` | Public marketing pages |
| `(auth)` | User onboarding |
| `(docs)` | Careers & Legal documentation |

---

# Components

## Shared Components

| Component | Purpose |
|-----------|---------|
| Navbar | Global navigation |
| Footer | Website footer |
| TopBanner | Announcement banner |
| TrustBar | Customer logo carousel |
| FinalCTA | Shared call-to-action section |

## Feature Components

| Folder | Purpose |
|--------|---------|
| `blog/` | Blog pages & cards |
| `careers/` | Careers pages & application form |
| `deploy/` | Deploy catalogue |
| `legal/` | Legal document layouts |
| `partners/` | Partner showcase |
| `trynow/` | Multi-step onboarding |
| `tutorial/` | Tutorial pages |
| `ui/` | Shared reusable UI components |

---

# Design Tokens

All design tokens are defined in **src/app/globals.css**.

## Color Tokens

| Token | Value | Usage |
|-------|-------|------|
| `--atomity-black` | `#030303` | Primary text |
| `--atomity-green` | `#97DDB1` | Brand accent |
| `--atomity-gray-100` | `#EBEBEB` | Inputs |
| `--atomity-gray-400` | `#888888` | Secondary text |
| `--atomity-gray-900` | `#1A1A1A` | Dark surfaces |
| `--surface-page` | `#F0EDE4` | Page background |
| `--surface-dark` | `#1A1A1A` | Dark sections |
| `--surface-card-light` | `#FFFFFF` | Cards |
| `--text-primary` | `#030303` | Primary text |
| `--text-secondary` | `rgba(3,3,3,0.62)` | Secondary text |
| `--text-muted` | `rgba(3,3,3,0.38)` | Muted text |

## Typography

| Class | Font | Usage |
|------|------|------|
| `.text-hero` | Google Sans Flex | Hero heading |
| `.text-h1` | Google Sans Flex | Page heading |
| `.text-h2` | Google Sans Flex | Section heading |
| `.text-h3` | Google Sans Flex | Card heading |
| `.text-body-lg` | Gowun Batang | Lead text |
| `.text-body` | Gowun Batang | Body text |
| `.text-body-sm` | Gowun Batang | Small text |
| `.text-label` | Google Sans Code | Labels |
| `.text-nav` | Google Sans Flex | Navigation |
| `.text-cta` | Google Sans Code | Buttons |

> Always use design tokens and typography classes instead of hardcoded values.

---

# API Integration

| Page | Method | Endpoint |
|------|--------|----------|
| Home | GET | `/api/home` |
| Pricing | GET | `/api/pricing` |
| Blog | GET | `/api/blog` |
| Blog Details | GET | `/api/blog/:slug` |
| Deploy | GET | `/api/apps` |
| Partners | GET | `/api/partners` |
| News | GET | `/api/news` |
| Tutorials | GET | `/api/tutorials` |
| Careers | GET | `/api/careers` |
| Try Now | POST | `/api/signup` |
| Legal | Static | Static Markdown |

> Replace placeholder endpoints with the actual backend APIs if they differ.

---

# Environment Variables

Create a `.env.local` file if required.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# Deployment

```bash
npm run build
npm run start
```

Docker is used for production deployments.

---

# Development Guidelines

- Keep reusable components inside `components/ui`.
- Keep feature-specific components inside their respective folders.
- Store static content inside `src/data`.
- Reuse existing design tokens from `globals.css`.
- Prefer reusable components over page-specific implementations.
- Follow the existing folder structure when adding new pages or features.
