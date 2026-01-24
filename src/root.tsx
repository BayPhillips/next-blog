import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../globals.css'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Outlet />
      </body>
    </html>
  )
}