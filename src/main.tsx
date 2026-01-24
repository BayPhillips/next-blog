import React from 'react'
import { createRoot } from 'react-dom/client'

// Simple React app without TanStack Router first
function App() {
  const [mounted, setMounted] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    console.log('🚀 App component mounting...')
    
    try {
      setMounted(true)
      console.log('✅ App component mounted successfully')
    } catch (err) {
      console.error('❌ Mount error:', err)
      setError(err)
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="max-w-md p-6 bg-red-100 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 mb-3">❌ App Error</h2>
          <p className="text-red-700">Failed to mount application</p>
          <details className="mt-3">
            <summary className="text-sm text-red-600 cursor-pointer">Error Details</summary>
            <pre className="text-xs text-red-600 mt-2 overflow-auto">
              {error?.message || 'Unknown error'}
            </pre>
          </details>
        </div>
      </div>
    )
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl">🔄 Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">🎉 React App Working!</h1>
        
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-3">✅ React Working</h2>
            <p className="text-green-700">Component mounted successfully!</p>
          </div>
          
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">🔧 Build System</h2>
            <p className="text-blue-700">Vite production build working!</p>
          </div>
          
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-800 mb-3">⚡ Bundle Size</h2>
            <p className="text-yellow-700">283KB (89KB gzipped)</p>
          </div>
          
          <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-3">🎯 Next Step</h2>
            <p className="text-purple-700">Add TanStack Router...</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="text-lg font-semibold text-green-600">✅ Basic App Working</div>
          <div className="text-sm text-muted-foreground mt-2">
            Ready to add TanStack Router
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced mounting with better error handling
function renderApp() {
  console.log('🚀 Starting app render...')
  
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    console.error('❌ Root element not found')
    return
  }
  
  try {
    const root = createRoot(rootElement)
    root.render(<App />)
    console.log('✅ App rendered successfully')
  } catch (error) {
    console.error('❌ Error rendering app:', error)
    rootElement.innerHTML = `
      <div class="min-h-screen flex items-center justify-center" style="background: #fef2f2;">
        <div class="max-w-md p-6 bg-red-100 border border-red-200 rounded-lg" style="border: 1px solid #fca5a5;">
          <h2 class="text-xl font-semibold text-red-800 mb-3" style="color: #991b1b;">❌ Critical Error</h2>
          <p class="text-red-700 mb-3" style="color: #7f1d1d;">Failed to render application</p>
          <div class="text-sm text-red-600" style="color: #b91c1c;">
            Error: ${error?.message || 'Unknown error'}
          </div>
        </div>
      </div>
    `
  }
}

// DOM ready check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp)
} else {
  renderApp()
}