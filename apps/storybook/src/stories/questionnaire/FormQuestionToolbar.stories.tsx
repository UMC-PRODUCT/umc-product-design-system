import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FormQuestionToolbar,
  FormQuestionTypeList,
  type FormQuestionToolbarProps,
} from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { QUESTION_TYPES } from "../../question-types.tsx"

const meta = {
  title: "질문지/FormQuestionToolbar",
  id: "form-question-toolbar",
  component: FormQuestionToolbar,
  subcomponents: { FormQuestionTypeList },
  parameters: componentParameters(
    "FormQuestionToolbar",
    "더하기 버튼으로 질문 유형 버튼을 열고, 누른 유형을 `onTypeSelect`로 넘깁니다. 유형 목록(`items`)은 앱이 넘깁니다.",
  ),
  argTypes: {
    items: hiddenControl,
    openLabel: textControl,
    closeLabel: textControl,
  },
  args: {
    items: QUESTION_TYPES,
    open: false,
    disabled: false,
    onOpenChange: fn(),
    onTypeSelect: fn(),
  },
  render: function Render(args: FormQuestionToolbarProps) {
    const [, updateArgs] = useArgs<FormQuestionToolbarProps>()
    return (
      <FormQuestionToolbar
        {...args}
        onOpenChange={(open) => {
          args.onOpenChange?.(open)
          updateArgs({ open })
        }}
      />
    )
  },
} satisfies Meta<FormQuestionToolbarProps>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
