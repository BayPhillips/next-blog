import { createFileRoute, Link } from '@tanstack/react-router'
import { Suspense } from 'react'
import { CalendarDays, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PostCard } from '@/components/post-card'
import PortableText from '@/components/portable-text'
import { postQuery, moreStoriesQuery } from '@/sanity/lib/queries'
import { fetchSanityData } from '@/lib/sanity/fetch'
import { buildImageUrl } from '@/lib/sanity/utils'
import type { Post } from '@/sanity.types'
import PostTags from '@/components/post-tags'

export const postRoute = createFileRoute('/posts/$slug')({
  component: PostPage,
  loader: async ({ params }) => {
    const { slug } = await params
    const post = await fetchSanityData<Post>({
      query: postQuery,
      params: { slug },
      stega: false,
      useCache: false,
    })
    return { post }
  },
})

function MorePosts({ currentPostId }: { currentPostId: string }) {
  const [morePosts] = React.useState<Post[]>([])
  
  React.useEffect(() => {
    const loadMorePosts = async () => {
      const posts = await fetchSanityData<Post[]>({
        query: moreStoriesQuery,
        params: { skip: currentPostId },
        stega: false,
        useCache: false,
      })
      return posts
    }
    
    loadMorePosts().then(setMorePosts)
  }, [currentPostId])
  
  if (!morePosts?.length) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {morePosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

function PostPage() {
  const { post } = postRoute.useLoaderData()

  if (!post) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Post Not Found</h1>
        <p>Sorry, we couldn't find that post.</p>
        <Button asChild className="mt-4">
          <Link to="/posts">← Back to all posts</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <article className="container max-w-4xl py-12">
        <header className="mb-8">
          {post.coverImage?.asset?._ref && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <img
                src={buildImageUrl(post.coverImage)}
                alt={post.coverImage.alt || post.title || 'Post cover'}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {post.title || 'Untitled Post'}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <time dateTime={post.date || ''} className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {post.date ? formatDate(post.date) : 'No date'}
            </time>
          </div>
        </header>

        {post.content && (
          <div className="prose dark:prose-invert max-w-none mb-12">
            <PortableText value={post.content} />
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mb-8">
            <PostTags tags={post.tags} />
          </div>
        )}

        <footer className="flex flex-wrap items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out: ${post.title}`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <span className="sr-only">Share on Twitter</span>
              <span>Twitter</span>
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <span className="sr-only">Share on LinkedIn</span>
              <span>LinkedIn</span>
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/posts" className="flex items-center gap-1">
              <span>←</span>
              <span>Back to all posts</span>
            </Link>
          </Button>
        </footer>
      </article>

      <Separator className="my-12" />

      <aside>
        <h2 className="text-2xl font-bold mb-8">More articles</h2>
        <Suspense fallback={<div>Loading more posts...</div>}>
          <MorePosts currentPostId={post._id} />
        </Suspense>
      </aside>
    </>
  )
}