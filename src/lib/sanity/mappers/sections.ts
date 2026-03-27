import type { SectionData } from "../types"

/**
 * Normalise the sections array returned from GROQ.
 *
 * - Removes null/undefined entries (can appear when a referenced document
 *   is deleted or unpublished while the page still references it).
 * - Guarantees every entry has _type and _key so the renderer can rely on them.
 */
export function mapSections(sections: Array<SectionData | null | undefined> | null | undefined): SectionData[] {
  if (!sections) return []

  return sections.filter((s): s is SectionData => {
    if (!s) return false
    if (!s._type) return false
    if (!s._key) return false
    return true
  })
}
