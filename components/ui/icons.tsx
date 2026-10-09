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

// Pixel-art portrait of Bay on a 24px grid, one <rect> per run of same-colored
// pixels. Skin, hair and features keep fixed colors; the outline is
// currentColor so it follows the header's text color: dark in light mode, and
// light in dark mode, where it keeps the dark hair from vanishing into the
// background. crispEdges keeps the pixels sharp at any size.
export const LogoIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <rect x="9" y="1" width="6" height="1" fill="currentColor" />
    <rect x="7" y="2" width="2" height="1" fill="currentColor" />
    <rect x="9" y="2" width="6" height="1" fill="#3b2a20" />
    <rect x="15" y="2" width="2" height="1" fill="currentColor" />
    <rect x="6" y="3" width="1" height="1" fill="currentColor" />
    <rect x="7" y="3" width="2" height="1" fill="#3b2a20" />
    <rect x="9" y="3" width="1" height="1" fill="#5c4434" />
    <rect x="10" y="3" width="4" height="1" fill="#3b2a20" />
    <rect x="14" y="3" width="1" height="1" fill="#5c4434" />
    <rect x="15" y="3" width="2" height="1" fill="#3b2a20" />
    <rect x="17" y="3" width="1" height="1" fill="currentColor" />
    <rect x="5" y="4" width="1" height="1" fill="currentColor" />
    <rect x="6" y="4" width="5" height="1" fill="#3b2a20" />
    <rect x="11" y="4" width="2" height="1" fill="#5c4434" />
    <rect x="13" y="4" width="5" height="1" fill="#3b2a20" />
    <rect x="18" y="4" width="1" height="1" fill="currentColor" />
    <rect x="5" y="5" width="1" height="1" fill="currentColor" />
    <rect x="6" y="5" width="2" height="1" fill="#3b2a20" />
    <rect x="8" y="5" width="1" height="1" fill="#5c4434" />
    <rect x="9" y="5" width="6" height="1" fill="#3b2a20" />
    <rect x="15" y="5" width="1" height="1" fill="#5c4434" />
    <rect x="16" y="5" width="2" height="1" fill="#3b2a20" />
    <rect x="18" y="5" width="1" height="1" fill="currentColor" />
    <rect x="5" y="6" width="1" height="1" fill="currentColor" />
    <rect x="6" y="6" width="2" height="1" fill="#3b2a20" />
    <rect x="8" y="6" width="1" height="1" fill="#e8b496" />
    <rect x="9" y="6" width="6" height="1" fill="#3b2a20" />
    <rect x="15" y="6" width="1" height="1" fill="#e8b496" />
    <rect x="16" y="6" width="2" height="1" fill="#3b2a20" />
    <rect x="18" y="6" width="1" height="1" fill="currentColor" />
    <rect x="5" y="7" width="1" height="1" fill="currentColor" />
    <rect x="6" y="7" width="1" height="1" fill="#3b2a20" />
    <rect x="7" y="7" width="10" height="1" fill="#e8b496" />
    <rect x="17" y="7" width="1" height="1" fill="#3b2a20" />
    <rect x="18" y="7" width="1" height="1" fill="currentColor" />
    <rect x="5" y="8" width="1" height="1" fill="currentColor" />
    <rect x="6" y="8" width="12" height="1" fill="#e8b496" />
    <rect x="18" y="8" width="1" height="1" fill="currentColor" />
    <rect x="5" y="9" width="1" height="1" fill="currentColor" />
    <rect x="6" y="9" width="1" height="1" fill="#e8b496" />
    <rect x="7" y="9" width="3" height="1" fill="#8a6a58" />
    <rect x="10" y="9" width="4" height="1" fill="#e8b496" />
    <rect x="14" y="9" width="3" height="1" fill="#8a6a58" />
    <rect x="17" y="9" width="1" height="1" fill="#e8b496" />
    <rect x="18" y="9" width="1" height="1" fill="currentColor" />
    <rect x="3" y="10" width="2" height="1" fill="currentColor" />
    <rect x="5" y="10" width="1" height="1" fill="#d39a7c" />
    <rect x="6" y="10" width="12" height="1" fill="#e8b496" />
    <rect x="18" y="10" width="1" height="1" fill="#d39a7c" />
    <rect x="19" y="10" width="2" height="1" fill="currentColor" />
    <rect x="3" y="11" width="1" height="1" fill="currentColor" />
    <rect x="4" y="11" width="1" height="1" fill="#b97a5f" />
    <rect x="5" y="11" width="1" height="1" fill="#d39a7c" />
    <rect x="6" y="11" width="2" height="1" fill="#e8b496" />
    <rect x="8" y="11" width="2" height="1" fill="#2b1d17" />
    <rect x="10" y="11" width="4" height="1" fill="#e8b496" />
    <rect x="14" y="11" width="2" height="1" fill="#2b1d17" />
    <rect x="16" y="11" width="2" height="1" fill="#e8b496" />
    <rect x="18" y="11" width="1" height="1" fill="#d39a7c" />
    <rect x="19" y="11" width="1" height="1" fill="#b97a5f" />
    <rect x="20" y="11" width="1" height="1" fill="currentColor" />
    <rect x="3" y="12" width="1" height="1" fill="currentColor" />
    <rect x="4" y="12" width="1" height="1" fill="#b97a5f" />
    <rect x="5" y="12" width="1" height="1" fill="#d39a7c" />
    <rect x="6" y="12" width="1" height="1" fill="#e8b496" />
    <rect x="7" y="12" width="1" height="1" fill="#b97a5f" />
    <rect x="8" y="12" width="8" height="1" fill="#e8b496" />
    <rect x="16" y="12" width="1" height="1" fill="#b97a5f" />
    <rect x="17" y="12" width="1" height="1" fill="#e8b496" />
    <rect x="18" y="12" width="1" height="1" fill="#d39a7c" />
    <rect x="19" y="12" width="1" height="1" fill="#b97a5f" />
    <rect x="20" y="12" width="1" height="1" fill="currentColor" />
    <rect x="3" y="13" width="1" height="1" fill="currentColor" />
    <rect x="4" y="13" width="1" height="1" fill="#b97a5f" />
    <rect x="5" y="13" width="1" height="1" fill="#d39a7c" />
    <rect x="6" y="13" width="6" height="1" fill="#e8b496" />
    <rect x="12" y="13" width="1" height="1" fill="#b97a5f" />
    <rect x="13" y="13" width="5" height="1" fill="#e8b496" />
    <rect x="18" y="13" width="1" height="1" fill="#d39a7c" />
    <rect x="19" y="13" width="1" height="1" fill="#b97a5f" />
    <rect x="20" y="13" width="1" height="1" fill="currentColor" />
    <rect x="4" y="14" width="1" height="1" fill="currentColor" />
    <rect x="5" y="14" width="1" height="1" fill="#d39a7c" />
    <rect x="6" y="14" width="5" height="1" fill="#e8b496" />
    <rect x="11" y="14" width="2" height="1" fill="#b97a5f" />
    <rect x="13" y="14" width="5" height="1" fill="#e8b496" />
    <rect x="18" y="14" width="1" height="1" fill="#d39a7c" />
    <rect x="19" y="14" width="1" height="1" fill="currentColor" />
    <rect x="5" y="15" width="1" height="1" fill="currentColor" />
    <rect x="6" y="15" width="1" height="1" fill="#d39a7c" />
    <rect x="7" y="15" width="10" height="1" fill="#6e2b25" />
    <rect x="17" y="15" width="1" height="1" fill="#d39a7c" />
    <rect x="18" y="15" width="1" height="1" fill="currentColor" />
    <rect x="5" y="16" width="1" height="1" fill="currentColor" />
    <rect x="6" y="16" width="1" height="1" fill="#6e2b25" />
    <rect x="7" y="16" width="10" height="1" fill="#fbf6f0" />
    <rect x="17" y="16" width="1" height="1" fill="#6e2b25" />
    <rect x="18" y="16" width="1" height="1" fill="currentColor" />
    <rect x="5" y="17" width="1" height="1" fill="currentColor" />
    <rect x="6" y="17" width="1" height="1" fill="#d39a7c" />
    <rect x="7" y="17" width="1" height="1" fill="#e8b496" />
    <rect x="8" y="17" width="1" height="1" fill="#6e2b25" />
    <rect x="9" y="17" width="6" height="1" fill="#fbf6f0" />
    <rect x="15" y="17" width="1" height="1" fill="#6e2b25" />
    <rect x="16" y="17" width="1" height="1" fill="#e8b496" />
    <rect x="17" y="17" width="1" height="1" fill="#d39a7c" />
    <rect x="18" y="17" width="1" height="1" fill="currentColor" />
    <rect x="5" y="18" width="1" height="1" fill="currentColor" />
    <rect x="6" y="18" width="1" height="1" fill="#d39a7c" />
    <rect x="7" y="18" width="2" height="1" fill="#e8b496" />
    <rect x="9" y="18" width="6" height="1" fill="#c7766a" />
    <rect x="15" y="18" width="2" height="1" fill="#e8b496" />
    <rect x="17" y="18" width="1" height="1" fill="#d39a7c" />
    <rect x="18" y="18" width="1" height="1" fill="currentColor" />
    <rect x="5" y="19" width="1" height="1" fill="currentColor" />
    <rect x="6" y="19" width="2" height="1" fill="#d39a7c" />
    <rect x="8" y="19" width="8" height="1" fill="#e8b496" />
    <rect x="16" y="19" width="2" height="1" fill="#d39a7c" />
    <rect x="18" y="19" width="1" height="1" fill="currentColor" />
    <rect x="6" y="20" width="1" height="1" fill="currentColor" />
    <rect x="7" y="20" width="2" height="1" fill="#d39a7c" />
    <rect x="9" y="20" width="6" height="1" fill="#e8b496" />
    <rect x="15" y="20" width="2" height="1" fill="#d39a7c" />
    <rect x="17" y="20" width="1" height="1" fill="currentColor" />
    <rect x="7" y="21" width="1" height="1" fill="currentColor" />
    <rect x="8" y="21" width="3" height="1" fill="#d39a7c" />
    <rect x="11" y="21" width="2" height="1" fill="#e8b496" />
    <rect x="13" y="21" width="3" height="1" fill="#d39a7c" />
    <rect x="16" y="21" width="1" height="1" fill="currentColor" />
    <rect x="8" y="22" width="8" height="1" fill="currentColor" />
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
