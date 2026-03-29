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
  /**
   * Server-only token — never exposed to the browser. Enables draft perspective
   * when Next.js draft mode cookie is present.
   */
  serverToken: serverEnv.readToken,
  /**
   * Browser token — sent to the client for the LiveEvents connection so that
   * standalone previews (outside Presentation Tool) stay live.
   * Using the same read token is safe: it only grants query access to
   * published documents.
   */
  browserToken: serverEnv.readToken,
})
