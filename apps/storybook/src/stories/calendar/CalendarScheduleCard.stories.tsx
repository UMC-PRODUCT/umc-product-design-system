import type { Meta, StoryObj } from "@storybook/react-vite"
import { CalendarScheduleCard } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { withWidth } from "../../decorators.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "캘린더/CalendarScheduleCard",
  id: "calendar-schedule-card",
  component: CalendarScheduleCard,
  parameters: componentParameters(
    "CalendarScheduleCard",
    "캘린더와 함께 놓는 일정 한 건을 회차, 이름, 기간으로 보여 줍니다.",
  ),
  decorators: [withWidth(380)],
  argTypes: {
    label: textControl,
    title: textControl,
    start: textControl,
    end: textControl,
  },
  args: {
    status: "ongoing",
    label: "2차",
    title: "Plan-Design 매칭",
    start: "10월 26일 00:00",
    end: "10월 28일 23:59",
  },
} satisfies Meta<typeof CalendarScheduleCard>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
