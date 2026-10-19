import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FormEditableQuestion,
  FormQuestionEditor,
  FormQuestionTypeList,
  TextArea,
  type FormQuestionEditorProps,
} from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"
import { QUESTION_TYPES } from "../../question-types.tsx"

const meta = {
  title: "질문지/FormQuestionEditor",
  id: "form-question-editor",
  component: FormQuestionEditor,
  subcomponents: { FormEditableQuestion },
  parameters: componentParameters(
    "FormQuestionEditor",
    "질문 하나를 감싸 편집 상태와 도구를 그립니다. 어느 질문이 활성(`active`)인지는 앱이 정하고, 안쪽 질문은 `FormEditableQuestion`이 그립니다.",
  ),
  decorators: [withWidth(900)],
  argTypes: {
    requiredLabel: textControl,
    questionEnabledLabel: textControl,
    deleteLabel: textControl,
    dragHandleProps: hiddenControl,
    toolbar: hiddenControl,
    children: hiddenControl,
  },
  args: {
    active: true,
    disabled: false,
    required: true,
    onRequiredChange: fn(),
    onQuestionEnabledChange: fn(),
    onDelete: fn(),
    children: null,
  },
  render: function Render(args: FormQuestionEditorProps) {
    const [, updateArgs] = useArgs<FormQuestionEditorProps>()
    return (
      <FormQuestionEditor
        {...args}
        onRequiredChange={(required) => {
          args.onRequiredChange?.(required)
          updateArgs({ required })
        }}
        onQuestionEnabledChange={(questionEnabled) => {
          args.onQuestionEnabledChange?.(questionEnabled)
          updateArgs({ questionEnabled })
        }}
        dragHandleProps={{}}
        toolbar={
          <FormQuestionTypeList items={QUESTION_TYPES} defaultValue="short" />
        }
      >
        <FormEditableQuestion
          number="01"
          titleProps={{ defaultValue: "자기소개를 적어 주세요" }}
        >
          <TextArea
            placeholder="작성하세요"
            maxLength={500}
            readOnly
            disabled={args.disabled}
            aria-label="01번 답 칸"
          />
        </FormEditableQuestion>
      </FormQuestionEditor>
    )
  },
} satisfies Meta<FormQuestionEditorProps>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
