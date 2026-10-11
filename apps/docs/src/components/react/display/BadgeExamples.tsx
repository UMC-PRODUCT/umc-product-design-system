import { DotBadge, NumberBadge } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

import type {
  DotBadgeColor,
  DotBadgeSize,
  NumberBadgeColor,
  NumberBadgeSize,
  NumberBadgeVariant,
} from "@umc-product/react"

const numberBadgeSizeMap: Record<string, NumberBadgeSize> = {
  Sm: "sm",
  Md: "md",
}

const numberBadgeColorMap: Record<string, NumberBadgeColor> = {
  Brand: "brand",
  Neutral: "neutral",
  Red: "error",
  Yellow: "warning",
  Green: "success",
}

const numberBadgeVariantMap: Record<string, NumberBadgeVariant> = {
  Fill: "fill",
  Weak: "weak",
}

const dotBadgeSizeMap: Record<string, DotBadgeSize> = {
  Sm: "sm",
  Md: "md",
}

const dotBadgeColorMap: Record<string, DotBadgeColor> = {
  Brand: "brand",
  Neutral: "neutral",
  Red: "error",
  Yellow: "warning",
  Success: "success",
}

function renderNumberBadge(variant: FigmaVariant) {
  const size = lookup(numberBadgeSizeMap, variant, "Size")
  const color = lookup(numberBadgeColorMap, variant, "Color")
  const badgeVariant = lookup(numberBadgeVariantMap, variant, "Style")
  return (
    <NumberBadge size={size} color={color} variant={badgeVariant}>
      1
    </NumberBadge>
  )
}

function renderDotBadge(variant: FigmaVariant) {
  const size = lookup(dotBadgeSizeMap, variant, "Size")
  const color = lookup(dotBadgeColorMap, variant, "Color")
  return <DotBadge size={size} color={color} aria-label={`${color} 상태`} />
}

export function BadgeStaticPreview() {
  return (
    <div
      className="umc-example umc-example-row"
      style={{ flexWrap: "wrap", gap: "12px", alignItems: "center" }}
    >
      <span data-spec-id="number-badge-sm-brand-fill">
        <NumberBadge color="brand" variant="fill" size="sm">
          1
        </NumberBadge>
      </span>
      <span data-spec-id="number-badge-sm-brand-weak">
        <NumberBadge color="brand" variant="weak" size="sm">
          1
        </NumberBadge>
      </span>
      <span data-spec-id="number-badge-md-brand-fill">
        <NumberBadge color="brand" variant="fill" size="md">
          1
        </NumberBadge>
      </span>
      <span data-spec-id="number-badge-sm-error-fill">
        <NumberBadge color="error" variant="fill" size="sm">
          1
        </NumberBadge>
      </span>
      <span data-spec-id="number-badge-sm-warning-fill">
        <NumberBadge color="warning" variant="fill" size="sm">
          1
        </NumberBadge>
      </span>
      <span data-spec-id="number-badge-sm-success-fill">
        <NumberBadge color="success" variant="fill" size="sm">
          1
        </NumberBadge>
      </span>
      <span data-spec-id="number-badge-sm-neutral-fill">
        <NumberBadge color="neutral" variant="fill" size="sm">
          1
        </NumberBadge>
      </span>
      <span data-spec-id="dot-badge-sm-brand">
        <DotBadge color="brand" size="sm" aria-label="브랜드 상태" />
      </span>
      <span data-spec-id="dot-badge-md-brand">
        <DotBadge color="brand" size="md" aria-label="브랜드 상태" />
      </span>
      <span data-spec-id="dot-badge-sm-neutral">
        <DotBadge color="neutral" size="sm" aria-label="중립 상태" />
      </span>
      <span data-spec-id="dot-badge-sm-error">
        <DotBadge color="error" size="sm" aria-label="오류 상태" />
      </span>
      <span data-spec-id="dot-badge-sm-warning">
        <DotBadge color="warning" size="sm" aria-label="경고 상태" />
      </span>
      <span data-spec-id="dot-badge-sm-success">
        <DotBadge color="success" size="sm" aria-label="성공 상태" />
      </span>
    </div>
  )
}

export function NumberBadgeAllVariants() {
  return (
    <VariantGrid
      set="badge-number"
      rows={["Color"]}
      columns={["Style"]}
      sections={["Size"]}
      render={renderNumberBadge}
    />
  )
}

export function DotBadgeAllVariants() {
  return (
    <VariantGrid
      set="badge-dot"
      rows={["Color"]}
      columns={["Size"]}
      render={renderDotBadge}
    />
  )
}
