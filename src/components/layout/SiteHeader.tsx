import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CMSImage } from "@/components/shared/CMSImage"
import { resolveLink } from "@/lib/sanity/mappers/links"
import { MobileMenu } from "./MobileMenu"
import type { HeaderSettingsData, ImageWithAltData } from "@/lib/sanity/types"

interface SiteHeaderProps {
  data: HeaderSettingsData | null
  businessName?: string
  logo?: ImageWithAltData | null
  phone?: string
}

export function SiteHeader({ data, businessName = "Home", logo, phone }: SiteHeaderProps) {
  const navLinks = data?.navLinks ?? []
  const cta = data?.ctaButton ? resolveLink(data.ctaButton) : null

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {data?.announcementBar?.isActive && data.announcementBar.text && (
        <div className="bg-primary text-primary-foreground text-center text-sm py-1.5 px-4">
          {data.announcementBar.text}
          {data.announcementBar.cta && (() => {
            const barCta = resolveLink(data.announcementBar!.cta!)
            return (
              <Link
                href={barCta.href}
                target={barCta.target}
                rel={barCta.rel}
                className="ml-2 underline underline-offset-2 font-medium"
              >
                {barCta.label}
              </Link>
            )
          })()}
        </div>
      )}
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo / business name */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          {logo
            ? <CMSImage image={logo} slot="logo" priority className="h-32 w-auto object-contain" />
            : businessName}
        </Link>

        {/* Desktop nav */}
        {navLinks.length > 0 && (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const resolved = resolveLink(link)
              return (
                <Link
                  key={link._key ?? resolved.href}
                  href={resolved.href}
                  target={resolved.target}
                  rel={resolved.rel}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                >
                  {resolved.label}
                </Link>
              )
            })}
          </nav>
        )}

        {/* Desktop CTA + mobile hamburger */}
        <div className="flex items-center gap-2">
          {data?.showPhoneInHeader !== false && phone && (
            <a
              href={`tel:${phone}`}
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              {phone}
            </a>
          )}
          {cta && (
            <Button asChild className="hidden md:inline-flex">
              <Link href={cta.href} target={cta.target} rel={cta.rel}>
                {cta.label}
              </Link>
            </Button>
          )}
          <MobileMenu
            businessName={businessName}
            navLinks={navLinks}
            ctaButton={data?.ctaButton}
            phone={phone}
          />
        </div>
      </div>
    </header>
  )
}
