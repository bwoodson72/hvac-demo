import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TestimonialSectionData, TestimonialRef } from "@/lib/sanity/types"

export function TestimonialSection({ data }: { data: TestimonialSectionData }) {
  const { title, intro, selectedTestimonials, layout, autoMode } = data
  const items = selectedTestimonials ?? []

  const header = (title || intro) && (
    <div className="mb-10 text-center">
      {title && <Heading as="h2">{title}</Heading>}
      {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
    </div>
  )

  if (items.length === 0 && autoMode && process.env.NODE_ENV === "development") {
    return (
      <Section>
        <Container>
          {header}
          <p className="py-8 text-center text-sm text-muted-foreground italic">
            [DEV] autoMode is enabled but no testimonials were resolved.
          </p>
        </Container>
      </Section>
    )
  }

  if (layout === "carousel") {
    return (
      <Section>
        <Container className="overflow-hidden">
          {header}
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((t) => (
              <div key={t._id} className="w-[300px] shrink-0 snap-start sm:w-[360px]">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    )
  }

  if (layout === "featured" && items.length > 0) {
    const [featured, ...rest] = items
    return (
      <Section>
        <Container>
          {header}
          <div className="flex flex-col gap-6">
            {featured && <FeaturedTestimonial testimonial={featured} />}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((t) => (
                  <TestimonialCard key={t._id} testimonial={t} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    )
  }

  // grid (default)
  return (
    <Section>
      <Container>
        {header}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <TestimonialCard key={t._id} testimonial={t} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating ? "fill-warning text-warning" : "fill-muted text-muted-foreground/40"
          )}
          aria-hidden
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial: t }: { testimonial: TestimonialRef }) {
  return (
    <Card className="relative h-full">
      <CardContent className="flex flex-col gap-4 pt-4">
        {/* Decorative quote mark */}
        <span
          className="absolute right-4 top-2 font-serif text-6xl leading-none text-primary/10 select-none"
          aria-hidden
        >
          &ldquo;
        </span>
        <StarRating rating={t.rating} />
        <blockquote className="text-sm leading-relaxed text-foreground">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <footer className="mt-auto flex flex-col gap-0.5">
          <span className="text-sm font-semibold">{t.customerName}</span>
          {t.customerLabel && (
            <span className="text-xs text-muted-foreground">{t.customerLabel}</span>
          )}
          {(t.sourceLabel || t.locationLabel) && (
            <span className="text-xs text-muted-foreground">
              {[t.sourceLabel, t.locationLabel].filter(Boolean).join(" · ")}
            </span>
          )}
        </footer>
      </CardContent>
    </Card>
  )
}

function FeaturedTestimonial({ testimonial: t }: { testimonial: TestimonialRef }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
      <span
        className="absolute -top-4 left-6 font-serif text-9xl leading-none text-white/10 select-none"
        aria-hidden
      >
        &ldquo;
      </span>
      <div className="relative flex flex-col gap-4">
        <StarRating rating={t.rating} />
        <blockquote className="text-xl font-light leading-relaxed md:text-2xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <footer className="flex flex-col gap-0.5 opacity-85">
          <span className="font-semibold">{t.customerName}</span>
          {t.customerLabel && <span className="text-sm">{t.customerLabel}</span>}
          {(t.sourceLabel || t.locationLabel) && (
            <span className="text-sm">
              {[t.sourceLabel, t.locationLabel].filter(Boolean).join(" · ")}
            </span>
          )}
        </footer>
      </div>
    </div>
  )
}
