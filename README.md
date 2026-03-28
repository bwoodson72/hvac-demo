# Service Business Website Template

A reusable website engine for local service businesses — plumbers, roofers, HVAC contractors, electricians, and similar trades. Clone this repo once, connect a Sanity project, fill in the content, and you have a production-ready site. Every client gets their own Sanity project and dataset; the codebase is shared.

Content is fully managed through an embedded Sanity Studio. Pages are assembled from a controlled library of 15 section types, so editors compose layouts without touching code. SEO metadata, structured data, sitemap, and robots.txt are all generated automatically from Sanity content.

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| **Next.js** (App Router) | 16.2.1 | Framework — server components, SSG, ISR |
| **React** | 19.x | UI runtime |
| **TypeScript** | 5.x | Language |
| **Tailwind CSS v4** | 4.x | Styling via CSS-first `@theme` config |
| **shadcn/ui** | 4.x | Accessible component primitives |
| **Sanity Studio** | 5.x | Embedded CMS — runs at `/studio` |
| **next-sanity** | 12.x | Sanity client, live preview, ISR integration |
| **Resend** | 6.x | Transactional email for the contact form |
| **Vercel** | — | Deployment target |

> Sanity Studio is embedded in the Next.js app. It runs at `/studio` and deploys alongside the site — there is no separate Studio project or deployment.

---

## Prerequisites

