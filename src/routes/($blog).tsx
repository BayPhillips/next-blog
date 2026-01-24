import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { VisualEditing } from "next-sanity/visual-editing"
import { draftMode } from "next/headers"
import { AlertBanner } from "../components/alert-banner"
import { SiteHeader } from "../components/ui/site-header"
import { SiteFooter } from "../components/ui/site-footer"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "../components/ui/toaster"
import { settingsQuery } from "../sanity/lib/queries"
import { fetchSanityData } from "../lib/sanity/fetch"
import type { SettingsQueryResult } from "../sanity.types"

import '../globals.css'
import '../lib/fonts.css'

export const Route = createFileRoute('/(blog)/')({
  component: BlogLayout,
  loader: async () => {
    const settings = await fetchSanityData<SettingsQueryResult>({
      query: settingsQuery,
      stega: false,
      useCache: false,
    })
    return { settings }
  },
})

function BlogLayout({ Component }: { Component: any }) {
  const { settings } = Route.useLoaderData()
  
  return (
    <html lang="en" className="min-h-screen font-sans antialiased">
      <body className="min-h-screen bg-background">
        <div className="relative flex min-h-screen flex-col">
          {(await draftMode()).isEnabled && <AlertBanner />}
          <SiteHeader settings={settings} />
          <main className="flex-1">
            <div className="container py-12">
              <Component />
            </div>
          </main>
          <SiteFooter settings={settings} />
        </div>
        {(await draftMode()).isEnabled && (
          <Suspense>
            <VisualEditing />
          </Suspense>
        )}
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  )
}