import { groq } from "next-sanity"
import { sanityClient } from "../client"
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
  return sanityClient.fetch<FaqData[]>(allFaqsQuery)
}

export async function getFaqsByCategory(category: string): Promise<FaqData[]> {
  return sanityClient.fetch<FaqData[]>(faqsByCategoryQuery, { category })
}

export async function getFeaturedFaqs(): Promise<FaqData[]> {
  return sanityClient.fetch<FaqData[]>(featuredFaqsQuery)
}
