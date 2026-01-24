import { createFileRoute } from '@tanstack/react-router'

export const tagsRoute = createFileRoute('/tags/$tag')({
  component: TagPage,
  loader: async ({ params }) => {
    const { tag } = await params
    return { 
      message: 'Tag page working!',
      tag,
      posts: [
        { id: 1, title: `Tag post for ${tag}`, excerpt: 'Post with specific tag' },
        { id: 2, title: `Another ${tag} post`, excerpt: 'Another post with this tag' }
      ]
    }
  },
})

function TagPage() {
  const { message, tag, posts } = tagsRoute.useLoaderData()

  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          {tag} Posts
        </h1>
        <div className="text-muted-foreground">{message}</div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <div key={post.id} className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-muted-foreground">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}