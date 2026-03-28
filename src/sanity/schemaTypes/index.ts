import { seo, link, cta, imageWithAlt, hero, businessHours } from "./objects"
import {
  heroSection,
  trustBarSection,
  servicesGridSection,
  featureListSection,
  processSection,
  ctaBandSection,
  testimonialSection,
  faqSection,
  gallerySection,
  serviceAreaSection,
  contentSection,
  contactSection,
  statsSection,
  teamSection,
  promoBannerSection,
} from "./objects/sections"
import {
  siteSettings,
  headerSettings,
  footerSettings,
  homepage,
  service,
  serviceArea,
  page,
  testimonial,
  faq,
  teamMember,
  project,
  post,
  offer,
} from "./documents"

/**
 * All registered Sanity schema types.
 * Objects are listed before documents so cross-references resolve correctly.
 */
export const schemaTypes = [
  // ── Primitive objects ────────────────────────────────────────
  seo,
  link,
  cta,
  imageWithAlt,
  hero,
  businessHours,

  // ── Section objects ──────────────────────────────────────────
  heroSection,
  trustBarSection,
  servicesGridSection,
  featureListSection,
  processSection,
  ctaBandSection,
  testimonialSection,
  faqSection,
  gallerySection,
  serviceAreaSection,
  contentSection,
  contactSection,
  statsSection,
  teamSection,
  promoBannerSection,

  // ── Singleton documents ──────────────────────────────────────
  siteSettings,
  headerSettings,
  footerSettings,
  homepage,

  // ── Collection documents ─────────────────────────────────────
  service,
  serviceArea,
  page,
  testimonial,
  faq,
  teamMember,
  project,
  post,
  offer,
]
