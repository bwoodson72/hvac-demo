"use client"

import { useSiteContext } from "@/lib/context/SiteContext"
import { SectionRenderer } from "./SectionRenderer"
import type { SectionData } from "@/lib/sanity/types"

/**
 * Client wrapper around SectionRenderer that pulls siteContext from the
 * nearest SiteContext.Provider (set in the marketing layout) so callers
 * don't have to prop-drill contact info down to every page.
 */
export function SectionRendererWithContext({ sections }: { sections: SectionData[] }) {
  const siteContext = useSiteContext()
  return <SectionRenderer sections={sections} siteContext={siteContext} />
}
