import { createClient } from "next-sanity"
import { env } from "./env"

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
 * Safe to use in any context including client components.
 */
export const sanityClient = createClient(sharedConfig)

export { sharedConfig }
