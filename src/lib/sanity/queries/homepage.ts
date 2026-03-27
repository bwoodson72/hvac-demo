import { groq } from "next-sanity"
import { sanityClient } from "../client"
import { seoFragment, sectionsFragment } from "./_fragments"
import type { HomepageData } from "../types"

export const homepageQuery = groq`
  *[_type == "homepageSettings"][0]{
    _id,
    seo{${seoFragment}},
    ${sectionsFragment}
  }
`

export async function getHomepage(): Promise<HomepageData | null> {
  return sanityClient.fetch<HomepageData | null>(homepageQuery)
}
