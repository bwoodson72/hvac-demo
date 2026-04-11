import { groq } from "next-sanity"
import { sanityFetch } from "../live"
import { imageWithAltFragment, linkFragment, seoFragment } from "./_fragments"
import type { SiteData } from "../types"

// ── Query ─────────────────────────────────────────────────────────────────────

export const siteQuery = groq`
  *[_type == "site"][0]{
    _id,
    businessName,
    tagline,
    phone,
    email,
    address,
    logo{${imageWithAltFragment}},
    darkLogo{${imageWithAltFragment}},
    favicon,
    businessHours[]{_key, day, opens, closes, isClosed},
    enableBlog,
    navLinks[]{_key, ${linkFragment}},
    ctaButton{${linkFragment}},
    showPhoneInHeader,
    announcementBar{ text, cta{${linkFragment}}, isActive },
    footerLogo{${imageWithAltFragment}},
    footerTagline,
    footerNavColumns[]{
      _key,
      heading,
      links[]{_key, ${linkFragment}}
    },
    footerBottomLinks[]{_key, ${linkFragment}},
    showSocialLinks,
    copyrightText,
    socialLinks,
    trackingIds,
    branding{
      primaryColor{ hex },
      primaryForeground{ hex },
      secondaryColor{ hex },
      secondaryForeground{ hex }
    },
    canonicalUrl,
    defaultSeoTitleTemplate,
    defaultSeo{${seoFragment}}
  }
`

// ── Fetcher ───────────────────────────────────────────────────────────────────

export async function getSite(): Promise<SiteData | null> {
  const { data } = await sanityFetch({ query: siteQuery })
  return data as SiteData | null
}
