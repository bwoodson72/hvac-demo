import { defineArrayMember, defineField, defineType } from "sanity"

export const gallerySection = defineType({
  name: "gallerySection",
  title: "Gallery / Projects",
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
    defineField({
      name: "selectedProjects",
      title: "Selected projects",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "Gallery" }
    },
  },
})
