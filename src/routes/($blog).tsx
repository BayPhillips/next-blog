import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from "../components/ui/site-header"
import { SiteFooter } from "../components/ui/site-footer"
import { settingsQuery } from "../sanity/lib/queries"
import { fetchSanityData } from "../lib/sanity/fetch"
import type { SettingsQueryResult } from "../sanity.types"

export const blogLayoutRoute = createFileRoute('/(blog)/')({
  component: BlogLayout,
  loader: async () => {
    try {
      const settings = await fetchSanityData<SettingsQueryResult>({
        query: settingsQuery,
        stega: false,
        useCache: false,
      })
      return { settings }
    } catch (error) {
      console.error('Error loading settings:', error)
      return { settings: null }
    }
  },
})

function BlogLayout() {
  const { settings } = blogLayoutRoute.useLoaderData()
  
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader settings={settings} />
      <main className="flex-1">
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Layout</h1>
            <p className="text-muted-foreground">Sanity settings loaded: {settings ? '✅' : '❌'}</p>
            <div className="mt-8">
              <p>Blog title: {settings?.title || 'Not loaded'}</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter settings={settings} />
    </div>
  )
}