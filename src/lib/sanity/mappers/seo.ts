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
  { title, description, siteSettings }: BuildMetadataDefaults
): Metadata {
  const siteName = siteSettings?.businessName ?? ""
  const siteDefaultSeo = siteSettings?.defaultSeo

  const resolvedTitle = seo?.metaTitle ?? title
  const resolvedDescription =
    seo?.metaDescription ?? description ?? siteDefaultSeo?.metaDescription ?? ""

  const ogTitle = seo?.ogTitle ?? seo?.metaTitle ?? title
  const ogDescription =
    seo?.ogDescription ?? seo?.metaDescription ?? resolvedDescription

  const ogImageSrc = seo?.ogImage ?? siteDefaultSeo?.ogImage
  const ogImageUrl = ogImageSrc
    ? urlFor(ogImageSrc).width(1200).height(630).auto("format").url()
    : undefined

  const robotsIndex = seo?.robotsIndex ?? siteDefaultSeo?.robotsIndex ?? true
  const robotsFollow = seo?.robotsFollow ?? siteDefaultSeo?.robotsFollow ?? true

  return {
    title: siteName ? `${resolvedTitle} | ${siteName}` : resolvedTitle,
    description: resolvedDescription,
    ...(seo?.canonicalUrl && {
      alternates: { canonical: seo.canonicalUrl },
    }),
    openGraph: {
      title: siteName ? `${ogTitle} | ${siteName}` : ogTitle,
      description: ogDescription,
      siteName: siteName || undefined,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      }),
    },
    robots: {
      index: robotsIndex,
      follow: robotsFollow,
    },
  }
}
