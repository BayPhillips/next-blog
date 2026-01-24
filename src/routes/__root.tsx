import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../globals.css'
import '../lib/fonts.css'

export const rootRoute = createRootRoute({
  component: () => (
    <html lang="en" className="min-h-screen font-sans antialiased">
      <body className="min-h-screen bg-background">
        <div className="relative flex min-h-screen flex-col">
          <Outlet />
        </div>
      </body>
    </html>
  ),
})