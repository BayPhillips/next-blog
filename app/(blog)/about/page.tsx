import { sanityFetch } from "@/sanity/lib/fetch"
import { aboutQuery } from "@/sanity/lib/queries"
import PortableText from "@/app/(blog)/components/portable-text"
import { PortableTextBlock } from 'next-sanity'
import { PageHeader } from "@/components/ui/page-header"
import Image from 'next/image'
import { getImageUrl, getImageAlt } from "@/lib/sanity/utils"

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

export default async function AboutPage() {
  const aboutData = await sanityFetch({
    query: aboutQuery,
    perspective: process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE || 'published'
  }) as AboutData | null

  if (!aboutData) {
    return (
      <div className="container py-12">
        <p>No about page content found.</p>
      </div>
    )
  }

  const content = Array.isArray(aboutData.content) ? aboutData.content : [];
  const hasContent = content.length > 0;

  return (
    <article className="">
      {aboutData.coverImage?.asset?._ref && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(aboutData.coverImage) || ''}
            alt={getImageAlt(aboutData.coverImage) || 'About page cover'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          />
        </div>
      )}
      <PageHeader 
        title={aboutData.title || 'About Me'} 
        description={aboutData.excerpt}
        className="mb-12"
      />
      
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