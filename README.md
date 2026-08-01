# Toolwright

Free, private, SEO-optimized online tools built with Next.js.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SEO setup

1. Set your production domain in `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

2. Deploy, then submit `https://your-domain.com/sitemap.xml` in Google Search Console.

Built-in SEO features:

- Per-tool metadata, Open Graph, and canonical URLs
- `sitemap.xml` and `robots.txt`
- JSON-LD for WebSite, Organization, WebApplication, FAQ, Breadcrumbs, and ItemList
- Static generation for all tool pages
- Semantic HTML and internal linking

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
