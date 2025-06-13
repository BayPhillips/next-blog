import { Button } from "@/components/ui/button"

export default function TestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-4xl font-bold">shadcn/ui Test Page</h1>
      
      <div className="space-y-4">
        <div className="space-x-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        
        <div className="space-x-4">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">Icon</Button>
        </div>
      </div>
    </div>
  )
}
