import type { Meta, StoryObj } from "@storybook/react-vite"
import { RankedBarChart, type RankedBarChartItem } from "@umc-product/react"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const CHAPTERS: readonly RankedBarChartItem[] = [
  { key: "neon", label: "Neon", value: 100, reference: 103 },
  { key: "chromium", label: "Chromium", value: 89, reference: 120 },
  { key: "platinum", label: "Platinum", value: 71, reference: 90 },
  { key: "cassiopeia", label: "Cassiopeia", value: 60, reference: 67 },
  { key: "nova", label: "Nova", value: 30, reference: 50 },
  { key: "aurora", label: "Aurora", value: 4, reference: 50 },
  { key: "titan", label: "Titan", value: 4, reference: 40 },
  { key: "vega", label: "Vega", value: 0, reference: 50 },
]

const meta = {
  title: "차트/RankedBarChart",
  id: "ranked-bar-chart",
  component: RankedBarChart,
  parameters: componentParameters(
    "RankedBarChart",
    "값이 큰 순서로 막대를 세우고 1~3위를 색으로 구분합니다. heightBy로 값 비례 높이와 순위 고정 높이를 고릅니다.",
  ),
  argTypes: {
    items: hiddenControl,
    unit: textControl,
    heightBy: {
      control: { type: "inline-radio" },
      options: ["value", "rank"],
    },
    max: { control: { type: "number", min: 0, step: 1 } },
    formatValue: hiddenControl,
    className: hiddenControl,
  },
  args: {
    items: CHAPTERS,
    unit: "명",
    heightBy: "value",
    "aria-label": "지부별 평가 현황",
  },
} satisfies Meta<typeof RankedBarChart>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
