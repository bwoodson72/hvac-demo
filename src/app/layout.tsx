import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { getSite } from "@/lib/sanity/queries"
import { isSanityConfigured } from "@/lib/sanity/client"
import { urlFor } from "@/lib/sanity/image"
import { TrackingScripts } from "@/components/shared/TrackingScripts"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    if (!isSanityConfigured) throw new Error("Sanity not configured")
    const site = await getSite()
    const faviconUrl = site?.favicon?.asset
      ? urlFor(site.favicon).width(512).height(512).url()
      : undefined
    return {
      title: { default: site?.businessName ?? "Home", template: "%s" },
      description: "",
      robots: { index: true, follow: true },
      ...(faviconUrl ? { icons: { icon: faviconUrl, apple: faviconUrl } } : {}),
    }
  } catch {
    return {
      title: { default: "Home", template: "%s" },
      description: "",
      robots: { index: true, follow: true },
    }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let trackingIds = undefined
  try {
    if (isSanityConfigured) {
      const site = await getSite()
      trackingIds = site?.trackingIds
    }
  } catch {
    // tracking unavailable — skip scripts
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TrackingScripts trackingIds={trackingIds} />
        {children}
      </body>
    </html>
  )
}
