import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { paths } from "../shared/paths.ts"
import { parseTokenTree } from "../shared/schema.ts"
import { parseFontExpression, parseTextStyles } from "./text-styles.ts"

const raw = JSON.parse(readFileSync(paths.textStylesSource, "utf8")) as Record<
  string,
  string
>

const BRAND_FAMILY = "Typography/Base/FontFamily/Brand"

describe("parseFontExpression", () => {
  it("변수 참조와 리터럴을 구분해 읽는다", () => {
    const variables = new Map([
      [BRAND_FAMILY, "Pretendard Variable"],
      ["Typography/Base/FontWeight/Semibold", "Semibold"],
    ])
    const expression = parseFontExpression(
      `Font(family: "${BRAND_FAMILY}", style: Typography/Base/FontWeight/Semibold, size: 17, weight: 600, lineHeight: 1.399999976158142, letterSpacing: -2)`,
      variables,
    )

    expect(expression).toEqual({
      family: { kind: "variable", name: BRAND_FAMILY },
      style: { kind: "variable", name: "Typography/Base/FontWeight/Semibold" },
      size: { kind: "literal", value: "17" },
      weight: 600,
      lineHeight: 1.399999976158142,
      letterSpacing: -2,
    })
  })

  it("Font(...) 형식이 아니면 실패한다", () => {
    expect(() => parseFontExpression("#ffffff", new Map())).toThrow(
      /Font\(\.\.\.\) 형식이 아닙니다/,
    )
  })
})

describe("parseTextStyles: 피그마 원문 전체", () => {
  const result = parseTextStyles(raw)
  const typography = result.tree.typography

  it("제외한 2개를 뺀 42개 스타일을 만든다", () => {
    expect(Object.keys(typography)).toHaveLength(42)
    expect(result.excluded.map((exclusion) => exclusion.figmaName)).toEqual([
      "Heading/Heading3-Semibold",
      "Mobile Web/Body/4-Regular",
    ])
  })

  it("카테고리, 단계, 굵기 순으로 정렬한다", () => {
    expect(Object.keys(typography).slice(0, 5)).toEqual([
      "display-1-bold",
      "display-2-semibold",
      "display-3-bold",
      "heading-1-semibold",
      "heading-2-bold",
    ])
    expect(Object.keys(typography).at(-1)).toBe("caption-3-regular")
  })

  it("Display/1-Bold를 변수 참조와 em 자간으로 옮긴다", () => {
    expect(typography["display-1-bold"]?.$value).toEqual({
      fontFamily: "{font-family.brand}",
      fontSize: "{font-size.48}",
      fontWeight: "{font-weight.bold}",
      lineHeight: 1.2,
      letterSpacing: { value: -0.03, unit: "em" },
    })
  })

  it("대소문자가 다른 Fontfamily, Fontweight 변수도 같은 경로로 모은다", () => {
    expect(typography["display-3-bold"]?.$value).toMatchObject({
      fontFamily: "{font-family.brand}",
      fontWeight: "{font-weight.bold}",
      letterSpacing: { value: -0.015, unit: "em" },
    })
  })

  it("변수에 연결되지 않은 크기는 px 값으로 두고 경고한다", () => {
    expect(typography["label-2-semibold"]?.$value).toMatchObject({
      fontSize: { value: 17, unit: "px" },
    })
    expect(result.warnings.map((warning) => warning.figmaName)).toEqual([
      "Body/4-Semibold",
      "Label/2-Semibold",
      "Label/2-Medium",
      "Caption/3-Medium",
      "Caption/3-Regular",
    ])
  })

  it("결과가 canonical 스키마를 통과한다", () => {
    expect(parseTokenTree(result.tree, "typography")).toHaveLength(42)
  })
})

describe("parseTextStyles: 실패와 경고 규칙", () => {
  const sizeVariable = { "Typography/Base/FontSize/13px": "13" }

  it("px 행간을 크기 대비 비율로 바꾸고 리터럴 서체와 굵기를 경고한다", () => {
    const result = parseTextStyles(
      {
        ...sizeVariable,
        "Body/9-Regular":
          'Font(family: "Pretendard Variable", style: Regular, size: Typography/Base/FontSize/13px, weight: 400, lineHeight: 20, letterSpacing: -1)',
      },
      [],
    )

    expect(result.tree.typography["body-9-regular"]?.$value).toMatchObject({
      fontFamily: "Pretendard Variable",
      fontSize: "{font-size.13}",
      fontWeight: 400,
      lineHeight: 1.5385,
    })
    expect(result.warnings.map((warning) => warning.message)).toEqual([
      '서체 "Pretendard Variable"가 변수에 연결되지 않았습니다',
      '굵기 "Regular"가 변수에 연결되지 않았습니다',
      "행간 20px를 비율 1.5385로 바꿨습니다",
    ])
  })

  it("이름의 굵기와 weight가 다르면 실패한다", () => {
    expect(() =>
      parseTextStyles(
        {
          ...sizeVariable,
          "Body/1-Bold":
            'Font(family: "Pretendard Variable", style: Regular, size: 13, weight: 400, lineHeight: 1.5, letterSpacing: 0)',
        },
        [],
      ),
    ).toThrow(/Body\/1-Bold: 이름의 굵기 Bold와 weight 400가 다릅니다/)
  })

  it("이름 규칙 밖의 스타일이 제외 목록에 없으면 실패한다", () => {
    expect(() =>
      parseTextStyles(
        {
          "Medium/H1":
            'Font(family: "PingFang SC", style: Medium, size: 30, weight: 500, lineHeight: 38, letterSpacing: 0)',
        },
        [],
      ),
    ).toThrow(/이름 규칙 밖의 텍스트 스타일이 있습니다: Medium\/H1/)
  })

  it("입력에 없는 제외 규칙이 있으면 실패한다", () => {
    expect(() =>
      parseTextStyles({}, [
        { figmaName: "Removed/Style", reason: "테스트", status: "pending" },
      ]),
    ).toThrow(/입력에 없는 제외 규칙이 있습니다: Removed\/Style/)
  })

  it("정규화 규칙이 없는 변수를 참조하면 실패한다", () => {
    expect(() =>
      parseTextStyles(
        {
          "Unknown/Size": "13",
          "Body/1-Regular":
            'Font(family: "Pretendard Variable", style: Regular, size: Unknown/Size, weight: 400, lineHeight: 1.5, letterSpacing: 0)',
        },
        [],
      ),
    ).toThrow(/정규화 규칙이 없는 변수입니다: Unknown\/Size/)
  })
})
