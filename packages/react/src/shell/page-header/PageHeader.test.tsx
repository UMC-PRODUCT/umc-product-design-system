import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PageHeader } from "./PageHeader.tsx"

const breadcrumbs = [
  { label: "홈", href: "#" },
  { label: "팀 매칭", href: "#matching" },
  { label: "전체보기" },
]

describe("PageHeader", () => {
  it("breadcrumbs가 nav 안의 ol 목록으로 렌더된다", () => {
    render(<PageHeader title="전체보기" breadcrumbs={breadcrumbs} />)
    const nav = screen.getByRole("navigation", { name: "브레드크럼" })
    expect(nav).toBeInTheDocument()
    expect(nav.querySelector("ol")).toBeInTheDocument()
  })

  it("마지막 항목에 aria-current='page'를 단다", () => {
    render(<PageHeader title="전체보기" breadcrumbs={breadcrumbs} />)
    const items = screen.getAllByText(/홈|팀 매칭|전체보기/)
    const last = items.find((el) => el.textContent === "전체보기")
    expect(last).toHaveAttribute("aria-current", "page")
  })

  it("description이 없으면 렌더하지 않는다", () => {
    const { container } = render(<PageHeader title="페이지" />)
    expect(
      container.querySelector(".umc-page-header__description"),
    ).not.toBeInTheDocument()
  })

  it("description이 있으면 렌더한다", () => {
    render(<PageHeader title="페이지" description="페이지 설명입니다." />)
    expect(screen.getByText("페이지 설명입니다.")).toBeInTheDocument()
  })

  it("title이 h1 요소로 렌더된다", () => {
    render(<PageHeader title="내 페이지" />)
    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toHaveTextContent("내 페이지")
  })

  it("breadcrumbs가 없으면 nav를 렌더하지 않는다", () => {
    render(<PageHeader title="페이지" />)
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })
})
