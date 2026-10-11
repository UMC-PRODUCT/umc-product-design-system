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

function renderPartTag(variant: FigmaVariant) {
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

export function PartTagStaticPreview() {
  return (
    <div className="umc-example" style={{ flexWrap: "wrap", gap: "8px" }}>
      <span data-spec-id="part-tag-pm-sm-filled">
        <PartTag part="pm" />
      </span>
      <span data-spec-id="part-tag-pm-sm-outlined">
        <PartTag part="pm" variant="outlined" />
      </span>
      <span data-spec-id="part-tag-design-sm-outlined">
        <PartTag part="design" variant="outlined" />
      </span>
      <span data-spec-id="part-tag-web-pe-sm-filled">
        <PartTag part="web-pe" />
      </span>
      <span data-spec-id="part-tag-mobile-pe-sm-filled">
        <PartTag part="mobile-pe" />
      </span>
      <span data-spec-id="part-tag-pm-lg-filled">
        <PartTag part="pm" size="lg" />
      </span>
      <span data-spec-id="part-tag-design-lg-outlined">
        <PartTag part="design" variant="outlined" size="lg" />
      </span>
    </div>
  )
}

export function RoleTagStaticPreview() {
  return (
    <div className="umc-example" style={{ flexWrap: "wrap", gap: "8px" }}>
      <span data-spec-id="role-tag-admin-sm">
        <RoleTag color="challenger-super-admin">Admin</RoleTag>
      </span>
      <span data-spec-id="role-tag-product-lg">
        <RoleTag color="product" size="lg">
          Product
        </RoleTag>
      </span>
      <span data-spec-id="role-tag-central-md">
        <RoleTag color="central" size="md">
          중앙 운영진
        </RoleTag>
      </span>
      <span data-spec-id="role-tag-chapter-sm">
        <RoleTag color="chapter">지부장</RoleTag>
      </span>
      <span data-spec-id="role-tag-campus-sm">
        <RoleTag color="campus">교내 회장</RoleTag>
      </span>
    </div>
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
