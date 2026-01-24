import React from 'react'
import { createRoot } from 'react-dom/client'

// Simple test without TanStack Router first
function TestApp() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    console.log('TestApp component mounted')
  }, [])

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">🧪 TanStack Router Test</h1>
        
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-3">✅ React Working</h2>
            <p className="text-green-700">Component mounted successfully!</p>
          </div>
          
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">🔧 Vite Dev Server</h2>
            <p className="text-blue-700">Processing modules...</p>
          </div>
          
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-800 mb-3">⚡ Build System</h2>
            <p className="text-yellow-700">Vite 7.3.1 active</p>
          </div>
          
          <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-3">🎯 Next Phase</h2>
            <p className="text-purple-700">Add TanStack Router...</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="text-lg font-semibold">✅ Basic Setup Working</div>
          <div className="text-sm text-muted-foreground">Ready for TanStack Router integration</div>
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
    root.render(<TestApp />)
    console.log('TestApp rendered successfully')
  } catch (error) {
    console.error('Error rendering app:', error)
    rootElement.innerHTML = `
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-md">
          <h2 className="text-xl font-semibold text-red-800 mb-3">❌ Render Error</h2>
          <p className="text-red-700">Check console for details</p>
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