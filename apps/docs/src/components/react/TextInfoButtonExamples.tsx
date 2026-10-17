"use client"

import { TextInfoButton, Tooltip } from "@umc-product/react"

import { ForceState } from "./variants/VariantCells.tsx"
import { VariantGrid } from "./variants/VariantGrid.tsx"

export function TextInfoButtonDefault() {
  return (
    <div className="umc-example">
      <div data-spec-id="text-info-button text-info-button-hover">
        <Tooltip
          openOn="click"
          content="지부 운영진에게 받은 6자리 코드입니다"
          side="bottom"
          mode="light"
          size="sm"
        >
          <TextInfoButton>개별 지원 코드란?</TextInfoButton>
        </Tooltip>
      </div>
    </div>
  )
}

export function TextInfoButtonAllVariants() {
  return (
    <VariantGrid
      set="text-info-button"
      rows={[]}
      columns={["State"]}
      render={(variant) => (
        <ForceState
          states={variant.props["State"] === "Hover" ? ["hover"] : []}
        >
          <TextInfoButton>개별 지원 코드란?</TextInfoButton>
        </ForceState>
      )}
    />
  )
}
