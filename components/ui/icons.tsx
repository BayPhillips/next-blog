"use client"

import { type LucideProps } from "lucide-react"
import dynamic from "next/dynamic"
import { 
  Eye, 
  ChevronDown, 
  CalendarDays,
  Clock,
  ArrowRight,
  Menu,
  type LucideIcon
} from "lucide-react"

// Individual icon components
export const EyeIcon = (props: LucideProps) => <Eye {...props} />
EyeIcon.displayName = 'EyeIcon'

// "BP" monogram: a B with a P set lower and to the right, drawn as strokes
// in currentColor so it follows the theme's text color in light and dark mode.
// Matches Lucide's 24px grid, 2px stroke and round caps so it sits with the
// other icons.
export const LogoIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M5 3v15" />
    <path d="M5 3h5a3.5 3.5 0 0 1 0 7H5" />
    <path d="M5 10h6a4 4 0 0 1 0 8H5" />
    <path d="M12 7v14" />
    <path d="M12 7h4.5a3.75 3.75 0 0 1 0 7.5H12" />
  </svg>
)
LogoIcon.displayName = 'LogoIcon'

export const ChevronDownIcon = (props: LucideProps) => <ChevronDown {...props} />
ChevronDownIcon.displayName = 'ChevronDownIcon'

export const CalendarIcon = (props: LucideProps) => <CalendarDays {...props} />
CalendarIcon.displayName = 'CalendarIcon'

export const ClockIcon = (props: LucideProps) => <Clock {...props} />
ClockIcon.displayName = 'ClockIcon'

export const ArrowRightIcon = (props: LucideProps) => <ArrowRight {...props} />
ArrowRightIcon.displayName = 'ArrowRightIcon'

export const MenuIcon = (props: LucideProps) => <Menu {...props} />
MenuIcon.displayName = 'MenuIcon'

// Icon mapping
export const Icons = {
  eye: EyeIcon,
  logo: LogoIcon,
  chevronDown: ChevronDownIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  arrowRight: ArrowRightIcon,
  menu: MenuIcon
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
