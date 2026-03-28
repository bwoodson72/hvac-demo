import type { Metadata } from "next"
import { getAllFaqs, getPageBySlug, getSiteSettings } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import { HeroSection } from "@/components/sections/HeroSection"
import { FaqSection } from "@/components/sections/FaqSection"
import { Heading } from "@/components/shared/Heading"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { JsonLd } from "@/components/shared/JsonLd"
import { generateFaqSchema } from "@/lib/seo/jsonLd"
import type { FaqData, FaqRef, FaqSectionData } from "@/lib/sanity/types"

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) return { title: "FAQ" }
  try {
    const [page, settings] = await Promise.all([
      getPageBySlug("faq"),
      getSiteSettings(),
    ])
    return buildMetadata(page?.seo ?? null, {
      title: "Frequently Asked Questions",
      description: "Answers to common questions about our services.",
      siteSettings: settings,
      path: "/faq",
    })
  } catch {
    return { title: "FAQ" }
  }
}

// ── Helper ────────────────────────────────────────────────────────────────────

function toRef(f: FaqData): FaqRef {
  return {
    _id: f._id,
    question: f.question,
    answer: f.answer,
    category: f.category,
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function FaqPage() {
  let faqs: FaqData[] = []
  let heroTitle = "Frequently Asked Questions"
  let heroSubtitle: string | undefined

  if (isSanityConfigured) {
    try {
      const [all, page] = await Promise.all([getAllFaqs(), getPageBySlug("faq")])
      faqs = all
      if (page?.hero?.title) heroTitle = page.hero.title
      if (page?.hero?.subtitle) heroSubtitle = page.hero.subtitle
    } catch {
      // use defaults
    }
  }

  const faqRefs = faqs.map(toRef)

  // Group by category
  const uncategorized = faqRefs.filter((f) => !f.category)
  const categories = [...new Set(faqRefs.map((f) => f.category).filter((c): c is string => !!c))]
  const hasCategories = categories.length > 0

  const sectionBase: Omit<FaqSectionData, "_key"> = {
    _type: "faqSection",
    autoMode: false,
  }

  return (
    <main>
      {faqs.length > 0 && <JsonLd data={generateFaqSchema(faqs)} />}
      <HeroSection
        data={{
          _type: "heroSection",
          _key: "faq-hero",
          title: heroTitle,
          subtitle:
            heroSubtitle ?? "Can't find an answer? Contact us and we'll get back to you promptly.",
          variant: "compact",
        }}
      />

      {faqRefs.length === 0 ? (
        <Section>
          <Container size="sm">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {isSanityConfigured
                  ? "No FAQs have been added yet."
                  : "Connect Sanity to display FAQs."}
              </p>
            </div>
          </Container>
        </Section>
      ) : !hasCategories ? (
        // Single accordion — no category grouping
        <FaqSection
          data={{ ...sectionBase, _key: "faq-all", selectedFaqs: faqRefs }}
        />
      ) : (
        // Grouped by category with headings
        <Section>
          <Container size="md">
            <div className="flex flex-col gap-12">
              {categories.map((cat) => (
                <div key={cat}>
                  <Heading as="h2" size="h3" className="mb-4">
                    {cat}
                  </Heading>
                  <FaqSection
                    data={{
                      ...sectionBase,
                      _key: `faq-${cat}`,
                      selectedFaqs: faqRefs,
                      categoryFilter: cat,
                    }}
                  />
                </div>
              ))}
              {uncategorized.length > 0 && (
                <div>
                  <Heading as="h2" size="h3" className="mb-4">
                    General
                  </Heading>
                  <FaqSection
                    data={{
                      ...sectionBase,
                      _key: "faq-general",
                      selectedFaqs: uncategorized,
                    }}
                  />
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}
    </main>
  )
}
