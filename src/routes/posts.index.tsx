import { createFileRoute } from '@tanstack/react-router'

export const postsIndexRoute = createFileRoute('/posts')({
  component: PostsPage,
  loader: async () => {
    return { 
      message: 'Posts page working!',
      posts: [
        { id: 1, title: 'Test Post 1', excerpt: 'This is a test post' },
        { id: 2, title: 'Test Post 2', excerpt: 'Another test post' }
      ]
    }
  },
})

function PostsPage() {
  const { message, posts } = postsIndexRoute.useLoaderData()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Posts</h1>
        <div className="text-muted-foreground">{message}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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