import { HeroSection } from "@/components/sections/HeroSection"
import { ContentSection } from "@/components/sections/ContentSection"
import { TestimonialSection } from "@/components/sections/TestimonialSection"
import { FaqSection } from "@/components/sections/FaqSection"
import { ServicesGridSection } from "@/components/sections/ServicesGridSection"
import { CtaBandSection } from "@/components/sections/CtaBandSection"
import { SectionRenderer } from "./SectionRenderer"
import type {
  ServiceData,
  ServiceRef,
  TestimonialRef,
  FaqRef,
} from "@/lib/sanity/types"

// ── Conversion helpers ────────────────────────────────────────────────────────

function toServiceRef(s: NonNullable<ServiceData["relatedServices"]>[number]): ServiceRef {
  return {
    _id: s._id,
    title: s.title,
    slug: s.slug,
    shortDescription: s.shortDescription,
    iconKey: s.iconKey,
    featuredImage: s.featuredImage,
  }
}

function toTestimonialRef(
  t: NonNullable<ServiceData["testimonials"]>[number]
): TestimonialRef {
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

function toFaqRef(f: NonNullable<ServiceData["faqs"]>[number]): FaqRef {
  return {
    _id: f._id,
    question: f.question,
    answer: f.answer,
    category: f.category,
  }
}

// ── Template ──────────────────────────────────────────────────────────────────

interface ServicePageProps {
  service: ServiceData
  defaultCta?: { label: string; destination: string }
}

export function ServicePage({ service, defaultCta }: ServicePageProps) {
  const ctaLabel = defaultCta?.label ?? "Get a Free Quote"
  const ctaDest = defaultCta?.destination ?? "/contact"

  return (
    <main>
      {/* 1. Hero */}
      <HeroSection
        data={{
          _type: "heroSection",
          _key: "service-hero",
          variant: "split",
          ...service.hero,
          title: service.hero?.title ?? service.title,
          image: service.hero?.image ?? service.featuredImage,
        }}
      />

      {/* 2. Long description */}
      {service.longDescription && (
        <ContentSection
          data={{
            _type: "contentSection",
            _key: "service-intro",
            title: undefined,
            body: service.longDescription,
            layout: "default",
          }}
        />
      )}

      {/* 3. Custom CMS sections */}
      {service.sections && <SectionRenderer sections={service.sections} />}

      {/* 4. Testimonials */}
      {service.testimonials && service.testimonials.length > 0 && (
        <TestimonialSection
          data={{
            _type: "testimonialSection",
            _key: "service-testimonials",
            title: "What Customers Say",
            autoMode: false,
            selectedTestimonials: service.testimonials.map(toTestimonialRef),
            layout: "grid",
          }}
        />
      )}

      {/* 5. FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <FaqSection
          data={{
            _type: "faqSection",
            _key: "service-faqs",
            title: "Common Questions",
            autoMode: false,
            selectedFaqs: service.faqs.map(toFaqRef),
          }}
        />
      )}

      {/* 6. Related services */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <ServicesGridSection
          data={{
            _type: "servicesGridSection",
            _key: "service-related",
            title: "Related Services",
            autoMode: false,
            columns: "3",
            cardStyle: "minimal",
            selectedServices: service.relatedServices.map(toServiceRef),
          }}
        />
      )}

      {/* 7. CTA band */}
      <CtaBandSection
        data={{
          _type: "ctaBandSection",
          _key: "service-cta",
          title: `Ready to Schedule ${service.title}?`,
          text: "Contact us today for a free, no-obligation estimate.",
          primaryCta: { label: ctaLabel, href: ctaDest },
          background: "primary",
        }}
      />
    </main>
  )
}
