import { defineField, defineType } from "sanity"

export const ctaBandSection = defineType({
  name: "ctaBandSection",
  title: "CTA band",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Supporting text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "link",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "link",
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Primary", value: "primary" },
          { title: "Dark", value: "dark" },
          { title: "Accent", value: "accent" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "background" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ?? "CTA band", subtitle: subtitle ?? "primary" }
    },
  },
})
