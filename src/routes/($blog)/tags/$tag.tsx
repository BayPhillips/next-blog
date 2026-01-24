import { createFileRoute } from '@tanstack/react-router'
import { fetchPostsByTag, type PostWithReadTime } from '../../../../lib/sanity/fetch'
import { PostCard } from '../../../../components/post-card'

export const Route = createFileRoute('/(blog)/tags/$tag/')({
  component: TagPage,
  loader: async ({ params }) => {
    const posts = await fetchPostsByTag(params.tag)
    return { posts, tag: params.tag }
  },
})

function TagPage() {
  const { posts, tag } = Route.useLoaderData()
  
  if (!posts?.length) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Posts tagged: {tag}</h1>
        <p>No posts found with this tag.</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Posts tagged: {tag}</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}