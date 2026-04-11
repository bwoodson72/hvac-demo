import { draftMode } from "next/headers"
import { getSite } from "@/lib/sanity/queries"
import { isSanityConfigured } from "@/lib/sanity/client"
import { SanityLive } from "@/lib/sanity/live"
import { JsonLd } from "@/components/shared/JsonLd"
import { DraftBanner } from "@/components/shared/DraftBanner"
import { VisualEditing } from "@/components/shared/VisualEditing"
import { generateLocalBusinessSchema } from "@/lib/seo/jsonLd"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { BrandStyles } from "@/components/shared/BrandStyles"
import { SiteContextProvider } from "@/lib/context/SiteContext"
import type { SiteContextValue } from "@/lib/context/SiteContext"

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode()

  let site = null

  if (isSanityConfigured) {
    try {
      site = await getSite()
    } catch {
      // settings unavailable — render layout with fallbacks
    }
  }

  const siteContextValue: SiteContextValue = {
    phone: site?.phone ?? undefined,
    email: site?.email ?? undefined,
    address: site?.address ?? undefined,
    businessHours: site?.businessHours ?? undefined,
  }

  return (
    <>
      {site && <JsonLd data={generateLocalBusinessSchema(site)} />}
      <BrandStyles site={site} />
      <DraftBanner />
      <SiteHeader site={site} />
      <SiteContextProvider value={siteContextValue}>
        {children}
      </SiteContextProvider>
      <SiteFooter site={site} />
      <SanityLive />
      {isDraftMode && <VisualEditing />}
    </>
  )
}
