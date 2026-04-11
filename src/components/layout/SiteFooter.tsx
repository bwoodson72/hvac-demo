import Link from "next/link"
import { CMSImage } from "@/components/shared/CMSImage"
import { resolveLink } from "@/lib/sanity/mappers/links"
import type { SiteData } from "@/lib/sanity/types"

interface SiteFooterProps {
  site?: SiteData | null
}

export function SiteFooter({ site }: SiteFooterProps) {
  const year = new Date().getFullYear()
  const businessName = site?.businessName ?? "Home"
  const logo = site?.footerLogo ?? site?.logo
  const copyright = site?.copyrightText ?? `© ${year} ${businessName}. All rights reserved.`
  const navColumns = site?.footerNavColumns ?? []
  const bottomLinks = site?.footerBottomLinks ?? []
  const socialLinks = site?.socialLinks
  const showSocial = site?.showSocialLinks && socialLinks && Object.values(socialLinks).some(Boolean)

  return (
    <footer className="border-t bg-muted/40">
      {(navColumns.length > 0 || site?.footerTagline || logo || showSocial) && (
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="flex flex-col gap-3">
              {logo
                ? <CMSImage image={logo} slot="logo" className="h-10 w-auto" />
                : <span className="font-bold text-lg">{businessName}</span>}
              {site?.footerTagline && (
                <p className="text-sm text-muted-foreground">{site.footerTagline}</p>
              )}
              {showSocial && (
                <div className="flex flex-wrap gap-3 mt-1">
                  {(
                    [
                      ["facebook", "Facebook"],
                      ["instagram", "Instagram"],
                      ["twitter", "X"],
                      ["youtube", "YouTube"],
                      ["linkedin", "LinkedIn"],
                      ["yelp", "Yelp"],
                      ["googleBusiness", "Google"],
                    ] as const
                  ).map(([key, label]) =>
                    socialLinks![key] ? (
                      <a
                        key={key}
                        href={socialLinks![key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {label}
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </div>

            {/* Nav columns */}
            {navColumns.map((col) => (
              <div key={col._key} className="flex flex-col gap-3">
                {col.heading && (
                  <span className="text-sm font-semibold text-foreground">{col.heading}</span>
                )}
                {col.links && col.links.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {col.links.map((link) => {
                      const resolved = resolveLink(link)
                      return (
                        <li key={link._key ?? resolved.href}>
                          <Link
                            href={resolved.href}
                            target={resolved.target}
                            rel={resolved.rel}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {resolved.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="border-t">
        <div className="container mx-auto flex flex-col gap-2 px-4 sm:px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{copyright}</p>
          {bottomLinks.length > 0 && (
            <nav className="flex flex-wrap gap-4">
              {bottomLinks.map((link) => {
                const resolved = resolveLink(link)
                return (
                  <Link
                    key={link._key ?? resolved.href}
                    href={resolved.href}
                    target={resolved.target}
                    rel={resolved.rel}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {resolved.label}
                  </Link>
                )
              })}
            </nav>
          )}
        </div>
      </div>
    </footer>
  )
}
