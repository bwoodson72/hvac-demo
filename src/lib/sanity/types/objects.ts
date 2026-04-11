import type { PortableTextBlock } from "next-sanity"

// ── Raw Sanity image reference (unexpanded — keeps urlFor() working) ──────────
export interface SanityImage {
  _type: "image"
  asset: { _ref: string; _type: "reference" }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

// ── Reusable objects ──────────────────────────────────────────────────────────

export interface SeoData {
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: SanityImage
  robotsIndex: boolean
  robotsFollow: boolean
}

export interface LinkData {
  _key?: string
  label: string
  href?: string
  /** Resolved slug + type from internalRef-> */
  internalRef?: {
    _type: string
    slug: string
  }
  openInNewTab?: boolean
  variant?: "default" | "button" | "buttonOutline"
}

export interface CtaData {
  eyebrow?: string
  title: string
  text?: string
  primaryLink?: LinkData
  secondaryLink?: LinkData
  phoneOverride?: string
}

export interface ImageWithAltData {
  image: SanityImage
  alt: string
  caption?: string
}

export interface HeroData {
  eyebrow?: string
  title: string
  subtitle?: string
  body?: string
  primaryCta?: LinkData
  secondaryCta?: LinkData
  image?: ImageWithAltData
  backgroundStyle?: "default" | "dark" | "primary"
}

export interface BusinessHoursData {
  _key: string
  day: string
  opens?: string
  closes?: string
  isClosed?: boolean
}

export type PortableText = PortableTextBlock[]
