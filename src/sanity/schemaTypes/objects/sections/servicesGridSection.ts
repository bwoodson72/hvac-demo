import { defineArrayMember, defineField, defineType } from "sanity"

export const servicesGridSection = defineType({
  name: "servicesGridSection",
  title: "Services grid",
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
      description: "When on, all active services are shown automatically.",
      initialValue: false,
    }),
    defineField({
      name: "selectedServices",
      title: "Selected services",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
      hidden: ({ parent }) => Boolean((parent as { autoMode?: boolean } | undefined)?.autoMode),
    }),
    defineField({
      name: "cardStyle",
      title: "Card style",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Minimal", value: "minimal" },
          { title: "Detailed", value: "detailed" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "string",
      options: {
        list: [
          { title: "2", value: "2" },
          { title: "3", value: "3" },
          { title: "4", value: "4" },
        ],
        layout: "radio",
      },
      initialValue: "3",
    }),
  ],
  preview: {
    select: { title: "title", autoMode: "autoMode" },
    prepare({ title, autoMode }: { title?: string; autoMode?: boolean }) {
      return {
        title: title ?? "Services grid",
        subtitle: autoMode ? "Auto (all active)" : "Manual selection",
      }
    },
  },
})
