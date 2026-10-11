"use client"

import { LinkProvider, type LinkComponentProps } from "@umc-product/react"
import { createContext, useContext, type ReactNode } from "react"

const ignoreNavigation = () => {}

const NavigateContext = createContext<(href: string) => void>(ignoreNavigation)

function PreviewLink({ href, children, ...rest }: LinkComponentProps) {
  const navigate = useContext(NavigateContext)
  return (
    <a
      href={href}
      data-preview-link=""
      {...rest}
      onClick={(event) => {
        event.preventDefault()
        navigate(href)
      }}
    >
      {children}
    </a>
  )
}

export function PreviewLinks({
  onNavigate = ignoreNavigation,
  children,
}: {
  onNavigate?: (href: string) => void
  children: ReactNode
}) {
  return (
    <NavigateContext.Provider value={onNavigate}>
      <LinkProvider component={PreviewLink}>{children}</LinkProvider>
    </NavigateContext.Provider>
  )
}
