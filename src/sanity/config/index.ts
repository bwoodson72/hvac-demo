import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { env } from "@/lib/sanity/env"
import { schemaTypes } from "../schemaTypes"

export const sanityConfig = defineConfig({
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: env.apiVersion,

  title: "Service Template Studio",

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: env.apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
})
