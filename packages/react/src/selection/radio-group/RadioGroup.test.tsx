import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import { Radio, RadioGroup } from "./RadioGroup.tsx"

describe("RadioGroup", () => {
  it("라디오 그룹과 항목을 역할에 맞게 그린다", () => {
    render(
      <RadioGroup aria-label="모집 유형" defaultValue="regular">
        <Radio value="regular" aria-label="정규 모집" />
        <Radio value="extra" aria-label="추가 모집" />
      </RadioGroup>,
    )
    expect(
      screen.getByRole("radiogroup", { name: "모집 유형" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "정규 모집" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
    expect(screen.getByRole("radio", { name: "추가 모집" })).toHaveAttribute(
      "aria-checked",
      "false",
    )
  })

  it("label로 감싸면 라벨을 눌러 고르고 onValueChange에 값을 넘긴다", async () => {
    const onValueChange = vi.fn()
    render(
      <RadioGroup aria-label="모집 유형" onValueChange={onValueChange}>
        <label>
          <Radio value="regular" />
          정규 모집
        </label>
        <label>
          <Radio value="extra" />
          추가 모집
        </label>
      </RadioGroup>,
    )
    await userEvent.click(screen.getByText("추가 모집"))
    expect(onValueChange).toHaveBeenCalledWith("extra")
    expect(screen.getByRole("radio", { name: "추가 모집" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
  })

  it("color를 data 속성으로 옮기고 기본은 neutral이다", () => {
    render(
      <RadioGroup aria-label="색">
        <Radio value="a" aria-label="기본" />
        <Radio value="b" aria-label="강조" color="primary" />
      </RadioGroup>,
    )
    expect(screen.getByRole("radio", { name: "기본" })).toHaveAttribute(
      "data-color",
      "neutral",
    )
    expect(screen.getByRole("radio", { name: "강조" })).toHaveAttribute(
      "data-color",
      "primary",
    )
  })

  it("제어 모드에서 null로 선택 없음을 나타내고 고르면 값을 받는다", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    function Controlled() {
      const [value, setValue] = useState<string | null>(null)
      return (
        <RadioGroup aria-label="차수" value={value} onValueChange={setValue}>
          <Radio value="first" aria-label="1차" />
          <Radio value="second" aria-label="2차" />
        </RadioGroup>
      )
    }
    render(<Controlled />)
    expect(screen.getByRole("radio", { name: "1차" })).toHaveAttribute(
      "aria-checked",
      "false",
    )
    await userEvent.click(screen.getByRole("radio", { name: "2차" }))
    expect(screen.getByRole("radio", { name: "2차" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
    expect(consoleError).not.toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it("name으로 고른 값을 폼에 낸다", () => {
    render(
      <form aria-label="모집">
        <RadioGroup aria-label="모집 유형" name="type" defaultValue="extra">
          <Radio value="regular" aria-label="정규 모집" />
          <Radio value="extra" aria-label="추가 모집" />
        </RadioGroup>
      </form>,
    )
    const form = screen.getByRole("form") as HTMLFormElement
    expect(new FormData(form).get("type")).toBe("extra")
  })

  it("비활성 항목은 고를 수 없다", async () => {
    const onValueChange = vi.fn()
    render(
      <RadioGroup aria-label="차수" onValueChange={onValueChange}>
        <Radio value="first" aria-label="1차" disabled />
      </RadioGroup>,
    )
    await userEvent.click(screen.getByRole("radio", { name: "1차" }))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
