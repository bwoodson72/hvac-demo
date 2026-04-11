import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TeamSectionData, TeamMemberRef } from "@/lib/sanity/types"

export function TeamSection({ data }: { data: TeamSectionData }) {
  const { title, intro, selectedMembers } = data
  const members = selectedMembers ?? []

  return (
    <Section>
      <Container>
        {(title || intro) && (
          <div className="mb-10 text-center">
            {title && <Heading as="h2">{title}</Heading>}
            {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function MemberCard({ member }: { member: TeamMemberRef }) {
  return (
    <Card className="overflow-hidden">
      <CMSImage image={member.image ?? null} slot="teamPortrait" className="w-full" />
      <CardHeader>
        <CardTitle>{member.name}</CardTitle>
        <CardDescription>{member.role}</CardDescription>
      </CardHeader>
      {(member.bio || member.certifications?.length) && (
        <CardContent className="flex flex-col gap-3">
          {member.bio && (
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {member.bio}
            </p>
          )}
          {member.certifications && member.certifications.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {member.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
