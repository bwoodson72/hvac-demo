import { draftMode } from "next/headers"
import { getSiteSettings, getHeaderSettings, getFooterSettings } from "@/lib/sanity/queries"
import { isSanityConfigured } from "@/lib/sanity/client"
import { SanityLive } from "@/lib/sanity/live"
import { JsonLd } from "@/components/shared/JsonLd"
import { DraftBanner } from "@/components/shared/DraftBanner"
import { VisualEditing } from "@/components/shared/VisualEditing"
import { generateLocalBusinessSchema } from "@/lib/seo/jsonLd"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { BrandStyles } from "@/components/shared/BrandStyles"

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode()

  let siteSettings = null
  let headerSettings = null
  let footerSettings = null

  if (isSanityConfigured) {
    try {
      ;[siteSettings, headerSettings, footerSettings] = await Promise.all([
        getSiteSettings(),
        getHeaderSettings(),
        getFooterSettings(),
      ])
    } catch {
      // settings unavailable — render layout with fallbacks
    }
  }

  const businessName = siteSettings?.businessName ?? undefined

  return (
    <>
      {siteSettings && <JsonLd data={generateLocalBusinessSchema(siteSettings)} />}
      <BrandStyles settings={siteSettings} />
      <DraftBanner />
      <SiteHeader data={headerSettings} businessName={businessName} logo={headerSettings?.logo ?? siteSettings?.logo} phone={siteSettings?.phone} />
      {children}
      <SiteFooter data={footerSettings} businessName={businessName} logo={footerSettings?.logo ?? siteSettings?.logo} socialLinks={siteSettings?.socialLinks ?? undefined} />
      <SanityLive />
      {isDraftMode && <VisualEditing />}
    </>
  )
}
