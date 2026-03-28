import type { Metadata } from "next"
import { getAllTestimonials, getPageBySlug, getSiteSettings } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import { HeroSection } from "@/components/sections/HeroSection"
import { TestimonialSection } from "@/components/sections/TestimonialSection"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import type { TestimonialData } from "@/lib/sanity/types"
import type { TestimonialRef } from "@/lib/sanity/types"

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) return { title: "Customer Reviews" }
  try {
    const [page, settings] = await Promise.all([
      getPageBySlug("reviews"),
      getSiteSettings(),
    ])
    return buildMetadata(page?.seo ?? null, {
      title: "Customer Reviews",
      description: "See what our customers are saying about our service.",
      siteSettings: settings,
      path: "/reviews",
    })
  } catch {
    return { title: "Customer Reviews" }
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toRef(t: TestimonialData): TestimonialRef {
  return {
    _id: t._id,
    customerName: t.customerName,
    customerLabel: t.customerLabel,
    quote: t.quote,
    rating: t.rating,
    sourceLabel: t.sourceLabel,
    locationLabel: t.locationLabel,
  }
}

function averageRating(testimonials: TestimonialData[]): number {
  if (!testimonials.length) return 0
  return testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ReviewsPage() {
  let testimonials: TestimonialData[] = []
  let pageTitle = "Customer Reviews"
  let pageSubtitle: string | undefined

  if (isSanityConfigured) {
    try {
      const [all, page] = await Promise.all([
        getAllTestimonials(),
        getPageBySlug("reviews"),
      ])
      testimonials = all
      if (page?.hero?.title) pageTitle = page.hero.title
      if (page?.hero?.subtitle) pageSubtitle = page.hero.subtitle
    } catch {
      // use defaults
    }
  }

  const avg = averageRating(testimonials)
  const intro =
    testimonials.length > 0
      ? `${testimonials.length} reviews · ${avg.toFixed(1)} average rating`
      : undefined

  return (
    <main>
      <HeroSection
        data={{
          _type: "heroSection",
          _key: "reviews-hero",
          title: pageTitle,
          subtitle: pageSubtitle ?? "Honest feedback from real customers across our service area.",
          variant: "compact",
        }}
      />

      {testimonials.length > 0 ? (
        <TestimonialSection
          data={{
            _type: "testimonialSection",
            _key: "reviews-list",
            title: intro ? undefined : "What Our Customers Say",
            intro,
            autoMode: false,
            selectedTestimonials: testimonials.map(toRef),
            layout: "grid",
          }}
        />
      ) : (
        <Section>
          <Container size="sm">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {isSanityConfigured
                  ? "No reviews have been added yet."
                  : "Connect Sanity to display customer reviews."}
              </p>
            </div>
          </Container>
        </Section>
      )}
    </main>
  )
}
