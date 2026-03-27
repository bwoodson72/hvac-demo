import { defineArrayMember, defineField, defineType } from "sanity"

export const statsSection = defineType({
  name: "statsSection",
  title: "Stats section",
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
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "The number or figure (e.g. '500', '4.9').",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "What the value represents (e.g. 'Projects Completed').",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "prefix",
              title: "Prefix",
              type: "string",
              description: "e.g. '$'",
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: "e.g. '+', '%', 'k'",
            }),
          ],
          preview: {
            select: { prefix: "prefix", value: "value", suffix: "suffix", title: "label" },
            prepare({ prefix, value, suffix, title }: { prefix?: string; value?: string; suffix?: string; title?: string }) {
              return { title: title ?? "Stat", subtitle: `${prefix ?? ""}${value ?? ""}${suffix ?? ""}` }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", stats: "stats" },
    prepare({ title, stats }: { title?: string; stats?: unknown[] }) {
      const count = stats?.length ?? 0
      return { title: title ?? "Stats section", subtitle: `${count} stat${count !== 1 ? "s" : ""}` }
    },
  },
})
