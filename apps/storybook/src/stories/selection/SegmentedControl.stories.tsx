import type { Meta, StoryObj } from "@storybook/react-vite"
import { SegmentedControl, type SegmentedControlItem } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { componentParameters } from "../../docs-links.ts"

const STATUS_ITEMS: SegmentedControlItem[] = [
  { value: "all", label: "전체" },
  { value: "ongoing", label: "진행 중" },
  { value: "done", label: "완료" },
]

const meta = {
  title: "선택/SegmentedControl",
  id: "segmented-control",
  component: SegmentedControl,
  parameters: componentParameters("SegmentedControl"),
  args: {
    items: STATUS_ITEMS,
    value: "all",
    "aria-label": "상태 필터",
    onValueChange: fn(),
  },
} satisfies Meta<typeof SegmentedControl>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <SegmentedControl
        {...args}
        onValueChange={(value) => {
          args.onValueChange?.(value)
          updateArgs({ value })
        }}
      />
    )
  },
}
