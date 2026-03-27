import { defineArrayMember, defineField, defineType } from "sanity"

export const offer = defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortCopy",
      title: "Short copy",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      description: "Button or link text (e.g. 'Claim Offer', 'Learn More').",
    }),
    defineField({
      name: "ctaDestination",
      title: "CTA destination",
      type: "string",
      description: "URL or internal path the CTA links to.",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Only active offers are shown on the site.",
      initialValue: true,
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
    }),
    defineField({
      name: "displayLocations",
      title: "Display locations",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Where on the site this offer should appear.",
      options: {
        list: [
          { title: "Homepage", value: "homepage" },
          { title: "Header banner", value: "header" },
          { title: "Sidebar", value: "sidebar" },
          { title: "Footer", value: "footer" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      endDate: "endDate",
    },
    prepare({ title, isActive, endDate }: { title?: string; isActive?: boolean; endDate?: string }) {
      const status = isActive ? "Active" : "Inactive"
      const expiry = endDate ? `· Expires ${endDate}` : ""
      return {
        title: title ?? "Untitled offer",
        subtitle: `${status} ${expiry}`.trim(),
      }
    },
  },
})
