import { PartTag, RoleTag } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

import type {
  PartTagPart,
  PartTagVariant,
  PartTagSize,
} from "@umc-product/react"
import type { RoleTagColor, RoleTagSize } from "@umc-product/react"

const partMap: Record<string, PartTagPart> = {
  PM: "pm",
  Design: "design",
  "Web PE": "web-pe",
  "Mobile PE": "mobile-pe",
}

const variantMap: Record<string, PartTagVariant> = {
  Filled: "filled",
  Outlined: "outlined",
}

const partSizeMap: Record<string, PartTagSize> = {
  Sm: "sm",
  Md: "md",
  Lg: "lg",
}

const colorMap: Record<string, RoleTagColor> = {
  Admin: "challenger-super-admin",
  챌린저: "challenger-super-admin",
  Product: "product",
  총괄: "central",
  부총괄: "central",
  "중앙 운영진": "central",
  지부장: "chapter",
  "교내 회장": "campus",
  "교내 부회장": "campus",
  "교내 운영진": "campus",
}

const roleSizeMap: Record<string, RoleTagSize> = {
  Sm: "sm",
  Md: "md",
  Lg: "lg",
}

const BROKEN_VARIANT_NAME = "Part=Tag, Size=Part, Style=PM"

function renderPartTag(variant: FigmaVariant) {
  if (variant.name === BROKEN_VARIANT_NAME) {
    return <PartTag part="pm" variant="outlined" size="sm" />
  }
  const part = lookup(partMap, variant, "Part")
  const style = lookup(variantMap, variant, "Style")
  const size = lookup(partSizeMap, variant, "Size")
  return <PartTag part={part} variant={style} size={size} />
}

function renderRoleTag(variant: FigmaVariant) {
  const color = lookup(colorMap, variant, "Role")
  const size = lookup(roleSizeMap, variant, "Size")
  const roleText = variant.props["Role"] ?? ""
  return (
    <RoleTag color={color} size={size}>
      {roleText}
    </RoleTag>
  )
}

export function PartTagAllVariants() {
  return (
    <VariantGrid
      set="tag-part"
      rows={["Style"]}
      columns={["Part", "Size"]}
      render={renderPartTag}
    />
  )
}

export function RoleTagAllVariants() {
  return (
    <VariantGrid
      set="tag-role"
      rows={["Role"]}
      columns={["Size"]}
      render={renderRoleTag}
    />
  )
}
