import { defineArrayMember, defineField, defineType } from "sanity"
import { PinIcon } from "@sanity/icons"
import { sectionTypes } from "@/sanity/lib/sectionTypes"

export const serviceArea = defineType({
  name: "serviceArea",
  title: "Service area",
  type: "document",
  icon: PinIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "sections", title: "Page sections" },
    { name: "relations", title: "Relations" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  orderings: [
    {
      title: "Title A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "City A–Z",
      name: "cityAsc",
      by: [{ field: "city", direction: "asc" }],
    },
  ],
  fields: [
    // ── Content ────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "Display name for this area (e.g., 'Austin', 'North Austin', 'Round Rock').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "URL-friendly identifier (auto-generated). Changing this breaks existing links.",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      group: "content",
      description: "City name used in page titles and structured data (e.g., 'Austin').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      group: "content",
      description: "Two-letter state abbreviation (e.g., 'TX').",
      initialValue: "TX",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "content",
      description: "Hero banner at the top of this area's page.",
    }),
    defineField({
      name: "introCopy",
      title: "Intro copy",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "block" })],
      description: "Opening paragraph(s) below the hero. Focus on local relevance.",
    }),
    defineField({
      name: "serviceAreaProof",
      title: "Local proof copy",
      type: "text",
      rows: 4,
      group: "content",
      description:
        "Trust-building paragraph for this location — mention local landmarks, years serving the area, etc.",
    }),
    defineField({
      name: "neighborhoods",
      title: "Neighborhoods served",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description:
        "Subdivisions or neighborhoods within this service area. Shown as a badge list on the page.",
    }),

    // ── Page sections ──────────────────────────────────────────────────────
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      group: "sections",
      of: sectionTypes,
      description: "Additional content sections rendered below the intro copy.",
    }),

    // ── Relations ──────────────────────────────────────────────────────────
    defineField({
      name: "relatedServices",
      title: "Services offered here",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
      description: "Services available in this area. Shown as a grid on the area page.",
    }),
    defineField({
      name: "faqs",
      title: "Local FAQs",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
      description: "Frequently asked questions specific to this service area.",
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
      name: "isActive",
      title: "Active",
      type: "boolean",
      group: "settings",
      description: "Inactive areas are hidden from the frontend and excluded from the sitemap.",
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
