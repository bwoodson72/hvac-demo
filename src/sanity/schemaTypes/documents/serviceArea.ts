import { defineArrayMember, defineField, defineType } from "sanity"
import { sectionTypes } from "@/sanity/lib/sectionTypes"

export const serviceArea = defineType({
  name: "serviceArea",
  title: "Service area",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      initialValue: "TX",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "introCopy",
      title: "Intro copy",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      of: sectionTypes,
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
    }),
    defineField({
      name: "neighborhoods",
      title: "Neighborhoods",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Neighborhoods or subdivisions served within this area.",
    }),
    defineField({
      name: "serviceAreaProof",
      title: "Local proof copy",
      type: "text",
      rows: 4,
      description: "Trust-building copy specific to this location (landmarks, tenure, etc.).",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      city: "city",
      state: "state",
    },
    prepare({ title, city, state }: { title?: string; city?: string; state?: string }) {
      return {
        title: title ?? "Untitled area",
        subtitle: [city, state].filter(Boolean).join(", "),
      }
    },
  },
})
