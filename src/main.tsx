import React from 'react'
import { createRoot } from 'react-dom/client'

// Simple test without TanStack Router first
function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">🧪 Router Test</h1>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800 mb-2">✅ React Working</h2>
            <p className="text-green-700">Basic React app mounted!</p>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">🔗 TanStack Router Test</h2>
            <p className="text-blue-700">Route loading coming next...</p>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">🌐 Available Routes</h2>
            <div className="space-y-2 text-yellow-700">
              <div>📧 / - Home page</div>
              <div>📧 /posts/ - Blog posts</div>
              <div>📧 /posts/[slug] - Individual post</div>
              <div>📧 /about/ - About page</div>
              <div>📧 /tags/[tag] - Tag pages</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="text-lg font-semibold">🚧 Debug Status</div>
          <div className="text-sm text-muted-foreground">
            Testing basic app before adding router...
          </div>
        </div>
      </div>
    </div>
  )
}

// Mounting function with error handling
function renderApp() {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    console.error('Root element not found')
    return
  }
  
  try {
    const root = createRoot(rootElement)
    root.render(<App />)
    console.log('✅ Basic app rendered successfully')
  } catch (error) {
    console.error('❌ Error rendering app:', error)
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #fef2f2;">
        <div style="max-width: 400px; padding: 24px; background: #fca5a5; border: 1px solid #ef4444; border-radius: 8px;">
          <h2 style="color: #991b1b; margin-bottom: 12px;">❌ Render Error</h2>
          <p style="color: #7f1d1d; margin-bottom: 8px;">Failed to render application</p>
          <div style="color: #b91c1c; font-size: 14px;">
            Error: ${error?.message || 'Unknown error'}
          </div>
        </div>
      </div>
    `
  }
}

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp)
} else {
  renderApp()
}