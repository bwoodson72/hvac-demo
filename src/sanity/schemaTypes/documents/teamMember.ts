import { defineArrayMember, defineField, defineType } from "sanity"

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Industry certifications or credentials (e.g. EPA 608, NATE Certified).",
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Featured members appear on the About page.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image.image",
    },
  },
})
