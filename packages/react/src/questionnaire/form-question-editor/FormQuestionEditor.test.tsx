import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { FormEditableQuestion } from "../form-editable-question/FormEditableQuestion.tsx"
import { FormQuestionEditor } from "./FormQuestionEditor.tsx"

const editorOf = () => {
  const editor = document.querySelector(".umc-form-question-editor")
  if (editor === null) throw new Error("편집기가 없습니다")
  return editor
}

describe("FormQuestionEditor", () => {
  it("활성이 아니면 질문만 그리고 도구는 숨긴다", () => {
    render(
      <FormQuestionEditor toolbar={<div>툴바</div>}>
        <FormEditableQuestion number="01">
          <span>답 미리보기</span>
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    expect(screen.getByRole("textbox", { name: "질문 제목" })).toBeVisible()
    expect(screen.getByText("답 미리보기")).toBeVisible()
    expect(screen.queryByRole("checkbox")).toBeNull()
    expect(screen.queryByRole("button", { name: "질문 삭제" })).toBeNull()
    expect(screen.queryByText("툴바")).toBeNull()
    expect(editorOf()).not.toHaveAttribute("data-active")
  })

  it("활성이면 필수 항목, 삭제, 툴바를 보여 준다", () => {
    render(
      <FormQuestionEditor active toolbar={<div>툴바</div>}>
        <FormEditableQuestion>
          <span>답 미리보기</span>
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    expect(
      screen.getByRole("checkbox", { name: "필수 항목" }),
    ).not.toBeChecked()
    expect(screen.getByRole("button", { name: "질문 삭제" })).toBeVisible()
    expect(screen.getByText("툴바")).toBeVisible()
    expect(screen.queryByRole("switch")).toBeNull()
    expect(editorOf()).toHaveAttribute("data-active", "")
  })

  it("필수 항목 체크와 제목의 * 표시가 같은 값을 따른다", async () => {
    const user = userEvent.setup()
    const onRequiredChange = vi.fn()
    const { rerender } = render(
      <FormQuestionEditor active onRequiredChange={onRequiredChange}>
        <FormEditableQuestion>
          <span />
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    expect(
      document.querySelector(".umc-form-editable-question__required"),
    ).toBeNull()
    await user.click(screen.getByRole("checkbox", { name: "필수 항목" }))
    expect(onRequiredChange).toHaveBeenCalledWith(true)

    rerender(
      <FormQuestionEditor active required onRequiredChange={onRequiredChange}>
        <FormEditableQuestion>
          <span />
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    expect(screen.getByRole("checkbox", { name: "필수 항목" })).toBeChecked()
    expect(
      document.querySelector(".umc-form-editable-question__required"),
    ).toHaveAttribute("aria-hidden", "true")
    expect(editorOf().querySelector(".umc-checkbox")).toHaveAttribute(
      "data-color",
      "brand",
    )
  })

  it("questionEnabled를 넘기면 질문 사용 스위치를 그린다", async () => {
    const user = userEvent.setup()
    const onQuestionEnabledChange = vi.fn()
    render(
      <FormQuestionEditor
        active
        questionEnabled
        onQuestionEnabledChange={onQuestionEnabledChange}
      >
        <FormEditableQuestion>
          <span />
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    const toggle = screen.getByRole("switch", { name: "질문 사용" })
    expect(toggle).toBeChecked()
    await user.click(toggle)
    expect(onQuestionEnabledChange).toHaveBeenCalledWith(false)
  })

  it("삭제 버튼을 누르면 인자 없이 onDelete를 부른다", async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(
      <FormQuestionEditor active onDelete={onDelete}>
        <FormEditableQuestion>
          <span />
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    await user.click(screen.getByRole("button", { name: "질문 삭제" }))
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith()
  })

  it("dragHandleProps가 없으면 이동 핸들을 그리지 않는다", () => {
    render(
      <FormQuestionEditor active>
        <FormEditableQuestion>
          <span />
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    expect(
      screen.queryByRole("button", { name: "질문 순서 바꾸기" }),
    ).toBeNull()
    expect(
      document.querySelector(".umc-form-question-editor__handle"),
    ).toBeNull()
  })

  it("dragHandleProps를 넘기면 이동 핸들을 버튼으로 그리고 props를 붙인다", () => {
    const onPointerDown = vi.fn()
    render(
      <FormQuestionEditor
        dragHandleProps={{ onPointerDown, "aria-describedby": "drag-help" }}
      >
        <FormEditableQuestion>
          <span />
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    const handle = screen.getByRole("button", { name: "질문 순서 바꾸기" })
    expect(handle).toHaveAttribute("aria-describedby", "drag-help")
    handle.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }))
    expect(onPointerDown).toHaveBeenCalled()
  })

  it("disabled이면 활성이어도 도구와 핸들 버튼을 숨기고 입력을 막는다", () => {
    render(
      <FormQuestionEditor
        active
        disabled
        dragHandleProps={{}}
        toolbar={<div>툴바</div>}
      >
        <FormEditableQuestion>
          <span />
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    expect(editorOf()).toHaveAttribute("data-disabled", "")
    expect(editorOf()).not.toHaveAttribute("data-active")
    expect(screen.queryByRole("button")).toBeNull()
    expect(screen.queryByText("툴바")).toBeNull()
    expect(screen.getByRole("textbox", { name: "질문 제목" })).toBeDisabled()
    expect(screen.getByRole("textbox", { name: "질문 설명" })).toBeDisabled()
  })
})
