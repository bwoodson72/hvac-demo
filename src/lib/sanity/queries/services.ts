import { groq } from "next-sanity"
import { sanityClient } from "../client"
import {
  imageWithAltFragment,
  heroFragment,
  seoFragment,
  sectionsFragment,
} from "./_fragments"
import type { ServiceData, ServiceListItemData } from "../types"

// ── Queries ───────────────────────────────────────────────────────────────────

export const allServicesQuery = groq`
  *[_type == "service" && isActive == true] | order(displayOrder asc, title asc){
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    iconKey,
    featuredImage{${imageWithAltFragment}}
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    longDescription,
    hero{${heroFragment}},
    seo{${seoFragment}},
    iconKey,
    featuredImage{${imageWithAltFragment}},
    ${sectionsFragment},
    faqs[]->{
      _id,
      question,
      answer,
      category,
      isFeatured
    },
    testimonials[]->{
      _id,
      customerName,
      customerLabel,
      quote,
      rating,
      sourceLabel,
      locationLabel
    },
    relatedServices[]->{
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      iconKey,
      featuredImage{${imageWithAltFragment}}
    },
    serviceAreas[]->{
      _id,
      title,
      "slug": slug.current,
      city,
      state
    },
    displayOrder,
    isActive
  }
`

// ── Fetchers ──────────────────────────────────────────────────────────────────

export async function getAllServices(): Promise<ServiceListItemData[]> {
  return sanityClient.fetch<ServiceListItemData[]>(allServicesQuery)
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  return sanityClient.fetch<ServiceData | null>(serviceBySlugQuery, { slug })
}
