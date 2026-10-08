'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Blog error:', error)
  }, [error])

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mbe-4 text-destructive">Something went wrong!</h1>
        <p className="text-muted-foreground mbe-6">
          We apologize for the inconvenience. An error occurred while loading this page.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mbe-6 text-start">
            <p className="font-semibold mbe-2">Error details (development only):</p>
            <p className="text-sm font-mono break-all">{error.message}</p>
            {error.digest && (
              <p className="text-xs mbs-2 text-muted-foreground">Error ID: {error.digest}</p>
            )}
          </div>
        )}
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  )
}