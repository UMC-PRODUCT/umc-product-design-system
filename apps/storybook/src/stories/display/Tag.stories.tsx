import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tag } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/Tag",
  id: "tag",
  component: Tag,
  parameters: componentParameters("Tag"),
  argTypes: { children: textControl },
  args: {
    children: "모집 중",
    variant: "weak",
    color: "brand",
    size: "sm",
  },
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
