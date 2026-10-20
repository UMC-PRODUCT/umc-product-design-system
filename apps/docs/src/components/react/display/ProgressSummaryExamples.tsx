import { ProgressSummary } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const ROOT_SPEC_IDS = [
  "progress-summary-root",
  "progress-summary-header",
  "progress-summary-title",
  "progress-summary-label",
  "progress-summary-count",
  "progress-summary-percent",
  "progress-summary-track",
].join(" ")

const RECRUITING_STEPS = [
  {
    label: "서류 평가율",
    value: 42,
    max: 42,
    specId: "progress-summary-indicator",
  },
  { label: "면접 배정률", value: 21, max: 42, specId: undefined },
  { label: "면접 평가율", value: 0, max: 21, specId: ROOT_SPEC_IDS },
] as const

export function ProgressSummaryDefault() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-74 flex-col gap-4">
        {RECRUITING_STEPS.map(({ label, value, max, specId }) => (
          <ProgressSummary
            key={label}
            label={label}
            value={value}
            max={max}
            data-spec-id={specId}
          />
        ))}
      </div>
    </div>
  )
}

const ROUNDING_CASES = [
  { label: "거의 다 마침", value: 199, max: 200 },
  { label: "막 시작함", value: 1, max: 1000 },
  { label: "대상 없음", value: 0, max: 0 },
] as const

export function ProgressSummaryRounding() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-74 flex-col gap-4">
        {ROUNDING_CASES.map(({ label, value, max }) => (
          <ProgressSummary key={label} label={label} value={value} max={max} />
        ))}
      </div>
    </div>
  )
}

export function ProgressSummaryWidths() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-45">
        <ProgressSummary label="면접 배정률" value={21} max={42} />
      </div>
      <div className="w-full max-w-74">
        <ProgressSummary label="면접 배정률" value={16} max={42} />
      </div>
      <div className="w-45">
        <ProgressSummary label="2차 면접 일정 확정 비율" value={8} max={21} />
      </div>
    </div>
  )
}

const FIGMA_VALUES: Readonly<Record<string, number>> = {
  "0%": 0,
  "100%": 42,
}

export function ProgressSummaryAllVariants() {
  return (
    <VariantGrid
      set="progress-summary"
      rows={[]}
      columns={["Property 1"]}
      render={(variant: FigmaVariant) => (
        <div className="w-45">
          <ProgressSummary
            label="면접 배정률"
            value={lookup(FIGMA_VALUES, variant, "Property 1")}
            max={42}
          />
        </div>
      )}
    />
  )
}
