import { defineArrayMember, defineField, defineType } from "sanity"

export const processSection = defineType({
  name: "processSection",
  title: "Process section",
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
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "icon", title: "Icon key", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", steps: "steps" },
    prepare({ title, steps }: { title?: string; steps?: unknown[] }) {
      const count = steps?.length ?? 0
      return { title: title ?? "Process section", subtitle: `${count} step${count !== 1 ? "s" : ""}` }
    },
  },
})
