import { StepNavigation } from "@umc-product/react"

const STEPS = ["지원서 작성", "제출 확인", "결과 안내"]

export function StepNavigationBasic() {
  return (
    <div className="umc-example">
      <StepNavigation
        steps={STEPS}
        currentStep={1}
        aria-label="지원 단계"
        stepSpecIds={[
          "step-navigation-active",
          "step-navigation-inactive",
          undefined,
        ]}
      />
    </div>
  )
}

export function StepNavigationStates() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", gap: "16px" }}
    >
      <StepNavigation steps={STEPS} currentStep={0} aria-label="1단계" />
      <StepNavigation steps={STEPS} currentStep={1} aria-label="2단계" />
      <StepNavigation steps={STEPS} currentStep={2} aria-label="3단계" />
    </div>
  )
}
