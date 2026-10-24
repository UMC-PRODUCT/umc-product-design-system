import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FormSection,
  FormSectionEmpty,
  type FormSectionEmptyProps,
} from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "질문지/FormSectionEmpty",
  id: "form-section-empty",
  component: FormSectionEmpty,
  parameters: componentParameters(
    "FormSectionEmpty",
    "질문이 하나도 없는 섹션의 본문에 넣는 안내입니다. 질문을 끄는 동안에만, 그리고 이 섹션에 놓을 수 있을 때만 `dropTarget`을 켜서 점선으로 강조합니다.",
  ),
  decorators: [withWidth(900)],
  argTypes: {
    children: textControl,
  },
  args: {
    dropTarget: false,
    children: "질문을 추가하거나 다른 섹션에서 옮겨 오세요",
  },
  render: function Render(args: FormSectionEmptyProps) {
    return (
      <FormSection variant="toggle" title="Design" optionalLabel="(선택 사항)">
        <FormSectionEmpty {...args} />
      </FormSection>
    )
  },
} satisfies Meta<FormSectionEmptyProps>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
