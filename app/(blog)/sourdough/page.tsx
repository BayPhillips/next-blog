import type { Metadata } from "next"
import SourdoughCalculator from "@/components/sourdough-calculator"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = {
  title: "Sourdough Calculator",
  description: "Calculate sourdough bread recipes using baker's percentages. Input your flour amount and ingredient ratios to get precise measurements.",
}

export default function SourdoughPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <PageHeader 
        title="Sourdough Calculator" 
        description="Create custom sourdough bread recipes using baker's percentages. Enter your flour amount and adjust ingredient ratios to calculate precise measurements."
        className="mb-8"
      />
      
      <SourdoughCalculator />
    </article>
  )
}
