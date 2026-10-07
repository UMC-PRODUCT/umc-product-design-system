import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { HeaderActionButton } from "./HeaderActionButton.tsx"

describe("HeaderActionButton", () => {
  it("type=button인 버튼으로 렌더해 폼 제출을 일으키지 않는다", () => {
    render(<HeaderActionButton>문의사항</HeaderActionButton>)
    expect(screen.getByRole("button", { name: "문의사항" })).toHaveAttribute(
      "type",
      "button",
    )
  })

  it("suffix를 장식 요소로 붙인다", () => {
    render(
      <HeaderActionButton suffix={<svg data-testid="chevron" />}>
        내 정보
      </HeaderActionButton>,
    )
    expect(screen.getByTestId("chevron").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    )
    expect(screen.getByRole("button")).toHaveAccessibleName("내 정보")
  })

  it("누르면 onClick을 호출한다", async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<HeaderActionButton onClick={onClick}>문의사항</HeaderActionButton>)
    await user.click(screen.getByRole("button", { name: "문의사항" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
