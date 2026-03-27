import { defineField, defineType } from "sanity"

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (Rule) => Rule.required().error("Alt text is required for accessibility"),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
  },
})
