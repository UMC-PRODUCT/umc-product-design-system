import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import { FormEditableQuestion } from "../form-editable-question/FormEditableQuestion.tsx"
import { FormQuestionEditor } from "../form-question-editor/FormQuestionEditor.tsx"
import {
  FormChoiceListEditor,
  type FormChoiceDraftOption,
} from "./FormChoiceListEditor.tsx"

const OPTIONS: readonly FormChoiceDraftOption[] = [
  { id: "a", label: "월요일" },
  { id: "b", label: "" },
]

describe("FormChoiceListEditor", () => {
  it("보기마다 순서를 이름으로 가진 입력을 그리고 유형별 placeholder를 쓴다", () => {
    const { rerender } = render(
      <FormChoiceListEditor type="single" options={OPTIONS} />,
    )
    expect(screen.getByRole("textbox", { name: "보기 1" })).toHaveValue(
      "월요일",
    )
    expect(screen.getByRole("textbox", { name: "보기 2" })).toHaveAttribute(
      "placeholder",
      "단일 선택 옵션을 작성하세요",
    )
    rerender(<FormChoiceListEditor type="multiple" options={OPTIONS} />)
    expect(screen.getByRole("textbox", { name: "보기 2" })).toHaveAttribute(
      "placeholder",
      "복수 선택 옵션을 작성하세요",
    )
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("onOptionChange가 없으면 입력 칸을 읽기 전용으로 둔다", () => {
    const { rerender } = render(
      <FormChoiceListEditor type="single" options={OPTIONS} />,
    )
    expect(screen.getByRole("textbox", { name: "보기 1" })).toHaveAttribute(
      "readonly",
    )
    rerender(
      <FormChoiceListEditor
        type="single"
        options={OPTIONS}
        onOptionChange={vi.fn()}
      />,
    )
    expect(screen.getByRole("textbox", { name: "보기 1" })).not.toHaveAttribute(
      "readonly",
    )
  })

  it("입력하면 보기 id와 새 글자를 넘긴다", async () => {
    function Controlled() {
      const [options, setOptions] = useState(OPTIONS)
      return (
        <FormChoiceListEditor
          type="multiple"
          options={options}
          onOptionChange={(id, label) =>
            setOptions((current) =>
              current.map((option) =>
                option.id === id ? { ...option, label } : option,
              ),
            )
          }
        />
      )
    }
    const user = userEvent.setup()
    render(<Controlled />)
    await user.type(screen.getByRole("textbox", { name: "보기 2" }), "화요일")
    expect(screen.getByRole("textbox", { name: "보기 2" })).toHaveValue(
      "화요일",
    )
  })

  it("onOptionRemove와 onOptionAdd를 넘기면 삭제와 추가 버튼을 그린다", async () => {
    const user = userEvent.setup()
    const onOptionRemove = vi.fn()
    const onOptionAdd = vi.fn()
    render(
      <FormChoiceListEditor
        type="single"
        options={OPTIONS}
        onOptionRemove={onOptionRemove}
        onOptionAdd={onOptionAdd}
      />,
    )
    await user.click(screen.getByRole("button", { name: "보기 1 삭제" }))
    expect(onOptionRemove).toHaveBeenCalledWith("a")
    await user.click(screen.getByRole("button", { name: "옵션 추가" }))
    expect(onOptionAdd).toHaveBeenCalledTimes(1)
  })

  it("보기를 지우면 이웃 보기로, 더하면 새 보기로 포커스를 옮긴다", async () => {
    function Controlled() {
      const [options, setOptions] = useState<readonly FormChoiceDraftOption[]>([
        { id: "a", label: "월요일" },
        { id: "b", label: "화요일" },
      ])
      return (
        <FormChoiceListEditor
          type="single"
          options={options}
          onOptionChange={vi.fn()}
          onOptionAdd={() =>
            setOptions((current) => [...current, { id: "c", label: "" }])
          }
          onOptionRemove={(id) =>
            setOptions((current) =>
              current.filter((option) => option.id !== id),
            )
          }
        />
      )
    }
    const user = userEvent.setup()
    render(<Controlled />)
    await user.click(screen.getByRole("button", { name: "보기 1 삭제" }))
    expect(screen.getByRole("textbox", { name: "보기 1" })).toHaveValue(
      "화요일",
    )
    expect(screen.getByRole("textbox", { name: "보기 1" })).toHaveFocus()

    await user.click(screen.getByRole("button", { name: "옵션 추가" }))
    expect(screen.getByRole("textbox", { name: "보기 2" })).toHaveFocus()
  })

  it("옵션 추가를 누르면 인자 없이 onOptionAdd를 부른다", async () => {
    const user = userEvent.setup()
    const onOptionAdd = vi.fn()
    render(
      <FormChoiceListEditor
        type="multiple"
        options={OPTIONS}
        onOptionAdd={onOptionAdd}
      />,
    )
    await user.click(screen.getByRole("button", { name: "옵션 추가" }))
    expect(onOptionAdd).toHaveBeenCalledWith()
  })

  it("disabled이면 입력을 막고 삭제와 추가 버튼을 숨긴다", () => {
    render(
      <FormChoiceListEditor
        type="single"
        options={OPTIONS}
        onOptionRemove={vi.fn()}
        onOptionAdd={vi.fn()}
        disabled
      />,
    )
    expect(screen.getByRole("textbox", { name: "보기 1" })).toBeDisabled()
    expect(screen.queryByRole("button")).toBeNull()
    expect(screen.getByRole("list")).toHaveAttribute("data-disabled", "")
  })

  it("비활성 편집기 안에서는 보기 칸을 막고 추가와 삭제 버튼을 숨긴다", () => {
    render(
      <FormQuestionEditor active disabled>
        <FormEditableQuestion>
          <FormChoiceListEditor
            type="single"
            options={OPTIONS}
            onOptionChange={vi.fn()}
            onOptionAdd={vi.fn()}
            onOptionRemove={vi.fn()}
          />
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    expect(screen.getByRole("textbox", { name: "보기 1" })).toBeDisabled()
    expect(screen.queryByRole("button", { name: "옵션 추가" })).toBeNull()
    expect(screen.queryByRole("button", { name: "보기 1 삭제" })).toBeNull()
  })

  it("보기 이름과 버튼 문구를 바꿔 쓸 수 있다", () => {
    render(
      <FormChoiceListEditor
        type="single"
        options={OPTIONS}
        optionLabel="2번 질문 보기"
        removeLabel="지우기"
        addLabel="보기 더하기"
        onOptionRemove={vi.fn()}
        onOptionAdd={vi.fn()}
      />,
    )
    expect(
      screen.getByRole("textbox", { name: "2번 질문 보기 1" }),
    ).toBeVisible()
    expect(
      screen.getByRole("button", { name: "2번 질문 보기 1 지우기" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "보기 더하기" })).toBeVisible()
  })
})
