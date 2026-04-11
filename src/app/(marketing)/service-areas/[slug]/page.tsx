import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllServiceAreas, getServiceAreaBySlug, getSite } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import { ServiceAreaPage } from "@/components/page-templates/ServiceAreaPage"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { Container } from "@/components/shared/Container"
import { JsonLd } from "@/components/shared/JsonLd"
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo/jsonLd"

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  if (!isSanityConfigured) return []
  try {
    const areas = await getAllServiceAreas()
    return areas.map((a) => ({ slug: a.slug }))
  } catch {
    return []
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> }

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!isSanityConfigured) return { title: slug }
  try {
    const [area, site] = await Promise.all([
      getServiceAreaBySlug(slug),
      getSite(),
    ])
    if (!area) return { title: "Service Area Not Found" }
    const locationLabel = [area.city, area.state].filter(Boolean).join(", ")
    return buildMetadata(area.seo ?? null, {
      title: `Services in ${locationLabel}`,
      description: `Professional home services serving ${locationLabel} and the surrounding area.`,
      siteSettings: site,
      path: `/service-areas/${slug}`,
    })
  } catch {
    return { title: slug }
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiceAreaDetailPage({ params }: Props) {
  const { slug } = await params

  if (!isSanityConfigured) notFound()

  let area
  let site = null
  try {
    ;[area, site] = await Promise.all([getServiceAreaBySlug(slug), getSite()])
  } catch {
    notFound()
  }

  if (!area) notFound()

  const locationLabel = [area.city, area.state].filter(Boolean).join(", ")
  const baseUrl = site?.canonicalUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? ""

  // LocalBusiness with areaServed scoped to this city
  const localBusinessData = site
    ? {
        ...generateLocalBusinessSchema(site),
        areaServed: {
          "@type": "City",
          name: locationLabel,
        },
      }
    : null

  return (
    <>
      {localBusinessData && <JsonLd data={localBusinessData} />}
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: `${baseUrl}/` },
          { name: "Service Areas", url: `${baseUrl}/service-areas` },
          { name: locationLabel },
        ])}
      />

      <div className="border-b border-border">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Service Areas", href: "/service-areas" },
              { label: locationLabel },
            ]}
          />
        </Container>
      </div>
      <ServiceAreaPage serviceArea={area} />
    </>
  )
}
