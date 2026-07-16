'use client'

import { useEffect } from 'react'
import { CtaLink } from '@/components/site/cta-button'
import { Button } from '@/components/ui/button'
import { EditorialLabel } from '@/components/site/editorial'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log('[Fathu Dives] Route error:', error.message)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-sand px-6">
      <div className="mx-auto max-w-xl text-center">
        <EditorialLabel className="justify-center">Something went wrong</EditorialLabel>
        <h1 className="mt-6 font-serif text-3xl text-deep sm:text-4xl">
          We hit a rough current
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
          An unexpected error occurred while loading this page. You can try again, or head back to
          the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <CtaLink href="/" variant="outline" size="lg">
            Back to home
          </CtaLink>
        </div>
      </div>
    </main>
  )
}
