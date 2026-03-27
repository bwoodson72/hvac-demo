import { groq } from "next-sanity"

// ── Reusable projections ──────────────────────────────────────────────────────

export const imageWithAltFragment = groq`
  image,
  alt,
  caption
`

export const linkFragment = groq`
  label,
  href,
  openInNewTab,
  variant,
  "internalRef": internalRef->{
    "_type": _type,
    "slug": slug.current
  }
`

export const seoFragment = groq`
  metaTitle,
  metaDescription,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  "robotsIndex": coalesce(robotsIndex, true),
  "robotsFollow": coalesce(robotsFollow, true)
`

export const heroFragment = groq`
  eyebrow,
  title,
  subtitle,
  body,
  primaryCta{${linkFragment}},
  secondaryCta{${linkFragment}},
  image{${imageWithAltFragment}},
  backgroundStyle,
  variant
`

// ── Reference expansions used inside sections ─────────────────────────────────

const serviceRefFragment = groq`
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  iconKey,
  featuredImage{${imageWithAltFragment}}
`

const testimonialRefFragment = groq`
  _id,
  customerName,
  customerLabel,
  quote,
  rating,
  sourceLabel,
  locationLabel
`

const faqRefFragment = groq`
  _id,
  question,
  answer,
  category
`

const projectRefFragment = groq`
  _id,
  title,
  "slug": slug.current,
  category,
  afterImage{${imageWithAltFragment}}
`

const serviceAreaRefFragment = groq`
  _id,
  title,
  "slug": slug.current,
  city,
  state
`

const teamMemberRefFragment = groq`
  _id,
  name,
  role,
  bio,
  image{${imageWithAltFragment}},
  certifications
`

// ── Section expansion ─────────────────────────────────────────────────────────
// All possible fields are selected; unused fields return null for non-matching types.
// The TypeScript discriminated union on _type enforces correctness at compile time.

export const sectionsFragment = groq`
  sections[]{
    _key,
    _type,

    // ── Common text fields ──────────────────────────────────────
    title,
    intro,
    text,

    // ── HeroSection ─────────────────────────────────────────────
    eyebrow,
    subtitle,
    body,
    primaryCta{${linkFragment}},
    secondaryCta{${linkFragment}},
    image{${imageWithAltFragment}},
    trustItems[]{_key, icon, label},
    "variant": coalesce(variant, "split"),

    // ── TrustBarSection ─────────────────────────────────────────
    items[]{_key, icon, label, value},
    "layout": coalesce(layout, "inline"),

    // ── ServicesGridSection ──────────────────────────────────────
    "autoMode": coalesce(autoMode, false),
    cardStyle,
    "columns": coalesce(columns, "3"),
    "selectedServices": selectedServices[]->{${serviceRefFragment}},

    // ── FeatureListSection ───────────────────────────────────────
    features[]{_key, icon, title, description},

    // ── ProcessSection ───────────────────────────────────────────
    steps[]{_key, title, description, icon},
    "showNumbers": coalesce(showNumbers, true),

    // ── CtaBandSection ───────────────────────────────────────────
    "background": coalesce(background, "primary"),

    // ── TestimonialSection ───────────────────────────────────────
    "selectedTestimonials": selectedTestimonials[]->{${testimonialRefFragment}},

    // ── FaqSection ───────────────────────────────────────────────
    categoryFilter,
    "selectedFaqs": selectedFaqs[]->{${faqRefFragment}},

    // ── GallerySection ───────────────────────────────────────────
    "selectedProjects": selectedProjects[]->{${projectRefFragment}},

    // ── ServiceAreaSection ───────────────────────────────────────
    "displayMode": coalesce(displayMode, "grid"),
    "selectedServiceAreas": selectedServiceAreas[]->{${serviceAreaRefFragment}},

    // ── ContentSection ───────────────────────────────────────────
    body[]{...},
    cta{${linkFragment}},

    // ── ContactSection ───────────────────────────────────────────
    "formMode": coalesce(formMode, "full"),
    "showPhone": coalesce(showPhone, true),
    "showEmail": coalesce(showEmail, true),
    "showAddress": coalesce(showAddress, true),
    "showHours": coalesce(showHours, true),

    // ── StatsSection ─────────────────────────────────────────────
    stats[]{_key, value, label, prefix, suffix},

    // ── TeamSection ──────────────────────────────────────────────
    "selectedMembers": selectedMembers[]->{${teamMemberRefFragment}},

    // ── PromoBannerSection ───────────────────────────────────────
    "style": coalesce(style, "default"),
  }
`
