import type { Meta, StoryObj } from "@storybook/react-vite"
import { ColumnChart, type ColumnChartItem } from "@umc-product/react"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const DAYS: readonly ColumnChartItem[] = [
  { key: "10-13", label: "13(화)", value: 0 },
  { key: "10-14", label: "14(수)", value: 3 },
  { key: "10-15", label: "15(목)", value: 8 },
  { key: "10-16", label: "16(금)", value: 12 },
  { key: "10-17", label: "17(토)", value: 9, mode: "primary-weak" },
  { key: "10-18", label: "18(일)", value: 15 },
  { key: "10-19", label: "19(월)", value: 11 },
  { key: "10-20", label: "20(화)", value: 4, mode: "primary-strong" },
]

const meta = {
  title: "차트/ColumnChart",
  id: "column-chart",
  component: ColumnChart,
  parameters: componentParameters(
    "ColumnChart",
    "날짜처럼 순서가 있는 항목의 값을 세로 막대로 나란히 보여 줍니다. 막대 높이는 값을 가장 큰 값(또는 max)으로 나눈 비율입니다.",
  ),
  decorators: [withWidth(342)],
  argTypes: {
    items: hiddenControl,
    max: { control: { type: "number", min: 0, step: 1 } },
    formatValue: hiddenControl,
    className: hiddenControl,
  },
  args: {
    items: DAYS,
    formatValue: (value: number) => `${value}명`,
    "aria-label": "최근 8일 지원자 수",
  },
} satisfies Meta<typeof ColumnChart>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
