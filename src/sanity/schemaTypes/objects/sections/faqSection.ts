import { defineArrayMember, defineField, defineType } from "sanity"

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ section",
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
      description: "When on, featured FAQs are pulled automatically (filtered by category if set).",
      initialValue: false,
    }),
    defineField({
      name: "selectedFaqs",
      title: "Selected FAQs",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
      hidden: ({ parent }) => Boolean((parent as { autoMode?: boolean } | undefined)?.autoMode),
    }),
    defineField({
      name: "categoryFilter",
      title: "Category filter",
      type: "string",
      description: "Only used in auto mode.",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Pricing", value: "pricing" },
          { title: "Services", value: "services" },
          { title: "Process", value: "process" },
          { title: "Warranty", value: "warranty" },
          { title: "Emergency", value: "emergency" },
          { title: "Other", value: "other" },
        ],
      },
      hidden: ({ parent }) => !Boolean((parent as { autoMode?: boolean } | undefined)?.autoMode),
    }),
  ],
  preview: {
    select: { title: "title", autoMode: "autoMode" },
    prepare({ title, autoMode }: { title?: string; autoMode?: boolean }) {
      return { title: title ?? "FAQ section", subtitle: autoMode ? "Auto" : "Manual selection" }
    },
  },
})
