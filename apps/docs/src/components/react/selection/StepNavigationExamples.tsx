import { StepNavigation } from "@umc-product/react"

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
