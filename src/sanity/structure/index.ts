import type { StructureResolver } from "sanity/structure"
import { env } from "@/lib/sanity/env"
import {
  CogIcon,
  MenuIcon,
  UlistIcon,
  HomeIcon,
  DocumentsIcon,
  WrenchIcon,
  PinIcon,
  StarIcon,
  HelpCircleIcon,
  UsersIcon,
  ImagesIcon,
  ComposeIcon,
  TagIcon,
} from "@sanity/icons"
import { singletonListItem } from "./singletons"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ── Singletons ─────────────────────────────────────────────────────
      singletonListItem(S, "siteSettings", "Site Settings", CogIcon),
      singletonListItem(S, "headerSettings", "Header & Navigation", MenuIcon),
      singletonListItem(S, "footerSettings", "Footer", UlistIcon),
      singletonListItem(S, "homepage", "Homepage", HomeIcon),

      S.divider(),

      // ── Pages & Page-like content ──────────────────────────────────────
      S.listItem()
        .title("Pages")
        .icon(DocumentsIcon)
        .child(S.documentList().title("Pages").apiVersion(env.apiVersion).filter('_type == "page"')),

      S.listItem()
        .title("Services")
        .icon(WrenchIcon)
        .child(
          S.documentList()
            .title("Services")
            .apiVersion(env.apiVersion)
            .filter('_type == "service"')
            .defaultOrdering([{ field: "displayOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("Service Areas")
        .icon(PinIcon)
        .child(
          S.documentList()
            .title("Service Areas")
            .apiVersion(env.apiVersion)
            .filter('_type == "serviceArea"')
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),

      S.divider(),

      // ── Structured data ────────────────────────────────────────────────
      S.listItem()
        .title("Testimonials")
        .icon(StarIcon)
        .child(
          S.documentList()
            .title("Testimonials")
            .apiVersion(env.apiVersion)
            .filter('_type == "testimonial"')
            .defaultOrdering([{ field: "displayOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("FAQs")
        .icon(HelpCircleIcon)
        .child(
          S.documentList()
            .title("FAQs")
            .apiVersion(env.apiVersion)
            .filter('_type == "faq"')
            .defaultOrdering([
              { field: "category", direction: "asc" },
              { field: "displayOrder", direction: "asc" },
            ])
        ),

      S.listItem()
        .title("Team")
        .icon(UsersIcon)
        .child(
          S.documentList()
            .title("Team")
            .apiVersion(env.apiVersion)
            .filter('_type == "teamMember"')
            .defaultOrdering([{ field: "displayOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("Gallery / Projects")
        .icon(ImagesIcon)
        .child(
          S.documentList()
            .title("Projects")
            .apiVersion(env.apiVersion)
            .filter('_type == "project"')
            .defaultOrdering([{ field: "displayOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("Blog")
        .icon(ComposeIcon)
        .child(
          S.documentList()
            .title("Blog posts")
            .apiVersion(env.apiVersion)
            .filter('_type == "post"')
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),

      S.listItem()
        .title("Offers")
        .icon(TagIcon)
        .child(
          S.documentList()
            .title("Offers")
            .apiVersion(env.apiVersion)
            .filter('_type == "offer"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
    ])
