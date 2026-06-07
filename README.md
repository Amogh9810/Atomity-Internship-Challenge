# Arc Reactor Cloud Intelligence Engine

A scroll-triggered interactive feature section built for the Atomity Frontend Engineering Challenge.

## Feature Chosen

I selected **Option B (0:45–0:55)** from the Atomity product video.

The original sequence showed multiple infrastructure sources converging into a centralized optimization layer. Instead of recreating the exact UI, I reinterpreted the concept as an **Arc Reactor Cloud Intelligence Engine**, where distributed cloud sources power a central intelligence core that surfaces optimization insights.

## Tech Stack

- Next.js 16
- TypeScript
- Framer Motion
- TanStack Query
- Tailwind CSS

## Key Features

- Scroll-triggered reveal animations
- Animated energy flow between source nodes and reactor
- Arc Reactor visualization with rotating rings and particles
- Dynamic KPI cards with count-up animations
- Public API integration using JSONPlaceholder
- React Query caching and retry handling
- Responsive layout for mobile, tablet, and desktop
- Accessibility support including reduced-motion preferences

## Project Structure

```txt
src/
├── components/
│   ├── FeatureSection.tsx
│   ├── CloudProvider.tsx
│   ├── ArcReactor.tsx
│   ├── EnergyLine.tsx
│   └── MetricCard.tsx
├── hooks/
│   └── useKpiData.ts
├── tokens/
│   └── tokens.ts
```

## Animation Approach

The experience is built around a simple visual narrative:

```txt
Cloud Sources
      ↓
 Energy Flow
      ↓
  Arc Reactor
      ↓
 Optimization Metrics
```

Framer Motion is used for staggered entrances, hover interactions, and smooth spring-based transitions. Energy lines and reactor effects remain active after the initial reveal to keep the section feeling alive.

## Data Fetching & Caching

KPI data is fetched from:

```txt
https://jsonplaceholder.typicode.com/posts
```

TanStack Query is used to handle:

- Data fetching
- Loading and error states
- Automatic retries
- 5-minute cache duration

This prevents unnecessary network requests and provides instant data on revisit.

## Design System

A token-based design system is used throughout the project.

Tokens are defined in:

```txt
src/tokens/tokens.ts
```

and reference CSS variables from `globals.css` to keep colors, spacing, shadows, and animation values centralized.

## Modern CSS Features

The project uses several modern CSS capabilities:

- `clamp()` for fluid typography
- `color-mix()` for dynamic glow effects
- `:has()` for contextual styling
- Container Queries
- Logical Properties
- `prefers-reduced-motion`

## Tradeoffs

Given the challenge time limit, I focused on building a single polished interactive section rather than a larger landing page.

Priority was given to:

- Animation quality
- Component architecture
- Data handling
- Responsiveness
- Accessibility

## Future Improvements

With additional time I would:

- Add configurable source nodes
- Introduce alternative reactor themes
- Add richer energy routing interactions
- Connect to real cloud monitoring data
- Explore WebGL-based visual effects

## Run Locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```
