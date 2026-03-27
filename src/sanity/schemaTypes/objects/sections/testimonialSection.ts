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
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "Carousel", value: "carousel" },
          { title: "Featured", value: "featured" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
  ],
  preview: {
    select: { title: "title", layout: "layout" },
    prepare({ title, layout }: { title?: string; layout?: string }) {
      return { title: title ?? "Testimonials", subtitle: layout ?? "grid" }
    },
  },
})
