import type { StyleRule } from "@vanilla-extract/css"
import { describe, expectTypeOf, it } from "vitest"

import { typography, vars } from "../../src/generated/vanilla-extract.ts"

describe("vanilla-extract 어댑터 타입", () => {
  it("텍스트 스타일 객체를 style()에 바로 넘길 수 있다", () => {
    expectTypeOf(typography.display1Bold).toExtend<StyleRule>()
  })

  it("그리드와 레이아웃 값을 CSS 속성에 쓸 수 있다", () => {
    const rule = {
      display: "grid",
      gridTemplateColumns: `repeat(${vars.grid.columns}, minmax(0, 1fr))`,
      columnGap: vars.grid.gutter,
      paddingInline: vars.grid.margin.desktop,
      height: vars.layout.header.height,
    }
    expectTypeOf(rule).toExtend<StyleRule>()
  })
})
