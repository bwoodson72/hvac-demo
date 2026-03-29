import "server-only"

/**
 * Server-only Sanity environment variables.
 *
 * This file imports "server-only" so Next.js will throw a build error if
 * any client component tries to import it — preventing accidental token
 * leakage.
 *
 * If "server-only" is not installed, run: npm install server-only
 */
export const serverEnv = {
  readToken: process.env.SANITY_API_READ_TOKEN ?? "",
  revalidationSecret: process.env.SANITY_REVALIDATION_SECRET ?? "",
  previewSecret: process.env.SANITY_PREVIEW_SECRET ?? "",
} as const
