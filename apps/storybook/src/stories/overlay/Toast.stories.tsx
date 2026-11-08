import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Button,
  ToastProvider,
  useToast,
  type ServiceNoticeOptions,
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
  width?: number
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
  width,
  onAction,
}: ToastTriggerProps) {
  const toast = useToast()
  const action =
    actionLabel === "" ? undefined : { label: actionLabel, onClick: onAction }
  return (
    <Button
      onClick={() =>
        toast.show({ message, color, icon, action, duration, width })
      }
    >
      {TRIGGER_LABEL}
    </Button>
  )
}

const SERVICE_NOTICE_TRIGGER_LABEL = "서비스 공지 보기"

function ServiceNoticeTrigger({
  message,
  color,
}: {
  message: string
  color: NonNullable<ServiceNoticeOptions["color"]>
}) {
  const toast = useToast()
  return (
    <Button onClick={() => toast.showServiceNotice({ message, color })}>
      {SERVICE_NOTICE_TRIGGER_LABEL}
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
    width: { control: { type: "number" } },
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

export const ServiceNotice: Story = {
  args: {
    message: "리크루팅 서비스는 12기 모집 때 공개될 예정이에요",
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["brand", "neutral"],
    },
    icon: hiddenControl,
    actionLabel: hiddenControl,
    duration: hiddenControl,
    width: hiddenControl,
    onAction: hiddenControl,
  },
  parameters: {
    docs: { story: { inline: false, height: "200px" } },
  },
  render: function Render({ placement, message, color }) {
    return (
      <ToastProvider key={placement} placement={placement}>
        <ServiceNoticeTrigger
          message={message}
          color={color === "neutral" ? "neutral" : "brand"}
        />
      </ToastProvider>
    )
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(
      await within(canvasElement).findByRole("button", {
        name: SERVICE_NOTICE_TRIGGER_LABEL,
      }),
    )
  },
}
