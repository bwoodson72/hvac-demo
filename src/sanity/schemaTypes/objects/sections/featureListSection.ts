import { defineArrayMember, defineField, defineType } from "sanity"

export const featureListSection = defineType({
  name: "featureListSection",
  title: "Feature list",
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
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon key", type: "string" }),
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
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "List", value: "list" },
          { title: "Alternating", value: "alternating" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
  ],
  preview: {
    select: { title: "title", features: "features" },
    prepare({ title, features }: { title?: string; features?: unknown[] }) {
      const count = features?.length ?? 0
      return { title: title ?? "Feature list", subtitle: `${count} feature${count !== 1 ? "s" : ""}` }
    },
  },
})
