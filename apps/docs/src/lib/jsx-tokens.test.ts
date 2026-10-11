import { describe, expect, it } from "vitest"

import { tokenizeJsx, type JsxToken } from "./jsx-tokens.ts"

const visibleTokens = (code: string) =>
  tokenizeJsx(code).filter(
    (token) => token.kind !== "plain" || token.text.trim() !== "",
  )

const summaryOf = (tokens: JsxToken[]) =>
  tokens.map(({ kind, text, depth }) =>
    depth === undefined ? `${kind}:${text}` : `${kind}${depth}:${text}`,
  )

describe("tokenizeJsx", () => {
  it("나눈 토큰을 이으면 원래 코드와 같다", () => {
    const code =
      '<Tooltip content=\'side="bottom"\' side="bottom">\n  <Button size="sm" onClick={…}>bottom</Button>\n</Tooltip>'
    expect(
      tokenizeJsx(code)
        .map((token) => token.text)
        .join(""),
    ).toBe(code)
  })

  it("컴포넌트, HTML 태그, 속성, 문자열, 키워드를 구분한다", () => {
    expect(
      summaryOf(
        visibleTokens(
          '<Button size="md" disabled={false} icon={<span aria-hidden="true" />}>추가</Button>',
        ),
      ),
    ).toEqual([
      "punctuation:<",
      "component:Button",
      "attribute:size",
      "plain:=",
      'string:"md"',
      "attribute:disabled",
      "plain:=",
      "bracket0:{",
      "keyword:false",
      "bracket0:}",
      "attribute:icon",
      "plain:=",
      "bracket0:{",
      "punctuation:<",
      "tag:span",
      "attribute:aria-hidden",
      "plain:=",
      'string:"true"',
      "punctuation:/>",
      "bracket0:}",
      "punctuation:>",
      "plain:추가",
      "punctuation:</",
      "component:Button",
      "punctuation:>",
    ])
  })

  it("괄호마다 중첩 깊이를 매기고 객체 키를 구분한다", () => {
    const brackets = visibleTokens(
      '<Demo items={[{ value: "web", count: 2 }]} />',
    ).filter((token) => token.kind === "bracket" || token.kind === "property")
    expect(summaryOf(brackets)).toEqual([
      "bracket0:{",
      "bracket1:[",
      "bracket2:{",
      "property:value",
      "property:count",
      "bracket2:}",
      "bracket1:]",
      "bracket0:}",
    ])
  })

  it("children 글자 속 단어는 키워드로 칠하지 않는다", () => {
    const kinds = tokenizeJsx("<span>true 텍스트</span>").map(
      (token) => token.kind,
    )
    expect(kinds).not.toContain("keyword")
  })

  it("JSX 줄과 호출식이 섞인 여러 문장도 나눈다", () => {
    const code =
      '<ToastProvider placement="top">…</ToastProvider>\n\ntoast.show({ message: "저장", onClick: … })'
    const properties = tokenizeJsx(code)
      .filter((token) => token.kind === "property")
      .map((token) => token.text)
    expect(properties).toEqual(["message", "onClick"])
  })
})
