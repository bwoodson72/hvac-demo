/**
 * On-demand revalidation webhook.
 *
 * Configure a Sanity webhook (sanity.io/manage → your project → API → Webhooks)
 * to POST to `https://your-site.com/api/revalidate` on document publish/unpublish.
 * Add the SANITY_REVALIDATION_SECRET value as the webhook's HTTP Header:
 *   Header name:  sanity-webhook-secret
 *   Header value: <your secret>
 *
 * This clears the `sanity` cache tag, which invalidates every page that was
 * rendered using `sanityFetch`. Next.js will regenerate affected pages on the
 * next request.
 */
import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const secret = req.headers.get("sanity-webhook-secret")
  const expectedSecret = process.env.SANITY_REVALIDATION_SECRET

  if (!expectedSecret) {
    // If no secret is configured, reject all requests — don't silently accept.
    return NextResponse.json(
      { message: "Revalidation secret is not configured." },
      { status: 500 }
    )
  }

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  // Revalidate the shared "sanity" tag that `sanityFetch` attaches to every
  // request, effectively purging all cached Sanity content at once.
  // The second argument is the cache profile — {} means use the default.
  revalidateTag("sanity", {})

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
