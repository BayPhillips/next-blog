import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

export const Route = createFileRoute('/api/draft')({
  component: DraftRoute,
})

const draftServerFn = createServerFn('draft', () => {
  return { success: true }
})

function DraftRoute() {
  return (
    <div>
      <h1>Draft API Route</h1>
      <button onClick={() => draftServerFn()}>
        Test Server Function
      </button>
    </div>
  )
}