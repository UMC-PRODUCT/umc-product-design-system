import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FormAttachmentField,
  FormQuestion,
  type FormAttachmentFieldProps,
} from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

type StoryArgs = FormAttachmentFieldProps & {
  attached: boolean
}

const meta = {
  title: "질문지/FormAttachmentField",
  id: "form-attachment-field",
  component: FormAttachmentField,
  parameters: componentParameters(
    "FormAttachmentField",
    "링크를 입력하거나 파일을 첨부하는 칸입니다. 파일 형식과 용량을 검사해 `onFileSelect` 또는 `onReject`를 부르고, 업로드와 링크 확정은 앱이 합니다.",
  ),
  decorators: [withWidth(840)],
  argTypes: {
    attachment: hiddenControl,
    placeholder: textControl,
    maxSize: { control: { type: "number", min: 0, step: 1024 } },
  },
  args: {
    attached: false,
    readOnly: false,
    disabled: false,
    onFileSelect: fn(),
    onReject: fn(),
    onAttachmentRemove: fn(),
  },
  render: function Render({ attached, ...fieldProps }) {
    return (
      <FormQuestion number="05" title="포트폴리오를 첨부해 주세요">
        <FormAttachmentField
          {...fieldProps}
          attachment={
            attached
              ? { label: "portfolio.pdf", href: "https://umc.dev/portfolio" }
              : null
          }
        />
      </FormQuestion>
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
