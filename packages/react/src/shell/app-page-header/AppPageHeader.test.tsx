import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { AppPageHeader } from "./AppPageHeader.tsx"

describe("AppPageHeader", () => {
  it("제목은 h1, 부제는 문단으로 그린다", () => {
    render(
      <AppPageHeader title="학습 일정" subtitle="이번 주 일정을 확인해요" />,
    )
    expect(
      screen.getByRole("heading", { level: 1, name: "학습 일정" }),
    ).toBeInTheDocument()
    expect(screen.getByText("이번 주 일정을 확인해요").tagName).toBe("P")
  })

  it("back이나 actions가 없으면 내비게이션 줄을 그리지 않는다", () => {
    const { container } = render(<AppPageHeader title="학습 일정" />)
    expect(
      container.querySelector(".umc-top-navigation"),
    ).not.toBeInTheDocument()
  })

  it("back을 넘기면 제목 없는 내비게이션 줄에 뒤로 가기를 그린다", async () => {
    const user = userEvent.setup()
    const handleBack = vi.fn()
    const { container } = render(
      <AppPageHeader title="학습 일정" back={{ onClick: handleBack }} />,
    )
    expect(
      container.querySelector(".umc-top-navigation__title"),
    ).toBeEmptyDOMElement()
    await user.click(screen.getByRole("button", { name: "뒤로 가기" }))
    expect(handleBack).toHaveBeenCalledTimes(1)
  })

  it("actions만 넘겨도 내비게이션 줄을 그린다", () => {
    render(
      <AppPageHeader
        title="학습 일정"
        actions={<button type="button">알림</button>}
      />,
    )
    expect(screen.getByRole("button", { name: "알림" })).toBeInTheDocument()
  })

  it("제목과 부제가 모두 없으면 글 묶음을 그리지 않는다", () => {
    const { container } = render(<AppPageHeader back={{}} />)
    expect(
      container.querySelector(".umc-app-page-header__text"),
    ).not.toBeInTheDocument()
  })

  it("margin 기본값은 16이고 20을 고를 수 있다", () => {
    const { container, rerender } = render(<AppPageHeader title="학습 일정" />)
    const root = container.querySelector(".umc-app-page-header")
    expect(root).toHaveAttribute("data-margin", "16")
    rerender(<AppPageHeader title="학습 일정" margin={20} />)
    expect(root).toHaveAttribute("data-margin", "20")
  })

  it("className을 루트에 붙인다", () => {
    const { container } = render(
      <AppPageHeader title="학습 일정" className="custom" />,
    )
    expect(container.querySelector(".umc-app-page-header")).toHaveClass(
      "custom",
    )
  })
})
