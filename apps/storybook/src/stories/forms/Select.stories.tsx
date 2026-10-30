import type { Meta, StoryObj } from "@storybook/react-vite"
import { Select, type SelectProps } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn, userEvent, within } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const PARTS = [
  { value: "plan", label: "Plan" },
  { value: "design", label: "Design" },
  { value: "web", label: "Web", caption: "프론트엔드" },
  { value: "spring", label: "SpringBoot" },
  { value: "node", label: "Node.js", disabled: true },
]

type PartValue = (typeof PARTS)[number]["value"]

type StoryArgs = SelectProps<PartValue>

const meta = {
  title: "폼 입력/Select",
  id: "select",
  component: Select,
  decorators: [withWidth(360)],
  parameters: componentParameters("Select"),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
  },
  args: {
    label: "파트",
    placeholder: "파트를 선택하세요",
    options: PARTS,
    value: null,
    size: "lg",
    itemSize: "sm",
    variant: "default",
    searchable: false,
    required: false,
    invalid: false,
    disabled: false,
    onValueChange: fn(),
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()
    return (
      <Select
        {...args}
        onValueChange={(value) => {
          args.onValueChange?.(value)
          updateArgs({ value })
        }}
      />
    )
  },
}

export const Opened: Story = {
  tags: ["!autodocs"],
  parameters: {
    pseudo: { rootSelector: "body" },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()
    return (
      <Select
        {...args}
        onValueChange={(value) => {
          args.onValueChange?.(value)
          updateArgs({ value })
        }}
      />
    )
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("combobox"))
    await userEvent.keyboard("{ArrowDown}")
  },
}

export const InlineCaption: Story = {
  tags: ["!autodocs"],
  args: {
    itemSize: "xs",
    itemLayout: "inline",
    value: "web",
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("combobox"))
  },
}
