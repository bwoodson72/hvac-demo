import { defineField, defineType } from "sanity"

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "customerName",
      title: "Customer name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerLabel",
      title: "Customer label",
      type: "string",
      description: "e.g. Homeowner, Property Manager, Business Owner",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      description: "The customer's exact words. Aim for 40–200 characters for best display.",
      validation: (Rule) => [
        Rule.required(),
        Rule.min(20).warning("Short quotes (under 20 characters) may not be impactful."),
      ],
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Star rating from 1 to 5.",
      initialValue: 5,
      validation: (Rule) =>
        Rule.required().min(1).max(5).integer().error("Rating must be a whole number between 1 and 5."),
    }),
    defineField({
      name: "sourceLabel",
      title: "Source",
      type: "string",
      description: "Where the review was left (e.g. Google, Yelp, Facebook).",
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description: "Direct link to the original review, if available.",
    }),
    defineField({
      name: "locationLabel",
      title: "Location label",
      type: "string",
      description: "e.g. Granbury, TX — shown as a trust signal.",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Featured testimonials appear in hero and homepage sections.",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: {
      title: "customerName",
      quote: "quote",
      rating: "rating",
    },
    prepare({ title, quote, rating }: { title?: string; quote?: string; rating?: number }) {
      const stars = rating ? "★".repeat(rating) : ""
      const excerpt = quote ? quote.slice(0, 60) + (quote.length > 60 ? "…" : "") : ""
      return {
        title: title ?? "Anonymous",
        subtitle: [stars, excerpt].filter(Boolean).join("  "),
      }
    },
  },
})
