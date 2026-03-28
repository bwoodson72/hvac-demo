import { groq } from "next-sanity"
import { sanityClient } from "../client"
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
    trackingIds
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
  return sanityClient.fetch<SiteSettingsData | null>(siteSettingsQuery)
}

export async function getHeaderSettings(): Promise<HeaderSettingsData | null> {
  return sanityClient.fetch<HeaderSettingsData | null>(headerSettingsQuery)
}

export async function getFooterSettings(): Promise<FooterSettingsData | null> {
  return sanityClient.fetch<FooterSettingsData | null>(footerSettingsQuery)
}
