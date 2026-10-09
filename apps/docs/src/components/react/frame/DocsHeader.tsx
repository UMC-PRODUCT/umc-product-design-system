import { Header, HeaderHomeLink, type NavItem } from "@umc-product/react"
import type { ReactNode } from "react"

type DocsHeaderProps = {
  homeHref: string
  navItems: NavItem[]
  currentPath?: string
  actions?: ReactNode
}

export function DocsHeader({
  homeHref,
  navItems,
  currentPath,
  actions,
}: DocsHeaderProps) {
  return (
    <Header
      className="docs-header"
      logo={<HeaderHomeLink context="product-tech" href={homeHref} />}
      navItems={navItems}
      currentPath={currentPath}
      actions={actions}
    />
  )
}
