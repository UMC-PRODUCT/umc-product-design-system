import { createElement, Fragment } from "react"
import { describe, expect, it } from "vitest"

import { COMPONENT_CODE_ATTRIBUTE } from "./component-code-attribute.ts"
import {
  CODE_PLACEHOLDER,
  callCodeOf,
  componentCodeOf,
  registerComponents,
  withCodeAttribute,
} from "./component-code.ts"
import { tokenizeJsx } from "./jsx-tokens.ts"

type ButtonProps = {
  variant?: string
  disabled?: boolean
  size?: number
  logo?: unknown
  leadingIcon?: unknown
  onClick?: () => void
  children?: unknown
}

function Button(props: ButtonProps) {
  return props.children
}

function AddIcon(props: { weight?: string }) {
  return props.weight
}

function ToastProvider(props: { placement?: string; children?: unknown }) {
  return props.children
}

function DocsOnlyHelper() {
  return null
}

function Unregistered() {
  return null
}

registerComponents({ Button, AddIcon, ToastProvider })

const buttonCodeOf = (props: ButtonProps) => componentCodeOf(Button, props)

const roundTrips = (code: string) =>
  tokenizeJsx(code)
    .map((token) => token.text)
    .join("") === code

describe("componentCodeOf", () => {
  it("한 줄에 들어가는 props와 글자 children을 JSX 한 줄로 적는다", () => {
    expect(
      buttonCodeOf({
        variant: "fill",
        disabled: true,
        size: 2,
        children: "저장",
      }),
    ).toBe('<Button variant="fill" disabled size={2}>저장</Button>')
  })

  it("함수 props는 자리만 보이고 null props는 지우지 않는다", () => {
    expect(buttonCodeOf({ onClick: () => {}, logo: null })).toBe(
      "<Button onClick={…} logo={null} />",
    )
  })

  it("data- props는 코드에서 뺀다", () => {
    const props = { variant: "fill", "data-spec-id": "button-fill" }
    expect(componentCodeOf(Button, props)).toBe('<Button variant="fill" />')
  })

  it("요소 props는 JSX로, 문서 전용 컴포넌트와 자리표시는 …로 적는다", () => {
    const code = buttonCodeOf({
      leadingIcon: createElement(AddIcon, { weight: "fill" }),
      children: [createElement(DocsOnlyHelper), CODE_PLACEHOLDER],
    })
    expect(code).toBe(
      '<Button leadingIcon={<AddIcon weight="fill" />}>\n  …\n  …\n</Button>',
    )
    expect(roundTrips(code)).toBe(true)
  })

  it("식별자가 아닌 객체 키는 따옴표로 감싸고 빈 Fragment와 bigint를 그대로 적는다", () => {
    expect(buttonCodeOf({ leadingIcon: { "--umc-gap": 1, gap: "8px" } })).toBe(
      '<Button leadingIcon={{ "--umc-gap": 1, gap: "8px" }} />',
    )
    expect(buttonCodeOf({ leadingIcon: createElement(Fragment) })).toBe(
      "<Button leadingIcon={<></>} />",
    )
    expect(buttonCodeOf({ leadingIcon: 10n })).toBe(
      "<Button leadingIcon={10n} />",
    )
  })

  it("HTML 엔티티처럼 읽히는 글자는 식으로 감싼다", () => {
    expect(buttonCodeOf({ variant: "a &amp; b", children: "R&amp;D" })).toBe(
      '<Button variant={"a &amp; b"}>{"R&amp;D"}</Button>',
    )
  })

  it("등록되지 않은 컴포넌트로 코드를 만들면 오류를 낸다", () => {
    expect(() => componentCodeOf(Unregistered, {})).toThrow(
      "등록되지 않았습니다",
    )
  })
})

describe("callCodeOf", () => {
  it("명령형 API 호출을 객체 인자와 함께 적는다", () => {
    const code = callCodeOf("toast.show", {
      message: "저장되었습니다.",
      action: { label: "실행 취소", onClick: CODE_PLACEHOLDER },
    })
    expect(code).toBe(
      'toast.show({ message: "저장되었습니다.", action: { label: "실행 취소", onClick: … } })',
    )
    expect(roundTrips(code)).toBe(true)
  })
})

describe("withCodeAttribute", () => {
  it("등록된 컴포넌트 요소에 코드 속성을 붙인다", () => {
    expect(withCodeAttribute(Button, { variant: "fill" })).toEqual({
      variant: "fill",
      [COMPONENT_CODE_ATTRIBUTE]: '<Button variant="fill" />',
    })
  })

  it("Provider로 끝나는 컴포넌트와 등록되지 않은 컴포넌트는 그대로 둔다", () => {
    const providerProps = { placement: "top" }
    const helperProps = {}
    expect(withCodeAttribute(ToastProvider, providerProps)).toBe(providerProps)
    expect(withCodeAttribute(DocsOnlyHelper, helperProps)).toBe(helperProps)
  })
})
