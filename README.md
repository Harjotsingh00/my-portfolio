# Portfolio

A clean, modern developer portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Customizing Your Data

All portfolio content lives in **`data/portfolio.ts`**. Edit this file to update your:
- Name, tagline, and about text
- Skills and technologies
- Projects
- Work experience
- Education
- Contact info and social links

## Admin Panel

Visit `/admin` to edit portfolio content through a UI. Changes are saved to `localStorage`. If no local data is found, the app falls back to `data/portfolio.ts`.

To permanently update the defaults, copy your changes back into `data/portfolio.ts`.

## Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo to Vercel — no additional configuration needed.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
