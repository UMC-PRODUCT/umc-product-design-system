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

  it("텍스트 스타일 유틸리티 42개를 내보낸다", () => {
    expect([
      ...blockOf("textStyleUtilities").matchAll(/"(text-[a-z0-9-]+)"/g),
    ]).toHaveLength(42)
  })

  it("semantic 컬러 151개의 CSS 변수와 Tailwind 이름을 짝지어 내보낸다", () => {
    const block = blockOf("semanticColors")
    expect([...block.matchAll(/cssVariable: "/g)]).toHaveLength(151)
    expect(block).toContain(
      'cssVariable: "--umc-color-text-neutral-default",\n    tailwindColor: "fg-neutral-default",',
    )
  })
})

describe("manifest.ts", () => {
  it("모든 토큰을 최종 값, 참조, 피그마 이름, Tailwind 이름과 함께 내보낸다", () => {
    expect(tokenManifest).toHaveLength(entries.length)
    expect(
      tokenManifest.find(
        (token) => token.name === "color.text.neutral-default",
      ),
    ).toMatchObject({
      value: "#0f1010",
      alias: "color.teal-grey.900",
      figmaName: "Semantic/Text/Neutral-Default",
      utility: "fg-neutral-default",
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
  it("텍스트 스타일과 그리드, 레이아웃 유틸리티를 만든다", async () => {
    const compiler = await compile(
      '@import "tailwindcss";\n@import "./tailwind.css";',
      { base: paths.generatedDir, onDependency: () => {} },
    )
    const css = compiler.build([
      "text-body-1-regular",
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

  it("semantic 컬러 유틸리티만 만들고 primitive 유틸리티는 만들지 않는다", async () => {
    const compiler = await compile(
      '@import "tailwindcss";\n@import "./tailwind.css";',
      { base: paths.generatedDir, onDependency: () => {} },
    )
    const css = compiler.build([
      "text-fg-neutral-default",
      "bg-surface-default",
      "border-border-neutral-medium",
      "bg-fill-primary-strong",
      "bg-dimmed-weak",
      "bg-teal-grey-500",
      "text-teal-grey-900",
    ])

    expect(css).toMatch(
      /\.text-fg-neutral-default \{\s+color: var\(--umc-color-text-neutral-default\);/,
    )
    expect(css).toMatch(
      /\.bg-surface-default \{\s+background-color: var\(--umc-color-surface-default\);/,
    )
    expect(css).toMatch(
      /\.border-border-neutral-medium \{\s+border-color: var\(--umc-color-border-neutral-medium\);/,
    )
    expect(css).toContain(".bg-fill-primary-strong {")
    expect(css).toContain(".bg-dimmed-weak {")
    expect(css).not.toContain(".bg-teal-grey-500")
    expect(css).not.toContain(".text-teal-grey-900")
  })
})
