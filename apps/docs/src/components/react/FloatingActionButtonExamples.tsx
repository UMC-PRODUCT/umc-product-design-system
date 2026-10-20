import { AddIcon, CloseIcon } from "@umc-product/icons"
import { FloatingActionButton } from "@umc-product/react"

import { ForceState } from "./variants/VariantCells.tsx"
import type { FigmaVariant } from "./variants/figma-variants.ts"
import { VariantGrid } from "./variants/VariantGrid.tsx"

export function FloatingActionButtonBasics() {
  return (
    <div className="umc-example">
      <FloatingActionButton
        icon={<AddIcon weight="fill" />}
        aria-label="질문 추가"
        data-spec-id="floating-action-button-default"
      />
      <FloatingActionButton
        icon={<CloseIcon weight="fill" />}
        aria-label="질문 유형 닫기"
      />
      <FloatingActionButton
        icon={<AddIcon weight="fill" />}
        aria-label="질문 추가"
        disabled
      />
    </div>
  )
}

function renderVariant(variant: FigmaVariant) {
  const hover = variant.props["State"] === "Hover"
  return (
    <div
      data-spec-id={
        hover
          ? "floating-action-button-hover floating-action-button-icon"
          : undefined
      }
    >
      <ForceState states={hover ? ["hover"] : []}>
        <FloatingActionButton
          icon={<AddIcon weight="fill" />}
          aria-label="질문 추가"
        />
      </ForceState>
    </div>
  )
}

export function FloatingActionButtonAllVariants() {
  return (
    <VariantGrid
      set="floating-action-button"
      rows={[]}
      columns={["State"]}
      render={renderVariant}
    />
  )
}
