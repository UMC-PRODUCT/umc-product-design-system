import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it } from "vitest"

import { FormQuestionEditor } from "../form-question-editor/FormQuestionEditor.tsx"
import { FormEditableQuestion } from "./FormEditableQuestion.tsx"

describe("FormEditableQuestion", () => {
  it("번호와 제목·설명 입력, 답 미리보기를 그린다", () => {
    render(
      <FormEditableQuestion number="01">
        <span>답 미리보기</span>
      </FormEditableQuestion>,
    )
    expect(screen.getByText("01")).toHaveClass(
      "umc-form-editable-question__number",
    )
    expect(screen.getByRole("textbox", { name: "질문 제목" })).toHaveAttribute(
      "placeholder",
      "질문을 작성하세요",
    )
    expect(screen.getByRole("textbox", { name: "질문 설명" })).toHaveAttribute(
      "placeholder",
      "설명을 적어주세요 (선택 사항)",
    )
    expect(screen.getByText("답 미리보기")).toBeVisible()
  })

  it("titleProps와 descriptionProps로 값을 주고받는다", async () => {
    function Controlled() {
      const [title, setTitle] = useState("")
      return (
        <>
          <FormEditableQuestion
            titleProps={{
              value: title,
              onChange: (event) => setTitle(event.target.value),
            }}
            descriptionProps={{ defaultValue: "선택" }}
          >
            <span />
          </FormEditableQuestion>
          <output>{title}</output>
        </>
      )
    }
    const user = userEvent.setup()
    render(<Controlled />)
    await user.type(
      screen.getByRole("textbox", { name: "질문 제목" }),
      "지원 동기",
    )
    expect(screen.getByRole("status")).toHaveTextContent("지원 동기")
    expect(screen.getByRole("textbox", { name: "질문 설명" })).toHaveValue(
      "선택",
    )
  })

  it("required이면 제목 뒤에 * 표시를 달고 보조기기에는 (필수)로 알린다", () => {
    render(
      <FormEditableQuestion required>
        <span />
      </FormEditableQuestion>,
    )
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true")
    expect(screen.getByText("(필수)")).toHaveClass("umc-visually-hidden")
  })

  it("disabled이면 두 입력을 막는다", () => {
    render(
      <FormEditableQuestion disabled>
        <span />
      </FormEditableQuestion>,
    )
    expect(screen.getByRole("textbox", { name: "질문 제목" })).toBeDisabled()
    expect(screen.getByRole("textbox", { name: "질문 설명" })).toBeDisabled()
    expect(
      document.querySelector(".umc-form-editable-question"),
    ).toHaveAttribute("data-disabled", "")
  })

  it("편집기가 비활성이면 disabled={false}를 줘도 두 입력이 풀리지 않는다", () => {
    render(
      <FormQuestionEditor disabled>
        <FormEditableQuestion disabled={false}>
          <span />
        </FormEditableQuestion>
      </FormQuestionEditor>,
    )
    expect(screen.getByRole("textbox", { name: "질문 제목" })).toBeDisabled()
    expect(screen.getByRole("textbox", { name: "질문 설명" })).toBeDisabled()
  })

  it("aria-label과 placeholder는 바꿔 쓸 수 있고 type은 text로 고정한다", () => {
    render(
      <FormEditableQuestion
        titleProps={{ "aria-label": "섹션 질문 제목", placeholder: "제목" }}
      >
        <span />
      </FormEditableQuestion>,
    )
    const title = screen.getByRole("textbox", { name: "섹션 질문 제목" })
    expect(title).toHaveAttribute("placeholder", "제목")
    expect(title).toHaveAttribute("type", "text")
  })
})
