import { groq } from "next-sanity"
import { sanityFetch } from "../live"
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
  const { data } = await sanityFetch({ query: allPostsQuery })
  return (data as PostListItemData[]) ?? []
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const { data } = await sanityFetch({ query: postBySlugQuery, params: { slug } })
  return data as PostData | null
}
