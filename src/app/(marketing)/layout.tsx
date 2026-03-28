import { getSiteSettings } from "@/lib/sanity/queries"
import { isSanityConfigured } from "@/lib/sanity/client"
import { JsonLd } from "@/components/shared/JsonLd"
import { generateLocalBusinessSchema } from "@/lib/seo/jsonLd"

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
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
      {children}
    </>
  )
}
