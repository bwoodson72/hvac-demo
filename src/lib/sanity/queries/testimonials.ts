import { groq } from "next-sanity"
import { sanityClient } from "../client"
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
  return sanityClient.fetch<TestimonialData[]>(allTestimonialsQuery)
}

export async function getFeaturedTestimonials(): Promise<TestimonialData[]> {
  return sanityClient.fetch<TestimonialData[]>(featuredTestimonialsQuery)
}
