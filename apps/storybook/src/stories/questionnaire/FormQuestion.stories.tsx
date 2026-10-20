import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FormQuestion,
  FormTextAnswer,
  type FormQuestionProps,
} from "@umc-product/react"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "질문지/FormQuestion",
  id: "form-question",
  component: FormQuestion,
  subcomponents: { FormTextAnswer },
  parameters: componentParameters(
    "FormQuestion",
    "질문 하나를 번호, 제목, 답 칸으로 그립니다. 제목이 안쪽 답 칸의 이름이 되고, `required`, `readOnly`, `disabled`가 답 칸에 전해집니다.",
  ),
  decorators: [withWidth(840)],
  argTypes: {
    title: textControl,
    number: textControl,
    description: textControl,
    children: hiddenControl,
  },
  args: {
    number: "01",
    title: "자기소개를 적어 주세요",
    description: "500자 이내로 적어 주세요",
    required: true,
    readOnly: false,
    disabled: false,
    level: 3,
    children: null,
  },
  render: function Render(args: FormQuestionProps) {
    return (
      <FormQuestion {...args}>
        <FormTextAnswer placeholder="작성하세요" maxLength={500} />
      </FormQuestion>
    )
  },
} satisfies Meta<FormQuestionProps>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
