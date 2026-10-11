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

export function BubbleStaticPreview() {
  return (
    <div
      className="umc-example"
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
        background: "var(--umc-color-fill-neutral-medium-100)",
      }}
    >
      <span data-spec-id="bubble-incoming">
        <Bubble direction="incoming">UMC PRODUCT 모여라</Bubble>
      </span>
      <span data-spec-id="bubble-outgoing" style={{ alignSelf: "flex-end" }}>
        <Bubble direction="outgoing">함께 성장합시다</Bubble>
      </span>
    </div>
  )
}

export function BubbleAllVariants() {
  return (
    <VariantGrid
      set="bubble"
      rows={["Direction"]}
      columns={[]}
      render={renderBubble}
      tone={() => "muted"}
    />
  )
}
