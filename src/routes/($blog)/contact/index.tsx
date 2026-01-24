import { createFileRoute } from '@tanstack/react-router'
import { ContactForm } from '../../../components/contact-form'
import type { SettingsQueryResult } from '../../../sanity.types'
import { settingsQuery } from '../../../sanity/lib/queries'
import { fetchSanityData } from '../../../lib/sanity/fetch'

export const Route = createFileRoute('/(blog)/contact/')({
  component: ContactPage,
  loader: async () => {
    const settings = await fetchSanityData<SettingsQueryResult>({
      query: settingsQuery,
      stega: false,
      useCache: false,
    })
    return { settings }
  },
})

function ContactPage() {
  const { settings } = Route.useLoaderData()
  
  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      
      <div className="prose prose-lg max-w-none mb-12">
        <p>
          Get in touch with {settings?.author?.name || 'me'} using the form below.
        </p>
      </div>
      
      <ContactForm />
    </div>
  )
}