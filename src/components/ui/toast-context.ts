import { createContext } from "react"

export type ToastType = "success" | "error" | "info"

export type Toast = {
  id: string
  message: string
  type: ToastType
}

export type ToastContextValue = {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
