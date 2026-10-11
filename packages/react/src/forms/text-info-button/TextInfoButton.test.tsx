import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { TextInfoButton } from "./TextInfoButton.tsx"

describe("TextInfoButton", () => {
  it("type=button인 버튼으로 렌더해 폼 제출을 일으키지 않는다", () => {
    render(<TextInfoButton>개별 지원 코드란?</TextInfoButton>)
    expect(
      screen.getByRole("button", { name: "개별 지원 코드란?" }),
    ).toHaveAttribute("type", "button")
  })

  it("정보 아이콘을 장식 요소로 함께 렌더한다", () => {
    render(<TextInfoButton>개별 지원 코드란?</TextInfoButton>)
    const icon = screen.getByRole("button").querySelector("svg")
    expect(icon).toHaveAttribute("aria-hidden", "true")
  })

  it("누르면 onClick을 호출한다", async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<TextInfoButton onClick={onClick}>재전송</TextInfoButton>)
    await user.click(screen.getByRole("button", { name: "재전송" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
