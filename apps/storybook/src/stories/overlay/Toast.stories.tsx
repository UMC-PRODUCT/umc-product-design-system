import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Button,
  ToastProvider,
  useToast,
  type ToastOptions,
  type ToastProviderProps,
} from "@umc-product/react"
import type { ReactNode } from "react"
import { fn, userEvent, within } from "storybook/test"

import { hiddenControl, iconArgType } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

type StoryArgs = ToastProviderProps & {
  message: string
  color: NonNullable<ToastOptions["color"]>
  icon?: ReactNode
  actionLabel: string
  duration: number
  onAction: () => void
}

type ToastTriggerProps = Omit<StoryArgs, keyof ToastProviderProps>

const TRIGGER_LABEL = "토스트 보기"

function ToastTrigger({
  message,
  color,
  icon,
  actionLabel,
  duration,
  onAction,
}: ToastTriggerProps) {
  const toast = useToast()
  const action =
    actionLabel === "" ? undefined : { label: actionLabel, onClick: onAction }
  return (
    <Button
      onClick={() => toast.show({ message, color, icon, action, duration })}
    >
      {TRIGGER_LABEL}
    </Button>
  )
}

const meta = {
  title: "오버레이와 피드백/Toast",
  id: "toast",
  component: ToastProvider,
  parameters: componentParameters("Toast"),
  argTypes: {
    children: hiddenControl,
    icon: iconArgType,
    color: {
      control: { type: "select" },
      options: ["brand", "neutral", "warning", "error"],
    },
  },
  args: {
    placement: "bottom",
    children: null,
    message: "저장되었습니다.",
    color: "brand",
    actionLabel: "",
    duration: 0,
    onAction: fn(),
  },
  render: function Render({ placement, children: _children, ...options }) {
    return (
      <ToastProvider key={placement} placement={placement}>
        <ToastTrigger {...options} />
      </ToastProvider>
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    docs: { story: { inline: false, height: "200px" } },
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(
      await within(canvasElement).findByRole("button", { name: TRIGGER_LABEL }),
    )
  },
}
