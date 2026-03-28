/**
 * Validated Sanity environment variables.
 *
 * In production: throws at startup if a required variable is missing so
 * misconfigured deployments fail fast with a clear error.
 *
 * In development: logs a warning and returns an empty string so the dev
 * server starts and the Studio loads even before a Sanity project is
 * configured. The `isSanityConfigured` flag in client.ts prevents any
 * actual fetch from being attempted when values are absent.
 */

function requireEnv(name: string): string {
  const value = process.env[name]
  if (value === undefined) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `Missing environment variable: ${name}\n` +
          `Set this variable in your Vercel project settings.`
      )
    }
    console.warn(
      `[sanity] Missing environment variable: ${name}\n` +
        `Copy .env.example to .env.local and fill in the value.`
    )
    return ""
  }
  return value
}

export const env = {
  projectId: requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: requireEnv("NEXT_PUBLIC_SANITY_DATASET"),
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  // Optional — only needed for authenticated (preview/draft) requests
  readToken: process.env.SANITY_API_READ_TOKEN,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const
