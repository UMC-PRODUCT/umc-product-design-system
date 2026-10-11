import type { StarlightRouteData } from "@astrojs/starlight/route-data"
import type {
  BreadcrumbItem,
  NavItem,
  SideNavigationItem,
} from "@umc-product/react"

type SidebarEntry = StarlightRouteData["sidebar"][number]
type SidebarGroup = Extract<SidebarEntry, { type: "group" }>
type SidebarLink = Extract<SidebarEntry, { type: "link" }>

const linksOf = (entries: readonly SidebarEntry[]): SidebarLink[] =>
  entries.flatMap((entry) =>
    entry.type === "link" ? [entry] : linksOf(entry.entries),
  )

const containsCurrent = (entry: SidebarEntry): boolean =>
  entry.type === "link" ? entry.isCurrent : entry.entries.some(containsCurrent)

const isGroup = (entry: SidebarEntry): entry is SidebarGroup =>
  entry.type === "group"

const firstHrefOf = (group: SidebarGroup) => linksOf(group.entries)[0]?.href

export const sectionNavItems = (sidebar: readonly SidebarEntry[]): NavItem[] =>
  sidebar.filter(isGroup).flatMap((group) => {
    const href = firstHrefOf(group)
    return href === undefined ? [] : [{ label: group.label, href }]
  })

export const currentSectionOf = (sidebar: readonly SidebarEntry[]) =>
  sidebar.filter(isGroup).find(containsCurrent)

export const currentSectionHref = (sidebar: readonly SidebarEntry[]) => {
  const section = currentSectionOf(sidebar)
  return section === undefined ? undefined : firstHrefOf(section)
}

export const sideNavigationItemsOf = (
  section: SidebarGroup,
): SideNavigationItem[] =>
  section.entries.map((entry) =>
    entry.type === "link"
      ? { label: entry.label, href: entry.href }
      : {
          label: entry.label,
          children: linksOf(entry.entries).map((link) => ({
            label: link.label,
            href: link.href,
          })),
        },
  )

export const breadcrumbsOf = (
  sidebar: readonly SidebarEntry[],
  title: string,
): BreadcrumbItem[] => {
  const section = currentSectionOf(sidebar)
  if (section === undefined) return []
  const group = section.entries.filter(isGroup).find(containsCurrent)
  return [
    { label: section.label, href: firstHrefOf(section) },
    ...(group === undefined ? [] : [{ label: group.label }]),
    { label: title },
  ]
}
