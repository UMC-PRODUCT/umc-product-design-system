import type { Meta, StoryObj } from "@storybook/react-vite"
import { CheckButton } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "선택/CheckButton",
  id: "check-button",
  component: CheckButton,
  parameters: componentParameters("CheckButton"),
  args: {
    checked: false,
    disabled: false,
    "aria-label": "공지 읽음 표시",
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof CheckButton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <CheckButton
        {...args}
        onCheckedChange={(checked) => {
          args.onCheckedChange?.(checked)
          updateArgs({ checked })
        }}
      />
    )
  },
}
