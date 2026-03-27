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
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "Masonry", value: "masonry" },
          { title: "Carousel", value: "carousel" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
  ],
  preview: {
    select: { title: "title", layout: "layout" },
    prepare({ title, layout }: { title?: string; layout?: string }) {
      return { title: title ?? "Gallery", subtitle: layout ?? "grid" }
    },
  },
})
