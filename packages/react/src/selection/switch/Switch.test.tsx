import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import { Switch } from "./Switch.tsx"

const wrapperOf = (element: HTMLElement) => {
  const wrapper = element.closest(".umc-switch")
  if (!(wrapper instanceof HTMLElement)) {
    throw new Error("umc-switch 래퍼가 없습니다")
  }
  return wrapper
}

describe("Switch", () => {
  it("라벨로 이름을 받는 스위치를 그리고 기본은 왼쪽 라벨, Sm이다", () => {
    render(<Switch>알림 받기</Switch>)
    const control = screen.getByRole("switch", { name: "알림 받기" })
    const wrapper = wrapperOf(control)
    expect(wrapper).toHaveAttribute("data-size", "sm")
    expect(wrapper.firstElementChild).toHaveClass("umc-switch__label")
  })

  it("labelPlacement=end면 라벨을 스위치 뒤에 둔다", () => {
    render(<Switch labelPlacement="end">공개</Switch>)
    const wrapper = wrapperOf(screen.getByRole("switch", { name: "공개" }))
    expect(wrapper.lastElementChild).toHaveClass("umc-switch__label")
  })

  it("라벨을 누르면 켜지고 onCheckedChange에 새 값을 넘긴다", async () => {
    const onCheckedChange = vi.fn()
    render(<Switch onCheckedChange={onCheckedChange}>알림 받기</Switch>)
    await userEvent.click(screen.getByText("알림 받기"))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true")
  })

  it("비활성이면 바뀌지 않는다", async () => {
    const onCheckedChange = vi.fn()
    render(
      <Switch disabled onCheckedChange={onCheckedChange}>
        알림 받기
      </Switch>,
    )
    await userEvent.click(screen.getByText("알림 받기"))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it("제어 모드에서는 checked를 따른다", async () => {
    function Controlled() {
      const [checked, setChecked] = useState(true)
      return (
        <Switch checked={checked} onCheckedChange={setChecked}>
          알림 받기
        </Switch>
      )
    }
    render(<Controlled />)
    const control = screen.getByRole("switch")
    expect(control).toHaveAttribute("aria-checked", "true")
    await userEvent.click(control)
    expect(control).toHaveAttribute("aria-checked", "false")
  })

  it("name과 value로 폼에 값을 낸다", () => {
    render(
      <form aria-label="설정">
        <Switch name="notify" value="yes" defaultChecked>
          알림 받기
        </Switch>
      </form>,
    )
    const form = screen.getByRole("form") as HTMLFormElement
    expect(new FormData(form).get("notify")).toBe("yes")
  })

  it("라벨이 없으면 바깥 label의 htmlFor로 이름을 받는다", () => {
    render(
      <>
        <label htmlFor="dark-mode">다크 모드</label>
        <Switch id="dark-mode" />
      </>,
    )
    expect(
      screen.getByRole("switch", { name: "다크 모드" }),
    ).toBeInTheDocument()
  })

  it("라벨 없이 쓰면 aria-label로 이름을 준다", () => {
    render(<Switch aria-label="다크 모드" size="md" />)
    expect(
      screen.getByRole("switch", { name: "다크 모드" }),
    ).toBeInTheDocument()
    expect(document.querySelector(".umc-switch__label")).toBeNull()
  })
})
