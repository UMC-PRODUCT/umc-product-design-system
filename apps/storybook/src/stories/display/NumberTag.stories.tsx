import type { Meta, StoryObj } from "@storybook/react-vite"
import { NumberTag } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/NumberTag",
  id: "number-tag",
  component: NumberTag,
  parameters: componentParameters("NumberTag"),
  argTypes: { children: textControl },
  args: {
    children: "1",
    color: "neutral",
    variant: "primary",
  },
} satisfies Meta<typeof NumberTag>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
