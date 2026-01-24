import { createFileRoute } from '@tanstack/react-router'
import type { SettingsQueryResult } from '../../../sanity.types'
import { settingsQuery } from '../../../sanity/lib/queries'
import { fetchSanityData } from '../../../lib/sanity/fetch'

export const aboutRoute = createFileRoute('/(blog)/about/')({
  component: AboutPage,
  loader: async () => {
    const settings = await fetchSanityData<SettingsQueryResult>({
      query: settingsQuery,
      stega: false,
      useCache: false,
    })
    return { settings }
  },
})

function AboutPage() {
  const { settings } = Route.useLoaderData()
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">About</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          This is the personal blog of {settings?.author?.name || 'Bay Phillips'}, 
          built with modern web technologies.
        </p>
        <p>
          This blog showcases experiments with various frameworks and technologies, 
          including React, TypeScript, and content management systems.
        </p>
      </div>
    </div>
  )
}