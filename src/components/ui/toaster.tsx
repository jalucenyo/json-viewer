import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const typeStyles = {
  success:
    "border-green-500/30 bg-green-500/10 text-green-800 dark:text-green-300",
  error: "border-destructive/30 bg-destructive/10 text-destructive",
  info: "border-border bg-background text-foreground",
}

export function Toaster() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "min-w-[16rem] max-w-sm border px-3 py-2 text-xs shadow-sm",
            typeStyles[toast.type]
          )}
          role="alert"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="leading-relaxed">{toast.message}</p>
            <button
              aria-label="Close toast"
              className="shrink-0 text-[10px] opacity-70 hover:opacity-100"
              onClick={() => removeToast(toast.id)}
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
