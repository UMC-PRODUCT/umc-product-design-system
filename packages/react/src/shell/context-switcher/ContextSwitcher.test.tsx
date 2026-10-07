import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it, vi } from "vitest"

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
})
