import type { Meta, StoryObj } from "@storybook/react-vite"
import { Chip } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { iconArgType, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "선택/Chip",
  id: "chip",
  component: Chip,
  parameters: componentParameters("Chip"),
  argTypes: {
    children: textControl,
    leadingIcon: iconArgType,
    trailingIcon: iconArgType,
  },
  args: {
    children: "디자인",
    variant: "weak",
    color: "brand",
    size: "sm",
    selected: false,
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Chip>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <Chip
        {...args}
        onClick={() => {
          args.onClick?.()
          updateArgs({ selected: !args.selected })
        }}
      />
    )
  },
}
