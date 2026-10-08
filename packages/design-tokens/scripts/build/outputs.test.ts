import { readFileSync } from "node:fs"
import { join } from "node:path"

import { compile } from "@tailwindcss/node"
import { describe, expect, it } from "vitest"

import { tokenManifest } from "../../src/generated/manifest.ts"
import { normalizeAll } from "../normalize/normalize-all.ts"
import { findStaleOutputs } from "../shared/files.ts"
import { paths } from "../shared/paths.ts"
import { toDeclarations } from "./declarations.ts"
import { loadTokenModel } from "./model.ts"
import { renderAll } from "./render-all.ts"

const entries = loadTokenModel()
const outputs = renderAll(entries)

const output = (fileName: string): string => {
  const content = outputs.get(join(paths.generatedDir, fileName))
  if (content === undefined) {
    throw new Error(`${fileName} 생성물이 없습니다`)
  }
  return content
}

const declarationNames = entries
  .flatMap(toDeclarations)
  .map((declaration) => declaration.name)

describe("재생성 비교", () => {
  it("원문에서 다시 만든 토큰과 생성물이 저장된 파일과 같다", () => {
    expect(findStaleOutputs(normalizeAll())).toEqual([])
    expect(findStaleOutputs(outputs)).toEqual([])
  })
})

describe("base.css", () => {
  const css = output("base.css")

  it("umc.tokens 레이어의 :root 하나에 선언한다", () => {
    expect(css.startsWith("@layer umc.tokens {\n  :root {\n")).toBe(true)
  })

  it("px는 rem으로, 자간은 em으로, 기본 변수는 var()로 잇는다", () => {
    expect(css).toContain("--umc-font-size-48: 3rem;")
    expect(css).toContain(
      "--umc-typography-display-1-bold-font-size: var(--umc-font-size-48);",
    )
    expect(css).toContain(
      "--umc-typography-display-1-bold-letter-spacing: -0.03em;",
    )
    expect(css).toContain(
      "--umc-typography-label-2-semibold-font-size: 1.0625rem;",
    )
    expect(css).toContain("--umc-grid-columns: 12;")
    expect(css).toContain("--umc-layout-sidebar-width: 13.5rem;")
  })

  it("컬러는 primitive를 hex로, semantic을 primitive 참조로 선언한다", () => {
    expect(css).toContain("--umc-color-teal-500: #008a80;")
    expect(css).toContain(
      "--umc-color-text-neutral-default: var(--umc-color-teal-grey-900);",
    )
    expect(css).toContain("--umc-color-dimmed-weak: #0f101033;")
    expect(css).toContain(
      "--umc-grid-margin-mobile: var(--umc-spacing-margin-16);",
    )
    expect(css.indexOf("--umc-color-teal-500:")).toBeLessThan(
      css.indexOf("--umc-color-text-neutral-default:"),
    )
  })

  it("그림자는 px 그대로, 여러 층은 쉼표로 잇는다", () => {
    expect(css).toContain(
      "--umc-shadow-drop-neutral-1: 0 4px 16px 0 #40444329;",
    )
    expect(css).toContain(
      "--umc-shadow-inner-neutral-2: inset 1px 1px 2px 0 #d3d8d826, inset -1px -1px 1px 0 #ffffff40;",
    )
  })

  it("변수 이름이 겹치지 않는다", () => {
    expect(new Set(declarationNames).size).toBe(declarationNames.length)
  })

  it("세 산출물이 참조하는 모든 --umc 변수가 base.css에 선언돼 있다", () => {
    const declared = new Set(declarationNames)
    const referenced = ["base.css", "tailwind.css", "vanilla-extract.ts"]
      .flatMap((fileName) => [
        ...output(fileName).matchAll(/var\((--umc-[a-z0-9-]+)\)/g),
      ])
      .map((match) => match[1] ?? "")

    expect(referenced.length).toBeGreaterThan(0)
    expect(referenced.filter((name) => !declared.has(name))).toEqual([])
  })
})

