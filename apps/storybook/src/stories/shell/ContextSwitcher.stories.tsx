import type { Meta, StoryObj } from "@storybook/react-vite"
import { ContextSwitcher } from "@umc-product/react"
import type { ContextSwitcherOption } from "@umc-product/react"
import { fn, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"

import { componentParameters } from "../../docs-links.ts"

const OPTIONS: ContextSwitcherOption<string>[] = [
  { value: "central", label: "중앙 운영" },
  { value: "chapter", label: "지부" },
  { value: "school", label: "학교" },
]

const meta = {
  title: "앱 셸/ContextSwitcher",
  id: "context-switcher",
  component: ContextSwitcher,
  parameters: componentParameters("ContextSwitcher"),
  args: {
    options: OPTIONS,
    value: "chapter",
    onValueChange: fn(),
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<{ value: string }>()
    return (
      <ContextSwitcher
        {...args}
        value={value}
        onValueChange={(v) => {
          args.onValueChange(v)
          updateArgs({ value: v })
        }}
      />
    )
  },
} satisfies Meta<typeof ContextSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Opened: Story = {
  tags: ["!autodocs"],
  parameters: { pseudo: { rootSelector: "body" } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button"))
    await userEvent.keyboard("{ArrowDown}")
  },
}
