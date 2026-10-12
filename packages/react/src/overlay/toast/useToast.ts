"use client"

import { useContext } from "react"

import { ToastApiContext, type ToastApi } from "./Toast.tsx"

export function useToast(): ToastApi {
  const api = useContext(ToastApiContext)
  if (api === null) {
    throw new Error("useToast는 ToastProvider 안에서만 쓸 수 있습니다")
  }
  return api
}
