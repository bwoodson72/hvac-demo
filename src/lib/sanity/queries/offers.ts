import { groq } from "next-sanity"
import { sanityFetch } from "../live"
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
  const { data } = await sanityFetch({ query: activeOffersQuery })
  return (data as OfferData[]) ?? []
}

export async function getOffersByLocation(location: string): Promise<OfferData[]> {
  const { data } = await sanityFetch({ query: offersByLocationQuery, params: { location } })
  return (data as OfferData[]) ?? []
}
