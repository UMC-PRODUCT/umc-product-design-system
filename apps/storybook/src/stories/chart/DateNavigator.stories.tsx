import type { Meta, StoryObj } from "@storybook/react-vite"
import { DateNavigator } from "@umc-product/react"
import { fn } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "차트/DateNavigator",
  id: "date-navigator",
  component: DateNavigator,
  parameters: {
    ...componentParameters(
      "DateNavigator",
      "날짜나 기간을 하나씩 앞뒤로 옮깁니다. 콜백을 넘기지 않은 쪽 화살표는 비활성입니다.",
    ),
    layout: "centered",
  },
  argTypes: {
    children: textControl,
    previousLabel: textControl,
    nextLabel: textControl,
  },
  args: {
    children: "2026년 10월 20일",
    "aria-label": "날짜",
    onPrevious: fn(),
    onNext: fn(),
  },
} satisfies Meta<typeof DateNavigator>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
