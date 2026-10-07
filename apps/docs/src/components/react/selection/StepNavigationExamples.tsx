import { StepNavigation } from "@umc-product/react"

import { NotImplemented } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const STEPS = ["기본 정보", "모집 문항", "미리보기"]

export function StepNavigationBasic() {
  return (
    <div className="umc-example">
      <div
        className="w-full"
        data-spec-id="step-navigation-container step-navigation-current step-navigation-step step-navigation-badge"
      >
        <StepNavigation steps={STEPS} currentStep={1} aria-label="등록 단계" />
      </div>
    </div>
  )
}

export function StepNavigationStates() {
  return (
    <div className="umc-example umc-example-stack">
      <StepNavigation
        steps={STEPS}
        currentStep={1}
        aria-label="1단계 진행 중"
      />
      <StepNavigation
        steps={STEPS}
        currentStep={2}
        aria-label="2단계 진행 중"
      />
      <StepNavigation
        steps={STEPS}
        currentStep={3}
        aria-label="3단계 진행 중"
      />
    </div>
  )
}

function StepVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"]
  if (state === "Hover") {
    return (
      <NotImplemented reason="단계를 누를 수 없는 진행 표시로 만들어 hover가 없습니다" />
    )
  }
  return (
    <StepNavigation
      aria-label="단계"
      steps={["기본 정보"]}
      currentStep={state === "Selected" ? 1 : 0}
    />
  )
}

export function StepNavigationAllVariants() {
  return (
    <VariantGrid
      set="web-segmented-button"
      only={{ Type: ["Numberic Step"] }}
      rows={[]}
      columns={["State"]}
      order={{ State: ["Unselected", "Hover", "Selected"] }}
      render={(variant) => <StepVariantCell variant={variant} />}
    />
  )
}
