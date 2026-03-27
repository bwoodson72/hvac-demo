import { defineField, defineType } from "sanity"

export const promoBannerSection = defineType({
  name: "promoBannerSection",
  title: "Promo banner",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "link",
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Accent", value: "accent" },
          { title: "Warning", value: "warning" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "style" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ?? "Promo banner", subtitle: subtitle ?? "default" }
    },
  },
})
