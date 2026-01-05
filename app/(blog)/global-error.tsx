'use client'

import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-4 text-destructive">
              Something went wrong!
            </h1>
            <p className="text-muted-foreground mb-6">
              A critical error occurred. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 text-left">
                <p className="font-semibold mb-2">Error details (development only):</p>
                <p className="text-sm font-mono break-all">{error.message}</p>
                {error.digest && (
                  <p className="text-xs mt-2 text-muted-foreground">Error ID: {error.digest}</p>
                )}
              </div>
            )}
            <Button onClick={reset} className="w-full">
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}