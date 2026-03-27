import { defineField, defineType } from "sanity"

export const hero = defineType({
  name: "hero",
  title: "Hero",
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
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body text",
      type: "text",
      rows: 4,
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
      name: "backgroundStyle",
      title: "Background style",
      type: "string",
      options: {
        list: [
          { title: "Default (white)", value: "default" },
          { title: "Dark", value: "dark" },
          { title: "Primary color", value: "primary" },
          { title: "Background image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "variant",
      title: "Layout variant",
      type: "string",
      options: {
        list: [
          { title: "Centered", value: "centered" },
          { title: "Split (text left, image right)", value: "split" },
          { title: "Image right", value: "imageRight" },
          { title: "Compact", value: "compact" },
        ],
        layout: "radio",
      },
      initialValue: "centered",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "variant", media: "image.image" },
  },
})
