import { PartTag } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

import type {
  PartTagPart,
  PartTagVariant,
  PartTagSize,
} from "@umc-product/react"

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
