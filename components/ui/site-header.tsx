import { SettingsQueryResult } from "@/sanity.types"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent } from "./navigation-menu"
import { cn } from "@/lib/utils"
import { LogoIcon, MenuIcon } from "./icons"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader({ settings }: { settings: SettingsQueryResult }) {
  return (
    <header className="content-grid sticky inset-bs-0 z-50 w-full border-be bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-(--header-height) items-center justify-between">
        {/* Logo */}
        <div className="me-4 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center">
              <span className="inline-block h-6 w-6">
                <LogoIcon className="h-full w-full" />
              </span>
              <span className="font-bold inline-block align-middle ms-2">
                {settings?.title || 'Blog'}
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-4">
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
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Menu */}
        <nav className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger arrowHidden={true}><MenuIcon /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-2">
                    {settings?.navigation?.map((item) => (
                      <li key={item._key}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.path || '#'}
                            key={item._key}
                            className="block rounded-md px-3 py-2.5 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent"
                          >
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