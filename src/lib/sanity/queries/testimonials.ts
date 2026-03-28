import { groq } from "next-sanity"
import { sanityFetch } from "../live"
import type { TestimonialData } from "../types"

const testimonialFields = groq`
  _id,
  customerName,
  customerLabel,
  quote,
  rating,
  sourceLabel,
  sourceUrl,
  locationLabel,
  "isFeatured": coalesce(isFeatured, false),
  displayOrder
`

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(displayOrder asc, _createdAt desc){
    ${testimonialFields}
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && isFeatured == true] | order(displayOrder asc)[0...6]{
    ${testimonialFields}
  }
`

export async function getAllTestimonials(): Promise<TestimonialData[]> {
  const { data } = await sanityFetch({ query: allTestimonialsQuery })
  return (data as TestimonialData[]) ?? []
}

export async function getFeaturedTestimonials(): Promise<TestimonialData[]> {
  const { data } = await sanityFetch({ query: featuredTestimonialsQuery })
  return (data as TestimonialData[]) ?? []
}
