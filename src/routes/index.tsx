import { createFileRoute } from '@tanstack/react-router'

export const indexRoute = createFileRoute('/')({
  component: HomeRoute,
})

function HomeRoute() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">🎉 TanStack Router Working!</h1>
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-3">✅ Router Mounted</h2>
          <p className="text-green-700">File-based routing is active!</p>
        </div>
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">📦 TanStack Router</h2>
          <p className="text-blue-700">Navigation system ready.</p>
        </div>
        <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-800 mb-3">🔗 Available Routes</h2>
          <div className="space-y-2 text-purple-700">
            <div>✅ / (home)</div>
            <div>✅ /posts/ (blog layout)</div>
            <div>✅ /about/ (about page)</div>
          </div>
        </div>
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-3">🎯 Next: Sanity Data</h2>
          <p className="text-yellow-700">Connect CMS to route loaders.</p>
        </div>
      </div>
    </div>
  )
}