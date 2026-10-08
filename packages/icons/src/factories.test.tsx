import { render } from "@testing-library/react"
import { createRef, type ComponentProps } from "react"
import { describe, expect, expectTypeOf, it } from "vitest"

import { createIcon } from "./create-icon.tsx"
import { createLogo } from "./create-logo.tsx"
import { createPictogram } from "./create-pictogram.tsx"

const SampleIcon = createIcon({
  name: "SampleIcon",
  defaultWeight: "regular",
  weights: {
    thin: {
      viewBox: "0 0 24 24",
      content: <path data-weight="thin" d="M1 1Z" fill="currentColor" />,
    },
    regular: {
      viewBox: "0 0 24 25",
      content: <path data-weight="regular" d="M2 2Z" fill="currentColor" />,
    },
  },
})

const FillOnlyIcon = createIcon({
  name: "FillOnlyIcon",
  defaultWeight: "fill",
  weights: {
    fill: {
      viewBox: "0 0 24 24",
      content: <path d="M3 3Z" fill="currentColor" />,
    },
  },
})

const SamplePictogram = createPictogram({
  name: "SamplePictogram",
  defaultMode: "light",
  modes: {
    light: {
      viewBox: "0 0 30 30",
      color: "var(--umc-color-icon-brand-strong-600)",
      content: <path d="M4 4Z" fill="currentColor" />,
    },
    dark: {
      viewBox: "0 0 30 30",
      color: "var(--umc-color-icon-brand-medium-500)",
      content: <path d="M5 5Z" fill="currentColor" />,
    },
  },
})

const svgOf = (container: HTMLElement) => {
  const svg = container.querySelector("svg")
  if (!svg) {
    throw new Error("svg가 렌더되지 않았습니다")
  }
  return svg
}

describe("createIcon", () => {
  it("기본은 24px 장식 아이콘이고 기본 굵기를 그린다", () => {
    const svg = svgOf(render(<SampleIcon />).container)
    expect(svg.getAttribute("width")).toBe("24")
    expect(svg.getAttribute("aria-hidden")).toBe("true")
    expect(svg.getAttribute("role")).toBeNull()
    expect(
      svg.querySelector("[data-weight]")?.getAttribute("data-weight"),
    ).toBe("regular")
  })

  it("weight와 size를 바꾸고 svg 속성을 그대로 전달한다", () => {
    const ref = createRef<SVGSVGElement>()
    const svg = svgOf(
      render(
        <SampleIcon
          weight="thin"
          size={16}
          className="text-fg-brand-default"
          ref={ref}
        />,
      ).container,
    )
    expect(svg.getAttribute("width")).toBe("16")
    expect(svg.getAttribute("class")).toBe("text-fg-brand-default")
    expect(
      svg.querySelector("[data-weight]")?.getAttribute("data-weight"),
    ).toBe("thin")
    expect(ref.current).toBe(svg)
  })

  it("굵기마다 피그마 프레임의 viewBox를 쓰고 정사각형 크기는 유지한다", () => {
    const regular = svgOf(render(<SampleIcon />).container)
    const thin = svgOf(render(<SampleIcon weight="thin" />).container)
    expect(regular.getAttribute("viewBox")).toBe("0 0 24 25")
    expect(regular.getAttribute("height")).toBe("24")
    expect(thin.getAttribute("viewBox")).toBe("0 0 24 24")
  })

  it("aria-label이 있으면 의미 있는 이미지로 노출한다", () => {
    const svg = svgOf(render(<SampleIcon aria-label="검색" />).container)
    expect(svg.getAttribute("role")).toBe("img")
    expect(svg.getAttribute("aria-hidden")).toBeNull()
  })

  it("피그마에 없는 굵기는 타입 오류다", () => {
    expectTypeOf<ComponentProps<typeof FillOnlyIcon>["weight"]>().toEqualTypeOf<
      "fill" | undefined
    >()
    expectTypeOf<ComponentProps<typeof SampleIcon>["weight"]>().toEqualTypeOf<
      "thin" | "regular" | undefined
    >()
  })
})

describe("createPictogram", () => {
  it("기본은 30px이고 모드의 기본색을 쓴다", () => {
    const light = svgOf(render(<SamplePictogram />).container)
    const dark = svgOf(render(<SamplePictogram mode="dark" />).container)
    expect(light.getAttribute("width")).toBe("30")
    expect(light.style.color).toBe("var(--umc-color-icon-brand-strong-600)")
    expect(dark.style.color).toBe("var(--umc-color-icon-brand-medium-500)")
  })

  it("color로 색을 바꾸고 style을 합친다", () => {
    const svg = svgOf(
      render(<SamplePictogram color="red" style={{ display: "block" }} />)
        .container,
    )
    expect(svg.style.color).toBe("red")
    expect(svg.style.display).toBe("block")
  })
})

const SampleLogo = createLogo({
  name: "SampleLogo",
  frame: { width: 148, height: 44 },
  content: <path d="M4 4Z" fill="currentColor" />,
})

describe("createLogo", () => {
  it("기본은 높이 22px이고 폭은 viewBox 비율을 따른다", () => {
    const svg = render(<SampleLogo />).container.querySelector("svg")
    expect(svg?.getAttribute("height")).toBe("22")
    expect(svg?.getAttribute("width")).toBe("74")
    expect(svg?.getAttribute("viewBox")).toBe("0 0 148 44")
    expect(svg?.getAttribute("aria-hidden")).toBe("true")
  })

  it("height를 바꾸면 폭도 같은 비율로 바뀐다", () => {
    const svg = render(<SampleLogo height={44} />).container.querySelector(
      "svg",
    )
    expect(svg?.getAttribute("width")).toBe("148")
  })

  it("aria-label이 있으면 의미 있는 이미지로 노출한다", () => {
    const svg = render(<SampleLogo aria-label="UMC" />).container.querySelector(
      "svg",
    )
    expect(svg?.getAttribute("role")).toBe("img")
    expect(svg?.hasAttribute("aria-hidden")).toBe(false)
  })

  it("displayName을 붙인다", () => {
    expect(SampleLogo.displayName).toBe("SampleLogo")
  })
})
