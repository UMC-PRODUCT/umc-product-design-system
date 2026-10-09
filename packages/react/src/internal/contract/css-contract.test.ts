import { readFileSync } from "node:fs"
import { dirname, join, normalize } from "node:path"

import { describe, expect, it } from "vitest"

import {
  listSourceFiles,
  readSource,
  tokenBaseCssPath,
} from "./source-files.ts"

const ENTRY_FILE = "styles.css"
const DECLARATION_PATTERN = /(--umc-[a-z0-9-]+)\s*:/g
const REFERENCE_PATTERN = /var\((--umc-[a-z0-9-]+)/g
const RELATIVE_IMPORT_PATTERN = /@import "(\.[^"]+)"/g
const IMPORT_LINES = /^(?:@import [^\n]+\n)*/
const COLOR_LITERAL_PATTERN = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\(/
const ROLE_DECLARATION_LINE = /^\s*--umc-[a-z0-9-]+\s*:/
const SHADOW_BORDER_PATTERN = /inset 0 0 0 /
const STATE_SELECTOR_PATTERN =
  /\[(?:data-checked|data-selected|data-highlighted|data-active|aria-current)/
const FORCED_COLORS_RULE = "@media (forced-colors: active)"

const namesOf = (css: string, pattern: RegExp): string[] =>
  [...css.matchAll(pattern)].map(([, name = ""]) => name)

const tokenNames = new Set(
  namesOf(readFileSync(tokenBaseCssPath, "utf8"), DECLARATION_PATTERN),
)
const componentFiles = listSourceFiles(".css").filter(
  (file) => file !== ENTRY_FILE,
)
const localNames = new Set(
  componentFiles.flatMap((file) =>
    namesOf(readSource(file), DECLARATION_PATTERN),
  ),
)

const reachableFrom = (entry: string): Set<string> => {
  const seen = new Set<string>()
  const visit = (file: string) => {
    for (const [, target = ""] of readSource(file).matchAll(
      RELATIVE_IMPORT_PATTERN,
    )) {
      const resolved = normalize(join(dirname(file), target))
      if (!seen.has(resolved)) {
        seen.add(resolved)
        visit(resolved)
      }
    }
  }
  visit(entry)
  return seen
}

describe("styles.css", () => {
  it("첫 줄에서 Tailwind와 같은 레이어 순서를 선언한다", () => {
    expect(readSource(ENTRY_FILE).split("\n")[0]).toBe(
      "@layer theme, base, components, utilities;",
    )
  })

  it("모든 컴포넌트 CSS에 import로 닿는다", () => {
    const reachable = reachableFrom(ENTRY_FILE)
    expect(componentFiles.filter((file) => !reachable.has(file))).toEqual([])
  })
})

describe.each(componentFiles)("%s", (file) => {
  const css = readSource(file)

  it("import 다음 내용은 @layer components 안에 둔다", () => {
    const body = css.replace(IMPORT_LINES, "").trim()
    expect(body === "" || body.startsWith("@layer components {")).toBe(true)
  })

  it("참조한 --umc 변수가 토큰이거나 컴포넌트 CSS에서 선언한 변수다", () => {
    expect(
      namesOf(css, REFERENCE_PATTERN).filter(
        (name) => !tokenNames.has(name) && !localNames.has(name),
      ),
    ).toEqual([])
  })

  it("컴포넌트 변수 이름이 토큰 이름과 겹치지 않는다", () => {
    expect(
      namesOf(css, DECLARATION_PATTERN).filter((name) => tokenNames.has(name)),
    ).toEqual([])
  })

  it("그림자 테두리나 선택 상태가 있으면 강제 색 모드에서 대신 그린다", () => {
    const disappearsInForcedColors =
      SHADOW_BORDER_PATTERN.test(css) || STATE_SELECTOR_PATTERN.test(css)
    expect(!disappearsInForcedColors || css.includes(FORCED_COLORS_RULE)).toBe(
      true,
    )
  })

  it("색 리터럴은 역할 이름을 붙인 --umc 변수 선언에만 있다", () => {
    expect(
      css
        .split("\n")
        .filter(
          (line) =>
            COLOR_LITERAL_PATTERN.test(line) &&
            !ROLE_DECLARATION_LINE.test(line),
        ),
    ).toEqual([])
  })
})
