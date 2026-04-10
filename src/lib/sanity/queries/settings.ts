import { groq } from "next-sanity"
import { sanityFetch } from "../live"
import { imageWithAltFragment, linkFragment, seoFragment } from "./_fragments"
import type {
  SiteSettingsData,
  HeaderSettingsData,
  FooterSettingsData,
} from "../types"

// ── Queries ───────────────────────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    _id,
    businessName,
    tagline,
    phone,
    email,
    address,
    logo{${imageWithAltFragment}},
    darkLogo{${imageWithAltFragment}},
    favicon,
    defaultSeo{${seoFragment}},
    canonicalUrl,
    defaultSeoTitleTemplate,
    businessHours[]{_key, day, opens, closes, isClosed},
    socialLinks,
    trackingIds,
    branding{ primaryColor, primaryForeground, secondaryColor, secondaryForeground }
  }
`

export const headerSettingsQuery = groq`
  *[_type == "headerSettings"][0]{
    _id,
    logo{${imageWithAltFragment}},
    navLinks[]{_key, ${linkFragment}},
    ctaButton{${linkFragment}},
    showPhoneInHeader,
    announcementBar{
      text,
      cta{${linkFragment}},
      isActive
    }
  }
`

export const footerSettingsQuery = groq`
  *[_type == "footerSettings"][0]{
    _id,
    logo{${imageWithAltFragment}},
    tagline,
    navColumns[]{
      _key,
      heading,
      links[]{_key, ${linkFragment}}
    },
    bottomLinks[]{_key, ${linkFragment}},
    showSocialLinks,
    copyrightText
  }
`

// ── Fetchers ──────────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  const { data } = await sanityFetch({ query: siteSettingsQuery })
  return data as SiteSettingsData | null
}

export async function getHeaderSettings(): Promise<HeaderSettingsData | null> {
  const { data } = await sanityFetch({ query: headerSettingsQuery })
  return data as HeaderSettingsData | null
}

export async function getFooterSettings(): Promise<FooterSettingsData | null> {
  const { data } = await sanityFetch({ query: footerSettingsQuery })
  return data as FooterSettingsData | null
}
