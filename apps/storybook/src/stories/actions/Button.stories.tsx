import type { Meta, StoryObj } from "@storybook/react-vite"
import { AddIcon } from "@umc-product/icons"
import { Button } from "@umc-product/react"
import { fn } from "storybook/test"

import { iconArgType, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "액션/Button",
  id: "button",
  component: Button,
  parameters: componentParameters("Button"),
  argTypes: {
    children: textControl,
    leadingIcon: iconArgType,
    trailingIcon: iconArgType,
    icon: iconArgType,
  },
  args: {
    children: "확인",
    variant: "fill",
    color: "brand",
    size: "md",
    isLoading: false,
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const IconOnly: Story = {
  args: {
    children: undefined,
    icon: <AddIcon weight="fill" />,
    "aria-label": "추가",
    color: "neutral",
    size: "sm",
  },
}
