import { describe, expect, it } from "vitest"

import { readSource } from "./contract/source-files.ts"

const BOTTOM_TO_TOP = [
  "dimmed",
  "dialog",
  "sheet",
  "dropdown",
  "tooltip",
  "toast",
] as const

const MODAL_POPUP_OFFSET = 1

const internalCss = readSource("internal/internal.css")

const zIndexOf = (layer: (typeof BOTTOM_TO_TOP)[number]) => {
  const match = new RegExp(`--umc-z-${layer}:\\s*(\\d+);`).exec(internalCss)
  return Number(match?.[1])
}

describe("쌓임 순서", () => {
  it("딤, 다이얼로그, 시트, 목록, 툴팁, 토스트 순으로 위에 뜬다", () => {
    const values = BOTTOM_TO_TOP.map(zIndexOf)
    expect(values.every(Number.isFinite)).toBe(true)
    expect(values).toEqual([...values].sort((a, b) => a - b))
    expect(new Set(values).size).toBe(values.length)
  })

  it("모달 안에서 연 목록과 툴팁은 가장 위 모달 팝업보다 위에 뜬다", () => {
    const topModalPopup = zIndexOf("sheet") + MODAL_POPUP_OFFSET
    expect(zIndexOf("dropdown")).toBeGreaterThan(topModalPopup)
    expect(zIndexOf("tooltip")).toBeGreaterThan(topModalPopup)
  })
})
