# Teguh Perintis Sdn. Bhd. — Company Website

Company profile website for **Teguh Perintis Sdn. Bhd.**, a Johor-based specialist contractor for **aluminium domes and architectural metal works** (CIDB G3 registered), serving mosque, institutional and commercial projects across Malaysia.

Built as a **fully static site** — no server, no database, no secrets — so it can be hosted anywhere cheaply and securely.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, static export)
- React 19 · TypeScript
- Tailwind CSS v4
- ESLint 9

## Pages

| Route | Content |
|---|---|
| `/` | Hero, stats, five capabilities, CIDB credentials, process, featured projects |
| `/about` | Company overview, history timeline, values, SSM/CIDB registration details, why choose us |
| `/services` | Five detailed capability sections with scope bullets, process |
| `/projects` | All 19 portfolio projects (ongoing, completed) and the client list |
| `/contact` | Address, phone, email, WhatsApp, business hours, Google Maps embed |

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
assets/fonts/                # Poppins TTFs read by the Open Graph image (not served)
public/
├── _headers                 # security headers for static hosts
├── favicon.ico apple-touch-icon.png
└── images/                  # photos and logos (see "Images and logos" below)
```

## Editing content

**All content lives in one file: `src/lib/site-config.ts`.** Company info, contact details, navigation, services, projects, and stats are defined there — components never hardcode copy.

## Brand

| Token | Value | Use |
|---|---|---|
| `primary-900` (navy) | `#022662` | Headers, footers, dark sections, OG card. Full scale `primary-50`…`950` in `globals.css` |
| `secondary-700` (maroon) | `#8b0304` | Eyebrows, labels, "Ongoing" badge, footer top border, OG accent bar |
| `accent-500` (gold) | `#ffba00` | Buttons and highlights **on navy** |

- Font: **Poppins** via `next/font/google` (weights 400, 500, 700 — it is not a variable font, so weights are listed explicitly in `layout.tsx`). The same TTFs live in `assets/fonts/` for the Open Graph image.
- **Maroon rule:** gold fails contrast on white, so text on light backgrounds uses `text-secondary-700`, never `text-accent-600`.
- The navy and maroon are the logo's sRGB values; the CMYK print values convert to different on-screen colours. Needs designer confirmation (see TODO table).

## Editing content

**All content lives in one file: `src/lib/site-config.ts`.** Company info, contact details, navigation, services, projects, clients, About copy, and stats are defined there — components never hardcode copy.

`docs/` holds the client's source files (logos, fonts, portfolio PDF, business card, letterhead). It is about 760MB and **gitignored**; the images below were generated from it.

### Before launch — confirm the TODOs

Search `src/` for `TODO_CONFIRM`:

| Where | What to confirm |
|---|---|
| `globals.css` | Brand navy `#022662` / maroon `#8b0304` with the designer |
| `site-config.ts` `company.trackRecordSince` | 2014 as the start of the track record |
| `site-config.ts` `stats` | Track record year, 19 projects, 8 states |
| `site-config.ts` `registration.serviceArea` | "Nationwide — Peninsular Malaysia & Sabah" |
| `site-config.ts` `projects` | `status` is inferred from year (2026 = ongoing); main contractor is omitted for projects 05, 06 and 07; projects 18 and 19 use architectural drawings, not photos |
| `site-config.ts` `about.history` | Year Teguh Aluminium and Construction Sdn. Bhd. was formed |
| `site-config.ts` `services` | `decorative-panels` and `minarets-metalworks` photos are stand-ins (a lit dome and a fence) |

`siteUrl`, `hours`, `geo` and `googleBusinessUrl` are filled in and confirmed
against the Google Business Profile listing.

### Images and logos

All images are **WebP, pre-sized for their slot** (this keeps the mobile PageSpeed score high). They were extracted from `docs/TP - Portfolio_Digital.pdf` and are never upscaled.

| File | Source | Width |
|---|---|---|
| `hero-home-{768,1280,1920}.webp` | PDF page 10, `img-010-078` | 768 / 1280 / 1920 |
| `about-company.webp` | PDF page 1, `img-001-002` (cropped 4:3) | 800 |
| `services/service-domes.webp` | `img-012-086` | 800 |
| `services/service-windows-cladding.webp` | `img-016-108` | 800 |
| `services/service-decorative-panels.webp` | `img-013-093` | 800 |
| `services/service-metalworks.webp` | `img-020-128` | 800 |
| `services/service-refurbishment.webp` | `img-011-081` | 800 |
| `projects/project-01.webp` … `project-19.webp` | PDF pages 4–22, one landscape photo per project | ≤ 1200 |
| `logo-mark.webp` | navy mark, 96px high | 152 |
| `logo-mark-white.png` | white mark (footer, OG card), 160px high | 254 |
| `logo.png` | primary lockup, 512 × 512, transparent (JSON-LD logo) | 512 |
| `favicon.ico`, `apple-touch-icon.png` | mark; ico 16/32/48 transparent, touch icon 180 on white | — |

Regenerate the photos with:

```bash
pdfimages -all -p "docs/TP - Portfolio_Digital.pdf" /tmp/pdf/img   # extracts img-<page>-<n>.jpg
cwebp -q 70 -m 6 input.png -o public/images/projects/project-01.webp   # resize to max 1200px wide first
```

Logos come from `docs/TP - Design Files/Logo/` (transparent, heavily padded PNGs): crop each to its alpha bounding box with Pillow (`im.crop(im.getchannel("A").getbbox())`), then resize.

**Higher-resolution originals needed** (the PDF photos are narrower than the 1200px slot, so they render slightly soft on large screens): projects 06, 08, 10, 11, 12, 14, 15, 16, 18 and 19. Projects 18 and 19 are drawings, so real photos should replace them.

If a replacement uses a different extension, update the matching path in `site-config.ts` (the hero paths live in `src/app/page.tsx`). The Poppins OFL licence file was not in the supplied font zip; add it to `assets/fonts/` if the client has it.

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
