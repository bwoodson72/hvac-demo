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
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "Service areas" }
    },
  },
})
