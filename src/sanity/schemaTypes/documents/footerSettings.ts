import { defineArrayMember, defineField, defineType } from "sanity"
import { UlistIcon } from "@sanity/icons"

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer",
  type: "document",
  icon: UlistIcon,
  fields: [
    defineField({
      name: "logo",
      title: "Footer logo",
      type: "imageWithAlt",
      description: "Logo shown in the footer. Falls back to the logo from Site Settings.",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short text shown below the logo in the footer.",
    }),
    defineField({
      name: "navColumns",
      title: "Navigation columns",
      type: "array",
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
      name: "bottomLinks",
      title: "Bottom bar links",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      description: "Small links in the footer's bottom strip (e.g., Privacy Policy, Terms of Service, Sitemap).",
    }),
    defineField({
      name: "showSocialLinks",
      title: "Show social media icons",
      type: "boolean",
      description: "Display social icons using the URLs set in Site Settings → Social links.",
      initialValue: true,
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright text",
      type: "string",
      description: "Shown at the very bottom of the footer (e.g., '© {year} My Business. All rights reserved.').",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" }
    },
  },
})
