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
      description: "URL path for this project (auto-generated from title).",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Brief description of the project shown in gallery cards.",
    }),
    defineField({
      name: "beforeImage",
      title: "Before image",
      type: "imageWithAlt",
      description: "Photo taken before the work was completed.",
    }),
    defineField({
      name: "afterImage",
      title: "After image",
      type: "imageWithAlt",
      description: "Photo taken after completion. Used as the card thumbnail.",
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
      description: "Lower numbers appear first in the gallery.",
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
