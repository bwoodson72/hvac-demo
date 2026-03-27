import type { ComponentType } from "react"
import { HeroSection } from "./HeroSection"
import { TrustBarSection } from "./TrustBarSection"
import { ServicesGridSection } from "./ServicesGridSection"
import { FeatureListSection } from "./FeatureListSection"
import { ProcessSection } from "./ProcessSection"
import { CtaBandSection } from "./CtaBandSection"
import { TestimonialSection } from "./TestimonialSection"
import { FaqSection } from "./FaqSection"
import { GallerySection } from "./GallerySection"
import { ServiceAreaSection } from "./ServiceAreaSection"
import { ContentSection } from "./ContentSection"
import { ContactSection } from "./ContactSection"
import { StatsSection } from "./StatsSection"
import { TeamSection } from "./TeamSection"
import { PromoBannerSection } from "./PromoBannerSection"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionRegistry: Record<string, ComponentType<{ data: any }>> = {
  heroSection: HeroSection,
  trustBarSection: TrustBarSection,
  servicesGridSection: ServicesGridSection,
  featureListSection: FeatureListSection,
  processSection: ProcessSection,
  ctaBandSection: CtaBandSection,
  testimonialSection: TestimonialSection,
  faqSection: FaqSection,
  gallerySection: GallerySection,
  serviceAreaSection: ServiceAreaSection,
  contentSection: ContentSection,
  contactSection: ContactSection,
  statsSection: StatsSection,
  teamSection: TeamSection,
  promoBannerSection: PromoBannerSection,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSectionComponent(type: string): ComponentType<{ data: any }> | null {
  return sectionRegistry[type] ?? null
}
