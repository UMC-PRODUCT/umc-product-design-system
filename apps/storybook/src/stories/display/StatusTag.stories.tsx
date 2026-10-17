import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatusTag } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/StatusTag",
  id: "status-tag",
  component: StatusTag,
  parameters: componentParameters("StatusTag"),
  argTypes: { children: textControl },
  args: {
    children: "진행 중",
    color: "brand",
  },
} satisfies Meta<typeof StatusTag>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
