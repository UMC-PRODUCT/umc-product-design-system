import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

import { readManifest } from "./shared/manifest.ts"
import { paths } from "./shared/paths.ts"
import { parseTokenTree } from "./shared/schema.ts"

describe("피그마 원문 보존", () => {
  it.each(readManifest().sources)("$file 내용이 받은 그대로다", (source) => {
    const content = readFileSync(join(paths.packageRoot, "figma", source.file))
    expect(createHash("sha256").update(content).digest("hex")).toBe(
      source.sha256,
    )
  })
})

const readTokens = (fileName: string) =>
  parseTokenTree(
    JSON.parse(readFileSync(join(paths.tokensDir, fileName), "utf8")),
    fileName,
  )

describe("손으로 쓴 layout 토큰", () => {
  const entries = readTokens("layout.json")
  const spacing = readTokens("spacing.json")
  const valueOf = (path: string) =>
    [...entries, ...spacing].find((entry) => entry.path.join(".") === path)
      ?.token.$value

  it("피그마 문서 프레임의 값과 같다", () => {
    expect(valueOf("grid.columns")).toBe(12)
    expect(valueOf("grid.gutter")).toEqual({ value: 16, unit: "px" })
    expect(valueOf("grid.margin.desktop")).toEqual({ value: 32, unit: "px" })
    expect(valueOf("layout.header.height")).toEqual({ value: 80, unit: "px" })
    expect(valueOf("layout.sidebar.width")).toEqual({ value: 216, unit: "px" })
  })

  it("모바일 마진은 피그마 변수 Margin 16을 참조해 16px로 풀린다", () => {
    expect(valueOf("grid.margin.mobile")).toBe("{spacing.margin.16}")
    expect(valueOf("spacing.margin.16")).toBe("{spacing.16}")
    expect(valueOf("spacing.16")).toEqual({ value: 16, unit: "px" })
  })

  it("디자인 팀 합의 전인 breakpoint는 넣지 않는다", () => {
    expect(entries.some((entry) => entry.path.includes("breakpoint"))).toBe(
      false,
    )
  })
})
