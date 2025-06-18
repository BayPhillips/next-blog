import { SettingsQueryResult } from "@/sanity.types"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "./navigation-menu"
import { cn } from "@/lib/utils"
import { LogoIcon } from "./icons"

export function SiteHeader({ settings }: { settings: SettingsQueryResult }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span>
              <span className="inline-block h-6 w-6">
                <LogoIcon className="h-full w-full" />
              </span>
              <span className="hidden font-bold sm:inline-block">
                {settings?.title || 'Blog'}
              </span>
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {settings?.navigation?.map((item) => (
                  <NavigationMenuItem key={item._key}>
                    <Link href={item.path || '#'} passHref legacyBehavior>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {item.title || 'Link'}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
