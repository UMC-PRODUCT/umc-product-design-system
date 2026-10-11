import { describe, expect, it } from "vitest"

import { buildModel } from "./model.ts"

const color = (value: string) => ({ $type: "color", $value: value })

describe("buildModel", () => {
  it("파일 순서대로 항목을 모은다", () => {
    const entries = buildModel([
      {
        file: "color.primitive.json",
        tree: { color: { teal: { "500": color("#008a80") } } },
      },
      {
        file: "color.semantic.json",
        tree: { color: { icon: { brand: color("{color.teal.500}") } } },
      },
    ])

    expect(entries.map((entry) => [entry.file, entry.path.join(".")])).toEqual([
      ["color.primitive.json", "color.teal.500"],
      ["color.semantic.json", "color.icon.brand"],
    ])
  })

  it("같은 경로가 두 파일에 있으면 실패한다", () => {
    expect(() =>
      buildModel([
        {
          file: "color.primitive.json",
          tree: { color: { teal: { "500": color("#008a80") } } },
        },
        {
          file: "color.semantic.json",
          tree: { color: { teal: { "500": color("#008a80") } } },
        },
      ]),
    ).toThrow(
      /color\.teal\.500: color\.primitive\.json와 color\.semantic\.json에 같은 경로가 있습니다/,
    )
  })

  it("참조 대상이 없으면 실패한다", () => {
    expect(() =>
      buildModel([
        {
          file: "color.semantic.json",
          tree: { color: { text: { default: color("{color.teal.900}") } } },
        },
      ]),
    ).toThrow(
      /color\.text\.default\.\$value: 참조 대상 color\.teal\.900가 없습니다/,
    )
  })

  it("참조 대상의 타입이 다르면 실패한다", () => {
    expect(() =>
      buildModel([
        {
          file: "font.json",
          tree: {
            "font-weight": { bold: { $type: "fontWeight", $value: 700 } },
          },
        },
        {
          file: "typography.json",
          tree: {
            typography: {
              "body-1-bold": {
                $type: "typography",
                $value: {
                  fontFamily: "Pretendard Variable",
                  fontSize: "{font-weight.bold}",
                  fontWeight: "{font-weight.bold}",
                  lineHeight: 1.5,
                  letterSpacing: { value: 0, unit: "em" },
                },
              },
            },
          },
        },
      ]),
    ).toThrow(
      /fontSize: dimension를 기대했지만 font-weight\.bold는 fontWeight입니다/,
    )
  })

  it("순환 참조를 찾는다", () => {
    expect(() =>
      buildModel([
        {
          file: "color.semantic.json",
          tree: {
            color: {
              text: {
                first: color("{color.text.second}"),
                second: color("{color.text.first}"),
              },
            },
          },
        },
      ]),
    ).toThrow(/color\.text\.first: 순환 참조가 있습니다/)
  })
})
