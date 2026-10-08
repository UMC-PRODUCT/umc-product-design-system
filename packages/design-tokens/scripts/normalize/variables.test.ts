import { describe, expect, it } from "vitest"

import { parseTokenTree } from "../shared/schema.ts"
import { readFigmaExport, readFigmaTree } from "./figma-export.ts"
import { VARIABLE_RULES } from "./rules.ts"
import { findUnusedRules, resolveVariablePath } from "./variable-path.ts"
import { normalizeVariables } from "./variables.ts"

const treeOf = (
  variables: Record<string, unknown>,
): Record<string, unknown> => {
  const tree: Record<string, unknown> = {}
  for (const [name, token] of Object.entries(variables)) {
    const keys = name.split("/")
    let group = tree
    for (const key of keys.slice(0, -1)) {
      group[key] ??= {}
      group = group[key] as Record<string, unknown>
    }
    group[keys.at(-1) ?? ""] = token
  }
  return tree
}

const extensions = { "com.figma.variableId": "VariableID:fixture" }

const color = (hex: string) => ({
  $type: "color",
  $value: { colorSpace: "srgb", components: [0, 0, 0], alpha: 1, hex },
  $extensions: extensions,
})

const aliasOf = (figmaName: string, $type = "color") => ({
  $type,
  $value: `{${figmaName.split("/").join(".")}}`,
  $extensions: extensions,
})

const readFixture = (variables: Record<string, unknown>) =>
  readFigmaTree(treeOf(variables), "fixture")

describe("readFigmaTree", () => {
  it("피그마 이름을 / 경로로 모은다", () => {
    const [variable] = readFixture({
      "Primitives/Teal/Teal-500": color("#008A80"),
    })
    expect(variable?.name).toBe("Primitives/Teal/Teal-500")
  })

  it("srgb가 아닌 색 공간을 거부한다", () => {
    expect(() =>
      readFixture({
        "Primitives/Teal/Teal-500": {
          ...color("#008A80"),
          $value: {
            colorSpace: "display-p3",
            components: [0, 0, 0],
            alpha: 1,
            hex: "#008A80",
          },
        },
      }),
    ).toThrow(/fixture:Primitives\/Teal\/Teal-500/)
  })

  it("이름에 .이 있으면 참조를 풀 수 없어 실패한다", () => {
    expect(() =>
      readFixture({ "Spacing/Primitive/0.5": color("#000000") }),
    ).toThrow(/이름 "0\.5"에 \. 또는 \/가 있어/)
  })
})

describe("resolveVariablePath", () => {
  it.each([
    ["Primitives/Teal/Teal-500", "color.teal.500"],
    ["Primitives/Grey/TealGrey-75", "color.teal-grey.75"],
    ["Semantic/Icon/Neutral-Weak-400", "color.icon.neutral-weak-400"],
    [
      "Semantic/Fill/Primary/Stronger-Hover(Pressed)-400",
      "color.fill.primary.stronger-hover-pressed-400",
    ],
    ["Semantic/Border/Disabled/Disalbed", "color.border.disabled"],
    ["Spacing/Semantic/Padding/Padding 16", "spacing.padding.16"],
    ["Radius/Semantic/Button/R Button 12", "radius.button.12"],
    ["Radius/Semantic/Toast/Toast", "radius.toast"],
    ["Typography/Base/FontSize/48px", "font-size.48"],
  ])("%s → %s", (figmaName, expected) => {
    expect(resolveVariablePath(figmaName)?.join(".")).toBe(expected)
  })
})

