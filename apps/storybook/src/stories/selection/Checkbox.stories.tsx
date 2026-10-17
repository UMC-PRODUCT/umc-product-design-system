import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "선택/Checkbox",
  id: "checkbox",
  component: Checkbox,
  parameters: componentParameters("Checkbox"),
  args: {
    children: "개인정보 수집에 동의합니다",
    checked: false,
    color: "neutral",
    size: "md",
    labelPlacement: "start",
    invalid: false,
    disabled: false,
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <Checkbox
        {...args}
        onCheckedChange={(checked) => {
          args.onCheckedChange?.(checked)
          updateArgs({ checked })
        }}
      />
    )
  },
}
