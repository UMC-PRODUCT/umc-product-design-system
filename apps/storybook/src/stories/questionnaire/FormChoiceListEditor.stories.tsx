import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FormChoiceListEditor,
  type FormChoiceDraftOption,
  type FormChoiceListEditorProps,
} from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const OPTIONS: readonly FormChoiceDraftOption[] = [
  { id: "pm", label: "PM" },
  { id: "design", label: "Design" },
  { id: "web", label: "" },
]

const meta = {
  title: "질문지/FormChoiceListEditor",
  id: "form-choice-list-editor",
  component: FormChoiceListEditor,
  parameters: componentParameters(
    "FormChoiceListEditor",
    "선택 질문의 보기를 쓰고 더하고 지우는 목록입니다. 보기 목록은 앱이 들고 있고, 바뀐 내용은 콜백으로 알립니다.",
  ),
  decorators: [withWidth(820)],
  argTypes: {
    type: {
      control: { type: "inline-radio" },
      options: ["single", "multiple"],
    },
    options: hiddenControl,
    placeholder: textControl,
    addLabel: textControl,
  },
  args: {
    type: "single",
    options: OPTIONS,
    disabled: false,
    onOptionChange: fn(),
    onOptionAdd: fn(),
    onOptionRemove: fn(),
  },
  render: function Render(args: FormChoiceListEditorProps) {
    const [{ options }, updateArgs] = useArgs<FormChoiceListEditorProps>()
    return (
      <FormChoiceListEditor
        {...args}
        onOptionChange={(id, label) => {
          args.onOptionChange?.(id, label)
          updateArgs({
            options: options.map((option) =>
              option.id === id ? { ...option, label } : option,
            ),
          })
        }}
        onOptionAdd={() => {
          args.onOptionAdd?.()
          updateArgs({
            options: [
              ...options,
              { id: `option-${options.length}`, label: "" },
            ],
          })
        }}
        onOptionRemove={(id) => {
          args.onOptionRemove?.(id)
          updateArgs({ options: options.filter((option) => option.id !== id) })
        }}
      />
    )
  },
} satisfies Meta<FormChoiceListEditorProps>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
