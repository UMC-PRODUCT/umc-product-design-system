import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  HeaderProfileMenu,
  type HeaderProfileMenuProps,
} from "./HeaderProfileMenu.tsx"

const PROFILE: HeaderProfileMenuProps["profile"] = {
  nickname: "닉네임",
  name: "김유엠",
  school: "한국대 ERICA",
  role: { label: "챌린저", color: "challenger-super-admin" },
}

const GENERATIONS: HeaderProfileMenuProps["generations"] = [
  { value: "11", label: "11기", caption: "2026" },
  { value: "10", label: "10기", caption: "2026" },
  { value: "9", label: "9기", caption: "2025" },
]

const renderMenu = (props: Partial<HeaderProfileMenuProps> = {}) =>
  render(
    <HeaderProfileMenu
      profile={PROFILE}
      generations={GENERATIONS}
      defaultGeneration="11"
      {...props}
    />,
  )

const openMenu = async () => {
  const user = userEvent.setup()
  await user.click(screen.getByRole("button", { name: "프로필 메뉴" }))
  await screen.findByRole("menu")
  return user
}

describe("HeaderProfileMenu", () => {
  it("사진이 없으면 아바타에 기본 사람 그림을 그린다", () => {
    renderMenu()
    const trigger = screen.getByRole("button", { name: "프로필 메뉴" })
    expect(
      trigger.querySelector(".umc-header-profile__silhouette"),
    ).not.toBeNull()
    expect(trigger.querySelector("img")).toBeNull()
  })

  it("imageSrc를 넘기면 아바타에 사진을 그린다", () => {
    renderMenu({ profile: { ...PROFILE, imageSrc: "/me.png" } })
    const image = screen
      .getByRole("button", { name: "프로필 메뉴" })
      .querySelector("img")
    expect(image).toHaveAttribute("src", "/me.png")
    expect(image).toHaveAttribute("alt", "")
  })

  it("triggerLabel로 아바타 버튼 이름을 바꾼다", () => {
    renderMenu({ triggerLabel: "김유엠 계정 메뉴" })
    expect(
      screen.getByRole("button", { name: "김유엠 계정 메뉴" }),
    ).toBeInTheDocument()
  })

  it("열면 닉네임, 이름, 학교, 역할 태그를 메뉴 설명으로 보여 준다", async () => {
    renderMenu()
    await openMenu()
    const menu = screen.getByRole("menu")
    expect(menu).toHaveAccessibleDescription(/닉네임\s*\/\s*김유엠/)
    expect(menu).toHaveAccessibleDescription(/한국대 ERICA/)
    expect(screen.getByText("챌린저")).toHaveClass("umc-role-tag")
    expect(screen.getByText("챌린저")).toHaveAttribute("data-size", "md")
  })

  it("기수 목록은 기수 변경이라는 이름의 하나만 고르는 목록이다", async () => {
    renderMenu()
    await openMenu()
    const group = screen.getByRole("group", { name: "기수 변경" })
    const items = screen.getAllByRole("menuitemradio")
    expect(items).toHaveLength(GENERATIONS.length)
    items.forEach((item) => expect(group).toContainElement(item))
    expect(screen.getByRole("menuitemradio", { name: /11기/ })).toBeChecked()
    expect(
      screen.getByRole("menuitemradio", { name: /10기/ }),
    ).not.toBeChecked()
  })

  it("기수 항목은 Xs Inline 메뉴 항목으로 그리고 캡션을 같은 줄 끝에 둔다", async () => {
    renderMenu()
    await openMenu()
    const item = screen.getByRole("menuitemradio", { name: /10기/ })
    expect(item).toHaveClass("umc-dropdown-item")
    expect(item).toHaveAttribute("data-size", "xs")
    expect(item).toHaveAttribute("data-layout", "inline")
    expect(item.lastElementChild).toHaveClass("umc-dropdown-item__caption")
    expect(item.lastElementChild).toHaveTextContent("2026")
  })

  it("generationLabel로 목록 이름을 바꾼다", async () => {
    renderMenu({ generationLabel: "기수" })
    await openMenu()
    expect(screen.getByRole("group", { name: "기수" })).toBeInTheDocument()
  })

  it("기수를 고르면 onGenerationChange를 부르고 메뉴를 닫는다", async () => {
    const onGenerationChange = vi.fn()
    renderMenu({ onGenerationChange })
    const user = await openMenu()
    await user.click(screen.getByRole("menuitemradio", { name: /10기/ }))
    expect(onGenerationChange).toHaveBeenCalledWith("10")
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    )
  })

  it("generation을 넘기면 고른 기수를 바깥에서 정한다", async () => {
    renderMenu({ generation: "9", defaultGeneration: undefined })
    await openMenu()
    expect(screen.getByRole("menuitemradio", { name: /9기/ })).toBeChecked()
  })

  it("계정 설정과 로그아웃을 누르면 각 콜백을 부른다", async () => {
    const onAccountSettings = vi.fn()
    const onLogout = vi.fn()
    renderMenu({ onAccountSettings, onLogout })
    let user = await openMenu()
    await user.click(screen.getByRole("menuitem", { name: "계정 설정" }))
    expect(onAccountSettings).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    )
    user = await openMenu()
    await user.click(screen.getByRole("menuitem", { name: "로그아웃" }))
    expect(onLogout).toHaveBeenCalledTimes(1)
  })

  it("로그아웃은 위험 동작 색을 쓰도록 data-tone을 단다", async () => {
    renderMenu()
    await openMenu()
    expect(screen.getByRole("menuitem", { name: "로그아웃" })).toHaveAttribute(
      "data-tone",
      "danger",
    )
  })

  it("open과 onOpenChange로 열림 상태를 바깥에서 다룬다", async () => {
    const onOpenChange = vi.fn()
    renderMenu({ open: true, onOpenChange })
    expect(await screen.findByRole("menu")).toBeInTheDocument()
    const user = userEvent.setup()
    await user.keyboard("{Escape}")
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })
})
