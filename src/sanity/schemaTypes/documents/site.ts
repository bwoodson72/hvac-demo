import { defineArrayMember, defineField, defineType } from "sanity"
import { CogIcon } from "@sanity/icons"

export const site = defineType({
  name: "site",
  title: "Site",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "business", title: "Business", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "social", title: "Social & Tracking" },
    { name: "seo", title: "Theme & SEO" },
  ],
  fields: [
    // ── Business ───────────────────────────────────────────────────────────

    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      group: "business",
      description: "Official business name. Used in the site title, footer, and SEO.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "business",
      description: "Short phrase that describes your business. Shown in the footer and hero sections.",
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      group: "business",
      description: "Main business phone. Displayed in the header, footer, and CTAs.",
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      group: "business",
      description: "Primary contact email shown on the site.",
    }),
    defineField({
      name: "address",
      title: "Business address",
      type: "object",
      group: "business",
      description: "Physical address used in the footer and LocalBusiness structured data.",
      fields: [
        defineField({ name: "street", title: "Street address", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State (abbreviation)", type: "string" }),
        defineField({ name: "zip", title: "ZIP code", type: "string" }),
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
      group: "business",
      description: "Primary logo for light backgrounds.",
    }),
    defineField({
      name: "darkLogo",
      title: "Logo (dark background)",
      type: "imageWithAlt",
      group: "business",
      description: "Alternate logo for dark backgrounds.",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "business",
      description: "Browser tab icon. Recommended: 512×512px PNG.",
      options: { hotspot: false },
    }),
    defineField({
      name: "businessHours",
      title: "Business hours",
      type: "array",
      group: "business",
      of: [defineArrayMember({ type: "businessHours" })],
      description: "Hours displayed in the footer and contact section, and used in structured data.",
    }),
    defineField({
      name: "enableBlog",
      title: "Enable blog",
      type: "boolean",
      group: "business",
      initialValue: false,
      description: "Show the /blog section. Turn off to hide without deleting posts.",
    }),

    // ── Navigation ─────────────────────────────────────────────────────────

    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "link" })],
      description: "Main navigation links shown in the header. Keep to 5–7 items for best UX.",
    }),
    defineField({
      name: "ctaButton",
      title: "Header CTA button",
      type: "link",
      group: "navigation",
      description:
        "Primary call-to-action shown in the header (e.g., 'Get a Free Quote'). Rendered as a button.",
    }),
    defineField({
      name: "showPhoneInHeader",
      title: "Show phone number in header",
      type: "boolean",
      group: "navigation",
      initialValue: true,
      description: "Display the business phone next to the header CTA.",
    }),
    defineField({
      name: "announcementBar",
      title: "Announcement bar",
      type: "object",
      group: "navigation",
      description: "Optional top-of-page banner for promotions or important notices.",
      fields: [
        defineField({
          name: "text",
          title: "Message",
          type: "string",
          description: "Short announcement copy (e.g., 'Summer sale — 10% off all installs').",
        }),
        defineField({
          name: "cta",
          title: "CTA link",
          type: "link",
          description: "Optional link embedded in the announcement.",
        }),
        defineField({
          name: "isActive",
          title: "Show bar",
          type: "boolean",
          initialValue: false,
          description: "Toggle the announcement bar on or off.",
        }),
      ],
    }),
    defineField({
      name: "footerLogo",
      title: "Footer logo (overrides main logo)",
      type: "imageWithAlt",
      group: "navigation",
      description: "Logo shown in the footer. Falls back to the main logo if not set.",
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "string",
      group: "navigation",
      description: "Short text shown below the logo in the footer.",
    }),
    defineField({
      name: "footerNavColumns",
      title: "Footer navigation columns",
      type: "array",
      group: "navigation",
      of: [
        defineArrayMember({
          type: "object",
          name: "navColumn",
          fields: [
            defineField({
              name: "heading",
              title: "Column heading",
              type: "string",
              description: "Bold header label for this column of links.",
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [defineArrayMember({ type: "link" })],
            }),
          ],
          preview: {
            select: { title: "heading" },
            prepare({ title }: { title?: string }) {
              return { title: title ?? "Unnamed column" }
            },
          },
        }),
      ],
      description: "Link columns shown in the main footer grid. Typically 2–4 columns.",
    }),
    defineField({
      name: "footerBottomLinks",
      title: "Footer bottom bar links",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "link" })],
      description: "Small links in the footer's bottom strip (e.g., Privacy Policy, Terms).",
    }),
    defineField({
      name: "showSocialLinks",
      title: "Show social media links in footer",
      type: "boolean",
      group: "navigation",
      initialValue: true,
      description: "Display social links using the URLs set in the Social & Tracking tab.",
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright text",
      type: "string",
      group: "navigation",
      description: "Leave blank to auto-generate: © {year} {businessName}.",
    }),

    // ── Social & Tracking ──────────────────────────────────────────────────

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

    // ── Theme & SEO ────────────────────────────────────────────────────────

    defineField({
      name: "branding",
      title: "Brand Colors",
      type: "object",
      group: "seo",
      description: "Override the default brand palette.",
      fields: [
        defineField({ name: "primaryColor", title: "Primary color", type: "color" }),
        defineField({ name: "primaryForeground", title: "Primary foreground (text on primary)", type: "color" }),
        defineField({ name: "secondaryColor", title: "Secondary / accent color", type: "color" }),
        defineField({ name: "secondaryForeground", title: "Secondary foreground", type: "color" }),
      ],
    }),
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
  ],
  preview: {
    select: { title: "businessName" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "Site" }
    },
  },
})
