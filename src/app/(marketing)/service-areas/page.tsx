import type { Metadata } from "next"
import { getAllServiceAreas, getPageBySlug, getSiteSettings } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import { HeroSection } from "@/components/sections/HeroSection"
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import type { ServiceAreaListItemData, ServiceAreaRef } from "@/lib/sanity/types"

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) return { title: "Service Areas" }
  try {
    const [page, settings] = await Promise.all([
      getPageBySlug("service-areas"),
      getSiteSettings(),
    ])
    return buildMetadata(page?.seo ?? null, {
      title: "Service Areas",
      description: "Find out if we serve your area.",
      siteSettings: settings,
      path: "/service-areas",
    })
  } catch {
    return { title: "Service Areas" }
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toRef(sa: ServiceAreaListItemData): ServiceAreaRef {
  return {
    _id: sa._id,
    title: sa.title,
    slug: sa.slug,
    city: sa.city,
    state: sa.state,
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiceAreasPage() {
  let areas: ServiceAreaListItemData[] = []
  let heroTitle = "Areas We Serve"
  let heroSubtitle: string | undefined

  if (isSanityConfigured) {
    try {
      const [all, page] = await Promise.all([
        getAllServiceAreas(),
        getPageBySlug("service-areas"),
      ])
      areas = all
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
          _key: "areas-hero",
          title: heroTitle,
          subtitle:
            heroSubtitle ?? "Serving homeowners and businesses across the region.",
          variant: "compact",
        }}
      />

      {areas.length > 0 ? (
        <ServiceAreaSection
          data={{
            _type: "serviceAreaSection",
            _key: "areas-grid",
            autoMode: false,
            selectedServiceAreas: areas.map(toRef),
            displayMode: "grid",
          }}
        />
      ) : (
        <Section>
          <Container size="sm">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {isSanityConfigured
                  ? "No service areas have been added yet."
                  : "Connect Sanity to display service areas."}
              </p>
            </div>
          </Container>
        </Section>
      )}
    </main>
  )
}
