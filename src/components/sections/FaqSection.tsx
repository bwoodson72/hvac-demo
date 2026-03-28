// NOTE: For SEO, FAQ schema (JSON-LD FAQPage) should be generated in the page's
// generateMetadata or as a <script type="application/ld+json"> in the SEO layer,
// not here in the render component.

import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { RichText } from "@/components/shared/RichText"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FaqSectionData } from "@/lib/sanity/types"

export function FaqSection({ data }: { data: FaqSectionData }) {
  const { title, intro, selectedFaqs, categoryFilter, autoMode } = data
  const faqs = selectedFaqs ?? []

  const filtered = categoryFilter
    ? faqs.filter((f) => !f.category || f.category === categoryFilter)
    : faqs

  return (
    <Section>
      <Container size="md">
        {(title || intro) && (
          <div className="mb-10 text-center">
            {title && <Heading as="h2">{title}</Heading>}
            {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}

        {filtered.length === 0 && autoMode && process.env.NODE_ENV === "development" && (
          <p className="py-8 text-center text-sm text-muted-foreground italic">
            [DEV] autoMode is enabled but no FAQs were resolved.
          </p>
        )}

        {filtered.length > 0 && (
          <Accordion type="single" collapsible className="rounded-xl border">
            {filtered.map((faq, i) => (
              <AccordionItem key={faq._id} value={`faq-${i}`} className="px-4">
                <AccordionTrigger className="py-4 text-base font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <RichText value={faq.answer} className="pb-1" />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Container>
    </Section>
  )
}
