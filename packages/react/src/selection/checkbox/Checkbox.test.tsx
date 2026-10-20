import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import { Field } from "../../forms/field/Field.tsx"
import { Checkbox } from "./Checkbox.tsx"

const wrapperOf = (element: HTMLElement) => {
  const wrapper = element.closest(".umc-checkbox")
  if (!(wrapper instanceof HTMLElement)) {
    throw new Error("umc-checkbox 래퍼가 없습니다")
  }
  return wrapper
}

describe("Checkbox", () => {
  it("라벨로 이름을 받는 체크박스를 그리고 기본은 왼쪽 라벨, Neutral, Md다", () => {
    render(<Checkbox>면접 진행</Checkbox>)
    const checkbox = screen.getByRole("checkbox", { name: "면접 진행" })
    const wrapper = wrapperOf(checkbox)
    expect(wrapper).toHaveAttribute("data-color", "neutral")
    expect(wrapper).toHaveAttribute("data-size", "md")
    expect(wrapper.firstElementChild).toHaveClass("umc-checkbox__label")
  })

  it("labelPlacement=end면 라벨을 체크박스 뒤에 둔다", () => {
    render(<Checkbox labelPlacement="end">PM</Checkbox>)
    const wrapper = wrapperOf(screen.getByRole("checkbox", { name: "PM" }))
    expect(wrapper.lastElementChild).toHaveClass("umc-checkbox__label")
  })

  it("라벨을 끄면 aria-label로 이름을 준다", () => {
    render(<Checkbox aria-label="전체 선택" />)
    expect(
      screen.getByRole("checkbox", { name: "전체 선택" }),
    ).toBeInTheDocument()
    expect(document.querySelector(".umc-checkbox__label")).toBeNull()
  })

  it("라벨을 누르면 체크가 바뀌고 onCheckedChange에 새 값을 넘긴다", async () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox onCheckedChange={onCheckedChange}>Design</Checkbox>)
    await userEvent.click(screen.getByText("Design"))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true")
  })

  it("제어 모드에서는 checked를 따른다", async () => {
    function Controlled() {
      const [checked, setChecked] = useState(true)
      return (
        <Checkbox checked={checked} onCheckedChange={setChecked}>
          Web PE
        </Checkbox>
      )
    }
    render(<Controlled />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveAttribute("aria-checked", "true")
    await userEvent.click(checkbox)
    expect(checkbox).toHaveAttribute("aria-checked", "false")
  })

  it("invalid면 체크박스에 aria-invalid를 단다", () => {
    render(<Checkbox invalid>약관 동의</Checkbox>)
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("비활성이면 눌러도 바뀌지 않는다", async () => {
    const onCheckedChange = vi.fn()
    render(
      <Checkbox disabled onCheckedChange={onCheckedChange}>
        Mobile PE
      </Checkbox>,
    )
    await userEvent.click(screen.getByText("Mobile PE"))
    expect(onCheckedChange).not.toHaveBeenCalled()
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-disabled", "")
  })

  it("Field의 비활성과 오류를 체크박스 상태로 받는다", () => {
    render(
      <Field disabled invalid>
        <Checkbox>약관 동의</Checkbox>
      </Field>,
    )
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveAttribute("data-disabled", "")
    expect(checkbox).toHaveAttribute("data-invalid", "")
  })

  it("readOnly이면 눌러도 바뀌지 않고 읽기 전용으로 알린다", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Checkbox defaultChecked readOnly onCheckedChange={onCheckedChange}>
        지원 파트 PM
      </Checkbox>,
    )
    const checkbox = screen.getByRole("checkbox", { name: "지원 파트 PM" })
    await user.click(checkbox)
    expect(checkbox).toHaveAttribute("aria-checked", "true")
    expect(checkbox).toHaveAttribute("aria-readonly", "true")
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it("라벨이 없으면 바깥 label의 htmlFor로 이름을 받는다", () => {
    render(
      <>
        <label htmlFor="agree">마케팅 수신 동의</label>
        <Checkbox id="agree" />
      </>,
    )
    expect(
      screen.getByRole("checkbox", { name: "마케팅 수신 동의" }),
    ).toBeInTheDocument()
    expect(document.querySelector(".umc-checkbox")?.tagName).toBe("SPAN")
  })

  it("체크하면 크기에 맞는 체크 그림을 그린다", () => {
    const { rerender } = render(
      <Checkbox defaultChecked aria-label="Md 체크" />,
    )
    expect(
      document.querySelector(".umc-checkbox__indicator svg"),
    ).toHaveAttribute("viewBox", "0 0 20 20")
    rerender(<Checkbox defaultChecked size="lg" aria-label="Lg 체크" />)
    expect(
      document.querySelector(".umc-checkbox__indicator svg"),
    ).toHaveAttribute("viewBox", "0 0 24 24")
  })

  it("name과 value로 폼에 값을 낸다", () => {
    render(
      <form aria-label="모집 파트">
        <Checkbox name="part" value="pm" defaultChecked>
          PM
        </Checkbox>
      </form>,
    )
    const form = screen.getByRole("form")
    expect(new FormData(form as HTMLFormElement).getAll("part")).toEqual(["pm"])
  })
})
