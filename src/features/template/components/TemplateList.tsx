import { Plus } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { TemplateListItem } from "@/features/template/components/TemplateListItem"
import type { Template } from "@/features/template/types"

type TemplateListProps = {
  templates: Template[]
  activeTemplateId: string | null
  onCreateTemplate: () => void
  onSelectTemplate: (id: string) => void
  onRenameTemplate: (id: string, name: string) => void
  onDeleteTemplate: (id: string) => void
}

export function TemplateList({
  templates,
  activeTemplateId,
  onCreateTemplate,
  onSelectTemplate,
  onRenameTemplate,
  onDeleteTemplate,
}: TemplateListProps) {
  return (
    <div className="flex h-full min-h-0 flex-col border-r border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-2 py-2">
        <div>
          <h2 className="text-xs font-semibold tracking-wide uppercase">Templates</h2>
          <p className="text-[10px] text-muted-foreground">{templates.length} saved</p>
        </div>
        <Button onClick={onCreateTemplate} size="xs" variant="outline">
          <Plus className="size-3" />
          New template
        </Button>
      </div>

      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
        {templates.length === 0 ? (
          <p className="pt-2 text-xs text-muted-foreground">
            Create your first template to start rendering.
          </p>
        ) : (
          templates.map((template) => (
            <TemplateListItem
              isActive={template.id === activeTemplateId}
              key={template.id}
              onDelete={onDeleteTemplate}
              onRename={onRenameTemplate}
              onSelect={onSelectTemplate}
              template={template}
            />
          ))
        )}
      </div>
    </div>
  )
}
