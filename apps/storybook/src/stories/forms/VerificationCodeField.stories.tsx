import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  TextInfoButton,
  VerificationCodeField,
  type VerificationCodeFieldProps,
} from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

type StoryArgs = VerificationCodeFieldProps & { withInfo: boolean }

const meta = {
  title: "폼 입력/VerificationCodeField",
  id: "verification-code-field",
  component: VerificationCodeField,
  decorators: [withWidth(360)],
  parameters: componentParameters("VerificationCodeField"),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
    timer: textControl,
    info: hiddenControl,
  },
  args: {
    label: "인증번호",
    placeholder: "숫자 6자리",
    caption: "메일로 받은 인증번호를 입력하세요",
    defaultValue: "",
    timer: "03:00",
    withInfo: true,
    size: "lg",
    clearable: true,
    required: false,
    invalid: false,
    disabled: false,
    readOnly: false,
    onChange: fn(),
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<Meta<StoryArgs>>

export const Playground: Story = {
  render: function Render({ withInfo, ...args }) {
    return (
      <VerificationCodeField
        {...args}
        key={String(args.defaultValue)}
        info={
          withInfo ? (
            <TextInfoButton>인증번호 다시 받기</TextInfoButton>
          ) : undefined
        }
      />
    )
  },
}
