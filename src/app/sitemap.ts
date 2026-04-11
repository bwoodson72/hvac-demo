import type { MetadataRoute } from "next"
import { isSanityConfigured } from "@/lib/sanity/client"
import {
  getSite,
  getAllServices,
  getAllServiceAreas,
} from "@/lib/sanity/queries"

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/services", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/service-areas", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/reviews", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/gallery", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ""

  if (isSanityConfigured) {
    try {
      const site = await getSite()
      if (site?.canonicalUrl) baseUrl = site.canonicalUrl
    } catch {
      // use env fallback
    }
  }

  // Remove trailing slash for consistent URL construction
  baseUrl = baseUrl.replace(/\/$/, "")

  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  )

  if (!isSanityConfigured) return staticEntries

  const [services, serviceAreas] = await Promise.allSettled([
    getAllServices(),
    getAllServiceAreas(),
  ])

  const serviceEntries: MetadataRoute.Sitemap =
    services.status === "fulfilled"
      ? services.value.map((s) => ({
          url: `${baseUrl}/services/${s.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.9,
        }))
      : []

  const areaEntries: MetadataRoute.Sitemap =
    serviceAreas.status === "fulfilled"
      ? serviceAreas.value.map((sa) => ({
          url: `${baseUrl}/service-areas/${sa.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        }))
      : []

  // Blog entries added here when blog feature is enabled (see enableBlog in site settings)

  return [...staticEntries, ...serviceEntries, ...areaEntries]
}
