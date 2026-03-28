import { defineArrayMember, defineField, defineType } from "sanity"
import { MenuIcon } from "@sanity/icons"

export const headerSettings = defineType({
  name: "headerSettings",
  title: "Header & Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
      description: "Logo displayed in the site header. Falls back to the logo in Site Settings.",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      description: "Main navigation links shown in the header. Keep to 5–7 items for best UX.",
    }),
    defineField({
      name: "ctaButton",
      title: "Header CTA button",
      type: "link",
      description:
        "Primary call-to-action shown in the header (e.g., 'Get a Free Quote'). Rendered as a button.",
    }),
    defineField({
      name: "showPhoneInHeader",
      title: "Show phone number in header",
      type: "boolean",
      description: "Display the business phone from Site Settings next to the CTA.",
      initialValue: true,
    }),
    defineField({
      name: "announcementBar",
      title: "Announcement bar",
      type: "object",
      description: "Optional top-of-page banner for promotions or important notices.",
      fields: [
        defineField({
          name: "text",
          title: "Message",
          type: "string",
          description: "Short announcement copy (e.g., 'Summer sale — 10% off all installs').",
        }),
        defineField({
          name: "cta",
          title: "CTA link",
          type: "link",
          description: "Optional link embedded in the announcement.",
        }),
        defineField({
          name: "isActive",
          title: "Show bar",
          type: "boolean",
          description: "Toggle the announcement bar on or off.",
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Header & Navigation" }
    },
  },
})
