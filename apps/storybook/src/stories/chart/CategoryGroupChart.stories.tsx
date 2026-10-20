import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CategoryGroupChart,
  type CategoryGroupChartGroup,
  type CategoryGroupChartSeries,
} from "@umc-product/react"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const PARTS: readonly CategoryGroupChartSeries[] = [
  { key: "pm", label: "PM", color: "pm" },
  { key: "design", label: "Design", color: "design" },
  { key: "web-pe", label: "Web PE", color: "web-pe" },
  { key: "mobile-pe", label: "Mobile PE", color: "mobile-pe" },
]

const SCHOOLS: readonly CategoryGroupChartGroup[] = [
  {
    key: "erica",
    label: "한국대 ERICA",
    values: { pm: 10, design: 30, "web-pe": 36, "mobile-pe": 24 },
    references: { pm: 16, design: 34, "web-pe": 44, "mobile-pe": 26 },
    tooltip: { summary: "100명 평가 완료", referenceSummary: "120명 지원" },
  },
  {
    key: "cau",
    label: "중앙대",
    values: { pm: 8, design: 12, "web-pe": 20, "mobile-pe": 5 },
    references: { pm: 12, design: 15, "web-pe": 22, "mobile-pe": 9 },
    tooltip: { summary: "45명 평가 완료", referenceSummary: "58명 지원" },
  },
  {
    key: "hongik",
    label: "홍익대 서울",
    values: { pm: 0, design: 0, "web-pe": 0, "mobile-pe": 0 },
    references: { pm: 0, design: 0, "web-pe": 0, "mobile-pe": 0 },
    tooltip: { summary: "0명 평가 완료", referenceSummary: "0명 지원" },
  },
]

const meta = {
  title: "차트/CategoryGroupChart",
  id: "category-group-chart",
  component: CategoryGroupChart,
  parameters: componentParameters(
    "CategoryGroupChart",
    "묶음마다 여러 계열의 값을 나란히 막대로 견줍니다. 묶음에 마우스를 올리거나 키보드로 가거나 누르면 요약 툴팁이 뜹니다.",
  ),
  argTypes: {
    series: hiddenControl,
    groups: hiddenControl,
    max: { control: { type: "number", min: 0, step: 1 } },
    formatValue: hiddenControl,
    className: hiddenControl,
  },
  args: {
    series: PARTS,
    groups: SCHOOLS,
    formatValue: (value: number) => `${value}명`,
    "aria-label": "학교별 평가 현황",
  },
} satisfies Meta<typeof CategoryGroupChart>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
