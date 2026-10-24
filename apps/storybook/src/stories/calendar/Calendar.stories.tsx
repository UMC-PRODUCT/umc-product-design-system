import type { Meta, StoryObj } from "@storybook/react-vite"
import { Calendar } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "캘린더/Calendar",
  id: "calendar",
  component: Calendar,
  parameters: {
    ...componentParameters(
      "Calendar",
      "한 달을 날짜 칸으로 보여 주고, 날짜 하나를 고르거나 기간과 일정이 있는 날을 표시합니다.",
    ),
    layout: "centered",
  },
  argTypes: {
    value: hiddenControl,
    defaultValue: hiddenControl,
    month: hiddenControl,
    defaultMonth: hiddenControl,
    ranges: hiddenControl,
    markedDates: hiddenControl,
    isDateDisabled: hiddenControl,
    previousMonthLabel: textControl,
    nextMonthLabel: textControl,
  },
  args: {
    defaultMonth: new Date(2026, 9, 1),
    value: new Date(2026, 9, 12),
    headerLayout: "centered",
    ranges: [{ start: new Date(2026, 9, 22), end: new Date(2026, 10, 1) }],
    markedDates: [
      new Date(2026, 9, 22),
      new Date(2026, 9, 26),
      new Date(2026, 9, 29),
    ],
    onValueChange: fn(),
    onMonthChange: fn(),
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <Calendar
        {...args}
        onValueChange={(date) => {
          args.onValueChange?.(date)
          updateArgs({ value: date })
        }}
      />
    )
  },
}
