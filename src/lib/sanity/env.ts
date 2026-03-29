/**
 * Public Sanity environment variables.
 *
 * Every value here uses a NEXT_PUBLIC_* variable accessed as a static
 * string literal so the Next.js bundler can inline them into client-side
 * code. This file is safe to import from "use client" components.
 *
 * Server-only secrets (API tokens) live in env.server.ts instead.
 */

export const env = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const
