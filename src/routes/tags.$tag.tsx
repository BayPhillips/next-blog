import { createFileRoute } from '@tanstack/react-router'
import Link from '@tanstack/react-router'
import { notFound } from '@tanstack/react-router'
import { PostCard } from '@/components/post-card'
import { postsByTagQuery } from '@/sanity/lib/queries'
import { fetchSanityData } from '@/lib/sanity/fetch'
import type { Post } from '@/sanity.types'

type Props = {
  params: Promise<{ tag: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const tagsRoute = createFileRoute('/tags/$tag')({
  component: TagPage,
  loader: async ({ params, search }) => {
    const tagParam = await params
    const tag = decodeURIComponent(tagParam.tag)
    
    const posts = await fetchSanityData<Post[]>({
      query: postsByTagQuery,
      params: { tag: tag as any },
      stega: false,
      useCache: false,
    })

    if (!posts?.length) {
      throw notFound()
    }

    return { posts, tag }
  },
})

function TagPage() {
  const { posts, tag } = tagsRoute.useLoaderData()

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          {tag} posts
        </h1>
        <div className="text-muted-foreground">
          Browse all posts tagged with {tag}
        </div>
      </div>

      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32 lg:gap-y-32">
        {posts.map((post) => {
          // Transform to match PostCard expectations
          const postData = {
            ...post,
            slug: post.slug?.current || post.slug,
            coverImage: post.coverImage?.asset ? {
              asset: post.coverImage.asset,
              alt: post.coverImage.alt
            } : null,
            tags: post.tags || []
          }
          
          return <PostCard key={post!._id} post={postData} />
        })}
      </div>
    </div>
  )
}