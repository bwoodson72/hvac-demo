# Setup Guide

This guide walks through everything needed to go from a fresh clone to a fully running site — Sanity project creation, environment configuration, verifying the connection, and getting content into Studio.

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

1. Go to [sanity.io](https://sanity.io) and sign up or log in
2. Navigate to [sanity.io/manage](https://sanity.io/manage)
3. Click **Create new project**
4. **Project name:** use the client's business name (e.g., `Smith Plumbing`) — this is only visible inside the Sanity dashboard
5. **Plan:** select the free plan — Sanity's free tier is sufficient for most client sites
6. **Dataset:** when prompted, create a dataset named **`production`**

After the project is created, you land on the project dashboard. Your **Project ID** is displayed at the top of the page (a short alphanumeric string like `abc123de`). Copy it — you'll need it for `NEXT_PUBLIC_SANITY_PROJECT_ID`.

> Each client should have their own separate Sanity project. Do not reuse a project across clients — content, access control, and billing are all project-scoped.

---

## 2. Creating an API Token

The API token lets the Next.js server fetch draft content for the preview workflow.

1. In [sanity.io/manage](https://sanity.io/manage), open your project
2. Go to **API → Tokens**
3. Click **Add API token**
4. Fill in:
   - **Label:** `Next.js Preview` (or any descriptive name)
   - **Permissions:** select **Viewer** — read-only access is all that's needed
5. Click **Save**
6. **Copy the token immediately** — Sanity displays it only once

This token goes in `SANITY_API_READ_TOKEN`.

> **Security note:** This token is used server-side only. It is never exposed to the browser — the code that uses it runs exclusively in Next.js Route Handlers and Server Components.

---

## 3. Configuring CORS Origins

CORS origins control which domains can make authenticated requests to the Sanity API. Without the correct origins, the embedded Studio and preview mode will not work.

1. In [sanity.io/manage](https://sanity.io/manage), open your project
2. Go to **API → CORS origins**
3. Click **Add CORS origin**
4. Add `http://localhost:3000`
5. **Check "Allow credentials"** — this is required for the Studio and draft mode cookies
6. Save

When you deploy to production, return here and add your production domain (e.g., `https://smithplumbing.com`) with credentials enabled.

> If you see CORS errors in the browser console when opening the Studio, this step is the most likely cause. Double-check that credentials are enabled for the origin.

---

## 4. Connecting the Project

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in every value:

```bash
# Sanity — find these at sanity.io/manage → your project
NEXT_PUBLIC_SANITY_PROJECT_ID="abc123de"     # Your project ID
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

# The read token you created in step 2
SANITY_API_READ_TOKEN="your-token-here"

# Your site URL — use localhost for local development
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Random secret for the revalidation webhook
# Generate with: openssl rand -hex 32
SANITY_REVALIDATION_SECRET="paste-generated-secret-here"

# Optional — Resend for contact form email delivery
# Leave empty to log form submissions to the console instead
RESEND_API_KEY=""
CONTACT_EMAIL_TO="hello@example.com"
CONTACT_EMAIL_FROM="noreply@yourdomain.com"
```

**Never commit `.env.local` to version control.** It is already in `.gitignore`.

---

## 5. Verifying the Connection

```bash
npm run dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio).

**Expected:** The Sanity Studio interface loads with the organized sidebar — Site Settings, Header & Navigation, Footer, Homepage, Services, Service Areas, etc.

**Troubleshooting:**

| Symptom | Likely cause |
|---|---|
| Studio shows a CORS error | `http://localhost:3000` not added to CORS origins (with credentials) |
| Studio shows "Not authenticated" | `SANITY_API_READ_TOKEN` is empty or incorrect |
| Studio loads but shows no schema | `NEXT_PUBLIC_SANITY_PROJECT_ID` or `NEXT_PUBLIC_SANITY_DATASET` is wrong |
| `projectId` validation error on startup | Project ID contains invalid characters — must be `a-z`, `0-9`, and hyphens only |

Once the Studio loads correctly, navigate to the home page at [http://localhost:3000](http://localhost:3000). With no content yet, pages will render with empty or placeholder states — that is expected.

---

## 6. Adding Content in Studio

Work through the Studio sections in this order. Each step builds on the last.

### Step 1 — Site Settings

Open **Site Settings** from the sidebar. This is the foundation every other part of the site references.

Fill in:
- **Business name** — the client's full legal or trading name
- **Tagline** — one short phrase (used in the footer and SEO fallbacks)
- **Phone** — formatted as the client prefers (e.g., `(555) 123-4567`)
- **Email** — the primary contact address
- **Address** — street, city, state, zip
- **Business hours** — add one entry per day; mark days off as "Closed"
- **Logo** — upload a PNG with a transparent background (at least 400 px wide)
- **Default SEO** — fill in the default meta title and description; these apply to any page that doesn't set its own
- **Canonical URL** — the production domain (e.g., `https://smithplumbing.com`); use `http://localhost:3000` during local development
- **Social links** — Facebook, Instagram, etc.

Click **Publish** when done.

### Step 2 — Header & Navigation

Open **Header & Navigation**.

- **Nav links** — add one entry per navigation item; set the label and destination URL
- **CTA button** — the prominent button in the header (e.g., "Get a Free Quote" → `/contact`)
- **Show phone in header** — toggle on to display the business phone next to the CTA

Click **Publish**.

### Step 3 — Footer

Open **Footer**.

- **Tagline** — optional short description for the footer
- **Navigation columns** — add columns (e.g., "Services", "Company") and links within each
- **Bottom links** — secondary links for the footer bar (e.g., Privacy Policy, Terms)
- **Show social links** — pulls social links from Site Settings automatically

Click **Publish**.

### Step 4 — Homepage

Open **Homepage**. The homepage is composed entirely from section blocks.

Start with a typical layout for a service business:

1. **Hero section** — headline, subtext, two CTAs (e.g., "Get a Free Quote" + "Our Services"), and an image. Use the `split` variant for visual impact.
2. **Trust bar section** — 4–6 short trust phrases (e.g., "Licensed & Insured", "20+ Years Experience", "Free Estimates")
3. **Services grid section** — set to auto mode; it will display all active services
4. **Feature list section** — "Why Choose Us" reasons with icons
5. **Testimonial section** — set to auto mode; displays featured testimonials
6. **CTA band section** — full-width banner (e.g., "Ready to Get Started? Call Today.")
7. **FAQ section** — set to auto mode with featured FAQs

Add sections one at a time, fill in the fields, then publish.

### Step 5 — Services

Open **Services** and create one document per service the business offers.

For each service:
- **Title** — the service name (e.g., "Water Heater Installation")
- **Slug** — auto-generated from the title; do not change after publishing
- **Short description** — 1–2 sentences shown on listing pages and cards
- **Icon key** — choose a Lucide icon name (e.g., `wrench`, `droplets`, `flame`) to represent the service
- **Hero** — optional hero block for the service detail page
- **Page sections** — add sections to build out the service page
- **FAQs** — link to FAQ documents relevant to this service
- **Testimonials** — link to testimonials mentioning this service

### Step 6 — Service Areas

Open **Service Areas** and create one document per city or region served.

For each area:
- **Title** — city or region name (e.g., "Granbury, TX")
- **City / State** — used in structured data and location labels
- **Slug** — auto-generated
- **Intro copy** — a short paragraph introducing the area
- **Neighborhoods** — list of neighborhoods or suburbs served within the area
- **Related services** — link to the services available in this area

### Step 7 — Testimonials

Create one **Testimonial** document per customer review.

- **Customer name** — first name and last initial is typical (e.g., "John D.")
- **Quote** — the customer's words verbatim; aim for 40–200 characters
- **Rating** — 1 to 5 stars
- **Source** — where the review was left (Google, Yelp, Facebook)
- **Source URL** — link to the original review if available
- **Location label** — e.g., "Granbury, TX" — adds credibility
- **Featured** — check this to have the testimonial appear in auto-populated testimonial sections

### Step 8 — FAQs

Create one **FAQ** document per question.

- **Question** — write it as a customer would ask it (e.g., "How long does a water heater installation take?")
- **Answer** — a clear, concise answer. Supports rich text (bold, lists, links).
- **Category** — use to group FAQs; options include General, Pricing, Services, Process, Warranty, Emergency
- **Featured** — check this to have the FAQ appear in auto-populated FAQ sections
- **Related services** — link to services this FAQ is relevant to

### Step 9 — Team (optional)

If the business wants to showcase team members, create one **Team Member** document per person.

- Name, role, bio, certifications, photo

### Step 10 — Gallery (optional)

Create **Gallery** (Project) documents to show completed work.

- Before image + after image — used in before/after gallery sections
- Category, service reference, service area reference

---

## 7. Understanding the Sections System

Pages in this system have no fixed layout — you build the page by stacking **section blocks** in a **Page Sections** array.

### Adding a section

1. Open any page document (Homepage, a Service, a Service Area, or a generic Page)
2. Scroll to **Page Sections**
3. Click **Add item**
4. Choose a section type from the dropdown
5. Fill in the section's fields (every field has a description to guide you)
6. Drag the section up or down to reorder
7. Publish the document

### Auto mode vs. manual selection

Many sections that display content from other documents (testimonials, services, FAQs, gallery items) have two modes:

- **Auto mode** — the section fetches all relevant published documents automatically. Use this when you want the section to stay up to date as you add content.
- **Manual selection** — you pick specific documents to include. Use this when you need fine-grained control (e.g., only show three specific testimonials on a service page).

### Section variants

Each section type has a set of **layout variants** (e.g., `centered`, `split`, `grid`, `list`). Pick the variant that fits the page context — the variant controls layout and visual treatment, not content. You can switch variants without losing your content.

---

## 8. Managing Images

### Alt text

All image fields in the Studio require **alt text** — a brief description of the image for screen readers and search engines. Do not skip this field.

### Hotspot and crop

After uploading an image, click **Edit** on the image thumbnail to set a **hotspot** (focal point). The hotspot tells the image component where the subject is, so the image crops correctly at different aspect ratios across screen sizes.

Set the hotspot on every image where the subject might be cropped on mobile.

### Recommended upload sizes

| Use | Minimum width |
|---|---|
| Hero images | 1920 px |
| Service / gallery images | 800 px |
| Team photos | 600 px |
| Logo | 400 px (PNG with transparent background) |

The site generates responsive image variants automatically — editors do not need to resize images manually. Upload the highest-quality version available.

### Image formats

Sanity accepts JPEG, PNG, WebP, and SVG. The site serves images as AVIF or WebP where supported. Upload JPEG or PNG for photos; SVG for logos and icons.

---

## 9. Preview and Publishing Workflow

### Making changes

All edits in Studio are saved as **drafts** — they do not affect the live site until you publish.

### Previewing before publishing

1. Open a document in Studio
2. Click the **Preview** icon in the top toolbar, or open the **Preview** tool from the left sidebar
3. The site loads in an embedded iframe showing your draft changes in context
4. You can continue editing — changes appear in the preview in real time

### Publishing

When the preview looks correct:

1. Click **Publish** on the document
2. The revalidation webhook fires automatically
3. The live site regenerates the affected pages within a few seconds

### Exiting preview mode

If you navigated to the site directly with draft mode active (rather than through the Studio), a banner appears at the top: **"Preview mode is on."** Click **Exit preview** to return to the published site.

### Revalidation webhook (reminder)

For publishing to update the live site automatically, the revalidation webhook must be configured in Sanity. See the [Revalidation Webhook](../README.md#revalidation-webhook) section in the main README for setup instructions.

If the webhook is not set up, published changes will not appear on the live site until the next full deployment or until you manually trigger a redeploy.
