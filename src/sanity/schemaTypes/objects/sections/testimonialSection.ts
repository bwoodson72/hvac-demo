import { defineArrayMember, defineField, defineType } from "sanity"

export const testimonialSection = defineType({
  name: "testimonialSection",
  title: "Testimonials",
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
      description: "When on, featured testimonials are pulled automatically.",
      initialValue: false,
    }),
    defineField({
      name: "selectedTestimonials",
      title: "Selected testimonials",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
      hidden: ({ parent }) => Boolean((parent as { autoMode?: boolean } | undefined)?.autoMode),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "Testimonials" }
    },
  },
})
