import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CTAButton } from "@/components/shared/CTAButton"
import { cn } from "@/lib/utils"
import type { CtaBandSectionData } from "@/lib/sanity/types"

const bgStyles: Record<CtaBandSectionData["background"], string> = {
  default: "bg-card text-card-foreground",
  primary: "bg-primary text-primary-foreground",
  dark: "bg-foreground text-background",
  accent: "bg-accent text-accent-foreground",
}

export function CtaBandSection({ data }: { data: CtaBandSectionData }) {
  const { title, text, primaryCta, secondaryCta, background } = data
  const isContrast = background === "primary" || background === "dark"

  return (
    <Section spacing="md" className={bgStyles[background]}>
      <Container size="md">
        <div className="flex flex-col items-center text-center gap-4">
          <Heading as="h2" size="h2">
            {title}
          </Heading>
          {text && (
            <p
              className={cn(
                "max-w-xl text-lg",
                isContrast ? "opacity-85" : "text-muted-foreground"
              )}
            >
              {text}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {primaryCta && (
                <CTAButton
                  link={primaryCta}
                  variant={isContrast ? "secondary" : "default"}
                  size="lg"
                />
              )}
              {secondaryCta && (
                <CTAButton
                  link={secondaryCta}
                  variant="outline"
                  size="lg"
                  className={isContrast ? "border-current text-current hover:bg-white/10" : undefined}
                />
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
