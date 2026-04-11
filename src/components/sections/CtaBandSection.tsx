import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CTAButton } from "@/components/shared/CTAButton"
import type { CtaBandSectionData } from "@/lib/sanity/types"

export function CtaBandSection({ data }: { data: CtaBandSectionData }) {
  const { title, text, primaryCta, secondaryCta } = data

  return (
    <Section spacing="md" className="bg-primary text-primary-foreground">
      <Container size="md">
        <div className="flex flex-col items-center text-center gap-4">
          <Heading as="h2" size="h2">
            {title}
          </Heading>
          {text && (
            <p className="max-w-xl text-lg opacity-85">
              {text}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {primaryCta && (
                <CTAButton
                  link={primaryCta}
                  variant="secondary"
                  size="lg"
                />
              )}
              {secondaryCta && (
                <CTAButton
                  link={secondaryCta}
                  variant="outline"
                  size="lg"
                  className="border-current text-current hover:bg-white/10"
                />
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
