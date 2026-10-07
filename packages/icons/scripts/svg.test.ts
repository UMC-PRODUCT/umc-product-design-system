import { describe, expect, it } from "vitest"

import { parseSvg, renderJsx, transformSvg, type ColorMapper } from "./svg.ts"

const FIGMA_ICON = `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Icon/More_Vertical">
<g id="vector">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.2C12.7 7.2 13.3 6.6 13.3 5.9Z" fill="#3F4141"/>
</g>
</g>
</svg>`

const CLIPPED_PICTOGRAM = `<svg preserveAspectRatio="none" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Pictogram/GraduationCap" clip-path="url(#clip0_0_8)">
<path id="Union" d="M24 16.6Z" fill="#02746C"/>
</g>
<defs>
<clipPath id="clip0_0_8">
<rect width="30" height="30" fill="white"/>
</clipPath>
</defs>
</svg>`

const PARTIAL_CLIP = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_0_9)">
<path d="M1 1Z" fill="#3F4141"/>
</g>
<defs>
<clipPath id="clip0_0_9">
<rect width="12" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`

const toCurrentColor: ColorMapper = () => ({ attribute: "currentColor" })

describe("parseSvg", () => {
  it("루트 svg와 하위 요소를 속성 순서대로 읽는다", () => {
    const svg = parseSvg(FIGMA_ICON)
    expect(svg.name).toBe("svg")
    expect(svg.attributes).toContainEqual(["viewBox", "0 0 24 24"])
    expect(svg.children[0]?.name).toBe("g")
  })

  it("주석이나 style 요소가 있으면 실패한다", () => {
    expect(() => parseSvg("<svg><!-- x --></svg>")).toThrow()
    expect(() => parseSvg("<svg><style>a{}</style></svg>")).toThrow()
  })

  it("닫히지 않은 태그가 있으면 실패한다", () => {
    expect(() => parseSvg('<svg viewBox="0 0 24 24"><g></svg>')).toThrow()
  })
})

describe("transformSvg", () => {
  it("피그마 내보내기 속성과 이름뿐인 g를 걷어내고 색을 바꾼다", () => {
    const result = transformSvg(parseSvg(FIGMA_ICON), {
      idPrefix: "more-vertical-regular",
      mapColor: toCurrentColor,
    })
    expect(result.viewBox).toBe("0 0 24 24")
    expect(result.colors).toEqual(["#3f4141"])
    expect(renderJsx(result.children)).toBe(
      '<path fillRule="evenodd" clipRule="evenodd" d="M12 7.2C12.7 7.2 13.3 6.6 13.3 5.9Z" fill="currentColor" />',
    )
  })

  it("캔버스 전체를 자르는 clip-path와 빈 defs를 지운다", () => {
    const result = transformSvg(parseSvg(CLIPPED_PICTOGRAM), {
      idPrefix: "graduation-cap",
      mapColor: toCurrentColor,
    })
    expect(renderJsx(result.children)).toBe(
      '<path d="M24 16.6Z" fill="currentColor" />',
    )
  })

  it("일부만 자르는 clip-path는 남기고 id에 접두사를 붙인다", () => {
    const result = transformSvg(parseSvg(PARTIAL_CLIP), {
      idPrefix: "half-thin",
      mapColor: toCurrentColor,
    })
    const jsx = renderJsx(result.children)
    expect(jsx).toContain('clipPath="url(#half-thin-clip0_0_9)"')
    expect(jsx).toContain('<clipPath id="half-thin-clip0_0_9">')
    expect(jsx).toContain('fill="white"')
  })

  it("색 치환 결과가 style이면 style 객체로 렌더한다", () => {
    const result = transformSvg(parseSvg(CLIPPED_PICTOGRAM), {
      idPrefix: "graduation-cap",
      mapColor: () => ({ style: "var(--umc-color-teal-100)" }),
    })
    expect(renderJsx(result.children)).toBe(
      '<path d="M24 16.6Z" style={{ fill: "var(--umc-color-teal-100)" }} />',
    )
  })
})

describe("renderJsx", () => {
  it("요소가 여러 개면 Fragment로 감싼다", () => {
    const svg = parseSvg(
      '<svg viewBox="0 0 24 24"><path d="M1 1Z" fill="#3F4141"/><path d="M2 2Z" fill="#3F4141"/></svg>',
    )
    const result = transformSvg(svg, {
      idPrefix: "x",
      mapColor: toCurrentColor,
    })
    expect(renderJsx(result.children)).toBe(
      '<><path d="M1 1Z" fill="currentColor" /><path d="M2 2Z" fill="currentColor" /></>',
    )
  })
})
