import { describe, expect, it } from "vitest"

import { parseTokenTree } from "./schema.ts"

describe("parseTokenTree", () => {
  it("중첩 그룹을 경로와 토큰 목록으로 펼친다", () => {
    const entries = parseTokenTree(
      {
        color: {
          teal: {
            "500": { $type: "color", $value: "#008a80" },
          },
          text: {
            "neutral-default": {
              $type: "color",
              $value: "{color.teal-grey.900}",
            },
          },
        },
      },
      "fixture",
    )

    expect(entries.map((entry) => entry.path)).toEqual([
      ["color", "teal", "500"],
      ["color", "text", "neutral-default"],
    ])
  })

  it("typography 토큰의 하위 값을 검사한다", () => {
    const [entry] = parseTokenTree(
      {
        typography: {
          "body-1-regular": {
            $type: "typography",
            $value: {
              fontFamily: "{font-family.brand}",
              fontSize: "{font-size.16}",
              fontWeight: "{font-weight.regular}",
              lineHeight: 1.45,
              letterSpacing: { value: -0.01, unit: "em" },
            },
          },
        },
      },
      "fixture",
    )

    expect(entry?.token.$type).toBe("typography")
  })

  it("경로 규칙을 어긴 키와 잘못된 값을 한 번에 모아 실패한다", () => {
    const parse = () =>
      parseTokenTree(
        {
          color: {
            Teal: { "500": { $type: "color", $value: "#008a80" } },
            red: { "500": { $type: "color", $value: "#DC3D3D" } },
          },
        },
        "fixture",
      )

    expect(parse).toThrow(/하위 키 "Teal"/)
    expect(parse).toThrow(/fixture:color\.red\.500/)
  })

  it("알 수 없는 타입을 거부한다", () => {
    expect(() =>
      parseTokenTree(
        { shadow: { md: { $type: "shadow", $value: "0 1px 2px #000" } } },
        "fixture",
      ),
    ).toThrow(/fixture:shadow\.md/)
  })
})
