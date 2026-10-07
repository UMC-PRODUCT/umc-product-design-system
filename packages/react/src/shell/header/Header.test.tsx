import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { LinkProvider } from "../link-provider/LinkProvider.tsx"
import { Header } from "./Header.tsx"

const navItems = [
  { label: "소개", href: "/about" },
  { label: "팀 매칭", href: "/matching" },
  { label: "지원하기", href: "/apply" },
]

describe("Header", () => {
  it("현재 경로와 일치하는 메뉴에 aria-current='page'를 단다", () => {
    render(
      <Header
        logo={<span>UMC</span>}
        navItems={navItems}
        currentPath="/matching"
      />,
    )
    const active = screen.getByRole("link", { name: "팀 매칭" })
    expect(active).toHaveAttribute("aria-current", "page")

    const inactive = screen.getByRole("link", { name: "소개" })
    expect(inactive).not.toHaveAttribute("aria-current")
  })

  it("actions 슬롯을 렌더한다", () => {
    render(<Header logo={<span>UMC</span>} actions={<button>로그인</button>} />)
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument()
  })

  it("data-mode 속성을 루트 요소에 붙인다", () => {
    const { container } = render(<Header logo={<span>UMC</span>} mode="dark" />)
    expect(container.querySelector(".umc-header")).toHaveAttribute(
      "data-mode",
      "dark",
    )
  })

  it("기본 mode는 light다", () => {
    const { container } = render(<Header logo={<span>UMC</span>} />)
    expect(container.querySelector(".umc-header")).toHaveAttribute(
      "data-mode",
      "light",
    )
  })

  it("navItems가 없으면 nav 요소를 렌더하지 않는다", () => {
    render(<Header logo={<span>UMC</span>} />)
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("등록한 링크 컴포넌트로 nav 항목을 렌더한다", () => {
    function CustomLink({
      href,
      children,
      ...rest
    }: {
      href: string
      children?: React.ReactNode
      "aria-current"?: "page" | "step"
    }) {
      return (
        <a href={href} data-custom="true" {...rest}>
          {children}
        </a>
      )
    }
    render(
      <LinkProvider component={CustomLink}>
        <Header
          logo={<span>UMC</span>}
          navItems={navItems}
          currentPath="/about"
        />
      </LinkProvider>,
    )
    const links = screen.getAllByRole("link")
    links.forEach((link) => {
      expect(link).toHaveAttribute("data-custom", "true")
    })
  })

  it("nav 요소에 aria-label이 있다", () => {
    render(<Header logo={<span>UMC</span>} navItems={navItems} />)
    expect(screen.getByRole("navigation")).toHaveAccessibleName(
      "메인 내비게이션",
    )
  })
})
