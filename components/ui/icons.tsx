"use client"

import { type LucideProps } from "lucide-react"
import dynamic from "next/dynamic"
import { 
  Eye, 
  ChevronDown, 
  CalendarDays,
  Clock,
  ArrowRight,
  Sparkles,
  type LucideIcon
} from "lucide-react"

// Individual icon components
export const EyeIcon = (props: LucideProps) => <Eye {...props} />
EyeIcon.displayName = 'EyeIcon'

export const LogoIcon = (props: LucideProps) => <Sparkles {...props} />
LogoIcon.displayName = 'LogoIcon'

export const ChevronDownIcon = (props: LucideProps) => <ChevronDown {...props} />
ChevronDownIcon.displayName = 'ChevronDownIcon'

export const CalendarIcon = (props: LucideProps) => <CalendarDays {...props} />
CalendarIcon.displayName = 'CalendarIcon'

export const ClockIcon = (props: LucideProps) => <Clock {...props} />
ClockIcon.displayName = 'ClockIcon'

export const ArrowRightIcon = (props: LucideProps) => <ArrowRight {...props} />
ArrowRightIcon.displayName = 'ArrowRightIcon'

// Icon mapping
export const Icons = {
  eye: EyeIcon,
  logo: LogoIcon,
  chevronDown: ChevronDownIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  arrowRight: ArrowRightIcon,
}

// Client component for dynamic icon loading
export const DynamicIcon = dynamic(
  async () => {
    const mod = await import("lucide-react")
    return function DynamicIcon({
      name,
      ...props
    }: { name: keyof typeof mod } & LucideProps) {
      const Icon = mod[name] as React.ComponentType<LucideProps>
      return <Icon {...props} />
    }
  },
  {
    ssr: false,
    loading: () => <span className="inline-block h-6 w-6" />
  }
)
