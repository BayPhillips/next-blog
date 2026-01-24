import { createFileRoute } from '@tanstack/react-router'
import { fetchPostBySlug } from '../../../../lib/sanity/fetch'
import type { Post } from '../../../../sanity.types'
import { PortableText } from '../../../../components/portable-text'
import { formatDate } from '../../../../lib/date-utils'
import { getImageUrl, getImageAlt } from '../../../../lib/sanity/utils'
import { settingsQuery } from '../../../../sanity/lib/queries'
import { fetchSanityData } from '../../../../lib/sanity/fetch'
import type { SettingsQueryResult } from '../../../../sanity.types'

export const Route = createFileRoute('/(blog)/posts/$slug/')({
  component: PostPage,
  loader: async ({ params }) => {
    const [post, settings] = await Promise.all([
      fetchPostBySlug(params.slug),
      fetchSanityData<SettingsQueryResult>({
        query: settingsQuery,
        stega: false,
        useCache: false,
      })
    ])
    return { post, settings }
  },
})

function PostPage() {
  const { post, settings } = Route.useLoaderData()
  
  if (!post) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Post Not Found</h1>
        <p>The post you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <article className="container py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {post.title || 'Untitled Post'}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <time dateTime={post.date || ''}>
            {post.date ? formatDate(post.date) : 'No date'}
          </time>
          {post.author && (
            <span>By {post.author.name}</span>
          )}
        </div>
        
        {post.coverImage?.asset?._ref && (
          <div className="relative h-96 w-full mb-8">
            <img
              src={getImageUrl(post.coverImage) || '/placeholder.svg'}
              alt={getImageAlt(post.coverImage) || post.title || 'Post cover'}
              className="object-cover w-full h-full rounded-lg"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
      </header>
      
      <div className="prose prose-lg max-w-none mb-12">
        {post.body && <PortableText value={post.body} />}
      </div>
      
      <footer className="flex flex-wrap items-center gap-4 pt-8 border-t">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-primary/10 text-primary px-2 py-1 text-sm rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </footer>
    </article>
  )
}