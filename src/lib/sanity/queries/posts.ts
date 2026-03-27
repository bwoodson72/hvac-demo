import { groq } from "next-sanity"
import { sanityClient } from "../client"
import { imageWithAltFragment, seoFragment } from "./_fragments"
import type { PostData, PostListItemData } from "../types"

const postListFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage{${imageWithAltFragment}},
  publishedAt,
  author,
  categories
`

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    ${postListFields}
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${postListFields},
    body[]{
      ...,
      _type == "imageWithAlt" => {
        image,
        alt,
        caption
      }
    },
    seo{${seoFragment}}
  }
`

export async function getAllPosts(): Promise<PostListItemData[]> {
  return sanityClient.fetch<PostListItemData[]>(allPostsQuery)
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  return sanityClient.fetch<PostData | null>(postBySlugQuery, { slug })
}
