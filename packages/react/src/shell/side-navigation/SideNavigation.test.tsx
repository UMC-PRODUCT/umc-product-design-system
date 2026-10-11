import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it } from "vitest"

import { SideNavigation } from "./SideNavigation.tsx"

beforeAll(() => {
  if (!HTMLElement.prototype.getAnimations) {
    HTMLElement.prototype.getAnimations = () => []
  }
  if (typeof window.PointerEvent === "undefined") {
    window.PointerEvent = MouseEvent as typeof PointerEvent
  }
})

const items = [
  {
    label: "전체보기",
    href: "/projects",
  },
  {
    label: "팀 매칭",
    children: [
      { label: "지원현황", href: "/matching/status" },
      { label: "매칭 현황", href: "/matching/result" },
    ],
  },
  {
    label: "설정",
    href: "/settings",
  },
]

describe("SideNavigation", () => {
  it("현재 경로를 포함한 그룹이 처음에 펼쳐진다", async () => {
    render(<SideNavigation items={items} currentPath="/matching/status" />)
    expect(screen.getByRole("link", { name: "지원현황" })).toBeInTheDocument()
  })

  it("현재 경로를 포함하지 않는 그룹은 처음에 닫혀 있다", () => {
    const otherItems = [
      {
        label: "팀 A",
        children: [
          { label: "항목 1", href: "/a/1" },
          { label: "항목 2", href: "/a/2" },
        ],
      },
      {
        label: "팀 B",
        children: [{ label: "항목 3", href: "/b/1" }],
      },
    ]
    render(<SideNavigation items={otherItems} currentPath="/b/1" />)
    expect(
      screen.queryByRole("link", { name: "항목 1" }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "항목 3" })).toBeInTheDocument()
  })

  it("그룹 버튼을 누르면 aria-expanded가 바뀐다", async () => {
    const user = userEvent.setup()
    render(<SideNavigation items={items} currentPath="/projects" />)
    const trigger = screen.getByRole("button", { name: /팀 매칭/i })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("여러 그룹을 동시에 펼칠 수 있다", async () => {
    const user = userEvent.setup()
    const multiItems = [
      {
        label: "그룹 A",
        children: [{ label: "A1", href: "/a/1" }],
      },
      {
        label: "그룹 B",
        children: [{ label: "B1", href: "/b/1" }],
      },
    ]
    render(<SideNavigation items={multiItems} />)
    const [triggerA, triggerB] = screen.getAllByRole("button")
    await user.click(triggerA!)
    await user.click(triggerB!)
    expect(triggerA).toHaveAttribute("aria-expanded", "true")
    expect(triggerB).toHaveAttribute("aria-expanded", "true")
  })

  it("활성 하위 항목에 aria-current='page'를 단다", () => {
    render(<SideNavigation items={items} currentPath="/matching/status" />)
    const active = screen.getByRole("link", { name: "지원현황" })
    expect(active).toHaveAttribute("aria-current", "page")
    const inactive = screen.getByRole("link", { name: "매칭 현황" })
    expect(inactive).not.toHaveAttribute("aria-current")
  })

  it("slot을 렌더한다", () => {
    render(<SideNavigation items={items} slot={<input placeholder="검색" />} />)
    expect(screen.getByPlaceholderText("검색")).toBeInTheDocument()
  })

  it("aria-label을 nav 요소에 붙인다", () => {
    render(<SideNavigation items={items} aria-label="관리 메뉴" />)
    expect(screen.getByRole("navigation")).toHaveAccessibleName("관리 메뉴")
  })

  it("경로가 여러 항목과 겹치면 가장 구체적인 항목 하나만 선택한다", () => {
    const nestedItems = [
      {
        label: "매칭 관리",
        children: [
          { label: "매칭 목록", href: "/matching" },
          { label: "매칭 현황", href: "/matching/status" },
        ],
      },
    ]
    render(
      <SideNavigation items={nestedItems} currentPath="/matching/status/3" />,
    )
    expect(screen.getByRole("link", { name: "매칭 현황" })).toHaveAttribute(
      "aria-current",
      "page",
    )
    expect(screen.getByRole("link", { name: "매칭 목록" })).not.toHaveAttribute(
      "aria-current",
    )
  })

  it("경로가 닫힌 그룹 안으로 바뀌면 그 그룹을 펼치고 열려 있던 그룹은 유지한다", () => {
    const groupItems = [
      { label: "그룹 A", children: [{ label: "A1", href: "/a/1" }] },
      { label: "그룹 B", children: [{ label: "B1", href: "/b/1" }] },
    ]
    const { rerender } = render(
      <SideNavigation items={groupItems} currentPath="/a/1" />,
    )
    expect(screen.queryByRole("link", { name: "B1" })).not.toBeInTheDocument()
    rerender(<SideNavigation items={groupItems} currentPath="/b/1" />)
    expect(screen.getByRole("link", { name: "B1" })).toHaveAttribute(
      "aria-current",
      "page",
    )
    expect(screen.getByRole("link", { name: "A1" })).toBeInTheDocument()
  })

  it("현재 경로를 담은 그룹 버튼과 링크 항목에 선택 상태를 표시한다", () => {
    const { container, rerender } = render(
      <SideNavigation items={items} currentPath="/matching/status" />,
    )
    const groupInner = screen
      .getByRole("button", { name: "팀 매칭" })
      .querySelector(".umc-side-navigation__item-inner")
    expect(groupInner).toHaveAttribute("data-selected")
    rerender(<SideNavigation items={items} currentPath="/settings" />)
    expect(screen.getByRole("link", { name: "설정" })).toHaveAttribute(
      "aria-current",
      "page",
    )
    expect(
      container.querySelectorAll(
        ".umc-side-navigation__item-inner[data-selected]",
      ),
    ).toHaveLength(1)
  })

  it("아이콘을 장식 요소로 렌더한다", () => {
    render(
      <SideNavigation
        items={[
          { label: "대시보드", href: "/", icon: <svg data-testid="icon" /> },
        ]}
      />,
    )
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    )
  })
})
