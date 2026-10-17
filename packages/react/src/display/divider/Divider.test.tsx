import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Divider } from "./Divider.tsx"

describe("Divider", () => {
  it("가로 구분선을 separator로 그린다", () => {
    render(<Divider />)
    const divider = screen.getByRole("separator")
    expect(divider).toHaveAttribute("aria-orientation", "horizontal")
    expect(divider).toHaveAttribute("data-orientation", "horizontal")
    expect(divider).toHaveAttribute("data-variant", "line")
  })

  it("variant solid는 두꺼운 띠로 그린다", () => {
    render(<Divider variant="solid" />)
    expect(screen.getByRole("separator")).toHaveAttribute(
      "data-variant",
      "solid",
    )
  })

  it("orientation vertical은 세로 구분선으로 그린다", () => {
    render(<Divider orientation="vertical" />)
    const divider = screen.getByRole("separator")
    expect(divider).toHaveAttribute("aria-orientation", "vertical")
    expect(divider).toHaveAttribute("data-orientation", "vertical")
    expect(divider).toHaveAttribute("data-variant", "line")
  })

  it("className을 붙인다", () => {
    render(<Divider className="my-6" />)
    expect(screen.getByRole("separator")).toHaveClass("umc-divider", "my-6")
  })
})
