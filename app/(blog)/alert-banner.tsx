"use client"

import { useRouter } from "next/navigation"
import { useSyncExternalStore, useTransition } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { disableDraftMode } from "./actions"

const emptySubscribe = () => () => {}

export default function AlertBanner() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const shouldShow = useSyncExternalStore(
    emptySubscribe,
    () => window.top === window,
    () => false,
  )

  if (!shouldShow) return null

  return (
    <div className={cn(
      "fixed left-0 right-0 top-0 z-50 w-full transition-opacity",
      pending ? "animate-pulse opacity-75" : "opacity-100"
    )}>
      <Alert className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex flex-1 items-center space-x-2">
            <Icons.eye className="h-4 w-4 flex-shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <AlertTitle className="text-sm font-medium">
                {pending ? "Disabling draft mode..." : "Preview Mode"}
              </AlertTitle>
              {!pending && (
                <AlertDescription className="text-xs text-muted-foreground sm:text-sm">
                  You are currently viewing draft content.
                </AlertDescription>
              )}
            </div>
          </div>
          
          {!pending && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                startTransition(() =>
                  disableDraftMode().then(() => {
                    router.refresh()
                  }),
                )
              }
              disabled={pending}
              className="w-full sm:w-auto"
            >
              Exit Preview Mode
            </Button>
          )}
        </div>
      </Alert>
    </div>
  )
}
