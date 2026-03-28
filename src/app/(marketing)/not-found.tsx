import Link from "next/link"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center">
      <Container size="sm">
        <div className="flex flex-col items-center gap-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
          <Heading as="h1" size="h1">
            Page Not Found
          </Heading>
          <p className="max-w-sm text-lg text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have moved or
            no longer exists.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  )
}
