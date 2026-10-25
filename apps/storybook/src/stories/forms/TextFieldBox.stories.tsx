import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextFieldBox } from "@umc-product/react"
import { fn } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/TextFieldBox",
  id: "text-field-box",
  component: TextFieldBox,
  decorators: [withWidth(360)],
  parameters: componentParameters("TextFieldBox"),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
    unit: textControl,
  },
  args: {
    label: "이름",
    placeholder: "이름을 입력하세요",
    caption: "실명으로 입력해 주세요",
    defaultValue: "",
    size: "lg",
    type: "text",
    clearable: true,
    required: false,
    invalid: false,
    disabled: false,
    readOnly: false,
    onChange: fn(),
  },
} satisfies Meta<typeof TextFieldBox>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    return <TextFieldBox {...args} key={String(args.defaultValue)} />
  },
}
