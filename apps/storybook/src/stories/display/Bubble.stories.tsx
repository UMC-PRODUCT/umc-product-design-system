import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bubble } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/Bubble",
  id: "bubble",
  component: Bubble,
  parameters: componentParameters("Bubble"),
  argTypes: { children: textControl },
  args: {
    direction: "incoming",
    children: "안녕하세요!",
  },
} satisfies Meta<typeof Bubble>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
