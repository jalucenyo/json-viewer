import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { TemplateEditor } from "@/features/template/components/TemplateEditor"
import { TemplateList } from "@/features/template/components/TemplateList"
import type { Template } from "@/features/template/types"

type TemplateManagerProps = {
  templates: Template[]
  activeTemplateId: string | null
  activeTemplateContent: string
  canExport: boolean
  theme: "light" | "dark"
  onCreateTemplate: () => void
  onSelectTemplate: (id: string) => void
  onRenameTemplate: (id: string, name: string) => void
  onDeleteTemplate: (id: string) => void
  onUpdateTemplateContent: (content: string) => void
  onExportActiveTemplate: () => void
}

export function TemplateManager({
  templates,
  activeTemplateId,
  activeTemplateContent,
  canExport,
  theme,
  onCreateTemplate,
  onSelectTemplate,
  onRenameTemplate,
  onDeleteTemplate,
  onUpdateTemplateContent,
  onExportActiveTemplate,
}: TemplateManagerProps) {
  return (
    <div className="h-full w-full border-t border-border bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={26} minSize={18}>
          <TemplateList
            activeTemplateId={activeTemplateId}
            canExport={canExport}
            onCreateTemplate={onCreateTemplate}
            onDeleteTemplate={onDeleteTemplate}
            onExportActiveTemplate={onExportActiveTemplate}
            onRenameTemplate={onRenameTemplate}
            onSelectTemplate={onSelectTemplate}
            templates={templates}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={74} minSize={35}>
          <TemplateEditor
            activeTemplateId={activeTemplateId}
            onChange={onUpdateTemplateContent}
            theme={theme}
            value={activeTemplateContent}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
