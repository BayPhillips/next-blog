import { createFileRoute, Link } from '@tanstack/react-router'

export const indexRoute = createFileRoute('/')({
  component: HomeRoute,
  loader: async () => {
    // Simple test data
    return { 
      message: 'TanStack Router working!',
      timestamp: new Date().toISOString()
    }
  },
})

function HomeRoute() {
  const { message, timestamp } = indexRoute.useLoaderData()
  
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">🎉 TanStack Router</h1>
      
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-3">✅ Router Working</h2>
          <p className="text-green-700">{message}</p>
          <p className="text-sm text-green-600 mt-2">Loaded at: {new Date(timestamp).toLocaleTimeString()}</p>
        </div>
        
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">🔗 Available Routes</h2>
          <div className="space-y-2 text-blue-700">
            <div>✅ / - Home (current)</div>
            <div>📧 /posts - Blog posts</div>
            <div>📧 /posts/[slug] - Individual post</div>
            <div>📧 /about - About page</div>
            <div>📧 /tags/[tag] - Tag pages</div>
          </div>
        </div>
        
        <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-800 mb-3">🎯 Test Navigation</h2>
          <div className="space-y-2">
            <Link to="/posts" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
              Go to Posts →
            </Link>
            <br />
            <Link to="/about" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
              Go to About →
            </Link>
          </div>
        </div>
        
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-3">🔧 Router Status</h2>
          <div className="space-y-2 text-yellow-700">
            <div>✅ Route loaded</div>
            <div>✅ Data fetching working</div>
            <div>✅ TanStack Router active</div>
          </div>
        </div>
      </div>
    </div>
  )
}