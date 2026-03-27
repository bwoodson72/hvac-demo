import type { ImageWithAltData, LinkData, PortableText } from "./objects"

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
  variant: "centered" | "split" | "imageRight" | "compact"
}

export interface TrustBarSectionData {
  _type: "trustBarSection"
  _key: string
  items?: TrustBarItem[]
  layout: "inline" | "grid"
}

export interface ServicesGridSectionData {
  _type: "servicesGridSection"
  _key: string
  title?: string
  intro?: string
  autoMode: boolean
  selectedServices?: ServiceRef[]
  cardStyle?: "default" | "minimal" | "detailed"
  columns: "2" | "3" | "4"
}

export interface FeatureListSectionData {
  _type: "featureListSection"
  _key: string
  title?: string
  intro?: string
  features?: Feature[]
  layout: "grid" | "list" | "alternating"
}

export interface ProcessSectionData {
  _type: "processSection"
  _key: string
  title?: string
  intro?: string
  steps?: ProcessStep[]
  showNumbers: boolean
  variant: "horizontal" | "vertical" | "timeline"
}

export interface CtaBandSectionData {
  _type: "ctaBandSection"
  _key: string
  title: string
  text?: string
  primaryCta?: LinkData
  secondaryCta?: LinkData
  background: "default" | "primary" | "dark" | "accent"
}

export interface TestimonialSectionData {
  _type: "testimonialSection"
  _key: string
  title?: string
  intro?: string
  autoMode: boolean
  selectedTestimonials?: TestimonialRef[]
  layout: "grid" | "carousel" | "featured"
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
  layout: "grid" | "masonry" | "carousel"
}

export interface ServiceAreaSectionData {
  _type: "serviceAreaSection"
  _key: string
  title?: string
  intro?: string
  autoMode: boolean
  selectedServiceAreas?: ServiceAreaRef[]
  displayMode: "list" | "grid" | "badges"
}

export interface ContentSectionData {
  _type: "contentSection"
  _key: string
  title?: string
  body: PortableText
  image?: ImageWithAltData
  cta?: LinkData
  layout: "default" | "imageLeft" | "imageRight" | "centered"
}

export interface ContactSectionData {
  _type: "contactSection"
  _key: string
  title?: string
  intro?: string
  formMode: "full" | "compact" | "minimal"
  showPhone: boolean
  showEmail: boolean
  showAddress: boolean
  showHours: boolean
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
  layout: "grid" | "list"
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
