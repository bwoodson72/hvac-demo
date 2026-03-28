import { createClient } from "next-sanity"
import { env } from "./env"

// Fall back to a dummy value so createClient doesn't throw at module evaluation
// time when NEXT_PUBLIC_SANITY_PROJECT_ID is not yet set. Actual fetches will
// fail gracefully; every page wraps fetches in try/catch with fallback content.
const sharedConfig = {
  projectId: env.projectId || "unconfigured",
  dataset: env.dataset || "production",
  apiVersion: env.apiVersion,
  useCdn: true,
} as const

/** True when Sanity is fully configured — use to short-circuit fetches. */
export const isSanityConfigured = !!env.projectId && !!env.dataset

/**
 * Public client — no token, CDN-cached, for published content only.
 * Safe to use in Server Components and static generation.
 */
export const sanityClient = createClient(sharedConfig)

/**
 * Authenticated client — includes the read token for accessing draft
 * content. Use only in server-side contexts (Route Handlers, Server
 * Components) where the token is never exposed to the browser.
 */
export const sanityClientWithToken = createClient({
  ...sharedConfig,
  useCdn: false, // bypass CDN so drafts are always fresh
  token: env.readToken,
})

/**
 * Returns the appropriate client for the given context.
 * Pass `preview: true` to get the authenticated, CDN-bypassing client
 * (e.g., inside a Route Handler that has already validated draft mode).
 * Prefer `sanityFetch` from `@/lib/sanity/live` for page components —
 * it handles perspective switching automatically.
 */
export function getClient(preview?: boolean) {
  return preview ? sanityClientWithToken : sanityClient
}
