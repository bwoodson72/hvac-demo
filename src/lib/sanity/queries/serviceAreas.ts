import { groq } from "next-sanity"
import { sanityClient } from "../client"
import {
  imageWithAltFragment,
  heroFragment,
  seoFragment,
  sectionsFragment,
} from "./_fragments"
import type { ServiceAreaData, ServiceAreaListItemData } from "../types"

// ── Queries ───────────────────────────────────────────────────────────────────

export const allServiceAreasQuery = groq`
  *[_type == "serviceArea" && isActive == true] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    city,
    state
  }
`

export const serviceAreaBySlugQuery = groq`
  *[_type == "serviceArea" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    city,
    state,
    hero{${heroFragment}},
    seo{${seoFragment}},
    introCopy,
    ${sectionsFragment},
    relatedServices[]->{
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      iconKey,
      featuredImage{${imageWithAltFragment}}
    },
    faqs[]->{
      _id,
      question,
      answer,
      category,
      isFeatured
    },
    neighborhoods,
    serviceAreaProof,
    isActive
  }
`

// ── Fetchers ──────────────────────────────────────────────────────────────────

export async function getAllServiceAreas(): Promise<ServiceAreaListItemData[]> {
  return sanityClient.fetch<ServiceAreaListItemData[]>(allServiceAreasQuery)
}

export async function getServiceAreaBySlug(slug: string): Promise<ServiceAreaData | null> {
  return sanityClient.fetch<ServiceAreaData | null>(serviceAreaBySlugQuery, { slug })
}
