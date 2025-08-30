"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

import type { MainNav as NavigationType } from "@/payload-types"

type Item = NonNullable<NavigationType["items"]>[number]
type Child = NonNullable<Item["children"]>[number]

function resolveHref(item: Item | Child): string {
  if ("linkType" in item && item.linkType === "page" && item.page && typeof item.page !== "string") {
    return `/${item.page.slug}`
  }
  if ("page" in item && item.page && typeof item.page !== "string") {
    return `/${item.page.slug}`
  }
  return item.url || "#"
}

function NavItemRecursive({ item }: { item: Item }) {
  const href = resolveHref(item)

  if (item.children && item.children.length > 0) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-2 p-4 w-56">
            {item.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={resolveHref(child)}
                  className="block rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href={href}>{item.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export function Navigation({ items }: { items: NavigationType["items"] }) {
  if (!items) return null
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => (
          <NavItemRecursive key={item.id} item={item} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
