/**
 * Validated Sanity environment variables.
 *
 * Hard-throws at startup if a variable is not defined at all in the
 * environment (undefined). Empty-string values are allowed during
 * local development before a Sanity project has been created — the
 * Studio will surface its own configuration UI in that case.
 */

function requireEnv(name: string): string {
  const value = process.env[name]
  if (value === undefined) {
    throw new Error(
      `Missing environment variable: ${name}\n` +
        `Copy .env.example to .env.local and set the value.`
    )
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
