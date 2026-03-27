import { defineArrayMember, defineField, defineType } from "sanity"

export const project = defineType({
  name: "project",
  title: "Project",
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
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "beforeImage",
      title: "Before image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "afterImage",
      title: "After image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery images",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. Roof Replacement, HVAC Install, Remodel",
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "reference",
      to: [{ type: "service" }],
    }),
    defineField({
      name: "serviceArea",
      title: "Service area",
      type: "reference",
      to: [{ type: "serviceArea" }],
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Featured projects appear in the portfolio showcase section.",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "afterImage.image",
    },
  },
})
