import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Render app
const rootElement = document.getElementById('root')
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(<App />)
}