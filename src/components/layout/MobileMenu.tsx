"use client"

import { MenuIcon, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { resolveLink } from "@/lib/sanity/mappers/links"
import type { LinkData } from "@/lib/sanity/types"

interface MobileMenuProps {
  businessName: string
  navLinks?: LinkData[]
  ctaButton?: LinkData
  phone?: string
}

export function MobileMenu({ businessName, navLinks, ctaButton, phone }: MobileMenuProps) {
  const cta = ctaButton ? resolveLink(ctaButton) : null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle>{businessName}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks?.map((link) => {
            const resolved = resolveLink(link)
            return (
              <Link
                key={link._key ?? resolved.href}
                href={resolved.href}
                target={resolved.target}
                rel={resolved.rel}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {resolved.label}
              </Link>
            )
          })}
        </nav>
        {(cta || phone) && (
          <div className="border-t px-4 py-4 flex flex-col gap-3">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {phone}
              </a>
            )}
            {cta && (
              <Button asChild className="w-full">
                <Link href={cta.href} target={cta.target} rel={cta.rel}>
                  {cta.label}
                </Link>
              </Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
