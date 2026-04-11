import type { ImageWithAltData, LinkData, PortableText, BusinessHoursData } from "./objects"

// ── Inline sub-types used within sections ─────────────────────────────────────

export interface TrustItem {
  _key: string
  icon?: string
  label: string
}

export interface TrustBarItem {
  _key: string
  icon?: string
  label: string
  value?: string
}

export interface Feature {
  _key: string
  icon?: string
  title: string
  description: string
}

export interface ProcessStep {
  _key: string
  title: string
  description: string
  icon?: string
}

export interface Stat {
  _key: string
  value: string
  label: string
  prefix?: string
  suffix?: string
}

// ── Lightweight reference expansions used inside sections ─────────────────────

export interface ServiceRef {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  iconKey?: string
  featuredImage?: ImageWithAltData
}

export interface TestimonialRef {
  _id: string
  customerName: string
  customerLabel?: string
  quote: string
  rating: number
  sourceLabel?: string
  locationLabel?: string
}

export interface FaqRef {
  _id: string
  question: string
  answer: PortableText
  category?: string
}

export interface ProjectRef {
  _id: string
  title: string
  slug?: string
  category?: string
  beforeImage?: ImageWithAltData
  afterImage?: ImageWithAltData
}

export interface ServiceAreaRef {
  _id: string
  title: string
  slug: string
  city: string
  state?: string
}

export interface TeamMemberRef {
  _id: string
  name: string
  role: string
  bio?: string
  image?: ImageWithAltData
  certifications?: string[]
}

// ── Section types (discriminated union on _type) ──────────────────────────────

export interface HeroSectionData {
  _type: "heroSection"
  _key: string
  eyebrow?: string
  title: string
  subtitle?: string
  body?: string
  primaryCta?: LinkData
  secondaryCta?: LinkData
  image?: ImageWithAltData
  trustItems?: TrustItem[]
  backgroundStyle?: "light" | "dark" | "primary" | "muted"
}

export interface TrustBarSectionData {
  _type: "trustBarSection"
  _key: string
  items?: TrustBarItem[]
}

export interface ServicesGridSectionData {
  _type: "servicesGridSection"
  _key: string
  title?: string
  intro?: string
  autoMode: boolean
  selectedServices?: ServiceRef[]
}

export interface FeatureListSectionData {
  _type: "featureListSection"
  _key: string
  title?: string
  intro?: string
  features?: Feature[]
}

export interface ProcessSectionData {
  _type: "processSection"
  _key: string
  title?: string
  intro?: string
  steps?: ProcessStep[]
}

export interface CtaBandSectionData {
  _type: "ctaBandSection"
  _key: string
  title: string
  text?: string
  primaryCta?: LinkData
  secondaryCta?: LinkData
}

export interface TestimonialSectionData {
  _type: "testimonialSection"
  _key: string
  title?: string
  intro?: string
  autoMode: boolean
  selectedTestimonials?: TestimonialRef[]
}

export interface FaqSectionData {
  _type: "faqSection"
  _key: string
  title?: string
  intro?: string
  autoMode: boolean
  selectedFaqs?: FaqRef[]
  categoryFilter?: string
}

export interface GallerySectionData {
  _type: "gallerySection"
  _key: string
  title?: string
  intro?: string
  selectedProjects?: ProjectRef[]
}

export interface ServiceAreaSectionData {
  _type: "serviceAreaSection"
  _key: string
  title?: string
  intro?: string
  autoMode: boolean
  selectedServiceAreas?: ServiceAreaRef[]
}

export interface ContentSectionData {
  _type: "contentSection"
  _key: string
  title?: string
  body: PortableText
  image?: ImageWithAltData
  cta?: LinkData
}

export interface ContactSectionData {
  _type: "contactSection"
  _key: string
  title?: string
  intro?: string
  phone?: string
  email?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  businessHours?: BusinessHoursData[]
}

export interface StatsSectionData {
  _type: "statsSection"
  _key: string
  title?: string
  intro?: string
  stats?: Stat[]
}

export interface TeamSectionData {
  _type: "teamSection"
  _key: string
  title?: string
  intro?: string
  selectedMembers?: TeamMemberRef[]
}

export interface PromoBannerSectionData {
  _type: "promoBannerSection"
  _key: string
  text: string
  cta?: LinkData
  style: "default" | "accent" | "warning"
}

export type SectionData =
  | HeroSectionData
  | TrustBarSectionData
  | ServicesGridSectionData
  | FeatureListSectionData
  | ProcessSectionData
  | CtaBandSectionData
  | TestimonialSectionData
  | FaqSectionData
  | GallerySectionData
  | ServiceAreaSectionData
  | ContentSectionData
  | ContactSectionData
  | StatsSectionData
  | TeamSectionData
  | PromoBannerSectionData
