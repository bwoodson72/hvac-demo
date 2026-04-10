import type { Metadata } from "next"
import { getPageBySlug, getSiteSettings, getAllServiceAreas } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import { HeroSection } from "@/components/sections/HeroSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection"
import type { ServiceAreaListItemData, ServiceAreaRef } from "@/lib/sanity/types"

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) return { title: "Contact Us" }
  try {
    const [page, settings] = await Promise.all([
      getPageBySlug("contact"),
      getSiteSettings(),
    ])
    return buildMetadata(page?.seo ?? null, {
      title: "Contact Us",
      description: "Get in touch for a free estimate or to schedule service.",
      siteSettings: settings,
      path: "/contact",
    })
  } catch {
    return { title: "Contact Us" }
  }
}

// ── Helper ────────────────────────────────────────────────────────────────────

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

export default async function ContactPage() {
  let heroTitle = "Get in Touch"
  let heroSubtitle: string | undefined
  let serviceAreaRefs: ServiceAreaRef[] = []
  let phone: string | undefined
  let email: string | undefined
  let address: { street?: string; city?: string; state?: string; zip?: string } | undefined
  let businessHours: Array<{ _key: string; day: string; opens: string; closes: string; isClosed: boolean }> | undefined

  if (isSanityConfigured) {
    try {
      const [page, areas, siteSettings] = await Promise.all([
        getPageBySlug("contact"),
        getAllServiceAreas(),
        getSiteSettings(),
      ])
      if (page?.hero?.title) heroTitle = page.hero.title
      if (page?.hero?.subtitle) heroSubtitle = page.hero.subtitle
      serviceAreaRefs = areas.map(toRef)
      phone = siteSettings?.phone ?? undefined
      email = siteSettings?.email ?? undefined
      address = siteSettings?.address ?? undefined
      businessHours = siteSettings?.businessHours as typeof businessHours ?? undefined
    } catch {
      // use defaults
    }
  }

  return (
    <main>
      <HeroSection
        data={{
          _type: "heroSection",
          _key: "contact-hero",
          title: heroTitle,
          subtitle:
            heroSubtitle ??
            "Have a question or ready to schedule service? We'd love to hear from you.",
          variant: "compact",
        }}
      />

      <ContactSection
        data={{
          _type: "contactSection",
          _key: "contact-form",
          title: undefined,
          intro: undefined,
          formMode: "full",
          showPhone: true,
          showEmail: true,
          showAddress: true,
          showHours: true,
          phone,
          email,
          address,
          businessHours,
        }}
      />

      {serviceAreaRefs.length > 0 && (
        <ServiceAreaSection
          data={{
            _type: "serviceAreaSection",
            _key: "contact-areas",
            title: "Areas We Serve",
            autoMode: false,
            selectedServiceAreas: serviceAreaRefs,
            displayMode: "badges",
          }}
        />
      )}
    </main>
  )
}
