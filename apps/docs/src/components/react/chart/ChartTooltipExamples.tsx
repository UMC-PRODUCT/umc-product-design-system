import { ChartTooltip, type ChartTooltipItem } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const APPLIED_ITEMS: readonly ChartTooltipItem[] = [
  { key: "pm", label: "PM", color: "pm", value: "16명" },
  { key: "design", label: "Design", color: "design", value: "34명" },
  { key: "web-pe", label: "Web PE", color: "web-pe", value: "44명" },
  { key: "mobile-pe", label: "Mobile PE", color: "mobile-pe", value: "26명" },
]

const EVALUATED_ITEMS: readonly ChartTooltipItem[] = [
  { key: "pm", label: "PM", color: "pm", value: "10명", reference: "16명" },
  {
    key: "design",
    label: "Design",
    color: "design",
    value: "30명",
    reference: "34명",
  },
  {
    key: "web-pe",
    label: "Web PE",
    color: "web-pe",
    value: "36명",
    reference: "44명",
  },
  {
    key: "mobile-pe",
    label: "Mobile PE",
    color: "mobile-pe",
    value: "24명",
    reference: "26명",
  },
]

export function ChartTooltipDefault() {
  return (
    <div className="umc-example">
      <ChartTooltip
        title="한국대 ERICA"
        summary="120명 지원"
        items={APPLIED_ITEMS}
        data-spec-id="chart-tooltip-single"
      />
    </div>
  )
}

export function ChartTooltipComparison() {
  return (
    <div className="umc-example">
      <ChartTooltip
        title="한국대 ERICA"
        summary="100명 평가 완료"
        referenceSummary="120명 지원"
        items={EVALUATED_ITEMS}
        data-spec-id="chart-tooltip-comparison"
      />
    </div>
  )
}

export function ChartTooltipCaption() {
  return (
    <div className="umc-example">
      <ChartTooltip
        title="한국대 ERICA"
        summary="120명 지원"
        items={APPLIED_ITEMS}
        caption="10월 20일 오후 2시 기준"
        data-spec-id="chart-tooltip-caption"
      />
    </div>
  )
}

const FIGMA_ITEMS: readonly ChartTooltipItem[] = [
  { key: "1", label: "항목 1", color: "pm", value: "00명" },
  { key: "2", label: "항목 2", color: "design", value: "00명" },
  { key: "3", label: "항목 3", color: "web-pe", value: "00명" },
  { key: "4", label: "항목 4", color: "mobile-pe", value: "00명" },
]

const withReference = (
  items: readonly ChartTooltipItem[],
): ChartTooltipItem[] => items.map((item) => ({ ...item, reference: "000명" }))

const FIGMA_COMPARISON: Readonly<Record<string, boolean>> = {
  Single: false,
  Comparison: true,
}

const FIGMA_SHOW_CAPTION: Readonly<Record<string, boolean>> = {
  False: false,
  True: true,
}

export function ChartTooltipAllVariants() {
  return (
    <VariantGrid
      set="chart-tooltip"
      rows={["Show Caption"]}
      columns={["Value Display"]}
      render={(variant: FigmaVariant) => {
        const comparison = lookup(FIGMA_COMPARISON, variant, "Value Display")
        const showCaption = lookup(FIGMA_SHOW_CAPTION, variant, "Show Caption")
        return (
          <ChartTooltip
            title="학교명"
            summary="00명 지원"
            referenceSummary={comparison ? "000명 지원" : undefined}
            items={comparison ? withReference(FIGMA_ITEMS) : FIGMA_ITEMS}
            caption={showCaption ? "보조 설명" : undefined}
          />
        )
      }}
    />
  )
}
