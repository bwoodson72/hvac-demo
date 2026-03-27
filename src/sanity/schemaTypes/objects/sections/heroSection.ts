import { defineArrayMember, defineField, defineType } from "sanity"

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body text",
      type: "text",
      rows: 3,
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
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "trustItems",
      title: "Trust items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon key", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        }),
      ],
    }),
    defineField({
      name: "variant",
      title: "Layout variant",
      type: "string",
      options: {
        list: [
          { title: "Centered", value: "centered" },
          { title: "Split", value: "split" },
          { title: "Image right", value: "imageRight" },
          { title: "Compact", value: "compact" },
        ],
        layout: "radio",
      },
      initialValue: "split",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "variant" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ?? "Hero section", subtitle: subtitle ?? "" }
    },
  },
})
