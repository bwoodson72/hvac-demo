import { groq } from "next-sanity"
import { sanityFetch } from "../live"
import type { FaqData } from "../types"

const faqFields = groq`
  _id,
  question,
  answer,
  category,
  "isFeatured": coalesce(isFeatured, false),
  displayOrder
`

export const allFaqsQuery = groq`
  *[_type == "faq"] | order(displayOrder asc, _createdAt asc){
    ${faqFields}
  }
`

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(displayOrder asc){
    ${faqFields}
  }
`

export const featuredFaqsQuery = groq`
  *[_type == "faq" && isFeatured == true] | order(displayOrder asc){
    ${faqFields}
  }
`

export async function getAllFaqs(): Promise<FaqData[]> {
  const { data } = await sanityFetch({ query: allFaqsQuery })
  return (data as FaqData[]) ?? []
}

export async function getFaqsByCategory(category: string): Promise<FaqData[]> {
  const { data } = await sanityFetch({ query: faqsByCategoryQuery, params: { category } })
  return (data as FaqData[]) ?? []
}

export async function getFeaturedFaqs(): Promise<FaqData[]> {
  const { data } = await sanityFetch({ query: featuredFaqsQuery })
  return (data as FaqData[]) ?? []
}
