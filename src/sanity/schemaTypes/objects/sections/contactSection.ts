import { defineField, defineType } from "sanity"

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact section",
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
      name: "formMode",
      title: "Form mode",
      type: "string",
      options: {
        list: [
          { title: "Full", value: "full" },
          { title: "Compact", value: "compact" },
          { title: "Minimal", value: "minimal" },
        ],
        layout: "radio",
      },
      initialValue: "full",
    }),
    defineField({
      name: "showPhone",
      title: "Show phone number",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showEmail",
      title: "Show email",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showAddress",
      title: "Show address",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showHours",
      title: "Show business hours",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", formMode: "formMode" },
    prepare({ title, formMode }: { title?: string; formMode?: string }) {
      return { title: title ?? "Contact section", subtitle: `Form: ${formMode ?? "full"}` }
    },
  },
})
