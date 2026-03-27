import { defineArrayMember, defineField, defineType } from "sanity"
import { sectionTypes } from "@/sanity/lib/sectionTypes"

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  orderings: [
    {
      title: "Display order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
    {
      title: "Title A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
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
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "Used in cards and listings. Max 200 characters.",
      validation: (Rule) =>
        Rule.required().max(200).error("Short description must be 200 characters or fewer."),
    }),
    defineField({
      name: "longDescription",
      title: "Long description",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
      ],
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
      name: "iconKey",
      title: "Icon key",
      type: "string",
      description: "Lucide icon name to use in the UI (e.g. 'wrench', 'zap', 'home').",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      of: sectionTypes,
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    defineField({
      name: "serviceAreas",
      title: "Service areas",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "serviceArea" }] })],
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Inactive services are hidden from the frontend.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
      media: "featuredImage.image",
    },
  },
})
