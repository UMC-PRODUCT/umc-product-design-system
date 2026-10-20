import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChartLegend, type ChartSeries } from "@umc-product/react"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const PARTS: readonly ChartSeries[] = [
  { key: "pm", label: "PM", color: "pm" },
  { key: "design", label: "Design", color: "design" },
  { key: "web-pe", label: "Web PE", color: "web-pe" },
  { key: "mobile-pe", label: "Mobile PE", color: "mobile-pe" },
  { key: "applied", label: "지원자 수", color: "reference" },
]

const meta = {
  title: "차트/ChartLegend",
  id: "chart-legend",
  component: ChartLegend,
  parameters: componentParameters(
    "ChartLegend",
    "차트의 색이 어떤 계열인지 색 점과 이름으로 알려 줍니다. 차트에 넘기는 계열 목록을 그대로 넘깁니다.",
  ),
  argTypes: {
    series: hiddenControl,
    className: hiddenControl,
  },
  args: {
    series: PARTS,
    "aria-label": "파트와 지원자 수",
  },
} satisfies Meta<typeof ChartLegend>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
