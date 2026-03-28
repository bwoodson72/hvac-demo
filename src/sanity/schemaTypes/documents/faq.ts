import { defineArrayMember, defineField, defineType } from "sanity"

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "Write the question as a customer would ask it (e.g., 'How long does installation take?').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      description: "Clear, concise answer. This text is also used in FAQ structured data for search engines.",
      validation: (Rule) => Rule.required().min(1).error("An answer is required."),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Group FAQs by topic for organized display on the FAQ page.",
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
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    defineField({
      name: "relatedServiceAreas",
      title: "Related service areas",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "serviceArea" }] })],
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Featured FAQs appear on the homepage and service pages.",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first within each category.",
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
})
