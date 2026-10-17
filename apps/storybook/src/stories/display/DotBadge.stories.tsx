import type { Meta, StoryObj } from "@storybook/react-vite"
import { DotBadge } from "@umc-product/react"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/DotBadge",
  id: "dot-badge",
  component: DotBadge,
  parameters: componentParameters("DotBadge"),
  argTypes: { children: hiddenControl },
  args: {
    color: "brand",
    size: "sm",
    "aria-label": "새 알림",
  },
} satisfies Meta<typeof DotBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
