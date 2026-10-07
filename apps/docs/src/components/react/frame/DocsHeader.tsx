import { Header, HeaderHomeLink, type NavItem } from "@umc-product/react"
import type { ReactNode } from "react"

type DocsHeaderProps = {
  navItems: NavItem[]
  currentPath?: string
  actions?: ReactNode
}

export function DocsHeader({
  navItems,
  currentPath,
  actions,
}: DocsHeaderProps) {
  return (
    <Header
      className="docs-header"
      logo={<HeaderHomeLink context="product-tech" />}
      navItems={navItems}
      currentPath={currentPath}
      actions={actions}
    />
  )
}
