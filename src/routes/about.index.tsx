import { createFileRoute } from '@tanstack/react-router'
import PortableText from '@/components/portable-text'
import { PortableTextBlock } from 'next-sanity'
import { aboutQuery } from '@/sanity/lib/queries'
import { fetchSanityData } from '@/lib/sanity/fetch'
import { buildImageUrl } from '@/lib/sanity/utils'

interface AboutData {
  _id: string
  _type: 'about'
  title?: string
  excerpt?: string
  content?: PortableTextBlock[]
  coverImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [key: string]: any
    }
    alt?: string
    _type: 'image'
  } | null
}

export const aboutRoute = createFileRoute('/about')({
  component: AboutPage,
  loader: async () => {
    try {
      console.log('🔍 Loading about page from Sanity...')
      
      const aboutData = await fetchSanityData<AboutData>({
        query: aboutQuery,
        stega: false,
        useCache: false,
      })

      console.log('✅ About data loaded:', aboutData)

      if (!aboutData) {
        return { aboutData: null }
      }

      return { aboutData }
    } catch (error) {
      console.error('❌ Error loading about page:', error)
      return { aboutData: null }
    }
  },
})

function AboutPage() {
  const { aboutData } = aboutRoute.useLoaderData()

  if (!aboutData) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">About</h1>
        <p>No about page content found.</p>
      </div>
    )
  }

  const content = Array.isArray(aboutData.content) ? aboutData.content : []
  const hasContent = content.length > 0

  return (
    <article className="container max-w-4xl py-12">
      {aboutData.coverImage?.asset?._ref && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <img
            src={buildImageUrl(aboutData.coverImage)}
            alt={aboutData.coverImage.alt || 'About page cover'}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <header>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {aboutData.title || 'About Me'}
        </h1>
        {aboutData.excerpt && (
          <p className="text-xl text-muted-foreground mb-8">
            {aboutData.excerpt}
          </p>
        )}
      </header>

      <div className="prose dark:prose-invert max-w-none">
        {hasContent ? (
          <PortableText value={content} />
        ) : (
          <p>No content available yet. Please check back later.</p>
        )}
      </div>
    </article>
  )
}