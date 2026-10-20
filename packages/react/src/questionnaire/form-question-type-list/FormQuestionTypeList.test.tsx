import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CheckboxIcon, RadioIcon, TextLineIcon } from "@umc-product/icons"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import {
  FormQuestionTypeList,
  type FormQuestionTypeOption,
} from "./FormQuestionTypeList.tsx"

const TYPES: readonly FormQuestionTypeOption[] = [
  { value: "short", label: "주관식", icon: <TextLineIcon /> },
  { value: "single", label: "단일 선택", icon: <RadioIcon /> },
  { value: "multiple", label: "복수 선택", icon: <CheckboxIcon /> },
]

describe("FormQuestionTypeList", () => {
  it("질문 유형이라는 이름의 묶음 안에 라벨을 이름으로 가진 버튼을 그린다", () => {
    render(<FormQuestionTypeList items={TYPES} />)
    const group = screen.getByRole("group", { name: "질문 유형" })
    expect(group).toHaveClass("umc-form-question-type-list")
    const button = screen.getByRole("button", { name: "단일 선택" })
    expect(button).toHaveAttribute("aria-pressed", "false")
    expect(
      button.querySelector(".umc-form-question-type-list__icon"),
    ).toHaveAttribute("aria-hidden", "true")
  })

  it("누르면 그 값을 넘기고 그 버튼만 눌림 상태가 된다", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <FormQuestionTypeList
        items={TYPES}
        defaultValue="short"
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "복수 선택" }))
    expect(onValueChange).toHaveBeenCalledWith("multiple")
    expect(screen.getByRole("button", { name: "복수 선택" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
    expect(screen.getByRole("button", { name: "주관식" })).toHaveAttribute(
      "aria-pressed",
      "false",
    )
  })

  it("눌린 버튼을 다시 눌러도 선택을 풀지 않는다", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <FormQuestionTypeList
        items={TYPES}
        defaultValue="short"
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "주관식" }))
    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole("button", { name: "주관식" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
  })

  it("value를 넘기면 그 값을 따른다", async () => {
    function Controlled() {
      const [type, setType] = useState<string | null>("single")
      return (
        <FormQuestionTypeList
          items={TYPES}
          value={type}
          onValueChange={setType}
        />
      )
    }
    const user = userEvent.setup()
    render(<Controlled />)
    expect(screen.getByRole("button", { name: "단일 선택" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
    await user.click(screen.getByRole("button", { name: "주관식" }))
    expect(screen.getByRole("button", { name: "주관식" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
  })

  it("disabled이면 눌러도 값을 넘기지 않는다", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <FormQuestionTypeList
        items={TYPES}
        onValueChange={onValueChange}
        disabled
      />,
    )
    await user.click(screen.getByRole("button", { name: "주관식" }))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
