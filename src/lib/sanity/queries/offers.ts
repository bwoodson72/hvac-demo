import { groq } from "next-sanity"
import { sanityClient } from "../client"
import type { OfferData } from "../types"

export const activeOffersQuery = groq`
  *[_type == "offer" && isActive == true] | order(_createdAt desc){
    _id,
    title,
    shortCopy,
    ctaLabel,
    ctaDestination,
    isActive,
    startDate,
    endDate,
    displayLocations
  }
`

export const offersByLocationQuery = groq`
  *[_type == "offer" && isActive == true && $location in displayLocations] | order(_createdAt desc){
    _id,
    title,
    shortCopy,
    ctaLabel,
    ctaDestination,
    isActive,
    startDate,
    endDate,
    displayLocations
  }
`

export async function getActiveOffers(): Promise<OfferData[]> {
  return sanityClient.fetch<OfferData[]>(activeOffersQuery)
}

export async function getOffersByLocation(location: string): Promise<OfferData[]> {
  return sanityClient.fetch<OfferData[]>(offersByLocationQuery, { location })
}
