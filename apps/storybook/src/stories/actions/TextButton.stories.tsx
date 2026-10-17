import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextButton } from "@umc-product/react"
import { fn } from "storybook/test"

import { iconArgType, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "액션/TextButton",
  id: "text-button",
  component: TextButton,
  parameters: componentParameters("TextButton"),
  argTypes: {
    children: textControl,
    leadingIcon: iconArgType,
    trailingIcon: iconArgType,
  },
  args: {
    children: "더 보기",
    color: "brand",
    size: "xs",
    variant: "plain",
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof TextButton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
