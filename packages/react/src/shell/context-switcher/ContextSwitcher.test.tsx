import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactElement } from "react"
import { beforeAll, describe, expect, it, vi } from "vitest"

import {
  LegacyCheckGlyph,
  LegacyExpandMoreGlyph,
} from "../../internal/glyphs.tsx"
import { ContextSwitcher } from "./ContextSwitcher.tsx"

beforeAll(() => {
  if (!HTMLElement.prototype.getAnimations) {
    HTMLElement.prototype.getAnimations = () => []
  }
  if (typeof window.PointerEvent === "undefined") {
    window.PointerEvent = MouseEvent as typeof PointerEvent
  }
})

const options = [
  { value: "admin", label: "관리자 뷰" },
  { value: "challenger", label: "챌린저 뷰" },
  { value: "guest", label: "게스트 뷰" },
]

const svgOf = (element: ReactElement) =>
  render(element).container.querySelector("svg")

const drawingOf = (svg: Element | null | undefined) => ({
  viewBox: svg?.getAttribute("viewBox"),
  content: svg?.innerHTML,
})

describe("ContextSwitcher", () => {
  it("현재 선택된 값의 label을 보여 준다", () => {
    render(
      <ContextSwitcher
        options={options}
        value="admin"
        onValueChange={() => {}}
      />,
    )
    expect(screen.getByText("관리자 뷰")).toBeInTheDocument()
  })

  it("메뉴에서 항목을 선택하면 onValueChange를 호출한다", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <ContextSwitcher
        options={options}
        value="admin"
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("button"))
    const menuItem = await screen.findByRole("menuitemradio", {
      name: "챌린저 뷰",
    })
    await user.click(menuItem)
    expect(onValueChange).toHaveBeenCalledWith("challenger")
  })

  it("선택된 항목에만 체크 표시를 보여 준다", async () => {
    const user = userEvent.setup()
    render(
      <ContextSwitcher
        options={options}
        value="challenger"
        onValueChange={() => {}}
      />,
    )
    await user.click(screen.getByRole("button"))
    const checked = await screen.findByRole("menuitemradio", {
      name: "챌린저 뷰",
    })
    expect(checked).toHaveAttribute("aria-checked", "true")
    expect(
      checked.querySelector(".umc-context-switcher__option-indicator svg"),
    ).not.toBeNull()
    const unchecked = screen.getByRole("menuitemradio", { name: "관리자 뷰" })
    expect(
      unchecked.querySelector(".umc-context-switcher__option-indicator"),
    ).toBeNull()
  })

  it("화살표와 선택 체크는 피그마 컨텍스트 스위처의 16px 그림이다", async () => {
    const user = userEvent.setup()
    render(
      <ContextSwitcher
        options={options}
        value="admin"
        onValueChange={() => {}}
      />,
    )
    const trigger = screen.getByRole("button")
    const chevron = trigger.querySelector(".umc-context-switcher__icon")
    await user.click(trigger)
    const checked = await screen.findByRole("menuitemradio", {
      name: "관리자 뷰",
    })
    const check = checked.querySelector(
      ".umc-context-switcher__option-indicator svg",
    )
    expect(drawingOf(chevron)).toEqual(
      drawingOf(svgOf(<LegacyExpandMoreGlyph />)),
    )
    expect(drawingOf(check)).toEqual(drawingOf(svgOf(<LegacyCheckGlyph />)))
  })
})
