"use client"

import { Toast } from "@base-ui/react"
import type { ReactNode } from "react"

import { CloseIcon } from "@umc-product/icons"

export type ToastOptions = {
  message: ReactNode
  color?: "primary" | "neutral" | "error"
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

function ToastViewportPortal({ placement }: { placement: "top" | "bottom" }) {
  const { toasts, close } = Toast.useToastManager<ToastData>()

  return (
    <Toast.Portal>
      <Toast.Viewport className="umc-toast-viewport" data-placement={placement}>
        {toasts.map((toast) => {
          const data = toast.data
          const color = data?.color ?? "primary"
          const action = data?.action
          return (
            <Toast.Root
              key={toast.id}
              toast={toast}
              className="umc-toast"
              data-color={color}
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
              {action !== undefined ? (
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
              ) : (
                <Toast.Close className="umc-toast__close" aria-label="닫기">
                  <CloseIcon size={24} aria-hidden={true} />
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
      {children}
      <ToastViewportPortal placement={placement} />
    </Toast.Provider>
  )
}
