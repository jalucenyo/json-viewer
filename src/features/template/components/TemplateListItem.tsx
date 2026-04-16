import { Check, Trash, X } from "@phosphor-icons/react"
import { useState, type KeyboardEvent, type MouseEvent } from "react"

import { Button } from "@/components/ui/button"
import type { Template } from "@/features/template/types"
import { cn } from "@/lib/utils"

type TemplateListItemProps = {
  template: Template
  isActive: boolean
  onSelect: (id: string) => void
  onRename: (id: string, name: string) => void
  onDelete: (id: string) => void
}

export function TemplateListItem({
  template,
  isActive,
  onSelect,
  onRename,
  onDelete,
}: TemplateListItemProps) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(false)
  const [draftName, setDraftName] = useState("")

  const commitRename = () => {
    const nextName = draftName.trim()
    if (!nextName) {
      setDraftName(template.name)
      setIsRenaming(false)
      return
    }

    if (nextName !== template.name) {
      onRename(template.id, nextName)
    }

    setIsRenaming(false)
  }

  const cancelRename = () => {
    setDraftName(template.name)
    setIsRenaming(false)
  }

  const handleRenameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      commitRename()
    }

    if (event.key === "Escape") {
      cancelRename()
    }
  }

  const handleStartRename = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setPendingDelete(false)
    setDraftName(template.name)
    setIsRenaming(true)
  }

  const handleDeleteRequest = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsRenaming(false)
    setPendingDelete(true)
  }

  const handleDeleteCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setPendingDelete(false)
  }

  const handleDeleteConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDelete(template.id)
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-2 border px-2 py-1.5 text-xs",
        isActive ? "border-foreground bg-muted text-foreground" : "border-border"
      )}
    >
      {isRenaming ? (
        <input
          autoFocus
          className="h-6 min-w-0 flex-1 border border-border bg-background px-1.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onBlur={commitRename}
          onChange={(event) => setDraftName(event.target.value)}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={handleRenameKeyDown}
          value={draftName}
        />
      ) : (
        <Button
          className="h-6 min-w-0 flex-1 justify-start px-1 text-left"
          onClick={() => onSelect(template.id)}
          onDoubleClick={handleStartRename}
          size="xs"
          title="Double-click to rename"
          variant="ghost"
        >
          <span className="truncate">{template.name}</span>
        </Button>
      )}

      {pendingDelete ? (
        <div className="flex items-center gap-1">
          <Button
            aria-label="Confirm delete template"
            onClick={handleDeleteConfirm}
            size="icon-xs"
            variant="destructive"
          >
            <Check className="size-3" />
          </Button>
          <Button
            aria-label="Cancel delete template"
            onClick={handleDeleteCancel}
            size="icon-xs"
            variant="outline"
          >
            <X className="size-3" />
          </Button>
        </div>
      ) : (
        <Button
          aria-label="Delete template"
          disabled={isRenaming}
          onClick={handleDeleteRequest}
          size="icon-xs"
          variant="ghost"
        >
          <Trash className="size-3" />
        </Button>
      )}
    </div>
  )
}
