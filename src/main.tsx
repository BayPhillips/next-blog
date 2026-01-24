import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Add error handling
function renderApp() {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    console.error('Root element not found')
    return
  }
  
  try {
    const root = createRoot(rootElement)
    root.render(<App />)
    console.log('App rendered successfully')
  } catch (error) {
    console.error('Error rendering app:', error)
    rootElement.innerHTML = '<div>Error loading app. Check console for details.</div>'
  }
}

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp)
} else {
  renderApp()
}