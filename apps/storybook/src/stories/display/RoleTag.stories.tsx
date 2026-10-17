import type { Meta, StoryObj } from "@storybook/react-vite"
import { RoleTag } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/RoleTag",
  id: "role-tag",
  component: RoleTag,
  parameters: componentParameters("RoleTag"),
  argTypes: { children: textControl },
  args: {
    color: "challenger-super-admin",
    size: "sm",
    children: "총괄",
  },
} satisfies Meta<typeof RoleTag>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
