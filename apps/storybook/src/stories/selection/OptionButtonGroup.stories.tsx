import type { Meta, StoryObj } from "@storybook/react-vite"
import { OptionButtonGroup, type OptionItem } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { componentParameters } from "../../docs-links.ts"

const PART_OPTIONS: OptionItem[] = [
  { value: "fe", label: "프론트엔드" },
  { value: "be", label: "백엔드" },
  { value: "de", label: "디자인" },
]

type SingleStoryArgs = {
  options: OptionItem[]
  variant?: "weak" | "strong"
  size?: "xl" | "sm" | "xs"
  disabled?: boolean
  value?: string | null
  onValueChange?: (value: string) => void
}

const meta = {
  title: "선택/OptionButtonGroup",
  id: "option-button-group",
  component: OptionButtonGroup,
  parameters: componentParameters("OptionButtonGroup"),
  args: {
    options: PART_OPTIONS,
    variant: "weak",
    size: "sm",
    disabled: false,
    value: "fe",
    onValueChange: fn(),
  },
} satisfies Meta<SingleStoryArgs>

export default meta

type Story = StoryObj<Meta<SingleStoryArgs>>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<SingleStoryArgs>()
    return (
      <OptionButtonGroup
        type="single"
        options={args.options ?? []}
        variant={args.variant}
        size={args.size}
        disabled={args.disabled}
        value={args.value}
        aria-label="파트 선택"
        onValueChange={(value) => {
          args.onValueChange?.(value)
          updateArgs({ value })
        }}
      />
    )
  },
}

export const Multiple: Story = {
  render: function Render(args) {
    return (
      <OptionButtonGroup
        type="multiple"
        options={args.options ?? []}
        variant={args.variant}
        size={args.size}
        disabled={args.disabled}
        defaultValue={["fe"]}
        aria-label="파트 선택 (복수)"
      />
    )
  },
  args: {
    value: undefined,
  },
}
