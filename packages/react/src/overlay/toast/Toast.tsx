"use client"

import { Toast } from "@base-ui/react"
import { CloseIcon, UnderConstructionPictogram } from "@umc-product/icons"
import { createContext, useMemo, type ReactNode } from "react"

export type ToastOptions = {
  message: ReactNode
  color?: "brand" | "neutral" | "warning" | "error"
  icon?: ReactNode
  action?: { label: ReactNode; onClick: () => void }
  duration?: number
}

export type ServiceNoticeOptions = {
  message: ReactNode
  color?: "brand" | "neutral"
  duration?: number
}

export type ToastProviderProps = {
  placement?: "top" | "bottom"
  children: ReactNode
}

export type ToastApi = {
  show: (options: ToastOptions) => string
  showServiceNotice: (options: ServiceNoticeOptions) => string
  close: (id: string) => void
}

type ToastPlacement = NonNullable<ToastProviderProps["placement"]>

type MessageToastData = {
  kind: "message"
  color: NonNullable<ToastOptions["color"]>
  icon?: ReactNode
  action?: ToastOptions["action"]
}

type ServiceNoticeToastData = {
  kind: "service-notice"
  color: NonNullable<ServiceNoticeOptions["color"]>
}

type ToastData = MessageToastData | ServiceNoticeToastData

type ToastObject = Toast.Root.ToastObject<ToastData>

const DEFAULT_DURATION = 3000
const ACTION_DURATION = 6000
const SERVICE_NOTICE_PICTOGRAM_SIZE = 24

const SERVICE_NOTICE_PICTOGRAM_MODE = {
  brand: "light",
  neutral: "dark",
} as const

export const ToastApiContext = createContext<ToastApi | null>(null)

function ToastApiProvider({ children }: { children: ReactNode }) {
  const { add, close } = Toast.useToastManager<ToastData>()
  const api = useMemo<ToastApi>(
    () => ({
      show(options) {
        const timeout =
          options.duration ??
          (options.action !== undefined ? ACTION_DURATION : DEFAULT_DURATION)
        return add({
          description: options.message,
          timeout,
          priority: options.color === "error" ? "high" : "low",
          data: {
            kind: "message",
            color: options.color ?? "brand",
            icon: options.icon,
            action: options.action,
          },
        })
      },
      showServiceNotice(options) {
        return add({
          description: options.message,
          timeout: options.duration ?? DEFAULT_DURATION,
          priority: "low",
          data: { kind: "service-notice", color: options.color ?? "brand" },
        })
      },
      close,
    }),
    [add, close],
  )

  return (
    <ToastApiContext.Provider value={api}>{children}</ToastApiContext.Provider>
  )
}

function MessageToast({
  toast,
  data,
  placement,
  onClose,
}: {
  toast: ToastObject
  data: MessageToastData | undefined
  placement: ToastPlacement
  onClose: (id: string) => void
}) {
  const color = data?.color ?? "brand"
  const action = data?.action
  return (
    <Toast.Root
      toast={toast}
      className="umc-toast"
      data-color={color}
      data-placement={placement}
      data-icon={data?.icon === undefined ? undefined : ""}
    >
      <div className="umc-toast__main">
        {data?.icon !== undefined && (
          <span className="umc-toast__icon" aria-hidden="true">
            {data.icon}
          </span>
        )}
        <Toast.Description className="umc-toast__message" />
      </div>
      {action !== undefined && (
        <button
          className="umc-toast__action"
          type="button"
          onClick={() => {
            action.onClick()
            onClose(toast.id)
          }}
        >
          {action.label}
        </button>
      )}
      {action === undefined && placement === "bottom" && (
        <Toast.Close className="umc-toast__close" aria-label="닫기">
          <CloseIcon size={20} />
        </Toast.Close>
      )}
    </Toast.Root>
  )
}

function ServiceNoticeToast({
  toast,
  data,
  placement,
}: {
  toast: ToastObject
  data: ServiceNoticeToastData
  placement: ToastPlacement
}) {
  const pictogram = (
    <span className="umc-toast__pictogram" aria-hidden="true">
      <UnderConstructionPictogram
        size={SERVICE_NOTICE_PICTOGRAM_SIZE}
        mode={SERVICE_NOTICE_PICTOGRAM_MODE[data.color]}
      />
    </span>
  )
  return (
    <Toast.Root
      toast={toast}
      className="umc-toast"
      data-kind="service-notice"
      data-color={data.color}
      data-placement={placement}
    >
      {pictogram}
      <Toast.Description className="umc-toast__message" />
      {pictogram}
    </Toast.Root>
  )
}

function ToastViewportPortal({ placement }: { placement: ToastPlacement }) {
  const { toasts, close } = Toast.useToastManager<ToastData>()

  return (
    <Toast.Portal>
      <Toast.Viewport className="umc-toast-viewport" data-placement={placement}>
        {toasts.map((toast) =>
          toast.data?.kind === "service-notice" ? (
            <ServiceNoticeToast
              key={toast.id}
              toast={toast}
              data={toast.data}
              placement={placement}
            />
          ) : (
            <MessageToast
              key={toast.id}
              toast={toast}
              data={toast.data}
              placement={placement}
              onClose={close}
            />
          ),
        )}
      </Toast.Viewport>
    </Toast.Portal>
  )
}

export function ToastProvider({
  placement = "bottom",
  children,
}: ToastProviderProps) {
  return (
    <Toast.Provider>
      <ToastApiProvider>{children}</ToastApiProvider>
      <ToastViewportPortal placement={placement} />
    </Toast.Provider>
  )
}
