import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button, Dialog } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "오버레이와 피드백/Dialog",
  id: "dialog",
  component: Dialog,
  parameters: componentParameters("Dialog"),
  argTypes: {
    trigger: hiddenControl,
    title: textControl,
    description: textControl,
    confirmLabel: textControl,
    cancelLabel: textControl,
  },
  args: {
    open: true,
    title: "정말 삭제할까요?",
    description: "삭제한 데이터는 복구할 수 없습니다.",
    confirmLabel: "삭제",
    cancelLabel: "취소",
    onConfirm: fn(),
    onCancel: fn(),
    onOpenChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <Dialog
        {...args}
        trigger={<Button>열기</Button>}
        onOpenChange={(open) => {
          args.onOpenChange?.(open)
          updateArgs({ open })
        }}
      />
    )
  },
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    docs: { story: { inline: false, height: "420px" } },
    pseudo: { rootSelector: "body" },
  },
}

export const ConfirmOnly: Story = {
  args: {
    title: "저장되었습니다.",
    description: "변경 사항이 저장되었습니다.",
    confirmLabel: "확인",
  },
  argTypes: {
    cancelLabel: hiddenControl,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <Dialog
        {...args}
        cancelLabel={undefined}
        trigger={<Button>열기</Button>}
        onOpenChange={(open) => {
          args.onOpenChange?.(open)
          updateArgs({ open })
        }}
      />
    )
  },
  parameters: {
    docs: { story: { inline: false, height: "420px" } },
    pseudo: { rootSelector: "body" },
  },
}
