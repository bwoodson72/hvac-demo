import { MapPin } from "lucide-react"
import { HeroSection } from "@/components/sections/HeroSection"
import { ContentSection } from "@/components/sections/ContentSection"
import { ServicesGridSection } from "@/components/sections/ServicesGridSection"
import { FaqSection } from "@/components/sections/FaqSection"
import { CtaBandSection } from "@/components/sections/CtaBandSection"
import { ContextualContactSection } from "@/components/sections/ContextualContactSection"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { Badge } from "@/components/ui/badge"
import type { ServiceAreaData, ServiceRef, FaqRef } from "@/lib/sanity/types"

// ── Conversion helpers ────────────────────────────────────────────────────────

function toServiceRef(s: NonNullable<ServiceAreaData["relatedServices"]>[number]): ServiceRef {
  return {
    _id: s._id,
    title: s.title,
    slug: s.slug,
    shortDescription: s.shortDescription,
    iconKey: s.iconKey,
    featuredImage: s.featuredImage,
  }
}

function toFaqRef(f: NonNullable<ServiceAreaData["faqs"]>[number]): FaqRef {
  return {
    _id: f._id,
    question: f.question,
    answer: f.answer,
    category: f.category,
  }
}

// ── Template ──────────────────────────────────────────────────────────────────

interface ServiceAreaPageProps {
  serviceArea: ServiceAreaData
}

export function ServiceAreaPage({ serviceArea }: ServiceAreaPageProps) {
  const locationLabel = [serviceArea.city, serviceArea.state].filter(Boolean).join(", ")

  return (
    <main>
      {/* 1. Hero */}
      <HeroSection
        data={{
          _type: "heroSection",
          _key: "area-hero",
          ...serviceArea.hero,
          title: serviceArea.hero?.title ?? `Services in ${locationLabel}`,
          subtitle:
            serviceArea.hero?.subtitle ??
            `Trusted home services for residents and businesses in ${locationLabel}.`,
        }}
      />

      {/* 2. Intro copy */}
      {serviceArea.introCopy && (
        <ContentSection
          data={{
            _type: "contentSection",
            _key: "area-intro",
            body: serviceArea.introCopy,
          }}
        />
      )}

      {/* 3. Neighborhoods + serviceAreaProof callout */}
      {(serviceArea.neighborhoods?.length || serviceArea.serviceAreaProof) && (
        <Section spacing="sm">
          <Container>
            {serviceArea.neighborhoods && serviceArea.neighborhoods.length > 0 && (
              <>
                <Heading as="h2" size="h3" className="mb-4">
                  Areas We Serve in {locationLabel}
                </Heading>
                <div className="flex flex-wrap gap-2 mt-4">
                  {serviceArea.neighborhoods.map((n) => (
                    <Badge key={n} variant="outline">{n}</Badge>
                  ))}
                </div>
              </>
            )}
            {serviceArea.serviceAreaProof && (
              <div className={`rounded-xl border border-primary/20 bg-primary/5 px-6 py-4${serviceArea.neighborhoods?.length ? " mt-6" : ""}`}>
                <p className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="size-4 text-primary shrink-0 mt-0.5" aria-hidden />
                  {serviceArea.serviceAreaProof}
                </p>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* 4. Available services */}
      {serviceArea.relatedServices && serviceArea.relatedServices.length > 0 && (
        <ServicesGridSection
          data={{
            _type: "servicesGridSection",
            _key: "area-services",
            title: `Services Available in ${serviceArea.city}`,
            autoMode: false,
            selectedServices: serviceArea.relatedServices.map(toServiceRef),
          }}
        />
      )}

      {/* 6. FAQs */}
      {serviceArea.faqs && serviceArea.faqs.length > 0 && (
        <FaqSection
          data={{
            _type: "faqSection",
            _key: "area-faqs",
            title: `FAQs — ${serviceArea.city}`,
            autoMode: false,
            selectedFaqs: serviceArea.faqs.map(toFaqRef),
          }}
        />
      )}

      {/* 8. CTA band */}
      <CtaBandSection
        data={{
          _type: "ctaBandSection",
          _key: "area-cta",
          title: `Get Service in ${locationLabel}`,
          text: "Local technicians ready to help. Contact us for a free estimate.",
          primaryCta: { label: "Get a Free Quote", href: "/contact" },
          secondaryCta: { label: "Call Now", href: "tel:+15550001234" },
        }}
      />

      {/* 9. Contact section */}
      <ContextualContactSection
        data={{
          _type: "contactSection",
          _key: "area-contact",
        }}
      />
    </main>
  )
}
