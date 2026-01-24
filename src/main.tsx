import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { postsIndexRoute } from './routes/posts.index'
import { postRoute } from './routes/posts.$slug'
import { aboutRoute } from './routes/about.index'
import { tagsRoute } from './routes/tags.$tag'

// Create simplified route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  postsIndexRoute,
  postRoute,
  aboutRoute,
  tagsRoute,
])

// Create router
const router = createRouter({ routeTree })

// Error handling for router mounting
function renderApp() {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    console.error('Root element not found')
    return
  }
  
  try {
    const root = createRoot(rootElement)
    root.render(<RouterProvider router={router} />)
    console.log('✅ TanStack Router mounted successfully')
  } catch (error) {
    console.error('❌ Error mounting router:', error)
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #fef2f2;">
        <div style="max-width: 400px; padding: 24px; background: #fca5a5; border: 1px solid #ef4444; border-radius: 8px;">
          <h2 style="color: #991b1b; margin-bottom: 12px;">❌ Router Error</h2>
          <p style="color: #7f1d1d; margin-bottom: 8px;">Failed to mount TanStack Router</p>
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