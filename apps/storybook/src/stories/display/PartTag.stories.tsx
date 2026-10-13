import type { Meta, StoryObj } from "@storybook/react-vite"
import { PartTag } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/PartTag",
  id: "part-tag",
  component: PartTag,
  parameters: componentParameters("PartTag"),
  argTypes: { children: textControl },
  args: {
    part: "pm",
    variant: "filled",
    size: "sm",
  },
} satisfies Meta<typeof PartTag>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
