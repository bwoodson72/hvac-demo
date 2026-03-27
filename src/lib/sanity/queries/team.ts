import { groq } from "next-sanity"
import { sanityClient } from "../client"
import { imageWithAltFragment } from "./_fragments"
import type { TeamMemberData } from "../types"

export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(displayOrder asc, name asc){
    _id,
    name,
    role,
    bio,
    image{${imageWithAltFragment}},
    certifications,
    displayOrder,
    "isFeatured": coalesce(isFeatured, false)
  }
`

export const featuredTeamMembersQuery = groq`
  *[_type == "teamMember" && isFeatured == true] | order(displayOrder asc){
    _id,
    name,
    role,
    bio,
    image{${imageWithAltFragment}},
    certifications,
    "isFeatured": true
  }
`

export async function getAllTeamMembers(): Promise<TeamMemberData[]> {
  return sanityClient.fetch<TeamMemberData[]>(allTeamMembersQuery)
}

export async function getFeaturedTeamMembers(): Promise<TeamMemberData[]> {
  return sanityClient.fetch<TeamMemberData[]>(featuredTeamMembersQuery)
}