describe("index.ts", () => {
  const index = output("index.ts")
  const blockOf = (name: string) => {
    const start = index.indexOf(`export const ${name} =`)
    return index.slice(start, index.indexOf("as const", start))
  }

  it("변수 목록이 base.css 선언과 1:1이다", () => {
    const listed = [
      ...blockOf("cssVariables").matchAll(/"(--umc-[a-z0-9-]+)"/g),
    ].map((match) => match[1])
    expect(listed).toEqual(declarationNames)
  })

  it("텍스트 스타일 유틸리티 48개를 내보낸다", () => {
    expect([
      ...blockOf("textStyleUtilities").matchAll(/"(text-[a-z0-9-]+)"/g),
    ]).toHaveLength(48)
  })

  it("그림자 유틸리티 5개를 tailwind-merge 등록용으로 내보낸다", () => {
    expect(
      [...blockOf("shadowUtilities").matchAll(/"(shadow-[a-z0-9-]+)"/g)].map(
        (match) => match[1],
      ),
    ).toEqual([
      "shadow-drop-neutral-1",
      "shadow-drop-neutral-2",
      "shadow-drop-neutral-3",
      "shadow-inner-neutral-1",
      "shadow-inner-neutral-2",
    ])
  })
})

describe("manifest.ts", () => {
  const tokenNamed = (name: string) =>
    tokenManifest.find((token) => token.name === name)

  it("모든 토큰을 최종 값, 참조, 피그마 이름, Tailwind 이름과 함께 내보낸다", () => {
    expect(tokenManifest).toHaveLength(entries.length)
    expect(tokenNamed("color.text.neutral-default")).toMatchObject({
      value: "#0f1010",
      alias: "color.teal-grey.900",
      figmaName: "Semantic/Text/Neutral-Default",
      codeSyntax: "var(--color-text-default)",
      utility: "text-neutral-default",
      tailwindName: null,
    })
    expect(tokenNamed("color.teal.300")?.codeSyntax).toBeNull()
    expect(
      tokenManifest.find((token) => token.name === "shadow.drop.neutral-1"),
    ).toMatchObject({
      tier: "shadow",
      type: "shadow",
      value: "0 4px 16px 0 #40444329",
      alias: null,
      figmaName: "Shadow/Drop/Neutral_1",
      utility: "shadow-drop-neutral-1",
    })
    expect(
      tokenManifest.find((token) => token.name === "typography.display-1-bold")
        ?.typography,
    ).toEqual({
      fontFamily: "Pretendard Variable",
      fontSize: "48px",
      fontWeight: "700",
      lineHeight: "1.2",
      letterSpacing: "-0.03em",
    })
  })

  it.each([
    ["color.text.neutral-medium-600", "text-neutral-medium-600", null],
    ["color.border.neutral.strong-400", "border-neutral-strong-400", null],
    [
      "color.icon.brand-medium-500",
      "text-icon-brand-medium-500",
      "icon-brand-medium-500",
    ],
    [
      "color.fill.neutral.weak-75",
      "bg-fill-neutral-weak-75",
      "fill-neutral-weak-75",
    ],
    ["color.background.default", "bg-background-default", "background-default"],
    ["color.surface.default", "bg-surface-default", "surface-default"],
    ["color.dimmed.weak", "bg-dimmed-weak", "dimmed-weak"],
    ["color.tag.part.pm.weaker", null, "tag-part-pm-weaker"],
    ["color.teal.300", null, "teal-300"],
    ["color.teal-grey.900", null, "teal-grey-900"],
    ["color.white", null, "white"],
    ["grid.gutter", null, "grid-gutter"],
    ["shadow.drop.neutral-1", "shadow-drop-neutral-1", "drop-neutral-1"],
    ["typography.body-1-regular", "text-body-1-regular", null],
  ])(
    "%s의 추천 유틸리티는 %s, Tailwind 이름은 %s다",
    (name, utility, tailwindName) => {
      expect(tokenNamed(name)).toMatchObject({ utility, tailwindName })
    },
  )
})

