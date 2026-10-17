import type { Meta, StoryObj } from "@storybook/react-vite"
import { CloseIcon } from "@umc-product/icons"
import {
  BottomSheet,
  BottomSheetActions,
  Button,
  type BottomSheetActionsProps,
  type BottomSheetProps,
} from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

type ActionsLayout = BottomSheetActionsProps["layout"]

type StoryArgs = BottomSheetProps & {
  actionsLayout: ActionsLayout
  showCloseButton: boolean
  onApply: () => void
  onReset: () => void
}

const ACTIONS_LAYOUTS: ActionsLayout[] = [
  "full",
  "stacked",
  "equal",
  "emphasis",
  "primary-top",
]

const meta = {
  title: "오버레이와 피드백/BottomSheet",
  id: "bottom-sheet",
  component: BottomSheet,
  subcomponents: { BottomSheetActions },
  parameters: componentParameters("BottomSheet"),
  argTypes: {
    title: textControl,
    description: textControl,
    children: hiddenControl,
    trigger: hiddenControl,
    actions: hiddenControl,
    headerAction: hiddenControl,
    actionsLayout: { control: { type: "select" }, options: ACTIONS_LAYOUTS },
  },
  args: {
    open: true,
    title: "정렬",
    description: "원하는 정렬 방식을 선택하세요.",
    titleAlign: "start",
    actionsLayout: "full",
    showCloseButton: false,
    trigger: <Button>열기</Button>,
    children: (
      <p className="m-0 text-body-2-regular text-neutral-medium-600">
        인기순, 최신순, 가나다순 중 하나를 고르세요.
      </p>
    ),
    onOpenChange: fn(),
    onApply: fn(),
    onReset: fn(),
  },
  render: function Render({
    actionsLayout,
    showCloseButton,
    onApply,
    onReset,
    ...sheetProps
  }) {
    const [, updateArgs] = useArgs<StoryArgs>()
    const primary = { label: "적용", onClick: onApply }
    const actions =
      actionsLayout === "full" ? (
        <BottomSheetActions layout="full" primary={primary} />
      ) : (
        <BottomSheetActions
          layout={actionsLayout}
          primary={primary}
          secondary={{ label: "초기화", onClick: onReset }}
        />
      )
    const headerAction = showCloseButton ? (
      <Button
        variant="weak"
        color="neutral"
        size="xs"
        aria-label="닫기"
        onClick={() => updateArgs({ open: false })}
      >
        <CloseIcon size={20} />
      </Button>
    ) : undefined

    return (
      <BottomSheet
        {...sheetProps}
        headerAction={headerAction}
        actions={actions}
        onOpenChange={(open) => {
          sheetProps.onOpenChange?.(open)
          updateArgs({ open })
        }}
      />
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    docs: { story: { inline: false, height: "640px" } },
    pseudo: { rootSelector: "body" },
  },
}
