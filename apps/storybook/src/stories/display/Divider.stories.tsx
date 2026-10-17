import type { Meta, StoryObj } from "@storybook/react-vite"
import { Divider, TextButton } from "@umc-product/react"

import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "표시/Divider",
  id: "divider",
  component: Divider,
  decorators: [withWidth(374)],
  parameters: componentParameters("Divider"),
  argTypes: {
    variant: { control: { type: "inline-radio" }, options: ["line", "solid"] },
  },
  args: {
    variant: "line",
  },
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Vertical: Story = {
  argTypes: {
    variant: { control: false },
  },
  render: function Render() {
    return (
      <div className="flex items-center gap-4">
        <span className="text-label-3-medium text-brand-default-600">
          선택 3
        </span>
        <Divider orientation="vertical" />
        <TextButton color="neutral">가람대학교</TextButton>
        <TextButton color="neutral">나래대학교</TextButton>
      </div>
    )
  },
}
