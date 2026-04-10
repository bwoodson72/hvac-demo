import type {
  SanityImage,
  SeoData,
  LinkData,
  ImageWithAltData,
  HeroData,
  BusinessHoursData,
  PortableText,
} from "./objects"
import type { SectionData } from "./sections"

// ── Singleton documents ───────────────────────────────────────────────────────
// Types are forward-compatible — schemas will be created in a later prompt.

export interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  linkedin?: string
  yelp?: string
  googleBusiness?: string
}

export interface TrackingIds {
  googleAnalytics?: string
  googleTagManager?: string
  facebookPixel?: string
}

export interface BusinessAddress {
  street?: string
  city?: string
  state?: string
  zip?: string
}

export interface BrandingData {
  primaryColor?: { hex?: string }
  primaryForeground?: { hex?: string }
  secondaryColor?: { hex?: string }
  secondaryForeground?: { hex?: string }
}

export interface SiteSettingsData {
  _id: string
  businessName: string
  tagline?: string
  phone?: string
  email?: string
  address?: BusinessAddress
  logo?: ImageWithAltData
  darkLogo?: ImageWithAltData
  favicon?: SanityImage
  defaultSeo?: SeoData
  /** Base URL for the site, e.g. https://example.com (no trailing slash) */
  canonicalUrl?: string
  /** Title template for SEO, e.g. "%s | My Business". Falls back to "${title} | ${businessName}". */
  defaultSeoTitleTemplate?: string
  businessHours?: BusinessHoursData[]
  socialLinks?: SocialLinks
  trackingIds?: TrackingIds
  branding?: BrandingData
}

export interface AnnouncementBar {
  text?: string
  cta?: LinkData
  isActive?: boolean
}

export interface HeaderSettingsData {
  _id: string
  logo?: ImageWithAltData
  navLinks?: LinkData[]
  ctaButton?: LinkData
  showPhoneInHeader?: boolean
  announcementBar?: AnnouncementBar
}

export interface FooterNavColumn {
  _key: string
  heading?: string
  links?: LinkData[]
}

export interface FooterSettingsData {
  _id: string
  logo?: ImageWithAltData
  tagline?: string
  navColumns?: FooterNavColumn[]
  bottomLinks?: LinkData[]
  showSocialLinks?: boolean
  copyrightText?: string
}

export interface HomepageData {
  _id: string
  sections?: SectionData[]
  seo?: SeoData
}

// ── Collection documents ──────────────────────────────────────────────────────

/** Lightweight shape used in lists, cards, and nav */
export interface ServiceListItemData {
  _id: string
  title: string
  slug: string
  shortDescription: string
  iconKey?: string
  featuredImage?: ImageWithAltData
}

export interface ServiceData {
  _id: string
  title: string
  slug: string
  shortDescription: string
  longDescription?: PortableText
  hero?: HeroData
  seo?: SeoData
  iconKey?: string
  featuredImage?: ImageWithAltData
  sections?: SectionData[]
  faqs?: FaqData[]
  testimonials?: TestimonialData[]
  relatedServices?: ServiceListItemData[]
  serviceAreas?: ServiceAreaListItemData[]
  displayOrder?: number
  isActive: boolean
}

export interface ServiceAreaListItemData {
  _id: string
  title: string
  slug: string
  city: string
  state?: string
}

export interface ServiceAreaData {
  _id: string
  title: string
  slug: string
  city: string
  state?: string
  hero?: HeroData
  seo?: SeoData
  introCopy?: PortableText
  sections?: SectionData[]
  relatedServices?: ServiceListItemData[]
  faqs?: FaqData[]
  neighborhoods?: string[]
  serviceAreaProof?: string
  isActive: boolean
}

export interface PageData {
  _id: string
  title: string
  slug: string
  hero?: HeroData
  seo?: SeoData
  sections?: SectionData[]
  pageCategory?: string
  hideFromNavigation?: boolean
}

export interface TestimonialData {
  _id: string
  customerName: string
  customerLabel?: string
  quote: string
  rating: number
  sourceLabel?: string
  sourceUrl?: string
  locationLabel?: string
  isFeatured: boolean
  displayOrder?: number
}

export interface FaqData {
  _id: string
  question: string
  answer: PortableText
  category?: string
  isFeatured: boolean
  displayOrder?: number
}

export interface TeamMemberData {
  _id: string
  name: string
  role: string
  bio?: string
  image?: ImageWithAltData
  certifications?: string[]
  displayOrder?: number
  isFeatured: boolean
}

export interface ProjectData {
  _id: string
  title: string
  slug?: string
  summary?: string
  beforeImage?: ImageWithAltData
  afterImage?: ImageWithAltData
  galleryImages?: ImageWithAltData[]
  category?: string
  service?: ServiceListItemData
  serviceArea?: ServiceAreaListItemData
  isFeatured: boolean
  displayOrder?: number
}

export interface PostListItemData {
  _id: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: ImageWithAltData
  publishedAt?: string
  author?: string
  categories?: string[]
}

export interface PostData extends PostListItemData {
  body?: PortableText
  seo?: SeoData
}

export interface OfferData {
  _id: string
  title: string
  shortCopy: string
  ctaLabel?: string
  ctaDestination?: string
  isActive: boolean
  startDate?: string
  endDate?: string
  displayLocations?: string[]
}
