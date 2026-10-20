import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { FormQuestion } from "./FormQuestion.tsx"
import { FormTextAnswer } from "./FormTextAnswer.tsx"

describe("FormQuestion", () => {
  it("제목을 h3로 그리고 번호와 설명을 함께 보여 준다", () => {
    render(
      <FormQuestion
        number="01"
        title="자기소개를 적어 주세요"
        description="500자 이내로 적어 주세요"
      >
        <FormTextAnswer />
      </FormQuestion>,
    )
    expect(
      screen.getByRole("heading", { level: 3, name: "자기소개를 적어 주세요" }),
    ).toBeInTheDocument()
    expect(screen.getByText("01")).toHaveClass("umc-section-header__number")
    expect(screen.getByText("500자 이내로 적어 주세요")).toBeInTheDocument()
  })

  it("level로 제목 단계를 바꾼다", () => {
    render(
      <FormQuestion title="자기소개" level={4}>
        <FormTextAnswer />
      </FormQuestion>,
    )
    expect(
      screen.getByRole("heading", { level: 4, name: "자기소개" }),
    ).toBeInTheDocument()
  })

  it("제목과 설명을 안쪽 글 답의 이름과 설명으로 연결한다", () => {
    render(
      <FormQuestion title="자기소개를 적어 주세요" description="500자 이내">
        <FormTextAnswer maxLength={500} />
      </FormQuestion>,
    )
    const answer = screen.getByRole("textbox", {
      name: "자기소개를 적어 주세요",
    })
    expect(answer).toHaveAccessibleDescription("500자 이내")
  })

  it("필수, 읽기 전용, 비활성을 안쪽 글 답에 전한다", () => {
    const { rerender } = render(
      <FormQuestion title="자기소개" required readOnly>
        <FormTextAnswer defaultValue="안녕하세요" />
      </FormQuestion>,
    )
    const answer = screen.getByRole("textbox", { name: "자기소개" })
    expect(answer).toBeRequired()
    expect(answer).toHaveAttribute("readonly")

    rerender(
      <FormQuestion title="자기소개" disabled>
        <FormTextAnswer defaultValue="안녕하세요" />
      </FormQuestion>,
    )
    expect(screen.getByRole("textbox", { name: "자기소개" })).toBeDisabled()
  })

  it("글 답에 넘긴 값이 질문에서 받은 값보다 먼저다", () => {
    render(
      <>
        <p id="custom-label">따로 붙인 이름</p>
        <FormQuestion title="자기소개" readOnly>
          <FormTextAnswer aria-labelledby="custom-label" readOnly={false} />
        </FormQuestion>
      </>,
    )
    const answer = screen.getByRole("textbox", { name: "따로 붙인 이름" })
    expect(answer).not.toHaveAttribute("readonly")
  })

  it("질문 밖의 글 답은 TextArea처럼 그린다", () => {
    render(<FormTextAnswer aria-label="메모" />)
    expect(screen.getByRole("textbox", { name: "메모" })).toBeInTheDocument()
  })

  it("className과 네이티브 속성을 루트에 붙이고 ref를 넘긴다", () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <FormQuestion
        ref={ref}
        title="자기소개"
        className="mt-6"
        data-testid="question"
      >
        <FormTextAnswer />
      </FormQuestion>,
    )
    const root = screen.getByTestId("question")
    expect(root).toHaveClass("umc-form-question", "mt-6")
    expect(ref.current).toBe(root)
  })
})
