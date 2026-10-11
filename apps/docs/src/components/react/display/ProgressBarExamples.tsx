import { ProgressBar } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

import type { ProgressBarColor, ProgressBarSize } from "@umc-product/react"

const sizeMap: Record<string, ProgressBarSize> = {
  Md: "md",
  Lg: "lg",
}

const colorMap: Record<string, ProgressBarColor> = {
  Brand: "brand",
  Danger: "error",
  Success: "success",
  Neutral: "neutral",
}

function renderProgressBar(variant: FigmaVariant) {
  const size = lookup(sizeMap, variant, "Size")
  const color = lookup(colorMap, variant, "Color")
  const value = Number(variant.props["Progress"] ?? "50")
  return (
    <div style={{ width: "200px" }}>
      <ProgressBar
        value={value}
        size={size}
        color={color}
        aria-label={`진행률 ${value}%`}
      />
    </div>
  )
}

export function ProgressBarStaticPreview() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", gap: "16px", width: "100%" }}
    >
      <span data-spec-id="progress-bar-md-brand-50 progress-bar-md-brand-50-indicator">
        <div style={{ width: "240px" }}>
          <ProgressBar
            value={50}
            size="md"
            color="brand"
            aria-label="진행률 50%"
          />
        </div>
      </span>
      <span data-spec-id="progress-bar-lg-brand-50">
        <div style={{ width: "240px" }}>
          <ProgressBar
            value={50}
            size="lg"
            color="brand"
            aria-label="진행률 50%"
          />
        </div>
      </span>
      <span data-spec-id="progress-bar-md-error-50">
        <div style={{ width: "240px" }}>
          <ProgressBar
            value={50}
            size="md"
            color="error"
            aria-label="진행률 50%"
          />
        </div>
      </span>
      <span data-spec-id="progress-bar-md-success-50">
        <div style={{ width: "240px" }}>
          <ProgressBar
            value={50}
            size="md"
            color="success"
            aria-label="진행률 50%"
          />
        </div>
      </span>
      <span data-spec-id="progress-bar-md-neutral-50">
        <div style={{ width: "240px" }}>
          <ProgressBar
            value={50}
            size="md"
            color="neutral"
            aria-label="진행률 50%"
          />
        </div>
      </span>
    </div>
  )
}

export function ProgressBarAllVariants() {
  return (
    <VariantGrid
      set="progress-bar"
      rows={["Progress"]}
      columns={["Color"]}
      sections={["Size"]}
      render={renderProgressBar}
    />
  )
}
