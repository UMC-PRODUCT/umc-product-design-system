import { textStyleUtilities } from "@umc-product/design-tokens"

import { element, section } from "./dom.ts"

const SAMPLE_TEXT = "UMC 세상의 틀을 깰 챌린저들이 하나로 모이는 곳"

type TypographyRow = {
  sample: HTMLElement
  spec: HTMLElement
  row: HTMLElement
}

const createRow = (utility: string): TypographyRow => {
  const sample = element("p", `${utility} truncate`, [SAMPLE_TEXT])
  const spec = element("p", "text-caption-1-regular mt-1 text-black/60")
  const row = element(
    "li",
    "grid grid-cols-[240px_1fr] items-center gap-6 border-b border-black/5 py-4",
    [
      element("div", "", [
        element("p", "text-label-5-semibold font-mono", [utility]),
        spec,
      ]),
      sample,
    ],
  )
  return { sample, spec, row }
}

const describeComputedStyle = (sample: HTMLElement): string => {
  const style = getComputedStyle(sample)
  const fontSize = Number.parseFloat(style.fontSize)
  const lineHeight = Number.parseFloat(style.lineHeight)
  const lineHeightRatio = Number((lineHeight / fontSize).toFixed(3))
  return `${fontSize}px, 굵기 ${style.fontWeight}, 행간 ${lineHeightRatio} (${lineHeight}px), 자간 ${style.letterSpacing}`
}

export const renderTypographySection = () => {
  const rows = textStyleUtilities.map(createRow)

  const fillComputedSpecs = () => {
    for (const { sample, spec } of rows) {
      spec.textContent = describeComputedStyle(sample)
    }
  }

  const node = section(
    "타이포그래피",
    `텍스트 스타일 ${rows.length}개. 오른쪽 문장은 Tailwind 유틸리티로 렌더링했고, 왼쪽 수치는 브라우저가 계산한 값입니다.`,
    [
      element(
        "ul",
        "",
        rows.map(({ row }) => row),
      ),
    ],
  )
  return { node, fillComputedSpecs }
}
