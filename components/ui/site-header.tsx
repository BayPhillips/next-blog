import { SettingsQueryResult } from "@/sanity.types"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent } from "./navigation-menu"
import { cn } from "@/lib/utils"
import { LogoIcon, MenuIcon } from "./icons"

export function SiteHeader({ settings }: { settings: SettingsQueryResult }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center">
              <span className="inline-block h-6 w-6">
                <LogoIcon className="h-full w-full" />
              </span>
              <span className="font-bold inline-block align-middle ml-2">
                {settings?.title || 'Blog'}
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {settings?.navigation?.map((item) => (
                <NavigationMenuItem key={item._key}>
                  <Link href={item.path || '#'} passHref legacyBehavior>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'inline-block')}>
                      {item.title || 'Link'}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation Menu */}
        <nav className="md:hidden flex flex-col space-y-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger arrowHidden={true} className="w-[90]"><MenuIcon /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-4 p-4">
                    {settings?.navigation?.map((item) => (
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href={item.path || '#'} key={item._key}>
                            {item.title || ''}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
  );
}