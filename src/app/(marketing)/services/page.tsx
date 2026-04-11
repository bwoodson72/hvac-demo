import type { Metadata } from "next"
import { getAllServices, getPageBySlug, getSite } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import { HeroSection } from "@/components/sections/HeroSection"
import { ServicesGridSection } from "@/components/sections/ServicesGridSection"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import type { ServiceListItemData, ServiceRef } from "@/lib/sanity/types"

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) return { title: "Our Services" }
  try {
    const [page, site] = await Promise.all([
      getPageBySlug("services"),
      getSite(),
    ])
    return buildMetadata(page?.seo ?? null, {
      title: "Our Services",
      description: "Browse all services we offer for homeowners and businesses.",
      siteSettings: site,
      path: "/services",
    })
  } catch {
    return { title: "Our Services" }
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toRef(s: ServiceListItemData): ServiceRef {
  return {
    _id: s._id,
    title: s.title,
    slug: s.slug,
    shortDescription: s.shortDescription,
    iconKey: s.iconKey,
    featuredImage: s.featuredImage,
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ServicesPage() {
  let services: ServiceListItemData[] = []
  let heroTitle = "Our Services"
  let heroSubtitle: string | undefined

  if (isSanityConfigured) {
    try {
      const [all, page] = await Promise.all([getAllServices(), getPageBySlug("services")])
      services = all
      if (page?.hero?.title) heroTitle = page.hero.title
      if (page?.hero?.subtitle) heroSubtitle = page.hero.subtitle
    } catch {
      // use defaults
    }
  }

  return (
    <main>
      <HeroSection
        data={{
          _type: "heroSection",
          _key: "services-hero",
          title: heroTitle,
          subtitle:
            heroSubtitle ?? "Expert home services delivered by licensed, insured professionals.",
        }}
      />

      {services.length > 0 ? (
        <ServicesGridSection
          data={{
            _type: "servicesGridSection",
            _key: "services-grid",
            autoMode: false,
            selectedServices: services.map(toRef),
          }}
        />
      ) : (
        <Section>
          <Container size="sm">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {isSanityConfigured
                  ? "No services have been added yet."
                  : "Connect Sanity to display services."}
              </p>
            </div>
          </Container>
        </Section>
      )}
    </main>
  )
}
