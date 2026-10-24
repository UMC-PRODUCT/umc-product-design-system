import { render, screen } from "@testing-library/react"
import type { ReactElement } from "react"
import { describe, expect, it } from "vitest"

import { CodeField } from "../code-field/CodeField.tsx"
import { NumericStepper } from "../numeric-stepper/NumericStepper.tsx"
import { Select } from "../select/Select.tsx"
import { TextArea } from "../text-area/TextArea.tsx"
import { TextFieldArea } from "../text-field-area/TextFieldArea.tsx"
import { TextField } from "../text-field/TextField.tsx"
import { VerificationCodeField } from "../verification-code-field/VerificationCodeField.tsx"
import { Field, FieldControl } from "./Field.tsx"

describe("Field", () => {
  it("label이 컨트롤과 연결된다", () => {
    render(
      <Field label="이름">
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.getByLabelText("이름")).toBeInTheDocument()
  })

  it("invalid이면 aria-invalid 속성이 붙는다", () => {
    render(
      <Field label="이름" invalid>
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.getByLabelText("이름")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
  })

  it("invalid이고 errorMessage가 있으면 caption을 대체하고 aria-describedby로 연결된다", () => {
    render(
      <Field
        label="이름"
        invalid
        errorMessage="필수 입력 항목입니다"
        caption="3글자 이상 입력하세요"
      >
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.queryByText("3글자 이상 입력하세요")).not.toBeInTheDocument()
    const error = screen.getByText("필수 입력 항목입니다")
    expect(error).toBeInTheDocument()
    const input = screen.getByLabelText("이름")
    expect(input).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining(error.id),
    )
  })

  it("required이면 * 표시를 렌더한다", () => {
    render(
      <Field label="이름" required>
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument()
  })

  it("invalid이지만 errorMessage가 없으면 caption이 오류 색으로 표시된다", () => {
    render(
      <Field label="이름" invalid caption="도움말">
        <FieldControl render={<input />} />
      </Field>,
    )
    const caption = screen.getByText("도움말")
    expect(caption).toBeInTheDocument()
    expect(caption).toHaveAttribute("data-tone", "error")
  })

  it("captionSize가 없으면 도움말이 md 크기다", () => {
    render(
      <Field label="이름" caption="도움말">
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.getByText("도움말")).toHaveAttribute("data-size", "md")
  })

  it("captionSize가 lg이면 도움말과 오류 메시지가 모두 lg 크기다", () => {
    const { rerender } = render(
      <Field label="이름" caption="도움말" captionSize="lg">
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.getByText("도움말")).toHaveAttribute("data-size", "lg")

    rerender(
      <Field
        label="이름"
        caption="도움말"
        captionSize="lg"
        invalid
        errorMessage="필수 입력 항목입니다"
      >
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.getByText("필수 입력 항목입니다")).toHaveAttribute(
      "data-size",
      "lg",
    )
  })
})

const CAPTION = "도움말"

const FIELD_WRAPPERS: ReadonlyArray<readonly [string, () => ReactElement]> = [
  ["TextField", () => <TextField caption={CAPTION} captionSize="lg" />],
  ["TextFieldArea", () => <TextFieldArea caption={CAPTION} captionSize="lg" />],
  ["TextArea", () => <TextArea caption={CAPTION} captionSize="lg" />],
  [
    "Select",
    () => (
      <Select
        options={[{ value: "web", label: "Web" }]}
        caption={CAPTION}
        captionSize="lg"
      />
    ),
  ],
  ["CodeField", () => <CodeField caption={CAPTION} captionSize="lg" />],
  [
    "VerificationCodeField",
    () => <VerificationCodeField caption={CAPTION} captionSize="lg" />,
  ],
  [
    "NumericStepper",
    () => <NumericStepper caption={CAPTION} captionSize="lg" />,
  ],
]

describe("Field를 감싼 입력", () => {
  it.each(FIELD_WRAPPERS)(
    "%s는 captionSize를 도움말까지 넘긴다",
    (_, renderWrapper) => {
      render(renderWrapper())
      expect(screen.getByText(CAPTION)).toHaveAttribute("data-size", "lg")
    },
  )
})
