import { createClient } from "next-sanity"
import { env } from "./env"

const sharedConfig = {
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: env.apiVersion,
  useCdn: true,
} as const

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
