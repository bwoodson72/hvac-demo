import { defineArrayMember, defineField, defineType } from "sanity"
import { WrenchIcon } from "@sanity/icons"
import { sectionTypes } from "@/sanity/lib/sectionTypes"

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: WrenchIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "sections", title: "Page sections" },
    { name: "relations", title: "Relations" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
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
    // ── Content ────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "The service name as shown in headings and navigation.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "URL-friendly identifier (auto-generated from title). Changing this breaks existing links.",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "content",
      description: "Brief summary shown on service cards and in search results. Max 200 characters.",
      validation: (Rule) =>
        Rule.required().max(200).error("Short description must be 200 characters or fewer."),
    }),
    defineField({
      name: "longDescription",
      title: "Long description",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "block" })],
      description: "Full service description shown on the service detail page.",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "content",
      description: "Hero banner at the top of the service page.",
    }),
    defineField({
      name: "iconKey",
      title: "Icon key",
      type: "string",
      group: "content",
      description:
        "Lucide icon identifier shown on service cards (e.g., 'wrench', 'zap', 'droplets', 'flame'). See icon reference at lucide.dev.",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "imageWithAlt",
      group: "content",
      description: "Primary image for this service. Used in the hero, cards, and OG image.",
    }),

    // ── Page sections ──────────────────────────────────────────────────────
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      group: "sections",
      of: sectionTypes,
      description: "Additional content sections rendered below the service description.",
    }),

    // ── Relations ──────────────────────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
      description: "Frequently asked questions shown at the bottom of this service page.",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
      description: "Customer reviews specific to this service.",
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
      description: "Other services to suggest at the bottom of this page.",
    }),
    defineField({
      name: "serviceAreas",
      title: "Service areas",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "serviceArea" }] })],
      description: "Geographic areas where this service is offered.",
    }),

    // ── SEO ────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),

    // ── Settings ───────────────────────────────────────────────────────────
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "settings",
      description: "Lower numbers appear first in grids and lists. Leave blank to sort alphabetically.",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      group: "settings",
      description: "Inactive services are hidden from the frontend and excluded from the sitemap.",
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
