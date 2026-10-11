import { MenuIcon } from "@umc-product/icons"
import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type DraggableChipVariant = "weak" | "fill"

export type DraggableChipColor = "brand" | "neutral"

export type DraggableChipProps = Omit<ComponentPropsWithRef<"div">, "color"> & {
  variant?: DraggableChipVariant
  color?: DraggableChipColor
}

export function DraggableChip({
  variant = "weak",
  color = "brand",
  className,
  children,
  ...props
}: DraggableChipProps) {
  return (
    <div
      {...props}
      className={cx("umc-draggable-chip", className)}
      data-variant={variant}
      data-color={color}
    >
      <span className="umc-draggable-chip__handle" aria-hidden="true">
        <MenuIcon size={14} />
      </span>
      {children}
    </div>
  )
}
