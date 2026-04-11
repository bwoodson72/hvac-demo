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
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "Team section" }
    },
  },
})
