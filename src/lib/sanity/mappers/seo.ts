import type { Metadata } from "next"
import { urlFor } from "../image"
import type { SeoData, SiteSettingsData } from "../types"

interface BuildMetadataDefaults {
  /** Page-level title (e.g. document title field) */
  title: string
  /** Page-level fallback description */
  description?: string
  /** Site-wide settings for final fallbacks */
  siteSettings?: SiteSettingsData | null
  /** URL path for canonical construction, e.g. "/services/plumbing" */
  path?: string
  /** OpenGraph page type (default: "website") */
  type?: "website" | "article"
  /** ISO date string for article publishedTime */
  publishedAt?: string
}

/**
 * Generates a Next.js `Metadata` object from Sanity SEO data.
 *
 * Priority order for each field:
 *   1. Page-level seo object (from Sanity)
 *   2. Page-level defaults (title, description passed as args)
 *   3. Site-wide defaultSeo from siteSettings
 */
export function buildMetadata(
  seo: SeoData | null | undefined,
  {
    title,
    description,
    siteSettings,
    path,
    type = "website",
    publishedAt,
  }: BuildMetadataDefaults
): Metadata {
  const siteName = siteSettings?.businessName ?? ""
  const siteDefaultSeo = siteSettings?.defaultSeo
  const baseUrl =
    siteSettings?.canonicalUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? ""

  // ── Resolved text values ──────────────────────────────────────────────────
  const resolvedTitle = seo?.metaTitle ?? title
  const resolvedDescription =
    seo?.metaDescription ?? description ?? siteDefaultSeo?.metaDescription ?? ""

  // ── Title formatting ──────────────────────────────────────────────────────
  const template = siteSettings?.defaultSeoTitleTemplate
  const formatTitle = (t: string) =>
    template ? template.replace("%s", t) : siteName ? `${t} | ${siteName}` : t

  // ── OG values ─────────────────────────────────────────────────────────────
  const ogTitle = seo?.ogTitle ?? seo?.metaTitle ?? title
  const ogDescription = seo?.ogDescription ?? seo?.metaDescription ?? resolvedDescription

  const ogImageSrc = seo?.ogImage ?? siteDefaultSeo?.ogImage
  const ogImageUrl = ogImageSrc
    ? urlFor(ogImageSrc).width(1200).height(630).auto("format").url()
    : undefined

  // ── Robots ────────────────────────────────────────────────────────────────
  const robotsIndex = seo?.robotsIndex ?? siteDefaultSeo?.robotsIndex ?? true
  const robotsFollow = seo?.robotsFollow ?? siteDefaultSeo?.robotsFollow ?? true

  // ── Canonical URL ─────────────────────────────────────────────────────────
  const canonicalUrl =
    seo?.canonicalUrl ?? (path !== undefined ? `${baseUrl}${path}` : undefined)

  return {
    title: formatTitle(resolvedTitle),
    description: resolvedDescription || undefined,
    ...(canonicalUrl && {
      alternates: { canonical: canonicalUrl },
    }),
    openGraph: {
      title: formatTitle(ogTitle),
      description: ogDescription || undefined,
      siteName: siteName || undefined,
      type,
      ...(type === "article" && publishedAt ? { publishedTime: publishedAt } : {}),
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(ogImageUrl
        ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: formatTitle(ogTitle),
      description: ogDescription || undefined,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
    robots: {
      index: robotsIndex,
      follow: robotsFollow,
    },
  }
}
