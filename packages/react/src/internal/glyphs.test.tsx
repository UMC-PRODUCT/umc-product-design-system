import { render } from "@testing-library/react"
import type { ReactElement } from "react"
import { describe, expect, it } from "vitest"

import {
  Check16Glyph,
  Check20Glyph,
  CheckButtonGlyph,
  CheckboxCheckLgGlyph,
  CheckboxCheckMdGlyph,
  LegacyCheckGlyph,
  LegacyExpandMoreGlyph,
} from "./glyphs.tsx"

const GLYPHS: [name: string, element: ReactElement, size: number][] = [
  ["LegacyCheckGlyph", <LegacyCheckGlyph />, 16],
  ["LegacyExpandMoreGlyph", <LegacyExpandMoreGlyph />, 16],
  ["Check16Glyph", <Check16Glyph />, 16],
  ["Check20Glyph", <Check20Glyph />, 20],
  ["CheckboxCheckMdGlyph", <CheckboxCheckMdGlyph />, 20],
  ["CheckboxCheckLgGlyph", <CheckboxCheckLgGlyph />, 24],
  ["CheckButtonGlyph", <CheckButtonGlyph />, 24],
]

const svgOf = (element: ReactElement) =>
  render(element).container.querySelector("svg")

describe("라이브러리 밖 그림", () => {
  it.each(GLYPHS)(
    "%s는 피그마 프레임 크기로 그리고 보조 기술에서 숨긴다",
    (_, element, size) => {
      const svg = svgOf(element)
      expect(svg).toHaveAttribute("width", String(size))
      expect(svg).toHaveAttribute("height", String(size))
      expect(svg).toHaveAttribute("viewBox", `0 0 ${size} ${size}`)
      expect(svg).toHaveAttribute("aria-hidden", "true")
    },
  )

  it.each(GLYPHS)("%s는 글자색을 따른다", (_, element) => {
    const path = svgOf(element)?.querySelector("path")
    const paint = path?.getAttribute("stroke") ?? path?.getAttribute("fill")
    expect(paint).toBe("currentColor")
  })

  it("className을 svg에 단다", () => {
    const svg = svgOf(<LegacyExpandMoreGlyph className="trigger-icon" />)
    expect(svg).toHaveClass("trigger-icon")
  })
})
