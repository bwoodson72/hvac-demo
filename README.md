# Service Business Website Template

A reusable website template for local service businesses — plumbers, roofers, HVAC contractors, electricians, and similar trades. This is **not a hosted platform or multi-tenant system**. For each new client, you clone this repo, create a new Sanity project, customize the content and branding, and deploy to Vercel as a standalone site. Every client site is a separate repository, a separate Sanity project, and a separate Vercel deployment. There is no shared infrastructure between client sites.

Content is fully managed through an embedded Sanity Studio. Pages are assembled from a controlled library of 15 section types so editors compose layouts without touching code. SEO metadata, structured data, sitemap, and robots.txt are all generated automatically from Sanity content.

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| **Next.js** (App Router) | 16.2.1 | Framework — server components, SSG, ISR |
| **React** | 19.x | UI runtime |
| **TypeScript** | 5.x | Language |
| **Tailwind CSS v4** | 4.x | Styling via CSS-first `@theme` config |
| **shadcn/ui** | 4.x | Accessible component primitives |
| **Sanity Studio** | 5.x | Embedded CMS — runs at `/studio` in the same Next.js app |
| **next-sanity** | 12.x | Sanity client, live preview, ISR integration |
| **Resend** | 6.x | Transactional email for the contact form |
| **Vercel** | — | Deployment target |

> Sanity Studio is embedded in the Next.js app. It runs at `/studio` and deploys alongside the site — there is no separate Studio project or Sanity deployment step.

---

## Prerequisites

