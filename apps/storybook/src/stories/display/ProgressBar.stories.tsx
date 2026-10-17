import type { Meta, StoryObj } from "@storybook/react-vite"
import { ProgressBar } from "@umc-product/react"

import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "표시/ProgressBar",
  id: "progress-bar",
  component: ProgressBar,
  parameters: componentParameters("ProgressBar"),
  decorators: [withWidth(320)],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  args: {
    value: 40,
    max: 100,
    size: "md",
    color: "brand",
    "aria-label": "진행률",
  },
} satisfies Meta<typeof ProgressBar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
