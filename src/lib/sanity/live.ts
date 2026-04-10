/**
 * Sanity Live — exports `sanityFetch` and `SanityLive` for real-time content
 * updates via Next.js's built-in caching and tag-based revalidation.
 *
 * `sanityFetch` automatically switches to `perspective: "previewDrafts"` when
 * Next.js draft mode is enabled (cookie set by /api/draft), making it the
 * single fetch primitive for both production and preview contexts.
 */
import { defineLive } from "next-sanity/live"
import { sanityClientWithToken } from "./client"
import { serverEnv } from "./env.server"

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClientWithToken,
  serverToken: serverEnv.readToken,
})
