import { createFileRoute } from '@tanstack/react-router'
import { PostCard } from '../../../components/post-card'
import { fetchRecentPosts, type PostWithReadTime } from '../../../lib/sanity/fetch'
import type { Post } from '../../../sanity.types'

export const postsIndexRoute = createFileRoute('/(blog)/posts/')({
  component: PostsPage,
  loader: async () => {
    const posts = await fetchRecentPosts(20)
    return { posts }
  },
})

function PostsPage() {
  const { posts } = Route.useLoaderData()
  
  if (!posts?.length) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Posts</h1>
        <p>No posts found.</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">All Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}