describe("vanilla-extract.ts", () => {
  it("모든 값이 --umc 변수 참조다", () => {
    const values = [
      ...output("vanilla-extract.ts").matchAll(/: "([^"]+)",/g),
    ].map((match) => match[1] ?? "")

    expect(values.length).toBeGreaterThan(0)
    expect(
      values.filter((value) => !/^var\(--umc-[a-z0-9-]+\)$/.test(value)),
    ).toEqual([])
  })

  it("런타임 의존성에 @vanilla-extract/css가 없다", () => {
    const manifest = JSON.parse(
      readFileSync(join(paths.packageRoot, "package.json"), "utf8"),
    ) as Record<string, Record<string, string> | undefined>

    expect(manifest.dependencies?.["@vanilla-extract/css"]).toBeUndefined()
    expect(manifest.peerDependencies?.["@vanilla-extract/css"]).toBeUndefined()
  })
})

describe("Tailwind 어댑터", () => {
  const buildCss = async (
    candidates: readonly string[],
    appCss = "",
  ): Promise<string> => {
    const compiler = await compile(
      `@import "tailwindcss";\n@import "./tailwind.css";\n${appCss}`,
      { base: paths.generatedDir, onDependency: () => {} },
    )
    return compiler.build([...candidates])
  }

  const ruleOf = (css: string, selector: string): string => {
    const start = css.indexOf(`${selector} {`)
    return start === -1 ? "" : css.slice(start, css.indexOf("}", start) + 1)
  }

  it("텍스트 스타일과 그리드, 레이아웃 유틸리티를 만든다", async () => {
    const css = await buildCss([
      "text-body-1-regular",
      "shadow-drop-neutral-1",
      "gap-x-grid-gutter",
      "px-grid-margin-desktop",
      "px-grid-margin-mobile",
      "h-header",
      "w-sidebar",
    ])

    expect(css).toMatch(
      /\.text-body-1-regular \{\s+font-family: var\(--umc-typography-body-1-regular-font-family\);/,
    )
    expect(css).toMatch(
      /\.gap-x-grid-gutter \{\s+column-gap: var\(--umc-grid-gutter\);/,
    )
    expect(css).toContain(".shadow-drop-neutral-1 {")
    expect(css).toContain("var(--umc-shadow-drop-neutral-1)")
    expect(css).toMatch(
      /\.px-grid-margin-desktop \{\s+padding-inline: var\(--umc-grid-margin-desktop\);/,
    )
    expect(css).toMatch(
      /\.h-header \{\s+height: var\(--umc-layout-header-height\);/,
    )
    expect(css).toMatch(
      /\.w-sidebar \{\s+width: var\(--umc-layout-sidebar-width\);/,
    )
  })

  it("Text와 Border는 그룹 이름 없이 속성 유틸리티로 만든다", async () => {
    const css = await buildCss([
      "text-neutral-default",
      "text-neutral-medium-600",
      "border-neutral-medium-300",
      "border-x-error-strong-500",
      "border-t-primary-strong-500",
      "border-e-disabled",
    ])

    expect(ruleOf(css, ".text-neutral-medium-600")).toContain(
      "color: var(--umc-color-text-neutral-medium-600);",
    )
    expect(ruleOf(css, ".text-neutral-default")).toContain(
      "color: var(--umc-color-text-neutral-default);",
    )
    expect(ruleOf(css, ".border-neutral-medium-300")).toContain(
      "border-color: var(--umc-color-border-neutral-medium-300);",
    )
    expect(ruleOf(css, ".border-x-error-strong-500")).toContain(
      "border-inline-color: var(--umc-color-border-error-strong-500);",
    )
    expect(ruleOf(css, ".border-t-primary-strong-500")).toContain(
      "border-top-color: var(--umc-color-border-primary-strong-500);",
    )
    expect(ruleOf(css, ".border-e-disabled")).toContain(
      "border-inline-end-color: var(--umc-color-border-disabled);",
    )
  })

  it("그룹 이름이 겹친 옛 이름은 만들지 않는다", async () => {
    const css = await buildCss([
      "text-text-neutral-default",
      "text-fg-neutral-default",
      "border-border-neutral-medium-300",
      "bg-text-neutral-default",
    ])

    expect(css).not.toMatch(/\.(text|border|bg)-(text|fg|border)-/)
  })

  it("Text, Border 외 semantic은 Tailwind 컬러로 등록해 접두어와 함께 쓴다", async () => {
    const css = await buildCss([
      "bg-surface-default",
      "bg-fill-primary-strong-200",
      "bg-dimmed-weak",
      "bg-background-default",
      "text-icon-brand-medium-500",
      "fill-icon-brand-medium-500",
      "bg-tag-part-pm-weaker",
      "text-tag-part-pm-strong",
      "bg-fill-neutral-weak-75/50",
    ])

    expect(ruleOf(css, ".bg-surface-default")).toContain(
      "background-color: var(--umc-color-surface-default);",
    )
    expect(ruleOf(css, ".text-icon-brand-medium-500")).toContain(
      "color: var(--umc-color-icon-brand-medium-500);",
    )
    expect(ruleOf(css, ".fill-icon-brand-medium-500")).toContain(
      "fill: var(--umc-color-icon-brand-medium-500);",
    )
    for (const selector of [
      ".bg-fill-primary-strong-200",
      ".bg-dimmed-weak",
      ".bg-background-default",
      ".bg-tag-part-pm-weaker",
      ".text-tag-part-pm-strong",
    ]) {
      expect(css).toContain(`${selector} {`)
    }
    expect(css).toContain("var(--umc-color-fill-neutral-weak-75) 50%")
  })

  it("primitive는 UMC 값으로 쓰고 Tailwind 기본 팔레트는 지운다", async () => {
    const css = await buildCss([
      "bg-teal-300",
      "text-teal-grey-900",
      "border-red-400",
      "bg-white",
      "bg-teal-grey-600/50",
      "bg-indigo-500",
      "text-zinc-900",
      "bg-orange-500",
      "bg-transparent",
      "text-current",
    ])

    expect(ruleOf(css, ".bg-teal-300")).toContain(
      "background-color: var(--umc-color-teal-300);",
    )
    expect(ruleOf(css, ".text-teal-grey-900")).toContain(
      "color: var(--umc-color-teal-grey-900);",
    )
    expect(ruleOf(css, ".border-red-400")).toContain(
      "border-color: var(--umc-color-red-400);",
    )
    expect(ruleOf(css, ".bg-white")).toContain(
      "background-color: var(--umc-color-white);",
    )
    expect(css).toContain("var(--umc-color-teal-grey-600) 50%")
    expect(css).not.toContain(".bg-indigo-500")
    expect(css).not.toContain(".text-zinc-900")
    expect(css).not.toContain(".bg-orange-500")
    expect(css).not.toMatch(/--color-(indigo|zinc|orange)-/)
    expect(css).toContain(".bg-transparent {")
    expect(css).toContain(".text-current {")
  })

  it("상태와 반응형 변형을 붙일 수 있고, 변 방향 테두리가 전체 테두리보다 뒤에 온다", async () => {
    const css = await buildCss([
      "hover:text-brand-strong",
      "placeholder:text-placeholder",
      "md:border-neutral-strong-400",
      "border-t-error-strong-500",
      "border-neutral-strong-400",
    ])

    expect(css).toContain(".hover\\:text-brand-strong:hover {")
    expect(css).toContain(".placeholder\\:text-placeholder::placeholder {")
    expect(css).toContain(".md\\:border-neutral-strong-400 {")
    expect(css.indexOf(".border-neutral-strong-400 {")).toBeLessThan(
      css.indexOf(".border-t-error-strong-500 {"),
    )
  })

  it("앱이 tailwind.css 뒤에 등록한 컬러는 남는다", async () => {
    const css = await buildCss(
      ["bg-accent-500"],
      "@theme { --color-accent-500: #123456; }",
    )

    expect(ruleOf(css, ".bg-accent-500")).toContain("background-color:")
  })
})
