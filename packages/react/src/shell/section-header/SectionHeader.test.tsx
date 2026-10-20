import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { SectionHeader } from "./SectionHeader.tsx"

const rootOf = () => document.querySelector(".umc-section-header")

describe("SectionHeader", () => {
  it("title을 h2 제목으로 그린다", () => {
    render(<SectionHeader title="기본 정보" />)
    expect(
      screen.getByRole("heading", { level: 2, name: "기본 정보" }),
    ).toBeInTheDocument()
  })

  it("level로 제목 단계를 바꾼다", () => {
    render(<SectionHeader title="자기소개" level={3} />)
    expect(
      screen.getByRole("heading", { level: 3, name: "자기소개" }),
    ).toBeInTheDocument()
  })

  it("number를 넘기면 제목 앞에 번호를 그린다", () => {
    render(<SectionHeader title="기본 정보" number="01" />)
    expect(
      document.querySelector(".umc-section-header__number"),
    ).toHaveTextContent("01")
  })

  it("number가 없으면 번호 칸을 그리지 않는다", () => {
    render(<SectionHeader title="기본 정보" />)
    expect(document.querySelector(".umc-section-header__number")).toBeNull()
  })

  it("required이면 별표를 보여 주고 화면 낭독기에는 필수로 읽힌다", () => {
    render(<SectionHeader title="자기소개" required />)
    expect(
      screen.getByRole("heading", { name: /^자기소개\s?\(필수\)$/ }),
    ).toBeInTheDocument()
    expect(
      document.querySelector(".umc-section-header__required"),
    ).toHaveAttribute("aria-hidden", "true")
  })

  it("description과 slot은 넘길 때만 그린다", () => {
    const { rerender } = render(<SectionHeader title="지원 현황" />)
    expect(
      document.querySelector(".umc-section-header__description"),
    ).toBeNull()
    expect(document.querySelector(".umc-section-header__slot")).toBeNull()

    rerender(
      <SectionHeader
        title="지원 현황"
        description="차수별 지원자 수입니다"
        slot={<span>26.10.19 14:00 기준</span>}
      />,
    )
    expect(screen.getByText("차수별 지원자 수입니다")).toHaveClass(
      "umc-section-header__description",
    )
    expect(
      document.querySelector(".umc-section-header__slot"),
    ).toHaveTextContent("26.10.19 14:00 기준")
  })

  it("기본 크기는 lg이고 size를 data-size로 옮긴다", () => {
    const { rerender } = render(<SectionHeader title="기본 정보" />)
    expect(rootOf()).toHaveAttribute("data-size", "lg")
    rerender(<SectionHeader title="기본 정보" size="sm" />)
    expect(rootOf()).toHaveAttribute("data-size", "sm")
  })

  it("className과 네이티브 속성을 루트에 붙이고 ref를 넘긴다", () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <SectionHeader
        ref={ref}
        title="기본 정보"
        className="mt-8"
        data-testid="section"
      />,
    )
    const root = screen.getByTestId("section")
    expect(root).toHaveClass("umc-section-header", "mt-8")
    expect(ref.current).toBe(root)
  })
})
