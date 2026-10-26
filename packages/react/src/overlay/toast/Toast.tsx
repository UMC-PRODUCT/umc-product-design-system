"use client"

import { Toast } from "@base-ui/react"
import { CloseIcon } from "@umc-product/icons"
import { createContext, useMemo, type ReactNode } from "react"

export type ToastOptions = {
  message: ReactNode
  color?: "brand" | "neutral" | "warning" | "error"
  icon?: ReactNode
  action?: { label: ReactNode; onClick: () => void }
  duration?: number
}

export type ToastProviderProps = {
  placement?: "top" | "bottom"
  children: ReactNode
}

export type ToastApi = {
  show: (options: ToastOptions) => string
  close: (id: string) => void
}

type ToastData = {
  color?: ToastOptions["color"]
  icon?: ReactNode
  action?: ToastOptions["action"]
}

export const ToastApiContext = createContext<ToastApi | null>(null)

function ToastApiProvider({ children }: { children: ReactNode }) {
  const { add, close } = Toast.useToastManager<ToastData>()
  const api = useMemo<ToastApi>(
    () => ({
      show(options) {
        const timeout =
          options.duration ?? (options.action !== undefined ? 6000 : 3000)
        return add({
          description: options.message,
          timeout,
          priority: options.color === "error" ? "high" : "low",
          data: {
            color: options.color ?? "brand",
            icon: options.icon,
            action: options.action,
          },
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

function ToastViewportPortal({ placement }: { placement: "top" | "bottom" }) {
  const { toasts, close } = Toast.useToastManager<ToastData>()

  return (
    <Toast.Portal>
      <Toast.Viewport className="umc-toast-viewport" data-placement={placement}>
        {toasts.map((toast) => {
          const data = toast.data
          const color = data?.color ?? "brand"
          const action = data?.action
          return (
            <Toast.Root
              key={toast.id}
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
                    close(toast.id)
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
        })}
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
