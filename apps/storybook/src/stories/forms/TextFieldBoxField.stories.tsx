import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextFieldBoxField } from "@umc-product/react"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/TextFieldBoxField",
  id: "text-field-box-field",
  component: TextFieldBoxField,
  decorators: [withWidth(360)],
  parameters: componentParameters("TextFieldBoxField"),
  argTypes: {
    children: hiddenControl,
  },
  args: {
    size: "lg",
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof TextFieldBoxField>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    return (
      <TextFieldBoxField {...args}>
        <input
          className="umc-text-field-box-field__input"
          placeholder="텍스트를 입력하세요"
        />
      </TextFieldBoxField>
    )
  },
}
