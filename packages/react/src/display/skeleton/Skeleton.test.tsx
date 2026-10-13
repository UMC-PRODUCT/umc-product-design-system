import { render } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { Skeleton } from "./Skeleton.tsx"

const skeletonOf = (container: HTMLElement) =>
  container.querySelector<HTMLElement>(".umc-skeleton")

describe("Skeleton", () => {
  it("화면 낭독기에서 숨긴다", () => {
    const { container } = render(<Skeleton />)
    expect(skeletonOf(container)).toHaveAttribute("aria-hidden", "true")
  })

  it("크기를 넘기지 않으면 인라인 크기를 두지 않고 CSS 기본값을 쓴다", () => {
    const { container } = render(<Skeleton />)
    const el = skeletonOf(container)
    expect(el?.style.width).toBe("")
    expect(el?.style.height).toBe("")
  })

  it("숫자 width와 height는 px로 옮긴다", () => {
    const { container } = render(<Skeleton width={200} height={18} />)
    const el = skeletonOf(container)
    expect(el?.style.width).toBe("200px")
    expect(el?.style.height).toBe("18px")
  })

  it("문자열 width는 그대로 옮긴다", () => {
    const { container } = render(<Skeleton width="60%" />)
    expect(skeletonOf(container)?.style.width).toBe("60%")
  })

  it("style로 넘긴 다른 속성을 크기와 함께 남긴다", () => {
    const { container } = render(
      <Skeleton width={120} style={{ marginTop: 8 }} />,
    )
    const el = skeletonOf(container)
    expect(el?.style.width).toBe("120px")
    expect(el?.style.marginTop).toBe("8px")
  })

  it("className을 umc-skeleton 뒤에 붙인다", () => {
    const { container } = render(<Skeleton className="mt-2" />)
    expect(skeletonOf(container)?.className).toBe("umc-skeleton mt-2")
  })

  it("ref를 span 요소에 전달한다", () => {
    const ref = createRef<HTMLSpanElement>()
    const { container } = render(<Skeleton ref={ref} />)
    expect(ref.current).toBe(skeletonOf(container))
    expect(ref.current?.tagName).toBe("SPAN")
  })
})
