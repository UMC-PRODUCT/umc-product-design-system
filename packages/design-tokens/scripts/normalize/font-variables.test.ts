import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { paths } from "../shared/paths.ts"
import { parseTokenTree } from "../shared/schema.ts"
import { fontTokensFromVariables } from "./font-variables.ts"
import { splitVariableDefs } from "./text-styles.ts"

const raw = JSON.parse(readFileSync(paths.textStylesSource, "utf8")) as Record<
  string,
  string
>
const { variables } = splitVariableDefs(raw)

describe("fontTokensFromVariables: 피그마 원문 전체", () => {
  const { tree, merged } = fontTokensFromVariables(variables)
  const entries = parseTokenTree(tree, "font")
  const valueOf = (path: string) =>
    entries.find((entry) => entry.path.join(".") === path)?.token.$value

  it("크기 13개를 작은 순서로 px 값으로 만든다", () => {
    const sizes = entries
      .filter((entry) => entry.path[0] === "font-size")
      .map((entry) => entry.path[1])
    expect(sizes).toEqual([
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "18",
      "20",
      "24",
      "28",
      "36",
      "40",
      "48",
    ])
    expect(valueOf("font-size.48")).toEqual({ value: 48, unit: "px" })
  })

  it("굵기 이름을 숫자로 바꾼다", () => {
    expect(valueOf("font-weight.bold")).toBe(700)
    expect(valueOf("font-weight.semibold")).toBe(600)
    expect(valueOf("font-weight.medium")).toBe(500)
    expect(valueOf("font-weight.regular")).toBe(400)
  })

  it("서체는 피그마 값을 그대로 둔다", () => {
    expect(valueOf("font-family.brand")).toBe("Pretendard Variable")
  })

  it("대소문자만 다른 변수를 합치고 기록한다", () => {
    expect(merged).toEqual([
      {
        tokenPath: "font-weight.bold",
        figmaNames: [
          "Typography/Base/FontWeight/Bold",
          "Typography/Base/Fontweight/Bold",
        ],
      },
      {
        tokenPath: "font-family.brand",
        figmaNames: [
          "Typography/Base/FontFamily/Brand",
          "Typography/Base/Fontfamily/Brand",
        ],
      },
    ])
  })

  it("타이포가 아닌 변수는 건너뛴다", () => {
    expect(entries.some((entry) => entry.path.includes("teal-grey-900"))).toBe(
      false,
    )
  })
})

describe("fontTokensFromVariables: 실패 규칙", () => {
  it("같은 경로로 합쳐지는 변수의 값이 다르면 실패한다", () => {
    expect(() =>
      fontTokensFromVariables(
        new Map([
          ["Typography/Base/FontFamily/Brand", "Pretendard Variable"],
          ["Typography/Base/Fontfamily/Brand", "Pretendard"],
        ]),
      ),
    ).toThrow(/font-family\.brand: .* 값이 다릅니다/)
  })

  it("알 수 없는 굵기 이름이면 실패한다", () => {
    expect(() =>
      fontTokensFromVariables(
        new Map([["Typography/Base/FontWeight/Black", "Black"]]),
      ),
    ).toThrow(/알 수 없는 굵기 이름입니다/)
  })
})
