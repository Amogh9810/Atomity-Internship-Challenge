
# Atomity — Marketing Website

The official marketing website for **Atomity**, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

> **Internal Repository:** `https://git.atomity.de/atomity/frontend/base_repo`

---

## Table of Contents

- Project Overview
- Tech Stack
- Project Structure
- Getting Started
- Available Scripts
- Route Groups
- Components
- Design Tokens
- API Integration
- Environment Variables
- Architecture Overview
- Development Guidelines

---

## Project Overview

This project powers Atomity's public marketing platform and documentation portal.

### Features

- Marketing pages (Home, Pricing, Blog, Deploy, Partners, News, Tutorials)
- Careers and Legal documentation
- Multi-step "Try Now" onboarding flow
- Shared reusable component library
- Centralized design token system
- Responsive design with Tailwind CSS v4

> **Note**
>
> The purpose of this README is to help developers quickly understand the project structure, design system, and backend integration points.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Base UI |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge |
| Runtime | Node.js 24+ |

---

## Project Structure

```text
src/
├── app/
│   ├── (main)/          Marketing pages
│   ├── (auth)/          Try Now flow
│   ├── (docs)/          Careers & Legal
│   ├── globals.css      Design tokens
│   └── layout.tsx
├── components/          Shared & feature components
├── data/                Static content
├── fonts/               Local fonts
└── lib/                 Utilities

public/                  Images, logos & illustrations
legal-docs/              Markdown legal documents
Dockerfile
package.json
```

---

## Getting Started

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

Application runs on **http://localhost:3000**

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run check` | Run lint, typecheck and build |

---

## Route Groups

| Route Group | Purpose |
|-------------|---------|
| `(main)` | Public marketing pages |
| `(auth)` | User onboarding flow |
| `(docs)` | Careers & Legal documentation |

---

## Components

### Shared Components

| Component | Purpose |
|----------|---------|
| Navbar | Global navigation |
| Footer | Global footer |
| TopBanner | Announcement banner |
| TrustBar | Customer logo carousel |
| FinalCTA | Shared call-to-action section |

### Feature Components

| Folder | Purpose |
|--------|---------|
| `blog/` | Blog pages and cards |
| `careers/` | Careers pages and application form |
| `deploy/` | Deploy catalogue |
| `legal/` | Legal documentation |
| `partners/` | Partner showcase |
| `trynow/` | Multi-step onboarding |
| `tutorial/` | Tutorial pages |
| `ui/` | Shared reusable UI primitives |

---

## Design Tokens

All design tokens are defined in `src/app/globals.css`.

### Color Tokens

| Token | Value | Usage |
|-------|-------|------|
| `--atomity-black` | `#030303` | Primary text |
| `--atomity-green` | `#97DDB1` | Brand accent |
| `--atomity-gray-100` | `#EBEBEB` | Input backgrounds |
| `--atomity-gray-400` | `#888888` | Secondary text |
| `--atomity-gray-900` | `#1A1A1A` | Dark surfaces |
| `--surface-page` | `#F0EDE4` | Page background |
| `--surface-dark` | `#1A1A1A` | Dark sections |
| `--surface-card-light` | `#FFFFFF` | Card background |
| `--text-primary` | `#030303` | Primary text |
| `--text-secondary` | `rgba(3,3,3,0.62)` | Secondary text |
| `--text-muted` | `rgba(3,3,3,0.38)` | Muted text |

### Typography

| Class | Usage |
|------|------|
| `.text-hero` | Hero headings |
| `.text-h1` | Main headings |
| `.text-h2` | Section headings |
| `.text-h3` | Card headings |
| `.text-body-lg` | Lead text |
| `.text-body` | Body text |
| `.text-body-sm` | Small body text |
| `.text-label` | Labels |
| `.text-nav` | Navigation |
| `.text-cta` | CTA buttons |

> **Note**
>
> Use design tokens and typography classes instead of hardcoded colors or font values.

---

## API Integration

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

> Replace these placeholder endpoints with the actual backend APIs if required.

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Architecture Overview

```text
Browser
   │
   ▼
Next.js App Router
   │
   ├── Shared Components
   ├── Feature Components
   ├── Static Data
   └── Backend APIs
   │
   ▼
Rendered UI
```

---

## Development Guidelines

- Keep reusable components inside `components/ui`.
- Group feature-specific components by feature.
- Store static content in `src/data`.
- Reuse design tokens from `globals.css`.
- Prefer reusable components over duplicated implementations.
- Follow the existing project structure when adding new features.

---

**Maintained by the Atomity Engineering Team**
