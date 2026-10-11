import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  LinkProvider,
  type LinkComponentProps,
} from "../link-provider/LinkProvider.tsx"
import { HeaderHomeLink } from "./HeaderHomeLink.tsx"

const logoOf = (link: HTMLElement) => {
  const logo = link.querySelector("svg")
  if (!logo) {
    throw new Error("로고 svg가 없습니다")
  }
  return logo
}

describe("HeaderHomeLink", () => {
  it("기본값은 루트로 가는 UMC 로고 링크다", () => {
    render(<HeaderHomeLink />)
    const link = screen.getByRole("link", { name: "UMC" })
    expect(link).toHaveAttribute("href", "/")
    expect(link).toHaveClass("umc-header-home-link")
    expect(screen.getByRole("img", { name: "UMC" })).toBeInTheDocument()
  })

  it("Main 로고는 라이브러리 Logo/UMC 크기 74×22로 그린다", () => {
    render(<HeaderHomeLink />)
    const logo = logoOf(screen.getByRole("link"))
    expect(logo).toHaveAttribute("width", "74")
    expect(logo).toHaveAttribute("height", "22")
    expect(
      document.querySelector(".umc-logo-lockup__label"),
    ).not.toBeInTheDocument()
  })

  it("operation은 맥락 이름과 기수 서수를 두 줄로 붙인다", () => {
    render(<HeaderHomeLink context="operation" generation={11} />)
    expect(screen.getByRole("link")).toHaveAccessibleName("UMC Operation 11th")
    expect(screen.getByText("Operation")).toHaveClass("umc-logo-lockup__title")
    expect(screen.getByText("11th")).toHaveClass("umc-logo-lockup__subtitle")
  })

  it("study도 기수 서수를 붙인다", () => {
    render(<HeaderHomeLink context="study" generation={3} />)
    expect(screen.getByRole("link")).toHaveAccessibleName("UMC Study 3rd")
  })

  it("product-tech는 Product와 Tech 두 줄이다", () => {
    render(<HeaderHomeLink context="product-tech" />)
    expect(screen.getByRole("link")).toHaveAccessibleName("UMC Product Tech")
  })

  it("라벨이 있으면 로고를 피그마 크기 73.76×21.93으로 줄인다", () => {
    render(<HeaderHomeLink context="product-tech" />)
    const logo = logoOf(screen.getByRole("link"))
    expect(Number(logo.getAttribute("height"))).toBeCloseTo(21.9287, 4)
    expect(Number(logo.getAttribute("width"))).toBeCloseTo(73.7602, 3)
  })

  it.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
    [4, "4th"],
    [11, "11th"],
    [12, "12th"],
    [13, "13th"],
    [21, "21st"],
    [22, "22nd"],
    [23, "23rd"],
    [101, "101st"],
    [111, "111th"],
  ])("기수 %i는 %s로 쓴다", (generation, ordinal) => {
    render(<HeaderHomeLink context="operation" generation={generation} />)
    expect(screen.getByText(ordinal)).toBeInTheDocument()
  })

  it.each([Number.NaN, 0, -1, 1.5])(
    "기수 %s처럼 1 이상의 정수가 아니면 기수 줄을 그리지 않는다",
    (generation) => {
      render(<HeaderHomeLink context="study" generation={generation} />)
      expect(screen.getByRole("link")).toHaveAccessibleName("UMC Study")
      expect(
        document.querySelector(".umc-logo-lockup__subtitle"),
      ).not.toBeInTheDocument()
    },
  )

  it("href와 className을 받는다", () => {
    render(<HeaderHomeLink href="/admin" className="app-home" />)
    const link = screen.getByRole("link", { name: "UMC" })
    expect(link).toHaveAttribute("href", "/admin")
    expect(link).toHaveClass("umc-header-home-link", "app-home")
  })

  it("등록한 링크 컴포넌트로 렌더한다", () => {
    function RouterLink({ href, className, children }: LinkComponentProps) {
      return (
        <a href={href} className={className} data-router="true">
          {children}
        </a>
      )
    }
    render(
      <LinkProvider component={RouterLink}>
        <HeaderHomeLink />
      </LinkProvider>,
    )
    expect(screen.getByRole("link", { name: "UMC" })).toHaveAttribute(
      "data-router",
      "true",
    )
  })
})
