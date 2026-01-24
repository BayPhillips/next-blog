import { createFileRoute } from '@tanstack/react-router'

export const postRoute = createFileRoute('/posts/$slug')({
  component: PostPage,
  loader: async ({ params }) => {
    const { slug } = await params
    return { 
      message: 'Post page working!',
      post: {
        id: slug,
        title: `Post: ${slug}`,
        content: 'This is post content loaded via TanStack Router.',
        date: new Date().toISOString()
      }
    }
  },
})

function PostPage() {
  const { message, post } = postRoute.useLoaderData()

  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="text-lg text-muted-foreground">{message}</div>
      </div>

      <article className="prose dark:prose-invert max-w-none">
        <p>{post.content}</p>
        <p><small>Post ID: {post.id}</small></p>
        <p><small>Published: {new Date(post.date).toLocaleDateString()}</small></p>
      </article>

      <div className="mt-8">
        <a href="/posts" className="text-blue-600 hover:underline">
          ← Back to all posts
        </a>
      </div>
    </div>
  )
}