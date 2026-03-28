import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllServices, getServiceBySlug, getSiteSettings } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import { ServicePage } from "@/components/page-templates/ServicePage"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { Container } from "@/components/shared/Container"
import { JsonLd } from "@/components/shared/JsonLd"
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/jsonLd"

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  if (!isSanityConfigured) return []
  try {
    const services = await getAllServices()
    return services.map((s) => ({ slug: s.slug }))
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
    const [service, settings] = await Promise.all([
      getServiceBySlug(slug),
      getSiteSettings(),
    ])
    if (!service) return { title: "Service Not Found" }
    return buildMetadata(service.seo ?? null, {
      title: service.title,
      description: service.shortDescription,
      siteSettings: settings,
      path: `/services/${slug}`,
    })
  } catch {
    return { title: slug }
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params

  if (!isSanityConfigured) notFound()

  let service
  let settings = null
  try {
    ;[service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()])
  } catch {
    notFound()
  }

  if (!service) notFound()

  const baseUrl = settings?.canonicalUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? ""

  return (
    <>
      <JsonLd data={generateServiceSchema(service, settings)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: `${baseUrl}/` },
          { name: "Services", url: `${baseUrl}/services` },
          { name: service.title },
        ])}
      />
      {service.faqs && service.faqs.length > 0 && (
        <JsonLd data={generateFaqSchema(service.faqs)} />
      )}

      <div className="border-b border-border">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        </Container>
      </div>
      <ServicePage service={service} />
    </>
  )
}
