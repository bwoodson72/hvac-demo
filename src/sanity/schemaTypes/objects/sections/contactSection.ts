import { defineField, defineType } from "sanity"

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "Contact section" }
    },
  },
})
