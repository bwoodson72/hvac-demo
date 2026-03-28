import { HeroSection } from "@/components/sections/HeroSection"
import { ContentSection } from "@/components/sections/ContentSection"
import { ServicesGridSection } from "@/components/sections/ServicesGridSection"
import { FaqSection } from "@/components/sections/FaqSection"
import { CtaBandSection } from "@/components/sections/CtaBandSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { SectionRenderer } from "./SectionRenderer"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { Badge } from "@/components/ui/badge"
import type { ServiceAreaData, ServiceRef, FaqRef } from "@/lib/sanity/types"
import type { PortableTextBlock } from "next-sanity"

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

function textToPortableText(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      _key: "pt-1",
      style: "normal",
      children: [{ _type: "span", _key: "pt-s1", text, marks: [] }],
      markDefs: [],
    },
  ]
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
          variant: "compact",
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
            layout: "default",
          }}
        />
      )}

      {/* 3. Available services */}
      {serviceArea.relatedServices && serviceArea.relatedServices.length > 0 && (
        <ServicesGridSection
          data={{
            _type: "servicesGridSection",
            _key: "area-services",
            title: `Services Available in ${serviceArea.city}`,
            autoMode: false,
            columns: "3",
            cardStyle: "default",
            selectedServices: serviceArea.relatedServices.map(toServiceRef),
          }}
        />
      )}

      {/* 4. Local proof content */}
      {serviceArea.serviceAreaProof && (
        <ContentSection
          data={{
            _type: "contentSection",
            _key: "area-proof",
            title: `Why Choose Us in ${serviceArea.city}`,
            body: textToPortableText(serviceArea.serviceAreaProof),
            layout: "default",
          }}
        />
      )}

      {/* 5. Neighborhoods */}
      {serviceArea.neighborhoods && serviceArea.neighborhoods.length > 0 && (
        <Section spacing="sm">
          <Container>
            <Heading as="h2" size="h3" className="mb-4">
              Neighborhoods We Serve in {serviceArea.city}
            </Heading>
            <div className="flex flex-wrap gap-2">
              {serviceArea.neighborhoods.map((n) => (
                <Badge key={n} variant="secondary">
                  {n}
                </Badge>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 6. Custom CMS sections */}
      {serviceArea.sections && <SectionRenderer sections={serviceArea.sections} />}

      {/* 7. FAQs */}
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
          background: "primary",
        }}
      />

      {/* 9. Contact section */}
      <ContactSection
        data={{
          _type: "contactSection",
          _key: "area-contact",
          formMode: "compact",
          showPhone: true,
          showEmail: true,
          showAddress: false,
          showHours: true,
        }}
      />
    </main>
  )
}
