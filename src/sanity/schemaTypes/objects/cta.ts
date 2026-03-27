import { defineField, defineType } from "sanity"

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the title.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Body text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryLink",
      title: "Primary link",
      type: "link",
    }),
    defineField({
      name: "secondaryLink",
      title: "Secondary link",
      type: "link",
    }),
    defineField({
      name: "phoneOverride",
      title: "Phone number override",
      type: "string",
      description: "If set, replaces the site-wide phone number in this CTA.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow" },
  },
})
