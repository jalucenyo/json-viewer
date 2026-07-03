import { Copy, Plus, UploadSimple } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { TemplateListItem } from "@/features/template/components/TemplateListItem"
import type { Template } from "@/features/template/types"

type TemplateListProps = {
  templates: Template[]
  activeTemplateId: string | null
  canExport: boolean
  onCreateTemplate: () => void
  onSelectTemplate: (id: string) => void
  onRenameTemplate: (id: string, name: string) => void
  onDeleteTemplate: (id: string) => void
  onExportActiveTemplate: () => void
  onImportTemplate: () => void
}

export function TemplateList({
  templates,
  activeTemplateId,
  canExport,
  onCreateTemplate,
  onSelectTemplate,
  onRenameTemplate,
  onDeleteTemplate,
  onExportActiveTemplate,
  onImportTemplate,
}: TemplateListProps) {
  return (
    <div className="flex h-full min-h-0 flex-col border-r border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-2 py-2">
        <div>
          <h2 className="text-xs font-semibold tracking-wide uppercase">Templates</h2>
          <p className="text-[10px] text-muted-foreground">{templates.length} saved</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            aria-label="Copy active template"
            disabled={!canExport}
            onClick={onExportActiveTemplate}
            size="icon-xs"
            variant="outline"
          >
            <Copy className="size-3" />
          </Button>
          <Button
            aria-label="Import template"
            onClick={onImportTemplate}
            size="icon-xs"
            variant="outline"
          >
            <UploadSimple className="size-3" />
          </Button>
          <Button onClick={onCreateTemplate} size="xs" variant="outline">
            <Plus className="size-3" />
            New
          </Button>
        </div>
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
