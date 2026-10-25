import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FormHeader } from "./FormHeader.tsx"

describe("FormHeader", () => {
  it("제목은 기본 h2이고 부제목과 썸네일을 그린다", () => {
    render(
      <FormHeader
        title="UMC 10기 지원서"
        subtitle="Web"
        thumbnail={<img alt="" src="data:," />}
      />,
    )
    expect(
      screen.getByRole("heading", { level: 2, name: "UMC 10기 지원서" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Web")).toHaveClass("umc-form-header__subtitle")
    expect(
      document.querySelector(".umc-form-header__thumbnail img"),
    ).not.toBeNull()
  })

  it("level로 제목 단계를 바꾼다", () => {
    render(<FormHeader title="지원서" level={3} />)
    expect(
      screen.getByRole("heading", { level: 3, name: "지원서" }),
    ).toBeInTheDocument()
  })

  it("caption을 넘기면 오른쪽 칸을 그리고 없으면 그리지 않는다", () => {
    const { rerender } = render(<FormHeader title="지원서" />)
    expect(document.querySelector(".umc-form-header__caption")).toBeNull()
    rerender(<FormHeader title="지원서" caption="2026-10-25 제출됨" />)
    expect(screen.getByText("2026-10-25 제출됨")).toHaveClass(
      "umc-form-header__caption",
    )
  })

  it("나머지 div 속성과 className을 루트에 붙인다", () => {
    render(<FormHeader title="지원서" className="mt-4" data-testid="header" />)
    expect(screen.getByTestId("header")).toHaveClass("umc-form-header", "mt-4")
  })
})
