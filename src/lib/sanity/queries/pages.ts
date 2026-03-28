import { groq } from "next-sanity"
import { sanityFetch } from "../live"
import { heroFragment, seoFragment, sectionsFragment } from "./_fragments"
import type { PageData } from "../types"

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    hero{${heroFragment}},
    seo{${seoFragment}},
    ${sectionsFragment},
    pageCategory,
    hideFromNavigation
  }
`

export const allPagesNavQuery = groq`
  *[_type == "page" && hideFromNavigation != true] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    pageCategory
  }
`

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  const { data } = await sanityFetch({ query: pageBySlugQuery, params: { slug } })
  return data as PageData | null
}
