import type { SiteSettingsData, ServiceData, FaqData } from "@/lib/sanity/types"
import type { FaqRef } from "@/lib/sanity/types"
import type { PortableTextBlock } from "next-sanity"

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Extract plain text from a PortableText block array */
function ptToText(blocks: PortableTextBlock[]): string {
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => {
      const children = (b as { children?: Array<{ text?: string }> }).children ?? []
      return children.map((c) => c.text ?? "").join("")
    })
    .join(" ")
    .trim()
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ""

function siteBase(settings?: SiteSettingsData | null): string {
  return settings?.canonicalUrl ?? BASE_URL
}

// ── Schema generators ─────────────────────────────────────────────────────────

/**
 * LocalBusiness schema — render once in the root marketing layout.
 */
export function generateLocalBusinessSchema(
  settings: SiteSettingsData
): Record<string, unknown> {
  const base = siteBase(settings)

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.businessName,
    url: base || undefined,
  }

  if (settings.phone) schema.telephone = settings.phone
  if (settings.email) schema.email = settings.email

  if (settings.address) {
    const { street, city, state, zip } = settings.address
    schema.address = {
      "@type": "PostalAddress",
      ...(street ? { streetAddress: street } : {}),
      ...(city ? { addressLocality: city } : {}),
      ...(state ? { addressRegion: state } : {}),
      ...(zip ? { postalCode: zip } : {}),
      addressCountry: "US",
    }
  }

  if (settings.businessHours?.length) {
    schema.openingHoursSpecification = settings.businessHours
      .filter((h) => !h.isClosed && h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${h.day}`,
        opens: h.opens,
        closes: h.closes,
      }))
  }

  return schema
}

/**
 * Service schema for a service detail page.
 */
export function generateServiceSchema(
  service: ServiceData,
  settings: SiteSettingsData | null | undefined
): Record<string, unknown> {
  const base = siteBase(settings)

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: `${base}/services/${service.slug}`,
    provider: settings?.businessName
      ? {
          "@type": "LocalBusiness",
          name: settings.businessName,
          ...(base ? { url: base } : {}),
        }
      : undefined,
    ...(settings?.address?.city
      ? {
          areaServed: {
            "@type": "City",
            name: [settings.address.city, settings.address.state]
              .filter(Boolean)
              .join(", "),
          },
        }
      : {}),
  }
}

/**
 * FAQPage schema — requires at least one FAQ entry.
 */
export function generateFaqSchema(
  faqs: Array<FaqData | FaqRef>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: ptToText(faq.answer),
      },
    })),
  }
}

/**
 * BreadcrumbList schema. Pass full absolute URLs for `url`.
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

/**
 * WebPage schema for generic pages.
 */
export function generateWebPageSchema(page: {
  title: string
  description?: string
  url: string
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    ...(page.description ? { description: page.description } : {}),
    url: page.url,
  }
}
