import { describe, expect, it } from "vitest"

import { withDerivedAxes, type FigmaVariant } from "./figma-variants.ts"

const variant: FigmaVariant = {
  name: "Selected=True, Disabled=False",
  props: { Selected: "True", Disabled: "False" },
}

describe("withDerivedAxes", () => {
  it("피그마 축은 그대로 두고 계산한 축을 더한다", () => {
    const derived = withDerivedAxes(variant, {
      State: (props) =>
        props["Selected"] === "True" ? "Checked" : "Unchecked",
    })
    expect(derived.props).toEqual({
      Selected: "True",
      Disabled: "False",
      State: "Checked",
    })
    expect(derived.name).toBe(variant.name)
  })

  it("계산할 축이 없으면 축을 바꾸지 않는다", () => {
    expect(withDerivedAxes(variant, {}).props).toEqual(variant.props)
  })

  it("피그마 축과 이름이 같은 축은 계산하지 않고 멈춘다", () => {
    expect(() =>
      withDerivedAxes(variant, { Selected: () => "Checked" }),
    ).toThrow("Selected")
  })
})
