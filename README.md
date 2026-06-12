# Teguh Perintis Sdn. Bhd. — Company Website

Company profile website for **Teguh Perintis Sdn. Bhd.**, a CIDB G3 registered construction company based in Ulu Tiram, Johor, specialising in roads & civil infrastructure, engineering projects, and building construction.

Built as a **fully static site** — no server, no database, no secrets — so it can be hosted anywhere cheaply and securely.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, static export)
- React 19 · TypeScript
- Tailwind CSS v4
- ESLint 9

## Pages

| Route | Content |
|---|---|
| `/` | Hero, stats, services, CIDB credentials, process, featured projects |
| `/about` | Company overview, values, SSM/CIDB registration details, nature of business |
| `/services` | Six detailed service sections with scope bullets |
| `/projects` | Project gallery grid |
| `/contact` | Address, phone, WhatsApp, business hours, Google Maps embed |

There is no contact form by design — enquiries go through click-to-WhatsApp (floating button on every page), phone, or email.

## Getting started

Requires Node.js 18.18+ (developed on Node 22).

```bash
npm install     # install dependencies
npm run dev     # development server at http://localhost:3000
npm run lint    # ESLint
npm run build   # production build → static site in ./out
npx serve out   # preview the static export locally
```

## Project structure

```
src/
├── lib/site-config.ts       # ★ ALL site content lives here
├── app/                     # routes (page.tsx per route), layout, SEO files
│   ├── layout.tsx           # header/footer shell, metadata template, JSON-LD
│   ├── sitemap.ts robots.ts # generated at build
│   └── */page.tsx           # about, services, projects, contact, not-found
└── components/
    ├── layout/              # Header, MobileNav (only client component), Footer
    ├── sections/            # Hero, StatsBar, ServicesGrid, ProcessSteps, …
    ├── ui/                  # Container, Section, Button, cards, WhatsApp buttons
    └── seo/JsonLd.tsx       # GeneralContractor structured data
public/
├── _headers                 # security headers for static hosts
└── images/                  # photos (see replacement guide below)
```

## Editing content

**All content lives in one file: `src/lib/site-config.ts`.** Company info, contact details, navigation, services, projects, and stats are defined there — components never hardcode copy.

### Before launch — fill in the TODOs

Search `src/lib/site-config.ts` for `TODO`:

| Field | What to put |
|---|---|
| `email` | Company email address |
| `siteUrl` | Final production URL (used for sitemap, OG tags, JSON-LD) |
| `hours` | Confirm opening time (currently "Daily until 6:00 PM") |
| `stats` | Confirm projects/clients counts |
| `projects` | Replace the 6 example projects with real ones |

### Replacing the example images

The images in `public/images/` are **example stock photos** (Unsplash, free for commercial use). They show what kind of photo belongs in each slot — replace each with a real company photo of the same subject, keeping the same filename:

| File | Show a photo of… | Size |
|---|---|---|
| `hero-home.jpg` | Your team / a flagship project site | 1920 × 900 |
| `about-company.jpg` | The team planning or reviewing drawings | 800 × 600 |
| `services/service-civil.jpg` | Roadworks / drainage / site crew (Roads & Civil Infrastructure) | 800 × 600 |
| `services/service-building.jpg` | A project under construction (Engineering Projects) | 800 × 600 |
| `services/service-aluminium.jpg` | A completed building (Building Construction) | 800 × 600 |
| `services/service-me.jpg` | Electrical / wiring works | 800 × 600 |
| `services/service-maintenance.jpg` | Renovation / painting in progress | 800 × 600 |
| `services/service-facility.jpg` | Maintenance technician at work | 800 × 600 |
| `projects/project-01.jpg` … `project-06.jpg` | Completed projects (update titles/locations in `site-config.ts` to match) | 1200 × 800 |
| `logo.svg` | Company logo | ≈200 × 48 |

If a replacement uses a different extension, update the matching path in `site-config.ts`.

## Deployment

### Cloudflare Pages (Git integration)

Following the [official static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) — the project is already configured for static export (`output: "export"` in `next.config.ts`).

1. Push the repository to GitHub:

   ```bash
   git remote add origin https://github.com/<GH_USERNAME>/<REPOSITORY_NAME>.git
   git branch -M main
   git push -u origin main
   ```

2. In the Cloudflare dashboard, go to **Workers & Pages → Create application → Pages → Import an existing Git repository** and select the repo.

3. Use these build settings:

   | Setting | Value |
   |---|---|
   | Framework preset | **Next.js (Static HTML Export)** |
   | Build command | `npx next build` |
   | Build output directory | `out` |
   | Production branch | `main` |

Every push to `main` triggers a rebuild; pull requests get preview deployments. The site gets a `*.pages.dev` subdomain — add the real domain under **Custom domains**, then update `siteUrl` in `src/lib/site-config.ts` and push.

The security headers in `public/_headers` are applied automatically by Cloudflare Pages.

### Other hosts

`npm run build` produces a fully static site in `./out` — it can also be hosted on any static host (Netlify, S3, Nginx, shared hosting).

### Security headers (important)

A static export cannot send HTTP headers itself — **the host must send them**:

- **Cloudflare Pages / Netlify**: the included `public/_headers` file is picked up automatically.
- **Vercel / Node (`next start`)**: the `headers()` block in `next.config.ts` applies (remove `output: "export"` if deploying this way).
- **Nginx**: add to the server block:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src https://www.google.com https://maps.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header X-Frame-Options "DENY" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
```

Note: `npm run build` prints a warning that `headers()` is ignored with `output: "export"` — this is expected; the host-level config above is what applies in production.

## Security notes

- Static export: no server-side code, no environment variables, no secrets anywhere in the repo.
- Google Maps uses a keyless embed URL — no API key required.
- All external links use `rel="noopener noreferrer"`.
- The only `dangerouslySetInnerHTML` is the JSON-LD script, escaped against `</script>` injection.
- Content-Security-Policy locks scripts/styles/fonts to same-origin; only the Google Maps iframe is allowed to frame in.
