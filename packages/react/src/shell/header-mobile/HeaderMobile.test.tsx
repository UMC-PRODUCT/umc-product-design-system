import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { HeaderMobile } from "./HeaderMobile.tsx"

const navItems = [
  { label: "소개", href: "/about" },
  { label: "팀 매칭", href: "/matching" },
  { label: "지원하기", href: "/apply" },
]

describe("HeaderMobile", () => {
  it("처음에는 메뉴를 닫아 두고 메뉴 열기 버튼을 그린다", () => {
    render(<HeaderMobile logo={<span>UMC</span>} navItems={navItems} />)
    const toggle = screen.getByRole("button", { name: "메뉴 열기" })
    expect(toggle).toHaveAttribute("aria-expanded", "false")
    expect(toggle).not.toHaveAttribute("aria-controls")
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("버튼을 누르면 메뉴를 열고 버튼이 메뉴를 가리킨다", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <HeaderMobile logo={<span>UMC</span>} navItems={navItems} />,
    )
    await user.click(screen.getByRole("button", { name: "메뉴 열기" }))

    const toggle = screen.getByRole("button", { name: "메뉴 닫기" })
    expect(toggle).toHaveAttribute("aria-expanded", "true")
    const menuId = toggle.getAttribute("aria-controls") ?? ""
    expect(container.querySelector(`[id="${menuId}"]`)).toHaveClass(
      "umc-header-mobile__menu",
    )
    expect(screen.getByRole("navigation")).toHaveAccessibleName(
      "메인 내비게이션",
    )
    expect(container.querySelector(".umc-header-mobile")).toHaveAttribute(
      "data-open",
      "",
    )
  })

  it("현재 경로와 일치하는 메뉴에 aria-current='page'를 단다", () => {
    render(
      <HeaderMobile
        logo={<span>UMC</span>}
        navItems={navItems}
        currentPath="/matching/12"
        defaultOpen
      />,
    )
    expect(screen.getByRole("link", { name: "팀 매칭" })).toHaveAttribute(
      "aria-current",
      "page",
    )
    expect(screen.getByRole("link", { name: "소개" })).not.toHaveAttribute(
      "aria-current",
    )
  })

  it("메뉴 항목을 누르면 메뉴를 닫는다", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <HeaderMobile
        logo={<span>UMC</span>}
        navItems={[{ label: "소개", href: "#about" }]}
        defaultOpen
        onOpenChange={onOpenChange}
      />,
    )
    await user.click(screen.getByRole("link", { name: "소개" }))
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("Esc를 누르면 메뉴를 닫고 버튼으로 포커스를 돌린다", async () => {
    const user = userEvent.setup()
    render(
      <HeaderMobile logo={<span>UMC</span>} navItems={navItems} defaultOpen />,
    )
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "메뉴 열기" })).toHaveFocus()
  })

  it("헤더 바깥을 누르면 메뉴를 닫는다", async () => {
    const user = userEvent.setup()
    render(
      <>
        <HeaderMobile logo={<span>UMC</span>} navItems={navItems} defaultOpen />
        <p>본문</p>
      </>,
    )
    await user.click(screen.getByText("본문"))
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("open을 넘기면 열림 상태를 앱이 정한다", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <HeaderMobile
        logo={<span>UMC</span>}
        navItems={navItems}
        open={false}
        onOpenChange={onOpenChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "메뉴 열기" }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("actions를 메뉴 아래쪽에 그린다", () => {
    render(
      <HeaderMobile
        logo={<span>UMC</span>}
        navItems={navItems}
        actions={<button type="button">지원하기</button>}
        defaultOpen
      />,
    )
    expect(
      screen.getByRole("button", { name: "지원하기" }).parentElement,
    ).toHaveClass("umc-header-mobile__menu-actions")
  })

  it("메뉴에 넣을 내용이 없으면 메뉴 버튼을 그리지 않는다", () => {
    render(<HeaderMobile logo={<span>UMC</span>} navItems={[]} />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("logo를 넘기지 않으면 UMC 홈 링크를 그리고 data-mode를 붙인다", () => {
    const { container } = render(<HeaderMobile mode="dark" />)
    expect(screen.getByRole("link", { name: "UMC" })).toHaveAttribute(
      "href",
      "/",
    )
    expect(container.querySelector(".umc-header-mobile")).toHaveAttribute(
      "data-mode",
      "dark",
    )
  })

  it("버튼 이름을 바꿀 수 있다", async () => {
    const user = userEvent.setup()
    render(
      <HeaderMobile
        logo={<span>UMC</span>}
        navItems={navItems}
        openLabel="전체 메뉴"
        closeLabel="전체 메뉴 닫기"
      />,
    )
    await user.click(screen.getByRole("button", { name: "전체 메뉴" }))
    expect(
      screen.getByRole("button", { name: "전체 메뉴 닫기" }),
    ).toBeInTheDocument()
  })
})
