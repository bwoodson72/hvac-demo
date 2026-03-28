import type { StructureBuilder } from "sanity/structure"
import type { ComponentType } from "react"

/**
 * Creates a list item that opens directly to a singleton document edit pane,
 * bypassing the filterable document list.
 *
 * Uses the schema type name as the fixed document ID so there is always
 * exactly one document of that type.
 */
export function singletonListItem(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: ComponentType
) {
  const item = S.listItem()
    .title(title)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))

  return icon ? item.icon(icon) : item
}

/** The set of type names treated as singletons. */
export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "headerSettings",
  "footerSettings",
  "homepage",
])
