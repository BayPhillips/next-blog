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

// Pixel-art head of Bay, taken from his character sprite and snapped back to
// its 32x39 pixel grid: one <rect> per run of same-colored pixels.
// The sprite's dark outline reads on light backgrounds and its cream sticker
// border reads on dark ones, so it needs no theme-specific colors.
// crispEdges keeps the pixels sharp.
export const LogoIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 39"
    shapeRendering="crispEdges"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <rect x="10" y="0" width="10" height="1" fill="#e7d1b4" />
    <rect x="9" y="1" width="11" height="1" fill="#290a04" />
    <rect x="20" y="1" width="2" height="1" fill="#e7d1b4" />
    <rect x="5" y="2" width="2" height="1" fill="#e7d1b4" />
    <rect x="7" y="2" width="2" height="1" fill="#290a04" />
    <rect x="9" y="2" width="7" height="1" fill="#592b1a" />
    <rect x="16" y="2" width="2" height="1" fill="#6e3a22" />
    <rect x="18" y="2" width="1" height="1" fill="#834a2d" />
    <rect x="19" y="2" width="1" height="1" fill="#6e3a22" />
    <rect x="20" y="2" width="1" height="1" fill="#290a04" />
    <rect x="21" y="2" width="1" height="1" fill="#390d06" />
    <rect x="22" y="2" width="1" height="1" fill="#290a04" />
    <rect x="5" y="3" width="2" height="1" fill="#290a04" />
    <rect x="7" y="3" width="1" height="1" fill="#6e3a22" />
    <rect x="8" y="3" width="1" height="1" fill="#592b1a" />
    <rect x="9" y="3" width="2" height="1" fill="#834a2d" />
    <rect x="11" y="3" width="5" height="1" fill="#ae6850" />
    <rect x="16" y="3" width="1" height="1" fill="#834a2d" />
    <rect x="17" y="3" width="1" height="1" fill="#6e3a22" />
    <rect x="18" y="3" width="2" height="1" fill="#834a2d" />
    <rect x="20" y="3" width="1" height="1" fill="#6e3a22" />
    <rect x="21" y="3" width="1" height="1" fill="#834a2d" />
    <rect x="22" y="3" width="1" height="1" fill="#6e3a22" />
    <rect x="23" y="3" width="2" height="1" fill="#290a04" />
    <rect x="4" y="4" width="1" height="1" fill="#290a04" />
    <rect x="5" y="4" width="3" height="1" fill="#592b1a" />
    <rect x="8" y="4" width="2" height="1" fill="#6e3a22" />
    <rect x="10" y="4" width="8" height="1" fill="#834a2d" />
    <rect x="18" y="4" width="1" height="1" fill="#6e3a22" />
    <rect x="19" y="4" width="1" height="1" fill="#834a2d" />
    <rect x="20" y="4" width="2" height="1" fill="#592b1a" />
    <rect x="22" y="4" width="1" height="1" fill="#834a2d" />
    <rect x="23" y="4" width="2" height="1" fill="#592b1a" />
    <rect x="25" y="4" width="1" height="1" fill="#290a04" />
    <rect x="2" y="5" width="1" height="1" fill="#e7d1b4" />
    <rect x="3" y="5" width="1" height="1" fill="#290a04" />
    <rect x="4" y="5" width="1" height="1" fill="#592b1a" />
    <rect x="5" y="5" width="1" height="1" fill="#6e3a22" />
    <rect x="6" y="5" width="3" height="1" fill="#834a2d" />
    <rect x="9" y="5" width="1" height="1" fill="#6e3a22" />
    <rect x="10" y="5" width="1" height="1" fill="#4f1306" />
    <rect x="11" y="5" width="1" height="1" fill="#471e0f" />
    <rect x="12" y="5" width="1" height="1" fill="#6e3a22" />
    <rect x="13" y="5" width="2" height="1" fill="#834a2d" />
    <rect x="15" y="5" width="6" height="1" fill="#6e3a22" />
    <rect x="21" y="5" width="1" height="1" fill="#4f1306" />
    <rect x="22" y="5" width="1" height="1" fill="#471e0f" />
    <rect x="23" y="5" width="1" height="1" fill="#6e3a22" />
    <rect x="24" y="5" width="1" height="1" fill="#471e0f" />
    <rect x="25" y="5" width="1" height="1" fill="#592b1a" />
    <rect x="26" y="5" width="1" height="1" fill="#290a04" />
    <rect x="2" y="6" width="1" height="1" fill="#290a04" />
    <rect x="3" y="6" width="4" height="1" fill="#471e0f" />
    <rect x="7" y="6" width="1" height="1" fill="#4f1306" />
    <rect x="8" y="6" width="2" height="1" fill="#834a2d" />
    <rect x="10" y="6" width="2" height="1" fill="#6e3a22" />
    <rect x="12" y="6" width="2" height="1" fill="#390d06" />
    <rect x="14" y="6" width="1" height="1" fill="#834a2d" />
    <rect x="15" y="6" width="1" height="1" fill="#6e3a22" />
    <rect x="16" y="6" width="3" height="1" fill="#592b1a" />
    <rect x="19" y="6" width="1" height="1" fill="#471e0f" />
    <rect x="20" y="6" width="2" height="1" fill="#6e3a22" />
    <rect x="22" y="6" width="1" height="1" fill="#390d06" />
    <rect x="23" y="6" width="2" height="1" fill="#6e3a22" />
    <rect x="25" y="6" width="2" height="1" fill="#471e0f" />
    <rect x="27" y="6" width="1" height="1" fill="#290a04" />
    <rect x="1" y="7" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="7" width="1" height="1" fill="#290a04" />
    <rect x="3" y="7" width="1" height="1" fill="#471e0f" />
    <rect x="4" y="7" width="1" height="1" fill="#592b1a" />
    <rect x="5" y="7" width="1" height="1" fill="#6e3a22" />
    <rect x="6" y="7" width="1" height="1" fill="#834a2d" />
    <rect x="7" y="7" width="1" height="1" fill="#471e0f" />
    <rect x="8" y="7" width="2" height="1" fill="#390d06" />
    <rect x="10" y="7" width="3" height="1" fill="#6e3a22" />
    <rect x="13" y="7" width="1" height="1" fill="#471e0f" />
    <rect x="14" y="7" width="1" height="1" fill="#390d06" />
    <rect x="15" y="7" width="1" height="1" fill="#6e3a22" />
    <rect x="16" y="7" width="1" height="1" fill="#592b1a" />
    <rect x="17" y="7" width="1" height="1" fill="#6e3a22" />
    <rect x="18" y="7" width="1" height="1" fill="#471e0f" />
    <rect x="19" y="7" width="1" height="1" fill="#592b1a" />
    <rect x="20" y="7" width="1" height="1" fill="#471e0f" />
    <rect x="21" y="7" width="1" height="1" fill="#6e3a22" />
    <rect x="22" y="7" width="1" height="1" fill="#592b1a" />
    <rect x="23" y="7" width="1" height="1" fill="#390d06" />
    <rect x="24" y="7" width="1" height="1" fill="#592b1a" />
    <rect x="25" y="7" width="2" height="1" fill="#471e0f" />
    <rect x="27" y="7" width="1" height="1" fill="#290a04" />
    <rect x="28" y="7" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="8" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="8" width="1" height="1" fill="#290a04" />
    <rect x="3" y="8" width="1" height="1" fill="#592b1a" />
    <rect x="4" y="8" width="1" height="1" fill="#390d06" />
    <rect x="5" y="8" width="1" height="1" fill="#471e0f" />
    <rect x="6" y="8" width="2" height="1" fill="#834a2d" />
    <rect x="8" y="8" width="1" height="1" fill="#592b1a" />
    <rect x="9" y="8" width="1" height="1" fill="#471e0f" />
    <rect x="10" y="8" width="1" height="1" fill="#390d06" />
    <rect x="11" y="8" width="2" height="1" fill="#592b1a" />
    <rect x="13" y="8" width="2" height="1" fill="#471e0f" />
    <rect x="15" y="8" width="1" height="1" fill="#290a04" />
    <rect x="16" y="8" width="2" height="1" fill="#471e0f" />
    <rect x="18" y="8" width="1" height="1" fill="#592b1a" />
    <rect x="19" y="8" width="1" height="1" fill="#471e0f" />
    <rect x="20" y="8" width="1" height="1" fill="#592b1a" />
    <rect x="21" y="8" width="1" height="1" fill="#390d06" />
    <rect x="22" y="8" width="1" height="1" fill="#592b1a" />
    <rect x="23" y="8" width="1" height="1" fill="#290a04" />
    <rect x="24" y="8" width="1" height="1" fill="#471e0f" />
    <rect x="25" y="8" width="2" height="1" fill="#390d06" />
    <rect x="27" y="8" width="1" height="1" fill="#592b1a" />
    <rect x="28" y="8" width="1" height="1" fill="#290a04" />
    <rect x="29" y="8" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="9" width="1" height="1" fill="#390d06" />
    <rect x="2" y="9" width="1" height="1" fill="#471e0f" />
    <rect x="3" y="9" width="1" height="1" fill="#390d06" />
    <rect x="4" y="9" width="1" height="1" fill="#592b1a" />
    <rect x="5" y="9" width="1" height="1" fill="#290a04" />
    <rect x="6" y="9" width="2" height="1" fill="#390d06" />
    <rect x="8" y="9" width="3" height="1" fill="#6e3a22" />
    <rect x="11" y="9" width="1" height="1" fill="#390d06" />
    <rect x="12" y="9" width="1" height="1" fill="#471e0f" />
    <rect x="13" y="9" width="1" height="1" fill="#6e3a22" />
    <rect x="14" y="9" width="1" height="1" fill="#592b1a" />
    <rect x="15" y="9" width="1" height="1" fill="#471e0f" />
    <rect x="16" y="9" width="4" height="1" fill="#290a04" />
    <rect x="20" y="9" width="1" height="1" fill="#592b1a" />
    <rect x="21" y="9" width="5" height="1" fill="#390d06" />
    <rect x="26" y="9" width="1" height="1" fill="#592b1a" />
    <rect x="27" y="9" width="2" height="1" fill="#6e3a22" />
    <rect x="29" y="9" width="1" height="1" fill="#390d06" />
    <rect x="30" y="9" width="1" height="1" fill="#e7d1b4" />
    <rect x="0" y="10" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="10" width="1" height="1" fill="#290a04" />
    <rect x="2" y="10" width="1" height="1" fill="#471e0f" />
    <rect x="3" y="10" width="1" height="1" fill="#592b1a" />
    <rect x="4" y="10" width="1" height="1" fill="#290a04" />
    <rect x="5" y="10" width="2" height="1" fill="#ae6850" />
    <rect x="7" y="10" width="8" height="1" fill="#290a04" />
    <rect x="15" y="10" width="1" height="1" fill="#390d06" />
    <rect x="16" y="10" width="1" height="1" fill="#c88770" />
    <rect x="17" y="10" width="2" height="1" fill="#ef8f76" />
    <rect x="19" y="10" width="1" height="1" fill="#c88770" />
    <rect x="20" y="10" width="4" height="1" fill="#390d06" />
    <rect x="24" y="10" width="1" height="1" fill="#592b1a" />
    <rect x="25" y="10" width="2" height="1" fill="#6e3a22" />
    <rect x="27" y="10" width="1" height="1" fill="#834a2d" />
    <rect x="28" y="10" width="1" height="1" fill="#6e3a22" />
    <rect x="29" y="10" width="1" height="1" fill="#390d06" />
    <rect x="30" y="10" width="1" height="1" fill="#e7d1b4" />
    <rect x="0" y="11" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="11" width="1" height="1" fill="#290a04" />
    <rect x="2" y="11" width="1" height="1" fill="#592b1a" />
    <rect x="3" y="11" width="1" height="1" fill="#290a04" />
    <rect x="4" y="11" width="1" height="1" fill="#c88770" />
    <rect x="5" y="11" width="14" height="1" fill="#ef8f76" />
    <rect x="19" y="11" width="1" height="1" fill="#e36554" />
    <rect x="20" y="11" width="1" height="1" fill="#c88770" />
    <rect x="21" y="11" width="2" height="1" fill="#390d06" />
    <rect x="23" y="11" width="1" height="1" fill="#592b1a" />
    <rect x="24" y="11" width="1" height="1" fill="#834a2d" />
    <rect x="25" y="11" width="1" height="1" fill="#6e3a22" />
    <rect x="26" y="11" width="2" height="1" fill="#834a2d" />
    <rect x="28" y="11" width="1" height="1" fill="#6e3a22" />
    <rect x="29" y="11" width="1" height="1" fill="#471e0f" />
    <rect x="30" y="11" width="1" height="1" fill="#290a04" />
    <rect x="31" y="11" width="1" height="1" fill="#e7d1b4" />
    <rect x="0" y="12" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="12" width="1" height="1" fill="#290a04" />
    <rect x="2" y="12" width="1" height="1" fill="#592b1a" />
    <rect x="3" y="12" width="1" height="1" fill="#290a04" />
    <rect x="4" y="12" width="2" height="1" fill="#ef8f76" />
    <rect x="6" y="12" width="14" height="1" fill="#fdab88" />
    <rect x="20" y="12" width="2" height="1" fill="#ef8f76" />
    <rect x="22" y="12" width="1" height="1" fill="#390d06" />
    <rect x="23" y="12" width="1" height="1" fill="#592b1a" />
    <rect x="24" y="12" width="3" height="1" fill="#834a2d" />
    <rect x="27" y="12" width="1" height="1" fill="#6e3a22" />
    <rect x="28" y="12" width="2" height="1" fill="#592b1a" />
    <rect x="30" y="12" width="1" height="1" fill="#290a04" />
    <rect x="31" y="12" width="1" height="1" fill="#e7d1b4" />
    <rect x="0" y="13" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="13" width="1" height="1" fill="#390d06" />
    <rect x="2" y="13" width="1" height="1" fill="#592b1a" />
    <rect x="3" y="13" width="1" height="1" fill="#290a04" />
    <rect x="4" y="13" width="1" height="1" fill="#ef8f76" />
    <rect x="5" y="13" width="16" height="1" fill="#fdab88" />
    <rect x="21" y="13" width="1" height="1" fill="#ef8f76" />
    <rect x="22" y="13" width="1" height="1" fill="#390d06" />
    <rect x="23" y="13" width="1" height="1" fill="#834a2d" />
    <rect x="24" y="13" width="1" height="1" fill="#471e0f" />
    <rect x="25" y="13" width="1" height="1" fill="#6e3a22" />
    <rect x="26" y="13" width="4" height="1" fill="#592b1a" />
    <rect x="30" y="13" width="1" height="1" fill="#290a04" />
    <rect x="31" y="13" width="1" height="1" fill="#e7d1b4" />
    <rect x="0" y="14" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="14" width="2" height="1" fill="#290a04" />
    <rect x="3" y="14" width="1" height="1" fill="#c88770" />
    <rect x="4" y="14" width="17" height="1" fill="#fdab88" />
    <rect x="21" y="14" width="1" height="1" fill="#ef8f76" />
    <rect x="22" y="14" width="1" height="1" fill="#390d06" />
    <rect x="23" y="14" width="1" height="1" fill="#6e3a22" />
    <rect x="24" y="14" width="2" height="1" fill="#471e0f" />
    <rect x="26" y="14" width="1" height="1" fill="#592b1a" />
    <rect x="27" y="14" width="2" height="1" fill="#471e0f" />
    <rect x="29" y="14" width="1" height="1" fill="#592b1a" />
    <rect x="30" y="14" width="1" height="1" fill="#290a04" />
    <rect x="31" y="14" width="1" height="1" fill="#e7d1b4" />
    <rect x="0" y="15" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="15" width="2" height="1" fill="#290a04" />
    <rect x="3" y="15" width="1" height="1" fill="#ef8f76" />
    <rect x="4" y="15" width="17" height="1" fill="#fdab88" />
    <rect x="21" y="15" width="1" height="1" fill="#ef8f76" />
    <rect x="22" y="15" width="1" height="1" fill="#390d06" />
    <rect x="23" y="15" width="1" height="1" fill="#6e3a22" />
    <rect x="24" y="15" width="5" height="1" fill="#471e0f" />
    <rect x="29" y="15" width="1" height="1" fill="#592b1a" />
    <rect x="30" y="15" width="1" height="1" fill="#390d06" />
    <rect x="31" y="15" width="1" height="1" fill="#e7d1b4" />
    <rect x="0" y="16" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="16" width="1" height="1" fill="#290a04" />
    <rect x="2" y="16" width="1" height="1" fill="#390d06" />
    <rect x="3" y="16" width="1" height="1" fill="#ef8f76" />
    <rect x="4" y="16" width="17" height="1" fill="#fdab88" />
    <rect x="21" y="16" width="1" height="1" fill="#ef8f76" />
    <rect x="22" y="16" width="1" height="1" fill="#390d06" />
    <rect x="23" y="16" width="1" height="1" fill="#6e3a22" />
    <rect x="24" y="16" width="5" height="1" fill="#471e0f" />
    <rect x="29" y="16" width="1" height="1" fill="#592b1a" />
    <rect x="30" y="16" width="1" height="1" fill="#290a04" />
    <rect x="31" y="16" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="17" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="17" width="1" height="1" fill="#390d06" />
    <rect x="3" y="17" width="1" height="1" fill="#ef8f76" />
    <rect x="4" y="17" width="17" height="1" fill="#fdab88" />
    <rect x="21" y="17" width="1" height="1" fill="#ef8f76" />
    <rect x="22" y="17" width="1" height="1" fill="#390d06" />
    <rect x="23" y="17" width="2" height="1" fill="#592b1a" />
    <rect x="25" y="17" width="5" height="1" fill="#471e0f" />
    <rect x="30" y="17" width="1" height="1" fill="#290a04" />
    <rect x="31" y="17" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="18" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="18" width="1" height="1" fill="#390d06" />
    <rect x="3" y="18" width="1" height="1" fill="#fdab88" />
    <rect x="4" y="18" width="1" height="1" fill="#b94634" />
    <rect x="5" y="18" width="3" height="1" fill="#834a2d" />
    <rect x="8" y="18" width="7" height="1" fill="#fdab88" />
    <rect x="15" y="18" width="1" height="1" fill="#834a2d" />
    <rect x="16" y="18" width="3" height="1" fill="#6e3a22" />
    <rect x="19" y="18" width="3" height="1" fill="#fdab88" />
    <rect x="22" y="18" width="1" height="1" fill="#ef8f76" />
    <rect x="23" y="18" width="1" height="1" fill="#4f1306" />
    <rect x="24" y="18" width="1" height="1" fill="#592b1a" />
    <rect x="25" y="18" width="4" height="1" fill="#471e0f" />
    <rect x="29" y="18" width="1" height="1" fill="#290a04" />
    <rect x="30" y="18" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="19" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="19" width="1" height="1" fill="#390d06" />
    <rect x="3" y="19" width="1" height="1" fill="#fdab88" />
    <rect x="4" y="19" width="2" height="1" fill="#4f1306" />
    <rect x="6" y="19" width="1" height="1" fill="#471e0f" />
    <rect x="7" y="19" width="1" height="1" fill="#4f1306" />
    <rect x="8" y="19" width="1" height="1" fill="#6e3a22" />
    <rect x="9" y="19" width="6" height="1" fill="#fdab88" />
    <rect x="15" y="19" width="1" height="1" fill="#4f1306" />
    <rect x="16" y="19" width="3" height="1" fill="#471e0f" />
    <rect x="19" y="19" width="2" height="1" fill="#592b1a" />
    <rect x="21" y="19" width="1" height="1" fill="#fdab88" />
    <rect x="22" y="19" width="1" height="1" fill="#ef8f76" />
    <rect x="23" y="19" width="1" height="1" fill="#390d06" />
    <rect x="24" y="19" width="2" height="1" fill="#471e0f" />
    <rect x="26" y="19" width="3" height="1" fill="#390d06" />
    <rect x="29" y="19" width="1" height="1" fill="#290a04" />
    <rect x="30" y="19" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="20" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="20" width="1" height="1" fill="#390d06" />
    <rect x="3" y="20" width="1" height="1" fill="#fdab88" />
    <rect x="4" y="20" width="1" height="1" fill="#ef8f76" />
    <rect x="5" y="20" width="14" height="1" fill="#fdab88" />
    <rect x="19" y="20" width="2" height="1" fill="#ef8f76" />
    <rect x="21" y="20" width="1" height="1" fill="#fdab88" />
    <rect x="22" y="20" width="1" height="1" fill="#ef8f76" />
    <rect x="23" y="20" width="1" height="1" fill="#e36554" />
    <rect x="24" y="20" width="3" height="1" fill="#390d06" />
    <rect x="27" y="20" width="1" height="1" fill="#fdab88" />
    <rect x="28" y="20" width="2" height="1" fill="#ef8f76" />
    <rect x="30" y="20" width="1" height="1" fill="#4f1306" />
    <rect x="1" y="21" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="21" width="1" height="1" fill="#290a04" />
    <rect x="3" y="21" width="1" height="1" fill="#fdab88" />
    <rect x="4" y="21" width="1" height="1" fill="#ef8f76" />
    <rect x="5" y="21" width="2" height="1" fill="#390d06" />
    <rect x="7" y="21" width="9" height="1" fill="#fdab88" />
    <rect x="16" y="21" width="2" height="1" fill="#390d06" />
    <rect x="18" y="21" width="4" height="1" fill="#fdab88" />
    <rect x="22" y="21" width="1" height="1" fill="#ef8f76" />
    <rect x="23" y="21" width="1" height="1" fill="#e36554" />
    <rect x="24" y="21" width="2" height="1" fill="#390d06" />
    <rect x="26" y="21" width="1" height="1" fill="#fdab88" />
    <rect x="27" y="21" width="2" height="1" fill="#b94634" />
    <rect x="29" y="21" width="1" height="1" fill="#fdab88" />
    <rect x="30" y="21" width="1" height="1" fill="#4f1306" />
    <rect x="31" y="21" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="22" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="22" width="1" height="1" fill="#390d06" />
    <rect x="3" y="22" width="2" height="1" fill="#fdab88" />
    <rect x="5" y="22" width="3" height="1" fill="#390d06" />
    <rect x="8" y="22" width="2" height="1" fill="#fdab88" />
    <rect x="10" y="22" width="1" height="1" fill="#e36554" />
    <rect x="11" y="22" width="4" height="1" fill="#fdab88" />
    <rect x="15" y="22" width="1" height="1" fill="#7f241b" />
    <rect x="16" y="22" width="3" height="1" fill="#390d06" />
    <rect x="19" y="22" width="4" height="1" fill="#fdab88" />
    <rect x="23" y="22" width="1" height="1" fill="#ef8f76" />
    <rect x="24" y="22" width="1" height="1" fill="#390d06" />
    <rect x="25" y="22" width="1" height="1" fill="#c88770" />
    <rect x="26" y="22" width="1" height="1" fill="#b94634" />
    <rect x="27" y="22" width="1" height="1" fill="#7f241b" />
    <rect x="28" y="22" width="1" height="1" fill="#e36554" />
    <rect x="29" y="22" width="1" height="1" fill="#fdab88" />
    <rect x="30" y="22" width="1" height="1" fill="#4f1306" />
    <rect x="31" y="22" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="23" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="23" width="1" height="1" fill="#390d06" />
    <rect x="3" y="23" width="2" height="1" fill="#fdab88" />
    <rect x="5" y="23" width="3" height="1" fill="#390d06" />
    <rect x="8" y="23" width="2" height="1" fill="#fdab88" />
    <rect x="10" y="23" width="1" height="1" fill="#e36554" />
    <rect x="11" y="23" width="4" height="1" fill="#fdab88" />
    <rect x="15" y="23" width="1" height="1" fill="#7f241b" />
    <rect x="16" y="23" width="2" height="1" fill="#290a04" />
    <rect x="18" y="23" width="1" height="1" fill="#390d06" />
    <rect x="19" y="23" width="4" height="1" fill="#fdab88" />
    <rect x="23" y="23" width="1" height="1" fill="#ef8f76" />
    <rect x="24" y="23" width="1" height="1" fill="#4f1306" />
    <rect x="25" y="23" width="1" height="1" fill="#ef8f76" />
    <rect x="26" y="23" width="1" height="1" fill="#7f241b" />
    <rect x="27" y="23" width="1" height="1" fill="#b94634" />
    <rect x="28" y="23" width="1" height="1" fill="#e36554" />
    <rect x="29" y="23" width="1" height="1" fill="#ef8f76" />
    <rect x="30" y="23" width="1" height="1" fill="#4f1306" />
    <rect x="31" y="23" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="24" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="24" width="1" height="1" fill="#390d06" />
    <rect x="3" y="24" width="2" height="1" fill="#fdab88" />
    <rect x="5" y="24" width="1" height="1" fill="#b94634" />
    <rect x="6" y="24" width="1" height="1" fill="#7f241b" />
    <rect x="7" y="24" width="1" height="1" fill="#592b1a" />
    <rect x="8" y="24" width="2" height="1" fill="#fdab88" />
    <rect x="10" y="24" width="1" height="1" fill="#e36554" />
    <rect x="11" y="24" width="4" height="1" fill="#fdab88" />
    <rect x="15" y="24" width="1" height="1" fill="#ef8f76" />
    <rect x="16" y="24" width="1" height="1" fill="#7f241b" />
    <rect x="17" y="24" width="1" height="1" fill="#592b1a" />
    <rect x="18" y="24" width="1" height="1" fill="#7f241b" />
    <rect x="19" y="24" width="4" height="1" fill="#fdab88" />
    <rect x="23" y="24" width="1" height="1" fill="#ef8f76" />
    <rect x="24" y="24" width="1" height="1" fill="#e36554" />
    <rect x="25" y="24" width="1" height="1" fill="#ef8f76" />
    <rect x="26" y="24" width="1" height="1" fill="#7f241b" />
    <rect x="27" y="24" width="1" height="1" fill="#b94634" />
    <rect x="28" y="24" width="1" height="1" fill="#e36554" />
    <rect x="29" y="24" width="1" height="1" fill="#ef8f76" />
    <rect x="30" y="24" width="1" height="1" fill="#4f1306" />
    <rect x="31" y="24" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="25" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="25" width="1" height="1" fill="#390d06" />
    <rect x="3" y="25" width="2" height="1" fill="#fdab88" />
    <rect x="5" y="25" width="1" height="1" fill="#ef8f76" />
    <rect x="6" y="25" width="2" height="1" fill="#c88770" />
    <rect x="8" y="25" width="1" height="1" fill="#fdab88" />
    <rect x="9" y="25" width="1" height="1" fill="#e36554" />
    <rect x="10" y="25" width="1" height="1" fill="#ef8f76" />
    <rect x="11" y="25" width="5" height="1" fill="#fdab88" />
    <rect x="16" y="25" width="3" height="1" fill="#c88770" />
    <rect x="19" y="25" width="4" height="1" fill="#fdab88" />
    <rect x="23" y="25" width="3" height="1" fill="#ef8f76" />
    <rect x="26" y="25" width="1" height="1" fill="#7f241b" />
    <rect x="27" y="25" width="1" height="1" fill="#b94634" />
    <rect x="28" y="25" width="1" height="1" fill="#ef8f76" />
    <rect x="29" y="25" width="1" height="1" fill="#4f1306" />
    <rect x="30" y="25" width="1" height="1" fill="#fdab88" />
    <rect x="31" y="25" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="26" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="26" width="1" height="1" fill="#390d06" />
    <rect x="3" y="26" width="4" height="1" fill="#e36554" />
    <rect x="7" y="26" width="2" height="1" fill="#fdab88" />
    <rect x="9" y="26" width="1" height="1" fill="#b94634" />
    <rect x="10" y="26" width="6" height="1" fill="#fdab88" />
    <rect x="16" y="26" width="5" height="1" fill="#e36554" />
    <rect x="21" y="26" width="2" height="1" fill="#fdab88" />
    <rect x="23" y="26" width="1" height="1" fill="#ef8f76" />
    <rect x="24" y="26" width="1" height="1" fill="#ae6850" />
    <rect x="25" y="26" width="1" height="1" fill="#ef8f76" />
    <rect x="26" y="26" width="1" height="1" fill="#e36554" />
    <rect x="27" y="26" width="2" height="1" fill="#ef8f76" />
    <rect x="29" y="26" width="1" height="1" fill="#4f1306" />
    <rect x="30" y="26" width="2" height="1" fill="#e7d1b4" />
    <rect x="1" y="27" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="27" width="1" height="1" fill="#390d06" />
    <rect x="3" y="27" width="3" height="1" fill="#e36554" />
    <rect x="6" y="27" width="1" height="1" fill="#ef8f76" />
    <rect x="7" y="27" width="2" height="1" fill="#fdab88" />
    <rect x="9" y="27" width="1" height="1" fill="#ef8f76" />
    <rect x="10" y="27" width="2" height="1" fill="#b94634" />
    <rect x="12" y="27" width="5" height="1" fill="#fdab88" />
    <rect x="17" y="27" width="4" height="1" fill="#e36554" />
    <rect x="21" y="27" width="2" height="1" fill="#fdab88" />
    <rect x="23" y="27" width="2" height="1" fill="#ae6850" />
    <rect x="25" y="27" width="1" height="1" fill="#fdab88" />
    <rect x="26" y="27" width="2" height="1" fill="#ef8f76" />
    <rect x="28" y="27" width="1" height="1" fill="#4f1306" />
    <rect x="29" y="27" width="1" height="1" fill="#e7d1b4" />
    <rect x="1" y="28" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="28" width="1" height="1" fill="#390d06" />
    <rect x="3" y="28" width="4" height="1" fill="#ef8f76" />
    <rect x="7" y="28" width="3" height="1" fill="#ae6850" />
    <rect x="10" y="28" width="1" height="1" fill="#b94634" />
    <rect x="11" y="28" width="6" height="1" fill="#ae6850" />
    <rect x="17" y="28" width="5" height="1" fill="#fdab88" />
    <rect x="22" y="28" width="1" height="1" fill="#c88770" />
    <rect x="23" y="28" width="1" height="1" fill="#ae6850" />
    <rect x="24" y="28" width="1" height="1" fill="#834a2d" />
    <rect x="25" y="28" width="3" height="1" fill="#4f1306" />
    <rect x="28" y="28" width="2" height="1" fill="#e7d1b4" />
    <rect x="1" y="29" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="29" width="1" height="1" fill="#390d06" />
    <rect x="3" y="29" width="1" height="1" fill="#c88770" />
    <rect x="4" y="29" width="2" height="1" fill="#fdab88" />
    <rect x="6" y="29" width="1" height="1" fill="#834a2d" />
    <rect x="7" y="29" width="9" height="1" fill="#ae6850" />
    <rect x="16" y="29" width="1" height="1" fill="#592b1a" />
    <rect x="17" y="29" width="1" height="1" fill="#ae6850" />
    <rect x="18" y="29" width="3" height="1" fill="#fdab88" />
    <rect x="21" y="29" width="2" height="1" fill="#c88770" />
    <rect x="23" y="29" width="1" height="1" fill="#ae6850" />
    <rect x="24" y="29" width="1" height="1" fill="#834a2d" />
    <rect x="25" y="29" width="1" height="1" fill="#390d06" />
    <rect x="26" y="29" width="2" height="1" fill="#e7d1b4" />
    <rect x="1" y="30" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="30" width="1" height="1" fill="#390d06" />
    <rect x="3" y="30" width="2" height="1" fill="#c88770" />
    <rect x="5" y="30" width="1" height="1" fill="#fdab88" />
    <rect x="6" y="30" width="1" height="1" fill="#c88770" />
    <rect x="7" y="30" width="1" height="1" fill="#592b1a" />
    <rect x="8" y="30" width="7" height="1" fill="#fbf7f0" />
    <rect x="15" y="30" width="1" height="1" fill="#592b1a" />
    <rect x="16" y="30" width="1" height="1" fill="#c88770" />
    <rect x="17" y="30" width="1" height="1" fill="#ae6850" />
    <rect x="18" y="30" width="2" height="1" fill="#fdab88" />
    <rect x="20" y="30" width="2" height="1" fill="#c88770" />
    <rect x="22" y="30" width="2" height="1" fill="#ae6850" />
    <rect x="24" y="30" width="1" height="1" fill="#4f1306" />
    <rect x="25" y="30" width="1" height="1" fill="#c88770" />
    <rect x="26" y="30" width="2" height="1" fill="#e7d1b4" />
    <rect x="2" y="31" width="1" height="1" fill="#e7d1b4" />
    <rect x="3" y="31" width="1" height="1" fill="#4f1306" />
    <rect x="4" y="31" width="2" height="1" fill="#c88770" />
    <rect x="6" y="31" width="2" height="1" fill="#fdab88" />
    <rect x="8" y="31" width="1" height="1" fill="#ae6850" />
    <rect x="9" y="31" width="5" height="1" fill="#fbf7f0" />
    <rect x="14" y="31" width="2" height="1" fill="#c88770" />
    <rect x="16" y="31" width="3" height="1" fill="#fdab88" />
    <rect x="19" y="31" width="1" height="1" fill="#ef8f76" />
    <rect x="20" y="31" width="2" height="1" fill="#c88770" />
    <rect x="22" y="31" width="2" height="1" fill="#ae6850" />
    <rect x="24" y="31" width="1" height="1" fill="#390d06" />
    <rect x="25" y="31" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="32" width="1" height="1" fill="#e7d1b4" />
    <rect x="3" y="32" width="1" height="1" fill="#4f1306" />
    <rect x="4" y="32" width="2" height="1" fill="#ae6850" />
    <rect x="6" y="32" width="2" height="1" fill="#fdab88" />
    <rect x="8" y="32" width="7" height="1" fill="#c88770" />
    <rect x="15" y="32" width="3" height="1" fill="#fdab88" />
    <rect x="18" y="32" width="1" height="1" fill="#ef8f76" />
    <rect x="19" y="32" width="3" height="1" fill="#c88770" />
    <rect x="22" y="32" width="1" height="1" fill="#ae6850" />
    <rect x="23" y="32" width="1" height="1" fill="#4f1306" />
    <rect x="24" y="32" width="1" height="1" fill="#e7d1b4" />
    <rect x="2" y="33" width="1" height="1" fill="#e7d1b4" />
    <rect x="3" y="33" width="1" height="1" fill="#290a04" />
    <rect x="4" y="33" width="1" height="1" fill="#592b1a" />
    <rect x="5" y="33" width="1" height="1" fill="#ae6850" />
    <rect x="6" y="33" width="1" height="1" fill="#c88770" />
    <rect x="7" y="33" width="10" height="1" fill="#fdab88" />
    <rect x="17" y="33" width="1" height="1" fill="#c88770" />
    <rect x="18" y="33" width="1" height="1" fill="#ae6850" />
    <rect x="19" y="33" width="1" height="1" fill="#c88770" />
    <rect x="20" y="33" width="1" height="1" fill="#ae6850" />
    <rect x="21" y="33" width="1" height="1" fill="#834a2d" />
    <rect x="22" y="33" width="1" height="1" fill="#471e0f" />
    <rect x="23" y="33" width="1" height="1" fill="#290a04" />
    <rect x="24" y="33" width="1" height="1" fill="#e7d1b4" />
    <rect x="3" y="34" width="1" height="1" fill="#e7d1b4" />
    <rect x="4" y="34" width="1" height="1" fill="#290a04" />
    <rect x="5" y="34" width="1" height="1" fill="#592b1a" />
    <rect x="6" y="34" width="1" height="1" fill="#ae6850" />
    <rect x="7" y="34" width="1" height="1" fill="#ef8f76" />
    <rect x="8" y="34" width="2" height="1" fill="#fdab88" />
    <rect x="10" y="34" width="2" height="1" fill="#ae6850" />
    <rect x="12" y="34" width="1" height="1" fill="#c88770" />
    <rect x="13" y="34" width="3" height="1" fill="#fdab88" />
    <rect x="16" y="34" width="2" height="1" fill="#ae6850" />
    <rect x="18" y="34" width="1" height="1" fill="#c88770" />
    <rect x="19" y="34" width="2" height="1" fill="#ae6850" />
    <rect x="21" y="34" width="1" height="1" fill="#592b1a" />
    <rect x="22" y="34" width="1" height="1" fill="#290a04" />
    <rect x="23" y="34" width="1" height="1" fill="#e7d1b4" />
    <rect x="4" y="35" width="1" height="1" fill="#e7d1b4" />
    <rect x="5" y="35" width="1" height="1" fill="#471e0f" />
    <rect x="6" y="35" width="2" height="1" fill="#ae6850" />
    <rect x="8" y="35" width="1" height="1" fill="#ef8f76" />
    <rect x="9" y="35" width="1" height="1" fill="#fdab88" />
    <rect x="10" y="35" width="1" height="1" fill="#ae6850" />
    <rect x="11" y="35" width="2" height="1" fill="#c88770" />
    <rect x="13" y="35" width="1" height="1" fill="#ef8f76" />
    <rect x="14" y="35" width="1" height="1" fill="#fdab88" />
    <rect x="15" y="35" width="1" height="1" fill="#c88770" />
    <rect x="16" y="35" width="2" height="1" fill="#ae6850" />
    <rect x="18" y="35" width="1" height="1" fill="#c88770" />
    <rect x="19" y="35" width="1" height="1" fill="#6e3a22" />
    <rect x="20" y="35" width="1" height="1" fill="#592b1a" />
    <rect x="21" y="35" width="1" height="1" fill="#290a04" />
    <rect x="22" y="35" width="1" height="1" fill="#e7d1b4" />
    <rect x="5" y="36" width="1" height="1" fill="#e7d1b4" />
    <rect x="6" y="36" width="2" height="1" fill="#290a04" />
    <rect x="8" y="36" width="7" height="1" fill="#c88770" />
    <rect x="15" y="36" width="1" height="1" fill="#ae6850" />
    <rect x="16" y="36" width="3" height="1" fill="#834a2d" />
    <rect x="19" y="36" width="2" height="1" fill="#4f1306" />
    <rect x="21" y="36" width="1" height="1" fill="#e7d1b4" />
    <rect x="6" y="37" width="2" height="1" fill="#e7d1b4" />
    <rect x="8" y="37" width="8" height="1" fill="#290a04" />
    <rect x="16" y="37" width="1" height="1" fill="#390d06" />
    <rect x="17" y="37" width="4" height="1" fill="#290a04" />
    <rect x="21" y="37" width="1" height="1" fill="#e7d1b4" />
    <rect x="8" y="38" width="13" height="1" fill="#e7d1b4" />
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
