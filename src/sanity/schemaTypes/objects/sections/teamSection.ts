import { defineArrayMember, defineField, defineType } from "sanity"

export const teamSection = defineType({
  name: "teamSection",
  title: "Team section",
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
      name: "selectedMembers",
      title: "Team members",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "teamMember" }] })],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "List", value: "list" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
  ],
  preview: {
    select: { title: "title", layout: "layout" },
    prepare({ title, layout }: { title?: string; layout?: string }) {
      return { title: title ?? "Team section", subtitle: layout ?? "grid" }
    },
  },
})
