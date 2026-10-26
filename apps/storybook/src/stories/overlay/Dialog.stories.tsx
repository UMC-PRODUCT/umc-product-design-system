import type { Meta, StoryObj } from "@storybook/react-vite"
import { CheckPictogram, WarningTriangleIcon } from "@umc-product/icons"
import { Button, Dialog, type DialogProps } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const DIALOG_COLORS: NonNullable<DialogProps["color"]>[] = [
  "brand",
  "neutral",
  "error",
]

const OVERLAY_PARAMETERS = {
  docs: { story: { inline: false, height: "420px" } },
  pseudo: { rootSelector: "body" },
}

const meta = {
  title: "오버레이와 피드백/Dialog",
  id: "dialog",
  component: Dialog,
  parameters: componentParameters(
    "Dialog",
    "웹 화면에서 쓰는 다이얼로그입니다. 모바일 앱 화면은 AppDialog를, 목록이나 긴 글은 Panel을 씁니다.",
  ),
  argTypes: {
    trigger: hiddenControl,
    icon: hiddenControl,
    children: hiddenControl,
    title: textControl,
    description: textControl,
    confirmLabel: textControl,
    cancelLabel: textControl,
    color: { control: { type: "inline-radio" }, options: DIALOG_COLORS },
  },
  args: {
    open: true,
    color: "brand",
    title: "지원서를 제출할까요?",
    description: "제출한 지원서는 수정할 수 없어요.",
    confirmLabel: "제출",
    cancelLabel: "취소",
    onConfirm: fn(),
    onCancel: fn(),
    onOpenChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<DialogProps>()
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
  parameters: OVERLAY_PARAMETERS,
}

export const TextButtonOnly: Story = {
  args: {
    title: "저장했어요",
    description: "변경 사항을 저장했어요.",
    confirmLabel: "확인",
    cancelLabel: undefined,
    icon: <CheckPictogram />,
  },
  argTypes: {
    cancelLabel: hiddenControl,
  },
  parameters: OVERLAY_PARAMETERS,
}

export const Destructive: Story = {
  args: {
    color: "error",
    icon: <WarningTriangleIcon weight="fill" />,
    title: "프로젝트를 삭제할까요?",
    description: "삭제한 프로젝트와 지원서는 되살릴 수 없어요.",
    confirmLabel: "삭제",
  },
  parameters: OVERLAY_PARAMETERS,
}

export const WithContent: Story = {
  args: {
    title: "이 내용으로 지원할까요?",
    description: "제출 전에 한 번 더 확인해 주세요.",
    confirmLabel: "지원",
    children: (
      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-body-2-regular text-neutral-medium-600">
        <li>지원 파트: Web</li>
        <li>지원 차수: 2차 매칭</li>
        <li>제출 마감: 10월 20일</li>
      </ul>
    ),
  },
  parameters: OVERLAY_PARAMETERS,
}
