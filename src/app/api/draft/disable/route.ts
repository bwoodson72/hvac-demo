/**
 * Draft mode disable endpoint.
 *
 * Clears the draft-mode cookie and redirects the user back to the page they
 * were on (or "/" if no redirect parameter is provided).
 *
 * Usage: GET /api/draft/disable?redirect=/some-page
 */
import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const draft = await draftMode()
  draft.disable()

  const redirectTo = request.nextUrl.searchParams.get("redirect") ?? "/"
  // Only allow relative paths to prevent open-redirect attacks.
  const safePath = redirectTo.startsWith("/") ? redirectTo : "/"
  redirect(safePath)
}
