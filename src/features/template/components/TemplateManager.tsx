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
  onCreateTemplate: () => void
  onSelectTemplate: (id: string) => void
  onRenameTemplate: (id: string, name: string) => void
  onDeleteTemplate: (id: string) => void
  onUpdateTemplateContent: (content: string) => void
}

export function TemplateManager({
  templates,
  activeTemplateId,
  activeTemplateContent,
  onCreateTemplate,
  onSelectTemplate,
  onRenameTemplate,
  onDeleteTemplate,
  onUpdateTemplateContent,
}: TemplateManagerProps) {
  return (
    <div className="h-full w-full border-t border-border bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={26} minSize={18}>
          <TemplateList
            activeTemplateId={activeTemplateId}
            onCreateTemplate={onCreateTemplate}
            onDeleteTemplate={onDeleteTemplate}
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
            value={activeTemplateContent}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
