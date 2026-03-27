import { defineArrayMember, defineField, defineType } from "sanity"

export const serviceAreaSection = defineType({
  name: "serviceAreaSection",
  title: "Service areas",
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
      name: "autoMode",
      title: "Auto mode",
      type: "boolean",
      description: "When on, all active service areas are shown automatically.",
      initialValue: false,
    }),
    defineField({
      name: "selectedServiceAreas",
      title: "Selected service areas",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "serviceArea" }] })],
      hidden: ({ parent }) => Boolean((parent as { autoMode?: boolean } | undefined)?.autoMode),
    }),
    defineField({
      name: "displayMode",
      title: "Display mode",
      type: "string",
      options: {
        list: [
          { title: "List", value: "list" },
          { title: "Grid", value: "grid" },
          { title: "Badges", value: "badges" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
  ],
  preview: {
    select: { title: "title", displayMode: "displayMode" },
    prepare({ title, displayMode }: { title?: string; displayMode?: string }) {
      return { title: title ?? "Service areas", subtitle: displayMode ?? "grid" }
    },
  },
})
