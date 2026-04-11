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
      name: "backgroundStyle",
      title: "Background style",
      type: "string",
      description: "Applies when no image is set.",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
          { title: "Primary", value: "primary" },
          { title: "Muted", value: "muted" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "Hero section" }
    },
  },
})