describe("normalizeVariables: 피그마 export 전체", () => {
  const result = normalizeVariables(readFigmaExport())
  const entries = [...result.trees].flatMap(([fileName, tree]) =>
    parseTokenTree(tree, fileName),
  )
  const valueOf = (path: string) =>
    entries.find((entry) => entry.path.join(".") === path)?.token.$value

  it("파일별 토큰 수가 export와 맞는다", () => {
    const counts = Object.fromEntries(
      [...result.trees].map(([fileName, tree]) => [
        fileName,
        parseTokenTree(tree, fileName).length,
      ]),
    )
    expect(counts).toEqual({
      "color.semantic.json": 151,
      "color.primitive.json": 78,
      "font.json": 20,
      "spacing.json": 44,
      "radius.json": 17,
    })
  })

  it.each([
    ["color.teal.500", "#008a80"],
    ["color.teal-grey.75", "#f7f8f8"],
    ["color.white", "#ffffff"],
    ["color.text.neutral-default", "{color.teal-grey.900}"],
    ["color.icon.neutral-weak-400", "{color.teal-grey.400}"],
    ["color.fill.primary.stronger-hover-pressed-400", "{color.teal.400}"],
    ["color.border.disabled", "{color.teal-grey.200}"],
    ["color.tag.role.challenger-super-admin.strong", "{color.teal.600}"],
    ["color.dimmed.weak", "#0f101033"],
    ["color.dimmed.strong", "#0f1010d9"],
    ["spacing.margin.16", "{spacing.16}"],
    ["radius.button.12", "{radius.12}"],
    ["radius.toast", "{radius.14}"],
    ["font-weight.semibold", 600],
    ["font-family.brand", "Pretendard Variable"],
  ])("%s 값은 %j다", (path, expected) => {
    expect(valueOf(path)).toEqual(expected)
  })

  it("숫자 변수를 px 크기로 옮긴다", () => {
    expect(valueOf("radius.full")).toEqual({ value: 999, unit: "px" })
    expect(valueOf("font-size.22")).toEqual({ value: 22, unit: "px" })
  })

  it("제외한 변수는 만들지 않는다", () => {
    const names = result.mappings.map((mapping) => mapping.figmaName)
    expect(names).not.toContain("Label")
    expect(names).not.toContain("Radius/Primitive/48")
  })

  it("codeSyntax(WEB)를 피그마 확장에 남기고 대응표에 CSS 변수를 단다", () => {
    const fill = entries.find(
      (entry) => entry.path.join(".") === "color.fill.neutral.weak-75",
    )
    expect(fill?.token.$extensions?.["umc.figma"]).toMatchObject({
      name: "Semantic/Fill/Neutral/Weak-75",
      codeSyntax: "var(--color-action-primary-default)",
    })
    expect(
      result.mappings.find(
        (mapping) => mapping.figmaName === "Semantic/Fill/Neutral/Weak-75",
      ),
    ).toMatchObject({
      cssVariable: "--umc-color-fill-neutral-weak-75",
      codeSyntax: "var(--color-action-primary-default)",
    })
    expect(
      result.mappings.find(
        (mapping) => mapping.figmaName === "Primitives/Teal/Teal-300",
      )?.codeSyntax,
    ).toBeNull()
  })

  it("codeSyntax 중복을 모은다", () => {
    const borderDefault = result.codeSyntaxDuplicates.find(
      (duplicate) => duplicate.codeSyntax === "var(--color-border-default)",
    )
    expect(borderDefault?.figmaNames).toEqual(
      expect.arrayContaining([
        "Semantic/Border/Neutral/Medium-300",
        "Semantic/Border/Primary/Weak-200",
      ]),
    )
  })

  it("참조가 아닌 semantic과 scope 이상을 찾는다", () => {
    expect(result.composedSemantics).toEqual([
      "Semantic/Dimmed/Weak",
      "Semantic/Dimmed/Medium",
      "Semantic/Dimmed/Strong",
    ])
    expect(result.scopeWarnings.map((warning) => warning.figmaName)).toEqual([
      "Primitives/*",
      "Semantic/Border/Disabled/Disalbed",
      "Semantic/Border/Neutral/Default",
    ])
  })
})

describe("normalizeVariables: 실패 규칙", () => {
  const teal900 = { "Primitives/Teal/Teal-900": color("#013733") }

  it("참조 대상이 없으면 실패한다", () => {
    expect(() =>
      normalizeVariables(
        readFixture({
          "Semantic/Text/Neutral-Default": aliasOf(
            "Primitives/Grey/TealGrey-900",
          ),
        }),
        [],
      ),
    ).toThrow(/참조 대상 Primitives\/Grey\/TealGrey-900가 없습니다/)
  })

  it("제외한 변수를 참조하면 실패한다", () => {
    expect(() =>
      normalizeVariables(
        readFixture({
          ...teal900,
          "Semantic/Text/Brand-Default": aliasOf("Primitives/Teal/Teal-900"),
        }),
        [
          {
            figmaName: "Primitives/Teal/Teal-900",
            reason: "테스트",
            status: "pending",
          },
        ],
      ),
    ).toThrow(/제외한 변수 Primitives\/Teal\/Teal-900를 참조합니다/)
  })

  it("두 변수가 같은 경로가 되면 실패한다", () => {
    expect(() =>
      normalizeVariables(
        readFixture({
          ...teal900,
          "Semantic/Text/Weak-Hover(Pressed)": aliasOf(
            "Primitives/Teal/Teal-900",
          ),
          "Semantic/Text/Weak-Hover-Pressed": aliasOf(
            "Primitives/Teal/Teal-900",
          ),
        }),
        [],
      ),
    ).toThrow(
      /Semantic\/Text\/Weak-Hover\(Pressed\)와 같은 경로 color\.text\.weak-hover-pressed가 됩니다/,
    )
  })

  it("규칙과 타입이 다르면 실패한다", () => {
    expect(() =>
      normalizeVariables(
        readFixture({
          "Spacing/Primitive/4": {
            $type: "string",
            $value: "4",
            $extensions: extensions,
          },
        }),
        [],
      ),
    ).toThrow(/Spacing\/Primitive\/4: number 타입이어야 하는데 string입니다/)
  })

  it("규칙이 없는 변수면 실패한다", () => {
    expect(() =>
      normalizeVariables(
        readFixture({
          "Elevation/Card": {
            $type: "number",
            $value: 2,
            $extensions: extensions,
          },
        }),
        [],
      ),
    ).toThrow(/Elevation\/Card: 정규화 규칙이 없습니다/)
  })

  it("입력에 없는 제외 규칙이면 실패한다", () => {
    expect(() =>
      normalizeVariables(readFixture(teal900), [
        { figmaName: "Label", reason: "테스트", status: "pending" },
      ]),
    ).toThrow(/입력에 없는 변수 제외 규칙이 있습니다: Label/)
  })

  it("입력과 맞지 않는 규칙을 찾는다", () => {
    expect(
      findUnusedRules(["Primitives/Teal/Teal-500"], VARIABLE_RULES).map(
        (rule) => rule.figmaName,
      ),
    ).not.toContain("Primitives/")
    expect(
      findUnusedRules(["Primitives/Teal/Teal-500"], VARIABLE_RULES).map(
        (rule) => rule.figmaName,
      ),
    ).toContain("Radius/Semantic/")
  })
})
