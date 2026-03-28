import { defineArrayMember, defineField, defineType } from "sanity"
import { CogIcon } from "@sanity/icons"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identity", title: "Business identity", default: true },
    { name: "branding", title: "Branding" },
    { name: "seo", title: "SEO defaults" },
    { name: "hours", title: "Business hours" },
    { name: "social", title: "Social & tracking" },
  ],
  fields: [
    // ── Business identity ──────────────────────────────────────────────────
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      group: "identity",
      description: "Official business name. Used in the site title, footer, and SEO.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      description: "Short phrase that describes your business. Shown in the footer and hero sections.",
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      group: "identity",
      description: "Main business phone. Displayed in the header, footer, and CTAs.",
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      group: "identity",
      description: "Primary contact email shown on the site.",
    }),
    defineField({
      name: "address",
      title: "Business address",
      type: "object",
      group: "identity",
      description: "Physical address used in the footer and LocalBusiness structured data.",
      fields: [
        defineField({ name: "street", title: "Street address", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State (abbreviation)", type: "string" }),
        defineField({ name: "zip", title: "ZIP code", type: "string" }),
      ],
    }),
    // ── Branding ───────────────────────────────────────────────────────────
    defineField({
      name: "logo",
      title: "Logo (light background)",
      type: "imageWithAlt",
      group: "branding",
      description: "Primary logo for use on white/light backgrounds.",
    }),
    defineField({
      name: "darkLogo",
      title: "Logo (dark background)",
      type: "imageWithAlt",
      group: "branding",
      description: "Alternate logo for dark backgrounds or footer.",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "branding",
      description: "Browser tab icon. Recommended: 512×512px PNG.",
      options: { hotspot: false },
    }),
    // ── SEO ────────────────────────────────────────────────────────────────
    defineField({
      name: "canonicalUrl",
      title: "Site URL",
      type: "url",
      group: "seo",
      description:
        "Primary URL of this website (e.g., https://yourbusiness.com). Used for canonical tags and sitemap. No trailing slash.",
    }),
    defineField({
      name: "defaultSeoTitleTemplate",
      title: "SEO title template",
      type: "string",
      group: "seo",
      description:
        "Template for page titles in search results. Use %s as a placeholder (e.g., '%s | My Business'). Leave blank for default format.",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
      description: "Fallback SEO values for pages without their own SEO settings.",
    }),
    // ── Business hours ─────────────────────────────────────────────────────
    defineField({
      name: "businessHours",
      title: "Business hours",
      type: "array",
      group: "hours",
      of: [defineArrayMember({ type: "businessHours" })],
      description: "Hours displayed in the footer and contact section, and used in structured data.",
    }),
    // ── Social links ───────────────────────────────────────────────────────
    defineField({
      name: "socialLinks",
      title: "Social media links",
      type: "object",
      group: "social",
      description: "Full URLs to your social media profiles.",
      fields: [
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "twitter", title: "X (Twitter)", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "yelp", title: "Yelp", type: "url" }),
        defineField({
          name: "googleBusiness",
          title: "Google Business Profile",
          type: "url",
          description: "Link to your Google Business listing.",
        }),
      ],
    }),
    // ── Analytics & tracking ───────────────────────────────────────────────
    defineField({
      name: "trackingIds",
      title: "Analytics & tracking",
      type: "object",
      group: "social",
      description: "Paste IDs only — do not include script tags.",
      fields: [
        defineField({
          name: "googleAnalytics",
          title: "Google Analytics 4 measurement ID",
          type: "string",
          description: "Starts with G- (e.g., G-XXXXXXXXXX).",
        }),
        defineField({
          name: "googleTagManager",
          title: "Google Tag Manager container ID",
          type: "string",
          description: "Starts with GTM- (e.g., GTM-XXXXXXX).",
        }),
        defineField({
          name: "facebookPixel",
          title: "Facebook Pixel ID",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "businessName", subtitle: "canonicalUrl" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ?? "Site Settings", subtitle }
    },
  },
})
