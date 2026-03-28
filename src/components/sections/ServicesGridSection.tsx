import React from "react"
import Link from "next/link"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { getIcon } from "@/lib/utils/icons"
import { cn } from "@/lib/utils"
import type { ServicesGridSectionData, ServiceRef } from "@/lib/sanity/types"

function ServiceIcon({ iconKey, className }: { iconKey?: string; className: string }) {
  const Icon = iconKey ? getIcon(iconKey) : null
  if (!Icon) return null
  return React.createElement(Icon, { className, "aria-hidden": "true" })
}

const colStyles: Record<ServicesGridSectionData["columns"], string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
}

export function ServicesGridSection({ data }: { data: ServicesGridSectionData }) {
  const { title, intro, selectedServices, cardStyle = "default", columns, autoMode } = data
  const services = selectedServices ?? []

  return (
    <Section>
      <Container>
        {(title || intro) && (
          <div className="mb-10 text-center">
            {title && <Heading as="h2">{title}</Heading>}
            {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}

        {services.length === 0 && autoMode && process.env.NODE_ENV === "development" && (
          <p className="py-8 text-center text-sm text-muted-foreground italic">
            [DEV] autoMode is enabled but no services were resolved. Ensure the GROQ query
            dereferences services.
          </p>
        )}

        <div className={cn("grid grid-cols-1 gap-6", colStyles[columns])}>
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} style={cardStyle} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ServiceCard({
  service,
  style,
}: {
  service: ServiceRef
  style: NonNullable<ServicesGridSectionData["cardStyle"]>
}) {
  const href = `/services/${service.slug}`

  if (style === "minimal") {
    return (
      <Link href={href} className="group block">
        <Card className="h-full transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-start gap-3 pt-4">
            {service.iconKey && (
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <ServiceIcon iconKey={service.iconKey} className="size-5 text-primary" />
              </div>
            )}
            <CardTitle className="group-hover:text-primary transition-colors">
              {service.title}
            </CardTitle>
          </CardContent>
        </Card>
      </Link>
    )
  }

  if (style === "detailed") {
    return (
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        {service.featuredImage && (
          <CMSImage image={service.featuredImage} slot="serviceCard" className="w-full" />
        )}
        <CardHeader>
          {service.iconKey && (
            <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <ServiceIcon iconKey={service.iconKey} className="size-5 text-primary" />
            </div>
          )}
          <CardTitle>{service.title}</CardTitle>
          {service.shortDescription && (
            <CardDescription>{service.shortDescription}</CardDescription>
          )}
        </CardHeader>
        <CardFooter>
          <Link
            href={href}
            className="text-sm font-medium text-primary hover:underline"
          >
            Learn more →
          </Link>
        </CardFooter>
      </Card>
    )
  }

  // default
  return (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
      {service.featuredImage && (
        <CMSImage image={service.featuredImage} slot="serviceCard" className="w-full" />
      )}
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
        {service.shortDescription && (
          <CardDescription>{service.shortDescription}</CardDescription>
        )}
      </CardHeader>
      <CardFooter>
        <Link href={href} className="text-sm font-medium text-primary hover:underline">
          Learn more →
        </Link>
      </CardFooter>
    </Card>
  )
}
