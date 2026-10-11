import { Bubble } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

import type { BubbleDirection } from "@umc-product/react"

const directionMap: Record<string, BubbleDirection> = {
  Incoming: "incoming",
  Outgoing: "outgoing",
}

function renderBubble(variant: FigmaVariant) {
  const direction = lookup(directionMap, variant, "Direction")
  return <Bubble direction={direction}>UMC PRODUCT 모여라</Bubble>
}

export function BubbleAllVariants() {
  return (
    <VariantGrid
      set="bubble"
      rows={["Direction"]}
      columns={[]}
      render={renderBubble}
    />
  )
}
