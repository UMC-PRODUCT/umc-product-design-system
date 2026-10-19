import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import { FormQuestion } from "../form-question/FormQuestion.tsx"
import { FormChoiceList, type FormChoiceOption } from "./FormChoiceList.tsx"

const PARTS: readonly FormChoiceOption[] = [
  { value: "pm", label: "PM" },
  { value: "design", label: "Design" },
  { value: "web", label: "Web" },
]

const optionOf = (label: string) =>
  screen.getByText(label).closest(".umc-form-choice-list__option")

describe("FormChoiceList 단일 선택", () => {
  it("질문 제목을 이름으로 가진 라디오 묶음을 그린다", () => {
    render(
      <FormQuestion title="지원 파트를 골라 주세요" required>
        <FormChoiceList type="single" options={PARTS} />
      </FormQuestion>,
    )
    expect(
      screen.getByRole("radiogroup", { name: "지원 파트를 골라 주세요" }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole("radio")).toHaveLength(3)
    expect(screen.getByRole("radio", { name: "Design" })).toBeInTheDocument()
  })

  it("줄을 누르면 고른 값을 넘기고 그 줄에 선택 표시를 단다", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <FormChoiceList
        type="single"
        options={PARTS}
        onValueChange={onValueChange}
        aria-label="지원 파트"
      />,
    )
    await user.click(screen.getByText("Design"))
    expect(onValueChange).toHaveBeenCalledWith("design")
    expect(screen.getByRole("radio", { name: "Design" })).toBeChecked()
    expect(optionOf("Design")).toHaveAttribute("data-selected", "")
    expect(optionOf("PM")).not.toHaveAttribute("data-selected")
  })

  it("value를 넘기면 그 값을 따른다", async () => {
    function Controlled() {
      const [part, setPart] = useState<string | null>("web")
      return (
        <FormChoiceList
          type="single"
          options={PARTS}
          value={part}
          onValueChange={setPart}
          aria-label="지원 파트"
        />
      )
    }
    const user = userEvent.setup()
    render(<Controlled />)
    expect(screen.getByRole("radio", { name: "Web" })).toBeChecked()
    await user.click(screen.getByText("PM"))
    expect(screen.getByRole("radio", { name: "PM" })).toBeChecked()
  })

  it("읽기 전용 질문 안에서는 눌러도 바뀌지 않는다", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <FormQuestion title="지원 파트" readOnly>
        <FormChoiceList
          type="single"
          options={PARTS}
          defaultValue="pm"
          onValueChange={onValueChange}
        />
      </FormQuestion>,
    )
    await user.click(screen.getByText("Web"))
    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole("radio", { name: "PM" })).toBeChecked()
  })

  it("비활성 보기는 고를 수 없고 줄에 비활성 표시를 단다", async () => {
    const user = userEvent.setup()
    render(
      <FormChoiceList
        type="single"
        options={[
          ...PARTS,
          { value: "mobile", label: "Mobile", disabled: true },
        ]}
        aria-label="지원 파트"
      />,
    )
    await user.click(screen.getByText("Mobile"))
    expect(screen.getByRole("radio", { name: "Mobile" })).not.toBeChecked()
    expect(optionOf("Mobile")).toHaveAttribute("data-disabled", "")
  })
})

describe("FormChoiceList 복수 선택", () => {
  it("질문 제목을 이름으로 가진 체크박스 묶음을 그린다", () => {
    render(
      <FormQuestion title="가능한 면접 요일을 모두 골라 주세요">
        <FormChoiceList type="multiple" options={PARTS} />
      </FormQuestion>,
    )
    expect(
      screen.getByRole("group", {
        name: "가능한 면접 요일을 모두 골라 주세요",
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
  })

  it("여러 줄을 고르면 값 배열을 넘기고 고른 줄만 브랜드 색으로 체크한다", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <FormChoiceList
        type="multiple"
        options={PARTS}
        onValueChange={onValueChange}
        aria-label="관심 파트"
      />,
    )
    await user.click(screen.getByText("PM"))
    await user.click(screen.getByText("Web"))
    expect(onValueChange).toHaveBeenLastCalledWith(["pm", "web"])
    expect(screen.getByRole("checkbox", { name: "PM" })).toBeChecked()
    expect(optionOf("Web")).toHaveAttribute("data-selected", "")
    expect(optionOf("Web")?.querySelector(".umc-checkbox")).toHaveAttribute(
      "data-color",
      "brand",
    )
    expect(optionOf("Design")?.querySelector(".umc-checkbox")).toHaveAttribute(
      "data-color",
      "neutral",
    )
  })

  it("읽기 전용이면 고른 상태를 보여 주기만 한다", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <FormChoiceList
        type="multiple"
        options={PARTS}
        defaultValue={["design"]}
        readOnly
        onValueChange={onValueChange}
        aria-label="관심 파트"
      />,
    )
    await user.click(screen.getByText("PM"))
    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole("checkbox", { name: "PM" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Design" })).toHaveAttribute(
      "aria-readonly",
      "true",
    )
  })
})
