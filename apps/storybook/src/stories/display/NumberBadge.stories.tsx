import type { Meta, StoryObj } from "@storybook/react-vite"
import { NumberBadge } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/NumberBadge",
  id: "number-badge",
  component: NumberBadge,
  parameters: componentParameters("NumberBadge"),
  argTypes: { children: textControl },
  args: {
    children: "3",
    color: "brand",
    variant: "fill",
    size: "sm",
  },
} satisfies Meta<typeof NumberBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
