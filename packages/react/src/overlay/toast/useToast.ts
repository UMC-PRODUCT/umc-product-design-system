"use client"

import { Toast } from "@base-ui/react"
import { useMemo } from "react"

import type { ToastApi, ToastOptions } from "./Toast.tsx"

export function useToast(): ToastApi {
  const manager = Toast.useToastManager()

  return useMemo(
    () => ({
      show(options: ToastOptions): string {
        const timeout =
          options.duration ?? (options.action !== undefined ? 6000 : 3000)
        return manager.add({
          description: options.message,
          timeout,
          priority: options.color === "error" ? "high" : "low",
          data: {
            color: options.color ?? "primary",
            icon: options.icon,
            action: options.action,
          },
        })
      },
      close: manager.close,
    }),
    [manager],
  )
}
