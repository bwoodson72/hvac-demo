/**
 * DraftBanner — server component that shows a sticky banner when Next.js
 * draft mode is enabled. Provides a one-click exit link so editors can return
 * to the published site without going back to the Studio.
 */
import { draftMode } from "next/headers"
import Link from "next/link"

export async function DraftBanner() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-amber-400 px-4 py-2 text-sm font-medium text-amber-950"
    >
      <span>
        <strong>Preview mode is on.</strong> You are viewing draft content.
      </span>
      <Link
        href="/api/draft/disable"
        className="rounded border border-amber-700 bg-amber-300 px-3 py-1 text-xs font-semibold hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
      >
        Exit preview
      </Link>
    </div>
  )
}
