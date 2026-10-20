import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChartTooltip, type ChartTooltipItem } from "@umc-product/react"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const ITEMS: readonly ChartTooltipItem[] = [
  { key: "pm", label: "PM", color: "pm", value: "10명", reference: "16명" },
  {
    key: "design",
    label: "Design",
    color: "design",
    value: "30명",
    reference: "34명",
  },
  {
    key: "web-pe",
    label: "Web PE",
    color: "web-pe",
    value: "36명",
    reference: "44명",
  },
  {
    key: "mobile-pe",
    label: "Mobile PE",
    color: "mobile-pe",
    value: "24명",
    reference: "26명",
  },
]

const meta = {
  title: "차트/ChartTooltip",
  id: "chart-tooltip",
  component: ChartTooltip,
  parameters: componentParameters(
    "ChartTooltip",
    "차트 한 묶음의 값을 제목, 합계, 항목 순서로 요약합니다. 항목에 비교값을 넘기면 값 / 비교값 모양이 됩니다.",
  ),
  argTypes: {
    title: textControl,
    summary: textControl,
    referenceSummary: textControl,
    caption: textControl,
    items: hiddenControl,
    className: hiddenControl,
  },
  args: {
    title: "한국대 ERICA",
    summary: "100명 평가 완료",
    referenceSummary: "120명 지원",
    items: ITEMS,
  },
} satisfies Meta<typeof ChartTooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
