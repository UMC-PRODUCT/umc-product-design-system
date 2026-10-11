import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type RoleTagColor =
  "challenger-super-admin" | "product" | "central" | "chapter" | "campus"

export type RoleTagSize = "sm" | "md" | "lg"

export type RoleTagProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  color: RoleTagColor
  size?: RoleTagSize
  children: ReactNode
}

export function RoleTag({
  color,
  size = "sm",
  className,
  children,
  ...props
}: RoleTagProps) {
  return (
    <span
      {...props}
      className={cx("umc-role-tag", className)}
      data-color={color}
      data-size={size}
    >
      {children}
    </span>
  )
}
