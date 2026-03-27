import { defineField, defineType } from "sanity"

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Overrides the page title in search results. ~50–60 characters.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Shown in search results. Aim for 120–160 characters.",
      validation: (Rule) => Rule.max(160).warning("Keep meta descriptions under 160 characters."),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Leave blank to use the page's default URL.",
    }),
    defineField({
      name: "ogTitle",
      title: "OG title",
      type: "string",
      description: "Title shown when shared on social. Defaults to meta title.",
    }),
    defineField({
      name: "ogDescription",
      title: "OG description",
      type: "text",
      rows: 3,
      description: "Description shown when shared on social. Defaults to meta description.",
    }),
    defineField({
      name: "ogImage",
      title: "OG image",
      type: "image",
      description: "Recommended: 1200×630px. Defaults to the site-wide OG image.",
      options: { hotspot: true },
    }),
    defineField({
      name: "robotsIndex",
      title: "Allow indexing",
      type: "boolean",
      description: "Uncheck to add noindex to this page.",
      initialValue: true,
    }),
    defineField({
      name: "robotsFollow",
      title: "Allow link following",
      type: "boolean",
      description: "Uncheck to add nofollow to this page.",
      initialValue: true,
    }),
  ],
})
