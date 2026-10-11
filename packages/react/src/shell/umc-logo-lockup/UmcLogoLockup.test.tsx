import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { UmcLogoLockup } from "./UmcLogoLockup.tsx"

const lockupOf = (container: HTMLElement) => {
  const lockup = container.querySelector(".umc-logo-lockup")
  if (!(lockup instanceof HTMLElement)) {
    throw new Error("로고 락업이 없습니다")
  }
  return lockup
}

describe("UmcLogoLockup", () => {
  it("기본값은 라벨 없는 UMC 로고다", () => {
    const { container } = render(<UmcLogoLockup />)
    const lockup = lockupOf(container)
    expect(lockup.tagName).toBe("SPAN")
    expect(lockup).toHaveAttribute("data-context", "main")
    expect(lockup).not.toHaveAttribute("data-labeled")
    expect(screen.getByRole("img", { name: "UMC" })).toHaveAttribute(
      "height",
      "22",
    )
    expect(
      container.querySelector(".umc-logo-lockup__label"),
    ).not.toBeInTheDocument()
  })

  it("operation은 맥락 이름과 기수 서수를 붙이고 로고를 줄인다", () => {
    const { container } = render(
      <UmcLogoLockup context="operation" generation={11} />,
    )
    const lockup = lockupOf(container)
    expect(lockup).toHaveAttribute("data-context", "operation")
    expect(lockup).toHaveAttribute("data-labeled", "")
    expect(lockup).toHaveTextContent("Operation 11th")
    expect(screen.getByText("Operation")).toHaveClass("umc-logo-lockup__title")
    expect(screen.getByText("11th")).toHaveClass("umc-logo-lockup__subtitle")
    expect(screen.getByRole("img", { name: "UMC" })).toHaveAttribute(
      "height",
      "21.9287",
    )
  })

  it.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
    [11, "11th"],
    [12, "12th"],
    [13, "13th"],
    [21, "21st"],
    [22, "22nd"],
  ])("study %i기는 %s로 쓴다", (generation, ordinal) => {
    render(<UmcLogoLockup context="study" generation={generation} />)
    expect(screen.getByText(ordinal)).toBeInTheDocument()
  })

  it.each([0, -1, 1.5])("기수가 %s이면 서수 줄을 뺀다", (generation) => {
    const { container } = render(
      <UmcLogoLockup context="study" generation={generation} />,
    )
    expect(screen.getByText("Study")).toBeInTheDocument()
    expect(
      container.querySelector(".umc-logo-lockup__subtitle"),
    ).not.toBeInTheDocument()
  })

  it("product-tech는 Product와 Tech 두 줄이다", () => {
    const { container } = render(<UmcLogoLockup context="product-tech" />)
    expect(lockupOf(container)).toHaveTextContent("Product Tech")
  })

  it("className, ref, span 속성을 전달한다", () => {
    const ref = createRef<HTMLSpanElement>()
    const { container } = render(
      <UmcLogoLockup ref={ref} className="extra" id="brand" title="UMC" />,
    )
    const lockup = lockupOf(container)
    expect(lockup).toHaveClass("umc-logo-lockup", "extra")
    expect(lockup).toHaveAttribute("id", "brand")
    expect(ref.current).toBe(lockup)
  })
})
