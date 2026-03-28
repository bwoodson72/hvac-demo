import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { presentationTool } from "sanity/presentation"
import { visionTool } from "@sanity/vision"
import { env } from "@/lib/sanity/env"
import { schemaTypes } from "../schemaTypes"
import { structure } from "../structure"
import { SINGLETON_TYPES } from "../structure/singletons"

export const sanityConfig = defineConfig({
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: env.apiVersion,

  title: "Service Template Studio",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      name: "preview",
      title: "Preview",
      previewUrl: {
        /**
         * The origin of the Next.js site being previewed.
         * Set NEXT_PUBLIC_SITE_URL in production (e.g., https://yoursite.com).
         */
        origin: env.siteUrl,
        previewMode: {
          /**
           * The route handler that validates the Presentation Tool's URL secret
           * and enables Next.js draft mode. See src/app/api/draft/route.ts.
           */
          enable: "/api/draft",
        },
      },
    }),
    visionTool({ defaultApiVersion: env.apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Remove "Delete" and "Duplicate" actions for singleton document types
    // so editors cannot accidentally create multiple copies.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({ action }) => action !== "delete" && action !== "duplicate")
        : prev,
  },
})
