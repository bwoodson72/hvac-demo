import { defineArrayMember, defineField, defineType } from "sanity"

export const contentSection = defineType({
  name: "contentSection",
  title: "Content section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "link",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Image left", value: "imageLeft" },
          { title: "Image right", value: "imageRight" },
          { title: "Centered", value: "centered" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: { title: "title", layout: "layout" },
    prepare({ title, layout }: { title?: string; layout?: string }) {
      return { title: title ?? "Content section", subtitle: layout ?? "default" }
    },
  },
})