- **Node.js 18+**
- **npm**
- A **Sanity account** — [sanity.io](https://sanity.io) (free tier works)
- A **Resend account** — [resend.com](https://resend.com) (optional — the contact form logs to the console when Resend is not configured)
- A **Vercel account** — [vercel.com](https://vercel.com) (for deployment)

---

## Quick Start

```bash
# 1. Clone the repo
git clone <repo-url> my-client-site
cd my-client-site

# 2. Install dependencies
npm install

# 3. Copy the example env file
cp .env.example .env.local
```

Then follow **[docs/setup.md](docs/setup.md)** to create a Sanity project and fill in `.env.local`.

```bash
# 4. Start the development server
npm run dev
```

- Site → [http://localhost:3000](http://localhost:3000)
- Studio → [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in every value before starting the dev server.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Yes** | Your Sanity project ID — found at [sanity.io/manage](https://sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | **Yes** | Dataset name — almost always `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | **Yes** | API version date — use `2024-01-01` |
| `SANITY_API_READ_TOKEN` | **Yes** | Sanity token with Viewer permissions — required for draft/preview mode |
| `SANITY_REVALIDATION_SECRET` | **Yes** | Random string — used to verify Sanity webhook request signatures |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Public URL of the site — `http://localhost:3000` for local dev |
| `RESEND_API_KEY` | No | Resend API key — if omitted, form submissions are logged to the server console |
| `CONTACT_EMAIL_TO` | No | Email address that receives contact form submissions |
| `CONTACT_EMAIL_FROM` | No | Sender address for contact emails — must be a verified Resend domain |

**Generating secret strings:**

```bash
openssl rand -hex 32
```

---

## Sanity Setup

The short version:

1. Go to [sanity.io/manage](https://sanity.io/manage) → create a new project
2. Note your **Project ID**
3. Create a **Viewer** API token (API → Tokens)
4. Add `http://localhost:3000` to CORS origins (API → CORS origins, enable credentials)
5. Paste values into `.env.local`

See **[docs/setup.md](docs/setup.md)** for the full walkthrough, including dataset creation, CORS setup, and verifying the connection.

---

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          # All public-facing pages
│   │   ├── page.tsx          # Homepage  /
│   │   ├── about/            # About page  /about
│   │   ├── contact/          # Contact page  /contact
│   │   ├── faq/              # FAQ page  /faq
│   │   ├── gallery/          # Gallery page  /gallery
│   │   ├── reviews/          # Reviews page  /reviews
│   │   ├── services/         # Listing + [slug] detail  /services
│   │   ├── service-areas/    # Listing + [slug] detail  /service-areas
│   │   └── layout.tsx        # Shared layout: JSON-LD, SanityLive, DraftBanner
│   ├── api/
│   │   ├── contact/          # Contact form handler (validation, rate limiting, Resend)
│   │   ├── draft/            # Enable draft mode — called by Presentation Tool
│   │   │   └── disable/      # Disable draft mode
│   │   └── revalidate/       # On-demand ISR revalidation webhook
│   ├── studio/[[...tool]]/   # Embedded Sanity Studio
│   ├── layout.tsx            # Root layout (fonts, globals.css)
│   ├── globals.css           # Tailwind v4 @theme tokens + base styles
│   ├── sitemap.ts            # Auto-generated /sitemap.xml
│   └── robots.ts             # Auto-generated /robots.txt
│
├── components/
│   ├── ui/                   # shadcn/ui primitives (Button, Input, Card, etc.)
│   ├── sections/             # 15 section components
│   ├── page-templates/       # SectionRenderer, StandardPage, ServicePage, ServiceAreaPage
│   └── shared/               # Container, Section, Heading, CMSImage, RichText,
│                             #   CTAButton, Breadcrumbs, JsonLd, DraftBanner, VisualEditing
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts         # Public client, authenticated client, getClient()
│   │   ├── live.ts           # sanityFetch + SanityLive (next-sanity defineLive)
│   │   ├── env.ts            # Validated environment variable access
│   │   ├── image.ts          # Sanity image URL builder helpers
│   │   ├── queries/          # GROQ query strings + typed fetcher functions
│   │   ├── types/            # TypeScript interfaces for all Sanity documents
│   │   └── mappers/          # Data mappers: SEO metadata, sections, links
│   ├── seo/
│   │   └── jsonLd.ts         # JSON-LD generators: LocalBusiness, Service, FAQPage, etc.
│   ├── analytics/
│   │   └── events.ts         # GA4-compatible event tracking helpers
│   ├── forms/
│   │   ├── types.ts          # Contact form TypeScript types
│   │   ├── email.ts          # Resend integration + dev console fallback
│   │   └── useContactForm.ts # React hook: validation, submission, honeypot
│   └── utils/
│       ├── index.ts          # cn() and general utilities
│       └── icons.ts          # Lucide icon resolver by string key
│
├── sanity/
│   ├── schemaTypes/
│   │   ├── documents/        # 14 document types (singletons + collections)
│   │   └── objects/
│   │       └── sections/     # One schema file per section type (15 total)
│   ├── structure/            # Custom Studio desk structure + singleton helpers
│   └── config/               # Sanity defineConfig (plugins, schema, document actions)
│
├── styles/
│   ├── theme-presets/
│   │   └── default.css       # Default brand token values — copy to create client themes
│   └── tokens.ts             # JS mirrors of CSS design token values
│
└── types/                    # Global TypeScript declarations
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Sanity Studio Guide

The Studio is at **`/studio`** — `http://localhost:3000/studio` in development.

### Sidebar navigation

| Section | Type | What it controls |
|---|---|---|
| **Site Settings** | Singleton | Business name, phone, email, address, hours, logo, SEO defaults, social links, tracking IDs |
| **Header & Navigation** | Singleton | Logo, nav links, CTA button, announcement bar |
| **Footer** | Singleton | Logo, tagline, link columns, social links, copyright |
| **Homepage** | Singleton | Homepage sections array |
| **Services** | Collection | Individual service documents with slug, sections, FAQs, testimonials |
| **Service Areas** | Collection | City/region documents with slug, sections, neighborhoods |
| **Testimonials** | Collection | Customer reviews with rating, source, and location |
| **FAQs** | Collection | Question/answer pairs with category and display order |
| **Team** | Collection | Team member profiles |
| **Gallery** | Collection | Before/after project photo documents |
| **Blog** | Collection | Blog post documents |
| **Offers** | Collection | Promotional offers with date range and display locations |

**Singletons** (Site Settings, Header, Footer, Homepage) open directly to edit — you cannot create duplicates. **Collections** show a list where you create, edit, reorder, and delete documents.

### The sections system

Every page document has a **Page Sections** array. You compose the page by adding section blocks:

1. Open a document (e.g., a Service, or the Homepage)
2. Scroll to **Page Sections**
3. Click **Add item**
4. Choose a section type from the dropdown
5. Fill in the section's fields
6. Drag to reorder sections
7. Click **Publish**

Sections with data-driven content (testimonials, services, FAQs, gallery) can be set to **auto mode** — they pull in all relevant published documents automatically — or **manual selection** so you choose exactly which items appear.

---

## Section Library

| Section | Description |
|---|---|
| `heroSection` | Page hero with eyebrow, title, subtitle, body text, and up to two CTAs. Variants: `centered`, `split`, `imageRight`, `compact` |
| `trustBarSection` | Row of short trust indicators (e.g. "Licensed & Insured", "5-Star Rated"). Variants: `inline`, `grid` |
| `servicesGridSection` | Grid of service cards linking to service pages. Auto or manual selection |
| `featureListSection` | Icon + text feature blocks (e.g. "Why Choose Us"). Variants: `grid`, `list`, `alternating` |
| `processSection` | Numbered steps (e.g. "How It Works"). Variants: `vertical`, `horizontal`, `timeline` |
| `ctaBandSection` | Full-width call-to-action banner. Background variants: `default`, `primary`, `dark`, `accent` |
| `testimonialSection` | Customer reviews with star ratings. Auto or manual selection. Variants: `grid`, `carousel`, `featured` |
| `faqSection` | Accordion FAQ list. Auto or manual selection, optional category filter |
| `gallerySection` | Project photo gallery with optional before/after. Variants: `grid`, `masonry`, `carousel` |
| `serviceAreaSection` | Service area links. Variants: `list`, `grid`, `badges` |
| `contentSection` | Rich text block with optional image. Variants: `default`, `imageLeft`, `imageRight`, `centered` |
| `contactSection` | Contact form with business info. Form modes: `full`, `compact`, `minimal` |
| `statsSection` | Row of statistics (e.g. "500+ Projects Completed") |
| `teamSection` | Team member cards. Variants: `grid`, `list` |
| `promoBannerSection` | Slim promotional banner between sections |

---

## Creating a New Client Site

1. **Clone or fork this repo**
2. **Create a Sanity project** for this client — see [docs/setup.md](docs/setup.md)
3. **Copy `.env.example` → `.env.local`** and fill in the client's credentials
4. **Run `npm run dev`** and open the Studio at `/studio`
5. **Populate content** in this order:
   - Site Settings → business name, phone, email, address, logo
   - Header & Navigation → nav links, CTA button
   - Footer → tagline, link columns
   - Homepage → add sections to build the homepage layout
   - Services → one document per service offered
   - Service Areas → one document per city or region served
   - Testimonials, FAQs, Team, Gallery → supporting content
6. **Customize the theme** — see [Customizing the Theme](#customizing-the-theme)
7. **Test locally** — verify all pages render correctly
8. **Deploy to Vercel** — see [Deployment](#deployment)
9. **Set up the revalidation webhook** — see [Revalidation Webhook](#revalidation-webhook)
10. **Hand off Studio access** — invite the client as a member at [sanity.io/manage](https://sanity.io/manage)

---

## Customizing the Theme

All branding is controlled by CSS custom properties. Never edit component files to change colors or fonts — always use tokens.

### Colors

Edit the token values under `:root` in **`src/app/globals.css`**. All colors use `oklch()`. The most common tokens to update for a new client:

```css
:root {
  --primary: oklch(…);            /* Brand primary — buttons, key accents */
  --primary-foreground: oklch(…); /* Text/icons on primary backgrounds */
  --secondary: oklch(…);
  --accent: oklch(…);
  --background: oklch(…);
  --foreground: oklch(…);
  --radius: …;                    /* Corner radius (affects all components) */
}
```

### Reusable brand presets

Copy `src/styles/theme-presets/default.css` and name it after the brand (e.g., `blue-trade.css`). The preset only needs to declare the tokens that differ from the default. Import it in the root layout after `globals.css`:

```tsx
// src/app/layout.tsx
import "./globals.css"
import "@/styles/theme-presets/blue-trade.css"
```

### Fonts

Font variables are set up in `src/app/layout.tsx` via `next/font` and referenced in `globals.css`. To change fonts: swap the `next/font` imports and update the `--font-sans` / `--font-mono` references in the `@theme` block.

---

## Preview and Visual Editing

Draft mode lets editors see unpublished changes on the live site before publishing.

### Presentation Tool (recommended)

1. In the Studio sidebar, open **Preview**
2. The Studio opens the site in an embedded iframe with draft mode active
3. Edit document fields — changes appear in the preview in real time (powered by Sanity Live)
4. Publish when satisfied

### Manual draft mode

Enable: `GET /api/draft` (triggered automatically by the Presentation Tool)

Disable: click **Exit preview** in the amber banner at the top of the page, or navigate to `/api/draft/disable`

When draft mode is active, an amber banner reads **"Preview mode is on. You are viewing draft content."** It appears on every page until you exit.

---

## Revalidation Webhook

The site uses static generation (SSG) with on-demand ISR. Publishing a document triggers a webhook that tells Next.js to regenerate the affected pages — no manual redeploys needed.

### Setup

1. [sanity.io/manage](https://sanity.io/manage) → your project → **API → Webhooks → Create webhook**
2. Fill in:

| Field | Value |
|---|---|
| **Name** | Next.js Revalidate |
| **URL** | `https://yourdomain.com/api/revalidate` |
| **Trigger on** | Create, Update, Delete |
| **Filter** | *(leave empty — triggers on all document types)* |
| **HTTP method** | POST |
| **HTTP Headers** | `sanity-webhook-secret: <your SANITY_REVALIDATION_SECRET>` |

3. Save. Publishing in Studio now updates the live site within seconds.

---

## Contact Form

The contact form (at `/contact` and via the `contactSection` on any page) includes:

- Client-side validation with field-level error messages
- Server-side validation with length guards
- Honeypot field to filter bots
- Rate limiting — 3 submissions per IP per 15 minutes

**Email delivery:**

| Scenario | Behavior |
|---|---|
| `RESEND_API_KEY` is set | Submissions are emailed to `CONTACT_EMAIL_TO` |
| `RESEND_API_KEY` is empty | Submissions are logged to the server console |

To set up email delivery: create an account at [resend.com](https://resend.com), add and verify your sending domain, create an API key, then set `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and `CONTACT_EMAIL_FROM` in your environment.

---

## SEO

All SEO is generated automatically from Sanity content — no manual meta tag management.

| Feature | How it works |
|---|---|
| Title & description | Page-level SEO fields in Studio; falls back to Site Settings defaults |
| Canonical URL | Built from `NEXT_PUBLIC_SITE_URL` + page path; overridable per document |
| Open Graph & Twitter | Generated from the same SEO fields |
| JSON-LD structured data | `LocalBusiness` on all pages; `Service` on service pages; `FAQPage` where FAQs exist; `BreadcrumbList` on detail pages |
| Sitemap | `/sitemap.xml` — auto-generated from all published routes |
| Robots | `/robots.txt` — blocks `/studio/` and `/api/` from crawlers |

To customize SEO for a page: open the document in Studio, expand the **SEO** field group, and fill in the fields.

---

## Deployment

1. Push the repo to GitHub
2. Connect it to a new Vercel project at [vercel.com](https://vercel.com)
3. Set all environment variables in Vercel (same as `.env.local` — use the production `NEXT_PUBLIC_SITE_URL`)
4. Deploy
5. Add your production domain in Vercel → Settings → Domains
6. Add your production domain to Sanity CORS origins: [sanity.io/manage](https://sanity.io/manage) → API → CORS origins (enable credentials)
7. Create the revalidation webhook pointing to the production URL (see above)

---

## Links

- **[docs/setup.md](docs/setup.md)** — Full Sanity setup walkthrough
