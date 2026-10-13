import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button, Tooltip } from "@umc-product/react"
import { userEvent, within } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "오버레이와 피드백/Tooltip",
  id: "tooltip",
  component: Tooltip,
  parameters: componentParameters("Tooltip"),
  argTypes: {
    content: textControl,
    title: textControl,
    children: hiddenControl,
  },
  args: {
    content: "사용자에게 정보를 안내하는 툴팁입니다.",
    side: "top",
    mode: "dark",
    size: "md",
    openOn: "hover",
    delay: 0,
    children: <Button>마우스를 올려보세요</Button>,
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Opened: Story = {
  tags: ["!autodocs"],
  parameters: {
    pseudo: { rootSelector: "body" },
  },
  play: async ({ canvasElement }) => {
    await userEvent.hover(
      await within(canvasElement).findByRole("button", {
        name: "마우스를 올려보세요",
      }),
    )
  },
}
