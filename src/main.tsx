import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { blogLayoutRoute } from './routes/($blog)'
import { postsIndexRoute } from './routes/($blog)/posts/index'
import { aboutRoute } from './routes/($blog)/about/index'

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  blogLayoutRoute.addChildren([
    postsIndexRoute,
    aboutRoute,
  ]),
])

// Create the router
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
    console.log('TanStack Router mounted successfully')
  } catch (error) {
    console.error('Error mounting router:', error)
    rootElement.innerHTML = '<div>Error loading app. Check console for details.</div>'
  }
}

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp)
} else {
  renderApp()
}