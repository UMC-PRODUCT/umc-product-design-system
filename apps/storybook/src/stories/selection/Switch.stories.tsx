import type { Meta, StoryObj } from "@storybook/react-vite"
import { Switch } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "선택/Switch",
  id: "switch",
  component: Switch,
  parameters: componentParameters("Switch"),
  args: {
    children: "알림 받기",
    checked: false,
    size: "sm",
    labelPlacement: "start",
    disabled: false,
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <Switch
        {...args}
        onCheckedChange={(checked) => {
          args.onCheckedChange?.(checked)
          updateArgs({ checked })
        }}
      />
    )
  },
}
