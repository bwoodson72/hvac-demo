import { groq } from "next-sanity"
import { sanityFetch } from "../live"
import { seoFragment, sectionsFragment } from "./_fragments"
import type { HomepageData } from "../types"

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    _id,
    seo{${seoFragment}},
    ${sectionsFragment}
  }
`

export async function getHomepage(): Promise<HomepageData | null> {
  const { data } = await sanityFetch({ query: homepageQuery })
  return data as HomepageData | null
}
