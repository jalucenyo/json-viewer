import { useCallback } from "react"

import { useToast } from "@/hooks/use-toast"

import type { JsonNode } from "../types"
import { JsonTreeNode } from "./JsonTreeNode"

type JsonTreeViewProps = {
  tree: JsonNode | null
  error: string | null
  isEmpty: boolean
}

export function JsonTreeView({ tree, error, isEmpty }: JsonTreeViewProps) {
  const { addToast } = useToast()

  const handleCopyPath = useCallback(
    async (path: string) => {
      try {
        await navigator.clipboard.writeText(path)
        addToast(`Copied: ${path}`, "success")
      } catch {
        addToast("Could not copy to clipboard.", "error")
      }
    },
    [addToast]
  )

  if (isEmpty) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground text-xs">
        Enter JSON to explore the structure
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-xs text-destructive">
        <span className="font-medium">Invalid JSON: </span>
        {error}
      </div>
    )
  }

  if (!tree) return null

  return (
    <div className="h-full overflow-auto py-2 font-mono text-xs">
      <JsonTreeNode node={tree} onCopyPath={handleCopyPath} initiallyExpanded />
    </div>
  )
}
