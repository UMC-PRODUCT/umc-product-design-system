import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FormEditableQuestion,
  FormQuestionEditor,
  FormSection,
  TextArea,
  type FormSectionProps,
} from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "질문지/FormSection",
  id: "form-section",
  component: FormSection,
  parameters: componentParameters(
    "FormSection",
    "질문을 공통 문항, 파트 문항 같은 묶음으로 나눕니다. `toggle` 섹션은 스위치로 켜고 끄며, 끄면 본문을 숨깁니다.",
  ),
  decorators: [withWidth(900)],
  argTypes: {
    variant: {
      control: { type: "inline-radio" },
      options: ["static", "toggle"],
    },
    title: textControl,
    optionalLabel: textControl,
    enabledLabel: textControl,
    children: hiddenControl,
  },
  args: {
    variant: "toggle",
    title: "PM",
    optionalLabel: "(선택 사항)",
    enabled: true,
    level: 3,
    onEnabledChange: fn(),
    children: null,
  },
  render: function Render(args: FormSectionProps) {
    const [, updateArgs] = useArgs<FormSectionProps>()
    return (
      <FormSection
        {...args}
        onEnabledChange={(enabled) => {
          args.onEnabledChange?.(enabled)
          updateArgs({ enabled })
        }}
      >
        <FormQuestionEditor>
          <FormEditableQuestion
            number="01"
            titleProps={{ defaultValue: "기획해 본 서비스를 소개해 주세요" }}
          >
            <TextArea
              placeholder="작성하세요"
              maxLength={500}
              readOnly
              aria-label="01번 답 칸"
            />
          </FormEditableQuestion>
        </FormQuestionEditor>
      </FormSection>
    )
  },
} satisfies Meta<FormSectionProps>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
