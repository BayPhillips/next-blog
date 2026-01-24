import { SettingsQueryResult } from "@/sanity.types"
import PortableText from "@/components/portable-text"
import { PortableTextBlock } from "next-sanity"
import { Link } from "@tanstack/react-router"

export function SiteFooter({ settings }: { settings: SettingsQueryResult }) {
  const footer = settings?.footer || []

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              {footer.length > 0 ? (
                <PortableText 
                  value={footer as PortableTextBlock[]} 
                  className="text-sm text-muted-foreground" 
                />
              ) : (
                <span>© {new Date().getFullYear()} {settings?.title || 'Blog'}. All rights reserved.</span>
              )}
            </div>
          </div>
          

        </div>
      </div>
    </footer>
  )
}
