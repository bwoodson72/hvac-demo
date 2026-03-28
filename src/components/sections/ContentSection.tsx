import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { RichText } from "@/components/shared/RichText"
import { CTAButton } from "@/components/shared/CTAButton"
import type { ContentSectionData } from "@/lib/sanity/types"

export function ContentSection({ data }: { data: ContentSectionData }) {
  const { title, body, image, cta, layout } = data

  const textBlock = (
    <div className="flex flex-col justify-center gap-4">
      {title && <Heading as="h2">{title}</Heading>}
      <RichText value={body} />
      {cta && <div className="mt-2"><CTAButton link={cta} /></div>}
    </div>
  )

  if (layout === "centered") {
    return (
      <Section>
        <Container size="md">
          <div className="text-center [&_.rich-text]:text-left">
            {title && (
              <Heading as="h2" className="mb-4">
                {title}
              </Heading>
            )}
            <RichText value={body} />
            {cta && <div className="mt-6"><CTAButton link={cta} /></div>}
          </div>
        </Container>
      </Section>
    )
  }

  if (layout === "imageLeft" || layout === "imageRight") {
    return (
      <Section>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {layout === "imageLeft" ? (
              <>
                {image && (
                  <div className="overflow-hidden rounded-xl">
                    <CMSImage image={image} slot="sectionFeature" />
                  </div>
                )}
                {textBlock}
              </>
            ) : (
              <>
                {textBlock}
                {image && (
                  <div className="overflow-hidden rounded-xl">
                    <CMSImage image={image} slot="sectionFeature" />
                  </div>
                )}
              </>
            )}
          </div>
        </Container>
      </Section>
    )
  }

  // default: full-width
  return (
    <Section>
      <Container size="md">
        {textBlock}
      </Container>
    </Section>
  )
}
