# Setup Guide

Complete walkthrough for setting up a client site using this template: creating a Sanity project, configuring the environment, and populating content in the Studio.

---

## Deployment Model

Before starting: understand how this template is designed to be used.

**This is a clone-per-client template, not a hosted platform.** Every client gets:

- Their own copy of this repository (a fresh clone, detached from the template's git history)
- Their own Sanity project (separate content, separate access control, separate billing)
- Their own Vercel deployment (separate URL, separate environment variables, separate build)

If you are managing 10 client sites, you have 10 repos, 10 Sanity projects, and 10 Vercel deployments. There is no shared backend, no shared database, and no multi-tenant routing. Client A's content is completely isolated from Client B's.

This isolation is intentional. It means:
- A content mistake on one client's site cannot affect another
- You can grant a client editor access to their Studio without exposing other clients
- Each client can be on a different Sanity plan without affecting others

---

## Table of Contents

1. [Creating a Sanity Project](#1-creating-a-sanity-project)
2. [Creating an API Token](#2-creating-an-api-token)
3. [Configuring CORS Origins](#3-configuring-cors-origins)
4. [Connecting the Project](#4-connecting-the-project)
5. [Verifying the Connection](#5-verifying-the-connection)
6. [Adding Content in Studio](#6-adding-content-in-studio)
7. [Understanding the Sections System](#7-understanding-the-sections-system)
8. [Managing Images](#8-managing-images)
9. [Preview and Publishing Workflow](#9-preview-and-publishing-workflow)

---

## 1. Creating a Sanity Project

Create one project per client site. Do not reuse a project across clients.

1. Go to [sanity.io](https://sanity.io) and sign up or log in
2. Navigate to [sanity.io/manage](https://sanity.io/manage)
3. Click **Create new project**
4. **Name:** use the client's business name (e.g., `Smith Plumbing Website`) — visible only inside the Sanity dashboard, not on the live site
5. **Plan:** select the free plan — Sanity's free tier is sufficient for most small business sites
6. **Dataset:** when prompted, create a dataset named `production`

After the project is created, you land on the project dashboard. Your **Project ID** is a short alphanumeric string displayed near the top (e.g., `abc123de`). Copy it — this is `NEXT_PUBLIC_SANITY_PROJECT_ID`.

---

## 2. Creating an API Token

The API token allows the Next.js server to fetch draft content for preview mode.

1. In [sanity.io/manage](https://sanity.io/manage), open this client's project
2. Go to **API → Tokens**
3. Click **Add API token**
4. Fill in:
   - **Label:** `Next.js Site Read Token` (or any descriptive name)
   - **Permissions:** select **Viewer** — read-only access is sufficient; do not use Editor or Admin tokens in the frontend
5. Click **Save**
6. **Copy the token immediately** — Sanity shows it only once

This token goes in `SANITY_API_READ_TOKEN`.

> **Security:** This token is used server-side only — in Route Handlers and Server Components. It is never sent to the browser. The `SANITY_API_READ_TOKEN` environment variable is not prefixed with `NEXT_PUBLIC_` intentionally.

---

## 3. Configuring CORS Origins

CORS origins tell Sanity which domains may make authenticated requests to the API. Without the correct origins, the embedded Studio and preview mode will not function.

1. In [sanity.io/manage](https://sanity.io/manage), open this client's project
2. Go to **API → CORS origins**
3. Click **Add CORS origin**
4. Enter `http://localhost:3000`
5. **Check "Allow credentials"** — required for the Studio and for draft mode cookies to work
6. Click **Save**

After deployment, return here and add the production domain:
- Origin: `https://smithplumbing.com`
- Allow credentials: checked

> If the Studio loads but shows authentication errors, or if preview mode doesn't activate, a missing or misconfigured CORS origin is the most common cause.

---

## 4. Connecting the Project

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in every value:

```bash
# ─── Sanity ──────────────────────────────────────────────────────────────────
# Get these from sanity.io/manage → this client's project

NEXT_PUBLIC_SANITY_PROJECT_ID="abc123de"       # From the project dashboard
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

SANITY_API_READ_TOKEN="skAbcDef..."            # The Viewer token from step 2

# ─── Site ────────────────────────────────────────────────────────────────────

NEXT_PUBLIC_SITE_URL="http://localhost:3000"   # Use the production URL after deployment

# ─── Revalidation ────────────────────────────────────────────────────────────
# Generate with: openssl rand -hex 32

SANITY_REVALIDATION_SECRET="paste-random-string-here"

# ─── Contact form (optional) ─────────────────────────────────────────────────
# Leave RESEND_API_KEY empty to log submissions to the console during development

RESEND_API_KEY=""
CONTACT_EMAIL_TO="client@example.com"
CONTACT_EMAIL_FROM="noreply@yourdomain.com"
```

**Never commit `.env.local` to version control.** It is listed in `.gitignore`.

When you set up Vercel, you will enter the same keys in the Vercel dashboard (with the production values substituted for `NEXT_PUBLIC_SITE_URL` and any other environment-specific values).

---

## 5. Verifying the Connection

```bash
npm run dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio).

**What you should see:** The Sanity Studio interface with the organized sidebar — Site Settings, Header & Navigation, Footer, Homepage, Services, Service Areas, and so on.

**Troubleshooting:**

| Symptom | Likely cause | Fix |
|---|---|---|
| Studio shows a CORS error | `http://localhost:3000` not in CORS origins, or credentials not enabled | Add the origin with credentials at sanity.io/manage → API → CORS origins |
| Studio shows "Not authenticated" | `SANITY_API_READ_TOKEN` is wrong or empty | Re-check the token value in `.env.local` |
| Studio loads but has no documents or schemas | `NEXT_PUBLIC_SANITY_PROJECT_ID` or `NEXT_PUBLIC_SANITY_DATASET` is wrong | Re-check both values |
| Runtime error about `projectId` on startup | Project ID contains underscores or other invalid characters | Project IDs use only `a-z`, `0-9`, and hyphens |

With a valid connection, open [http://localhost:3000](http://localhost:3000). Pages render with empty or placeholder states until you add content — that is expected.

---

## 6. Adding Content in Studio

Work through the Studio sidebar in this order. Each section builds on the previous one.

### Step 1 — Site Settings

Open **Site Settings** from the sidebar. This is the foundation for the entire site — business info, SEO defaults, and brand identity all live here.

Fill in:

| Field | Notes |
|---|---|
| **Business name** | The client's full trading name |
| **Tagline** | One short phrase — used in footer and SEO fallbacks |
| **Phone** | Formatted as the client prefers, e.g. `(555) 123-4567` |
| **Email** | Primary contact address |
| **Address** | Street, city, state, zip |
| **Business hours** | One entry per day; mark closed days with the "Closed" toggle |
| **Logo** | PNG with transparent background, at least 400 px wide |
| **Canonical URL** | Production domain, e.g. `https://smithplumbing.com` (use `http://localhost:3000` locally) |
| **Default SEO** | Meta title template and default description — these apply to any page without its own SEO fields |
| **Social links** | Facebook, Instagram, Google Business, Yelp, etc. |

Click **Publish** when done.

### Step 2 — Header & Navigation

Open **Header & Navigation**.

- **Nav links** — add one item per navigation link; set label and destination URL
- **CTA button** — the primary action button in the header (e.g., "Get a Free Quote" → `/contact`)
- **Show phone in header** — toggle on to show the business phone next to the CTA

Click **Publish**.

### Step 3 — Footer

Open **Footer**.

- **Navigation columns** — add columns (e.g., "Services", "Company") with links in each
- **Bottom links** — secondary bar links (Privacy Policy, Terms, etc.)
- **Show social links** — automatically pulls from Site Settings

Click **Publish**.

### Step 4 — Homepage

Open **Homepage**. The homepage has no fixed layout — it is composed entirely from a **Page Sections** array.

A typical starting layout for a service business:

| Order | Section type | Purpose |
|---|---|---|
| 1 | `heroSection` | Primary headline, subtext, two CTAs, hero image |
| 2 | `trustBarSection` | 4–6 short trust phrases |
| 3 | `servicesGridSection` | All active services (auto mode) |
| 4 | `featureListSection` | "Why Choose Us" reasons with icons |
| 5 | `testimonialSection` | Featured testimonials (auto mode) |
| 6 | `ctaBandSection` | Full-width CTA banner |
| 7 | `faqSection` | Featured FAQs (auto mode) |

Add sections via **Add item → choose section type → fill in fields → Publish**.

### Step 5 — Services

Open **Services** and create one document per service the client offers.

For each service:

- **Title** — the service name (e.g., "Water Heater Installation")
- **Slug** — auto-generated from the title; do not change after publishing, as it forms the URL
- **Short description** — 1–2 sentences shown on listing pages and cards
- **Icon key** — a Lucide icon name representing the service (e.g., `wrench`, `droplets`, `flame`, `bolt`)
- **Page Sections** — compose the service detail page with section blocks (a hero, feature list, testimonials, FAQs, and a CTA band is a good default)
- **FAQs** — link to FAQ documents relevant to this service
- **Testimonials** — link to testimonials that mention this service
- **Related services** — cross-link to other services

Remove any seeded services that do not apply to this client. Add services that are missing.

### Step 6 — Service Areas

Open **Service Areas** and create one document per city or region the client serves.

- **Title** — e.g., "Granbury, TX"
- **City / State** — used in structured data
- **Slug** — auto-generated, forms the URL
- **Intro copy** — a short paragraph about serving this area
- **Neighborhoods** — list of neighborhoods or suburbs within the area
- **Related services** — which services are available in this area

### Step 7 — Testimonials

Create one **Testimonial** document per customer review.

- **Customer name** — first name and last initial works well (e.g., "Sarah M.")
- **Quote** — exact customer words; aim for 40–200 characters for best display
- **Rating** — 1–5 stars
- **Source** — where the review was posted (Google, Yelp, Facebook)
- **Source URL** — link to the original review, if available
- **Location label** — e.g., "Granbury, TX" — adds local credibility
- **Featured** — check to include in auto-populated testimonial sections
- **Display order** — lower numbers appear first

### Step 8 — FAQs

Create one **FAQ** document per question.

- **Question** — phrased as a customer would ask it
- **Answer** — rich text; supports bold, lists, and links
- **Category** — General, Pricing, Services, Process, Warranty, Emergency
- **Featured** — check to include in auto-populated FAQ sections
- **Related services** — link to services this FAQ applies to

### Step 9 — Team (optional)

Create one **Team Member** document per person to feature. Requires a name, role, bio, and photo.

### Step 10 — Gallery / Projects (optional)

Create **Gallery** documents to show completed work. Each document supports a before image, an after image, and a gallery of additional photos. Link each project to a service and/or service area for filtering.

---

## 7. Understanding the Sections System

Pages in this template have no fixed layout. You compose them by stacking **section blocks** in a **Page Sections** array.

### Adding a section

1. Open a page document (Homepage, a Service, a Service Area, or a Page)
2. Scroll to **Page Sections**
3. Click **Add item**
4. Choose a section type from the dropdown
5. Fill in the fields — each field includes a description explaining what it does and how it will appear
6. Drag the drag handle to reorder sections
7. Click **Publish** to make changes live

### Auto mode vs. manual selection

Sections that display content from other documents (services, testimonials, FAQs, projects) have two modes:

**Auto mode** — the section fetches all relevant published documents automatically. Best for sections where you always want to show everything (e.g., all active services on the Services listing page).

**Manual selection** — you pick specific documents to include. Best for curated sections where only certain items should appear (e.g., three specific testimonials on a service page, or a hand-picked FAQ set).

### Section variants

Each section type has a set of **layout variants** (for example, the hero section has `centered`, `split`, `imageRight`, and `compact`). Variants control the visual layout, not the content. You can switch variants without losing any content you have entered.

Pick the variant that suits the page context:
- `centered` hero — good for interior pages where a full-width centered header is appropriate
- `split` hero — strong for the homepage; headline on the left, image on the right
- `compact` hero — shorter; useful on inner service or FAQ pages

---

## 8. Managing Images

### Alt text

Every image field in the Studio requires **alt text**. Write a brief description of what is depicted. This is required for accessibility compliance and helps with image SEO.

### Hotspot and crop

After uploading an image, click **Edit** on the image thumbnail to set a **hotspot** (focal point). The hotspot tells the image component where the important subject is, so the image crops correctly at different aspect ratios on different screen sizes.

Set the hotspot on:
- Any photo where a person's face or important object could be cropped on mobile
- Hero images where the subject is off-center

### Recommended upload sizes

| Use | Minimum width | Orientation |
|---|---|---|
| Hero images | 1920 px | Landscape |
| Service / gallery images | 800 px | Landscape |
| Team photos | 600 px | Portrait |
| Before/after project photos | 800 px | Any |
| Logo | 400 px | — (PNG with transparent background) |

The site generates responsive variants and serves AVIF/WebP automatically — editors do not need to resize images manually. Upload the highest-quality source available.

---

## 9. Preview and Publishing Workflow

### Drafts

All changes in Studio are saved as **drafts** automatically. Drafts do not affect the live site until you click Publish.

### Previewing before publishing

**Via Presentation Tool (recommended):**

1. Open the **Preview** tool from the Studio left sidebar
2. The site loads in an embedded iframe with draft mode active
3. Continue editing in the Studio — changes appear in the preview in real time
4. Navigate around the preview to check other pages

**Manually (for sharing a preview URL with a client):**

Send the client to `https://yourdomain.com` — if they have not enabled draft mode, they will see the published site. Draft mode is browser-session-scoped and only active for editors who have gone through the enable flow.

### Publishing

When the preview looks correct:

1. Click **Publish** on the document in Studio
2. If the [revalidation webhook](../README.md#revalidation-webhook) is configured, Next.js regenerates the affected pages within a few seconds
3. The live site reflects the change without a redeploy

### Exiting preview mode

An amber banner at the top of the page reads **"Preview mode is on."** Click **Exit preview** to return to the published site. Alternatively, navigate to `/api/draft/disable`.

### What happens without the revalidation webhook?

Published changes will not appear on the live site until the next full Vercel deployment. For development and staging this is acceptable, but production client sites should always have the webhook configured.
