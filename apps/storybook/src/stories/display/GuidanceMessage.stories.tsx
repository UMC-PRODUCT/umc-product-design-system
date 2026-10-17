import type { Meta, StoryObj } from "@storybook/react-vite"
import { GuidanceMessage, type GuidanceMessageColor } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const GUIDANCE_COLORS: GuidanceMessageColor[] = [
  "neutral",
  "success",
  "warning",
  "error",
]

const meta = {
  title: "표시/GuidanceMessage",
  id: "guidance-message",
  component: GuidanceMessage,
  parameters: componentParameters("GuidanceMessage"),
  argTypes: {
    children: textControl,
    color: { control: { type: "inline-radio" }, options: GUIDANCE_COLORS },
  },
  args: {
    children: "지금은 프로젝트 지원 기간이 아니에요",
    color: "neutral",
    showIcon: true,
  },
} satisfies Meta<typeof GuidanceMessage>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
