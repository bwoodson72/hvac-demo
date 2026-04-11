import React from "react"
import Link from "next/link"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import type { ServicesGridSectionData, ServiceRef } from "@/lib/sanity/types"

export function ServicesGridSection({ data }: { data: ServicesGridSectionData }) {
  const { title, intro, selectedServices, autoMode } = data
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ServiceCard({ service }: { service: ServiceRef }) {
  const href = `/services/${service.slug}`

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
