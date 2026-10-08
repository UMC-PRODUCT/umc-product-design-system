import { describe, expect, it } from "vitest"

import { formatPropertyAccess } from "./serialize-ts.ts"

describe("formatPropertyAccess", () => {
  it("식별자 키는 점으로 잇는다", () => {
    expect(formatPropertyAccess("vars", ["color", "fill", "weak75"])).toBe(
      "vars.color.fill.weak75",
    )
  })

  it("숫자로 시작하거나 하이픈이 있는 키는 대괄호로 감싼다", () => {
    expect(formatPropertyAccess("vars", ["color", "teal", "300"])).toBe(
      'vars.color.teal["300"]',
    )
    expect(formatPropertyAccess("vars", ["grid", "margin-desktop"])).toBe(
      'vars.grid["margin-desktop"]',
    )
  })
})
