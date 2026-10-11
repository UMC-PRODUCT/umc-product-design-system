import { compile } from "@tailwindcss/node"
import { describe, expect, it } from "vitest"

import { readSource, sourceDir } from "./source-files.ts"

const LAYER_ORDER = "@layer theme, base, components, utilities;"
const LAYER_STATEMENT = /@layer [a-z, ]+;/

const componentStyles = readSource("styles.css")
  .split("\n")
  .filter((line) => !line.includes('"@umc-product/'))
  .join("\n")

const build = async (input: string): Promise<string> => {
  const compiler = await compile(input, {
    base: sourceDir,
    onDependency: () => {},
  })
  return compiler.build(["rounded-full", "w-full"])
}

const layerBlocks = (css: string, layer: string): string[] => {
  const opener = `@layer ${layer} {`
  const blocks: string[] = []
  let start = css.indexOf(opener)
  while (start !== -1) {
    let depth = 0
    let end = start + opener.length - 1
    for (; end < css.length; end += 1) {
      if (css[end] === "{") {
        depth += 1
      } else if (css[end] === "}") {
        depth -= 1
        if (depth === 0) {
          break
        }
      }
    }
    blocks.push(css.slice(start, end + 1))
    start = css.indexOf(opener, end)
  }
  return blocks
}

describe("Tailwind 앱에서 불러올 때", () => {
  it.each([
    ["tailwindcss를 먼저", `@import "tailwindcss";\n${componentStyles}`],
    ["styles.css를 먼저", `${componentStyles}\n@import "tailwindcss";`],
  ])(
    "%s 불러와도 첫 레이어 선언이 같고 컴포넌트는 utilities보다 약한 레이어에 있다",
    async (_, input) => {
      const css = await build(input)
      expect(LAYER_STATEMENT.exec(css)?.[0]).toBe(LAYER_ORDER)
      expect(layerBlocks(css, "components").join("\n")).toContain(".umc-button")
      const utilities = layerBlocks(css, "utilities").join("\n")
      expect(utilities).toContain(".rounded-full")
      expect(utilities).not.toContain(".umc-button")
    },
  )
})
