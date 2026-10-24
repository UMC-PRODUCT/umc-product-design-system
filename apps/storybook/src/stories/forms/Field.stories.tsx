import type { Meta, StoryObj } from "@storybook/react-vite"
import { Field, FieldControl } from "@umc-product/react"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/Field",
  id: "field",
  component: Field,
  subcomponents: { FieldControl },
  decorators: [withWidth(360)],
  parameters: componentParameters("Field"),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
    info: hiddenControl,
    children: hiddenControl,
  },
  args: {
    children: null,
    label: "기수",
    caption: "현재 활동 중인 기수를 입력하세요",
    captionColor: "neutral",
    captionSize: "md",
    required: false,
    invalid: false,
    disabled: false,
    nativeLabel: true,
  },
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    return (
      <Field {...args}>
        <FieldControl
          render={
            <input
              className="umc-input-box__input"
              placeholder="기수를 입력하세요"
            />
          }
        />
      </Field>
    )
  },
}