- **Node.js 18+**
- **npm**
- A **Sanity account** — [sanity.io](https://sanity.io) (free tier is sufficient for most client sites)
- A **Resend account** — [resend.com](https://resend.com) (optional — the contact form logs submissions to the console when Resend is not configured, so development works without it)
- A **Vercel account** — [vercel.com](https://vercel.com) (for deployment)

---

## Quick Start

> **For a new client:** clone into a directory named for the client, then follow the steps below. Each client is its own repo from the start.

```bash
# 1. Clone into a new directory for this client
git clone <template-repo-url> smith-plumbing
cd smith-plumbing

# 2. Install dependencies
npm install

# 3. Create a new Sanity project for this client
#    → Full instructions at docs/setup.md#creating-a-sanity-project

# 4. Copy the example env file and fill in this client's values
cp .env.example .env.local
# Edit .env.local — see Environment Variables below

# 5. Start the development server
npm run dev
```

- Site → [http://localhost:3000](http://localhost:3000)
- Studio → [http://localhost:3000/studio](http://localhost:3000/studio)

With no content yet, pages render with empty or placeholder states — that is expected until you add content in the Studio.

See **[docs/setup.md](docs/setup.md)** for the full Sanity setup walkthrough, CORS configuration, and Studio orientation.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in every value. Each client site has its own unique set of values.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Yes** | This client's Sanity project ID — found at [sanity.io/manage](https://sanity.io/manage). Each client site has a different value. |
| `NEXT_PUBLIC_SANITY_DATASET` | **Yes** | Dataset name — almost always `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | **Yes** | Sanity API version date — use `2024-01-01` |
| `SANITY_API_READ_TOKEN` | **Yes** | Sanity API token with Viewer permissions for this project — required for draft/preview mode |
| `SANITY_REVALIDATION_SECRET` | **Yes** | Random string — used to verify incoming Sanity webhook signatures for on-demand ISR |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | The public URL of **this client's** site — `http://localhost:3000` for local dev, production domain after deploy |
| `RESEND_API_KEY` | No | Resend API key — if omitted, form submissions are logged to the server console |
| `CONTACT_EMAIL_TO` | No | Email address that receives contact form submissions for this client |
| `CONTACT_EMAIL_FROM` | No | Sender address for contact emails — must be a domain verified in Resend |

**Generate secret strings with:**

```bash
openssl rand -hex 32
```

---

## Sanity Setup

> **Every client site needs its own Sanity project.** Do not reuse a Sanity project across client sites — content, access control, and billing are all project-scoped.

Short version:

1. Go to [sanity.io/manage](https://sanity.io/manage) → **Create new project** → name it after the client
2. Create a `production` dataset
3. Note the **Project ID** from the dashboard → `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. Go to **API → Tokens** → create a **Viewer** token → `SANITY_API_READ_TOKEN`
5. Go to **API → CORS origins** → add `http://localhost:3000` with credentials enabled
6. Paste values into `.env.local`

See **[docs/setup.md](docs/setup.md)** for the complete step-by-step walkthrough including CORS configuration, verifying the connection, and populating content.

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
│   │   ├── services/         # Services listing + [slug] detail  /services
│   │   ├── service-areas/    # Service areas listing + [slug] detail  /service-areas
│   │   └── layout.tsx        # Shared layout — JSON-LD, SanityLive, DraftBanner
│   ├── api/
│   │   ├── contact/          # Contact form handler (validation, rate limiting, Resend)
│   │   ├── draft/            # Enable draft mode — called by Presentation Tool
│   │   │   └── disable/      # Disable draft mode
│   │   └── revalidate/       # On-demand ISR revalidation webhook
│   ├── studio/[[...tool]]/   # Embedded Sanity Studio
│   ├── layout.tsx            # Root layout (fonts, globals.css)
│   ├── globals.css           # Tailwind v4 @theme design tokens + base styles
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

The Studio is at **`/studio`** — `http://localhost:3000/studio` in development, `https://yourdomain.com/studio` in production.

### Sidebar navigation

| Section | Type | What it controls |
|---|---|---|
| **Site Settings** | Singleton | Business name, phone, email, address, hours, logo, SEO defaults, social links, tracking IDs |
| **Header & Navigation** | Singleton | Logo, nav links, CTA button, announcement bar |
| **Footer** | Singleton | Logo, tagline, link columns, social links, copyright |
| **Homepage** | Singleton | Homepage page sections array |
| **Services** | Collection | Individual service documents with slug, sections, FAQs, testimonials |
| **Service Areas** | Collection | City/region documents with slug, sections, neighborhoods |
| **Testimonials** | Collection | Customer reviews with rating, source, and location |
| **FAQs** | Collection | Question/answer pairs with category and display order |
| **Team** | Collection | Team member profiles |
| **Gallery** | Collection | Before/after project photo documents |
| **Blog** | Collection | Blog post documents |
| **Offers** | Collection | Promotional offers with date range and display locations |

**Singletons** (Site Settings, Header, Footer, Homepage) open directly to a single editable document — you cannot create duplicates. **Collections** show a list where you create, edit, reorder, and delete documents.

### The sections system

Pages are not fixed templates — they are composed by stacking **section blocks** in a **Page Sections** array. To add a section:

1. Open a document (the Homepage, a Service, a Service Area, or a generic Page)
2. Scroll to **Page Sections**
3. Click **Add item**
4. Choose a section type from the dropdown
5. Fill in the fields — every field has a description explaining what it does
6. Drag to reorder
7. Click **Publish**

Editors control content and layout variant; they do not control CSS or arbitrary styling. Section designs are fixed — variants cover the meaningful layout choices.

---

## Section Library

| Section | Description |
|---|---|
| `heroSection` | Page hero with eyebrow, title, subtitle, body text, and up to two CTAs. Variants: `centered`, `split`, `imageRight`, `compact` |
| `trustBarSection` | Row of short trust indicators (e.g. "Licensed & Insured"). Variants: `inline`, `grid` |
| `servicesGridSection` | Grid of service cards linking to service pages. Auto-populates all active services or uses manual selection |
| `featureListSection` | Icon + text feature blocks (e.g. "Why Choose Us"). Variants: `grid`, `list`, `alternating` |
| `processSection` | Numbered steps (e.g. "How It Works"). Variants: `vertical`, `horizontal`, `timeline` |
| `ctaBandSection` | Full-width call-to-action banner. Background variants: `default`, `primary`, `dark`, `accent` |
| `testimonialSection` | Customer reviews with star ratings. Auto or manual selection. Variants: `grid`, `carousel`, `featured` |
| `faqSection` | Accordion FAQ list. Auto or manual selection with optional category filter |
| `gallerySection` | Project photo gallery with optional before/after. Variants: `grid`, `masonry`, `carousel` |
| `serviceAreaSection` | Service area links. Variants: `list`, `grid`, `badges` |
| `contentSection` | Rich text block with optional image. Variants: `default`, `imageLeft`, `imageRight`, `centered` |
| `contactSection` | Contact form with business info sidebar. Form modes: `full`, `compact`, `minimal` |
| `statsSection` | Row of statistics (e.g. "500+ Projects Completed") |
| `teamSection` | Team member cards. Variants: `grid`, `list` |
| `promoBannerSection` | Slim promotional banner between sections |

---

## Creating a New Client Site

This is the full per-client workflow, from zero to a live site.

```bash
# Step 1: Clone the template into a new directory for this client
git clone <template-repo-url> smith-plumbing
cd smith-plumbing

# Step 2: Detach from the template's git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Initial commit from service template"
```

Then:

3. **Create a new Sanity project** for this client at [sanity.io/manage](https://sanity.io/manage) — see [docs/setup.md](docs/setup.md)
4. **Create a Viewer API token** for the new Sanity project
5. **Copy `.env.example` → `.env.local`** and fill in this client's Sanity project ID, token, site URL, and other values
6. **Run `npm run dev`** and open [http://localhost:3000/studio](http://localhost:3000/studio)
7. **Populate content** in the Studio — see [Adding Content in Studio](docs/setup.md#adding-content-in-studio):
   - Site Settings — business name, phone, address, logo, hours
   - Header & Navigation — nav links, CTA button
   - Footer — tagline, link columns
   - Homepage — compose the homepage from section blocks
   - Services — one document per service
   - Service Areas — one document per city/region
   - Testimonials, FAQs, Team, Gallery — supporting content
8. **Customize the theme** — update brand colors and fonts (see [Customizing the Theme](#customizing-the-theme))
9. **Test locally** — verify all pages render correctly
10. **Create a new GitHub repo** for this client and push
11. **Connect to Vercel** as a new project and set all environment variables
12. **Deploy**
13. **Set up the custom domain** in Vercel
14. **Update `NEXT_PUBLIC_SITE_URL`** in Vercel to the production domain; update the canonical URL in Studio → Site Settings to match
15. **Add the production domain** to CORS origins in [sanity.io/manage](https://sanity.io/manage)
16. **Set up the revalidation webhook** in Sanity (see [Revalidation Webhook](#revalidation-webhook))
17. **Hand off Studio access** — invite the client as a project member at [sanity.io/manage](https://sanity.io/manage)

---

## Customizing the Theme

All branding is controlled by CSS custom properties. Do not edit component files to change colors or fonts — always use the token system.

### Colors

Edit the token values under `:root` in **`src/app/globals.css`**. All colors use `oklch()`. Common tokens to update for a new client:

```css
:root {
  --primary: oklch(…);              /* Brand primary — buttons, key accents */
  --primary-foreground: oklch(…);   /* Text/icons on primary backgrounds */
  --secondary: oklch(…);
  --accent: oklch(…);
  --background: oklch(…);
  --foreground: oklch(…);
  --radius: …;                      /* Border radius — affects all rounded components */
}
```

### Reusable brand presets

Copy `src/styles/theme-presets/default.css` and name it after the client brand (e.g., `smith-plumbing.css`). The preset only needs to override tokens that differ from the defaults. Import it in the root layout:

```tsx
// src/app/layout.tsx
import "./globals.css"
import "@/styles/theme-presets/smith-plumbing.css"
```

### Fonts

Font variables are configured in `src/app/layout.tsx` via `next/font` and referenced in the `@theme` block in `globals.css`. To change fonts: swap the `next/font` imports and update the `--font-sans` / `--font-mono` token references.

---

## Preview and Visual Editing

Draft mode lets editors see unpublished content in context before publishing. The live site is never affected until the editor clicks Publish.

### Presentation Tool (recommended)

1. Open **Preview** from the Studio left sidebar
2. The Studio loads the site in an embedded iframe with draft mode active
3. Edit document fields — changes appear in real time (powered by Sanity Live)
4. Publish when satisfied

### Manual draft mode

- **Enable:** `GET /api/draft` (triggered automatically by the Presentation Tool)
- **Disable:** click **Exit preview** in the amber banner, or `GET /api/draft/disable`

An amber banner reading **"Preview mode is on. You are viewing draft content."** appears at the top of every page while draft mode is active.

---

## Revalidation Webhook

The site uses static generation with on-demand ISR. Publishing a document in Studio triggers a webhook that tells Next.js to regenerate affected pages — no manual redeploys required.

**This must be configured separately for each client's Sanity project and production domain.**

### Setup

1. [sanity.io/manage](https://sanity.io/manage) → your project → **API → Webhooks → Create webhook**

| Field | Value |
|---|---|
| **Name** | Next.js Revalidate |
| **URL** | `https://this-clients-domain.com/api/revalidate` |
| **Trigger on** | Create, Update, Delete |
| **Filter** | *(leave empty)* |
| **HTTP method** | POST |
| **HTTP Headers** | `sanity-webhook-secret: <your SANITY_REVALIDATION_SECRET>` |

2. Save. Publishing in Studio now updates the live site within seconds.

---

## Contact Form

The contact form (at `/contact` and via the `contactSection` section) includes:

- Client-side validation with field-level error messages
- Server-side validation with length guards
- Honeypot field for bot filtering
- Rate limiting — 3 submissions per IP per 15 minutes

### Email delivery

| State | Behavior |
|---|---|
| `RESEND_API_KEY` is set | Submissions emailed to `CONTACT_EMAIL_TO` |
| `RESEND_API_KEY` is empty | Submissions logged to the server console |

### Setup for each client

1. Create (or log into) your [Resend](https://resend.com) account
2. Add and verify the sending domain (your agency domain or the client's domain)
3. Create an API key
4. Set `RESEND_API_KEY`, `CONTACT_EMAIL_TO` (the client's inbox), and `CONTACT_EMAIL_FROM` in Vercel

---

## SEO

All SEO is generated automatically from Sanity content — no manual meta tag management needed.

| Feature | Details |
|---|---|
| Title & description | From page-level SEO fields; falls back to Site Settings defaults |
| Canonical URL | Built from `NEXT_PUBLIC_SITE_URL` + page path; overridable per document |
| Open Graph & Twitter card | Generated from the same SEO fields |
| JSON-LD structured data | `LocalBusiness` on all pages; `Service` on service pages; `FAQPage` where FAQs exist; `BreadcrumbList` on detail pages |
| Sitemap | `/sitemap.xml` — auto-generated from all published routes |
| Robots | `/robots.txt` — blocks `/studio/` and `/api/` |

To customize SEO for a specific page: open the document in Studio, expand the **SEO** group, and fill in the fields.

---

## Deployment

1. Create a new GitHub repo for this client and push the code
2. Create a new Vercel project connected to that repo
3. Set all environment variables in Vercel (same keys as `.env.local` — use the production `NEXT_PUBLIC_SITE_URL`)
4. Deploy
5. Set up the custom domain in Vercel → Settings → Domains
6. Add the production domain to Sanity CORS origins (credentials enabled)
7. Update `NEXT_PUBLIC_SITE_URL` in Vercel to the production domain
8. Update **Canonical URL** in Studio → Site Settings to the production domain
9. Create the revalidation webhook in Sanity pointing to the production URL

---

## Links

- **[docs/setup.md](docs/setup.md)** — Full Sanity setup walkthrough: project creation, tokens, CORS, content entry
