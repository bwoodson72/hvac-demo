import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { TeamSectionData, TeamMemberRef } from "@/lib/sanity/types"

export function TeamSection({ data }: { data: TeamSectionData }) {
  const { title, intro, selectedMembers, layout } = data
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

        {layout === "list" ? (
          <div className="flex flex-col gap-6">
            {members.map((member) => (
              <MemberListCard key={member._id} member={member} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member) => (
              <MemberGridCard key={member._id} member={member} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

function MemberGridCard({ member }: { member: TeamMemberRef }) {
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

function MemberListCard({ member }: { member: TeamMemberRef }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {member.image && (
          <div className="w-full sm:w-40 shrink-0">
            <CMSImage
              image={member.image}
              slot="teamPortrait"
              className="h-48 sm:h-full w-full"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 p-5">
          <div>
            <p className="font-heading text-base font-semibold">{member.name}</p>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
          {member.bio && (
            <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
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
        </div>
      </div>
    </Card>
  )
}
