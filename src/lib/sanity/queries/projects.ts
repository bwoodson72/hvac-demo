import { groq } from "next-sanity"
import { sanityClient } from "../client"
import { imageWithAltFragment } from "./_fragments"
import type { ProjectData } from "../types"

export const allProjectsQuery = groq`
  *[_type == "project"] | order(displayOrder asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    summary,
    beforeImage{${imageWithAltFragment}},
    afterImage{${imageWithAltFragment}},
    galleryImages[]{${imageWithAltFragment}},
    category,
    service->{_id, title, "slug": slug.current},
    serviceArea->{_id, title, "slug": slug.current, city, state},
    "isFeatured": coalesce(isFeatured, false),
    displayOrder
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && isFeatured == true] | order(displayOrder asc){
    _id,
    title,
    "slug": slug.current,
    summary,
    afterImage{${imageWithAltFragment}},
    category,
    "isFeatured": true
  }
`

export async function getAllProjects(): Promise<ProjectData[]> {
  return sanityClient.fetch<ProjectData[]>(allProjectsQuery)
}

export async function getFeaturedProjects(): Promise<ProjectData[]> {
  return sanityClient.fetch<ProjectData[]>(featuredProjectsQuery)
}
