import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextFieldLineField } from "@umc-product/react"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/TextFieldLineField",
  id: "text-field-line-field",
  component: TextFieldLineField,
  decorators: [withWidth(360)],
  parameters: componentParameters("TextFieldLineField"),
  argTypes: {
    children: hiddenControl,
  },
  args: {
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof TextFieldLineField>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    return (
      <TextFieldLineField {...args}>
        <input
          className="umc-text-field-line-field__input"
          placeholder="플레이스홀더 또는 레이블"
        />
      </TextFieldLineField>
    )
  },
}
