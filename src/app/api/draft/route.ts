/**
 * Draft mode enable endpoint.
 *
 * Called by Sanity's Presentation Tool (and the `previewMode.enable` URL
 * configured in the Studio's presentationTool plugin). Uses
 * `defineEnableDraftMode` from `next-sanity` which validates the
 * Presentation Tool's URL secret before setting the draft-mode cookie.
 *
 * Usage from Sanity Studio: automatic via Presentation Tool.
 * Manual test: GET /api/draft?sanityPreviewSecret=<secret>&redirect=/
 */
import { defineEnableDraftMode } from "next-sanity/draft-mode"
import { sanityClientWithToken } from "@/lib/sanity/client"

export const { GET } = defineEnableDraftMode({
  client: sanityClientWithToken,
})
