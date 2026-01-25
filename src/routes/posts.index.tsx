import { createFileRoute } from '@tanstack/react-router'
import { PostCard } from '@/components/post-card'
import { paginatedPostsQuery, countPostsQuery } from '@/sanity/lib/queries'
import { fetchSanityData } from '@/lib/sanity/fetch'
import type { Post } from '@/sanity.types'

const POSTS_PER_PAGE = 10

export const Route = createFileRoute('/posts/')({
  component: PostsPage,
  loader: async ({ search }) => {
    const page = Number(search?.page) || 1
    const start = (page - 1) * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE

    try {
      console.log('🔍 Loading posts from Sanity...')
      
      const [posts, totalPosts] = await Promise.all([
        fetchSanityData<Post[]>({
          query: paginatedPostsQuery,
          params: { start, end },
          stega: false,
          useCache: false,
        }),
        fetchSanityData({ query: countPostsQuery }),
      ])

      if (!posts) {
        console.log('❌ No posts found')
        throw new Error('Posts not found')
      }

      const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
      console.log('✅ Posts loaded:', { count: posts.length, totalPosts, totalPages })

      return { posts, totalPages, currentPage: page }
    } catch (error) {
      console.error('❌ Error loading posts:', error)
      return { posts: [], totalPages: 0, currentPage: 1 }
    }
  },
})

function PostsPage() {
  const data = Route.useLoaderData(); const posts = data?.posts; const totalPages = data?.totalPages; const currentPage = data?.currentPage

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">All Posts</h1>
        <div className="text-muted-foreground">
          Browse all {posts.length} posts
          {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
          
          return <PostCard key={post._id} post={postData} />
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <a
              href={`/posts?page=${Math.max(1, currentPage - 1)}`}
              className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
                currentPage <= 1
                  ? 'pointer-events-none text-gray-400'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-disabled={currentPage <= 1}
            >
              Previous
            </a>
            <span className="px-3 py-2 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <a
              href={`/posts?page=${Math.min(totalPages, currentPage + 1)}`}
              className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
                currentPage >= totalPages
                  ? 'pointer-events-none text-gray-400'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-disabled={currentPage >= totalPages}
            >
              Next
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}