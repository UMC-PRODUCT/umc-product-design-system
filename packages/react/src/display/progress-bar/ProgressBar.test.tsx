import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { ProgressBar } from "./ProgressBar.tsx"

describe("ProgressBar", () => {
  it("role이 progressbar이고 aria-valuenow가 value와 같다", () => {
    render(<ProgressBar value={50} aria-label="진행률" />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuenow", "50")
  })

  it("aria-valuemax가 max와 같다", () => {
    render(<ProgressBar value={30} max={200} aria-label="진행률" />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuemax", "200")
  })

  it("기본 max가 100이다", () => {
    render(<ProgressBar value={40} aria-label="진행률" />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuemax", "100")
  })

  it("기본 data-size가 md이고 data-color가 brand이다", () => {
    render(<ProgressBar value={50} aria-label="진행률" />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("data-size", "md")
    expect(bar).toHaveAttribute("data-color", "brand")
  })

  it("size와 color를 data 속성으로 옮긴다", () => {
    render(
      <ProgressBar value={70} size="lg" color="error" aria-label="진행률" />,
    )
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("data-size", "lg")
    expect(bar).toHaveAttribute("data-color", "error")
  })

  it("className을 umc-progress-bar 뒤에 붙인다", () => {
    render(<ProgressBar value={50} className="mt-4" aria-label="진행률" />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("umc-progress-bar")
    expect(bar.className).toContain("mt-4")
  })

  it("ref를 루트 div에 전달한다", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ProgressBar value={50} ref={ref} aria-label="진행률" />)
    expect(ref.current?.tagName).toBe("DIV")
  })

  it("aria-label 속성을 전달한다", () => {
    render(<ProgressBar value={50} aria-label="파일 업로드 진행률" />)
    const bar = screen.getByRole("progressbar", { name: "파일 업로드 진행률" })
    expect(bar).toBeInTheDocument()
  })
})
