import { draftMode } from "next/headers"
import { getSiteSettings } from "@/lib/sanity/queries"
import { isSanityConfigured } from "@/lib/sanity/client"
import { SanityLive } from "@/lib/sanity/live"
import { JsonLd } from "@/components/shared/JsonLd"
import { DraftBanner } from "@/components/shared/DraftBanner"
import { VisualEditing } from "@/components/shared/VisualEditing"
import { generateLocalBusinessSchema } from "@/lib/seo/jsonLd"

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode()

  let siteSettings = null
  if (isSanityConfigured) {
    try {
      siteSettings = await getSiteSettings()
    } catch {
      // settings unavailable — skip JSON-LD
    }
  }

  return (
    <>
      {siteSettings && <JsonLd data={generateLocalBusinessSchema(siteSettings)} />}
      <DraftBanner />
      {children}
      <SanityLive />
      {isDraftMode && <VisualEditing />}
    </>
  )
}
