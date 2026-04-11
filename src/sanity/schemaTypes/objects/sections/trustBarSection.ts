import { defineArrayMember, defineField, defineType } from "sanity"

export const trustBarSection = defineType({
  name: "trustBarSection",
  title: "Trust bar",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon key", type: "string" }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }: { items?: unknown[] }) {
      const count = items?.length ?? 0
      return { title: "Trust bar", subtitle: `${count} item${count !== 1 ? "s" : ""}` }
    },
  },
})
