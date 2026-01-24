import { createFileRoute } from '@tanstack/react-router'

export const indexRoute = createFileRoute('/')({
  component: HomeRoute,
})

function HomeRoute() {
  return (
    <div>
      <h1>Welcome to TanStack Start</h1>
      <p>Migration from Next.js in progress...</p>
    </div>
  )
}