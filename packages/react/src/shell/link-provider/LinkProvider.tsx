"use client"

import {
  createContext,
  useContext,
  type ComponentType,
  type ReactNode,
} from "react"

export type LinkComponentProps = {
  href: string
  className?: string
  children?: ReactNode
  "aria-current"?: "page" | "step"
}

export type LinkProviderProps = {
  component: ComponentType<LinkComponentProps>
  children: ReactNode
}

const LinkContext = createContext<ComponentType<LinkComponentProps> | null>(
  null,
)

function DefaultLink({
  href,
  className,
  children,
  ...rest
}: LinkComponentProps) {
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  )
}

export function useLinkComponent(): ComponentType<LinkComponentProps> {
  return useContext(LinkContext) ?? DefaultLink
}

export function LinkProvider({ component, children }: LinkProviderProps) {
  return (
    <LinkContext.Provider value={component}>{children}</LinkContext.Provider>
  )
}
