import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'

// Simple route tree with just home page
const routeTree = rootRoute.addChildren([
  indexRoute,
])

// Create router
const router = createRouter({ routeTree })

// Enhanced mounting with better error handling
function renderApp() {
  console.log('🚀 Starting TanStack Router app render...')
  
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    console.error('❌ Root element not found')
    return
  }
  
  try {
    const root = createRoot(rootElement)
    root.render(<RouterProvider router={router} />)
    console.log('✅ TanStack Router app rendered successfully')
  } catch (error) {
    console.error('❌ Error rendering TanStack Router app:', error)
    rootElement.innerHTML = `
      <div class="min-h-screen flex items-center justify-center" style="background: #fef2f2;">
        <div class="max-w-md p-6 bg-red-100 border border-red-200 rounded-lg" style="border: 1px solid #fca5a5;">
          <h2 class="text-xl font-semibold text-red-800 mb-3" style="color: #991b1b;">❌ Router Error</h2>
          <p class="text-red-700 mb-3" style="color: #7f1d1d;">Failed to mount TanStack Router</p>
          <div class="text-sm text-red-600" style="color: #b91c1c;">
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