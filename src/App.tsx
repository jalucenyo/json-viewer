import { useEffect, useMemo, useState } from "react"

import { JsonEditor } from "@/features/editor/components/JsonEditor"
import { AppLayout } from "@/features/layout/components/AppLayout"
import { PreviewPanel } from "@/features/preview/components/PreviewPanel"
import { TemplateManager } from "@/features/template/components/TemplateManager"
import { useTemplateRenderer } from "@/features/template/hooks/useTemplateRenderer"
import { useTemplateStore } from "@/features/template/hooks/useTemplateStore"

const JSON_INPUT_STORAGE_KEY = "json_input"

function getStoredJsonInput() {
  if (typeof window === "undefined") {
    return "{}"
  }

  return window.localStorage.getItem(JSON_INPUT_STORAGE_KEY) ?? "{}"
}

function App() {
  const [jsonInput, setJsonInput] = useState<string>(() => getStoredJsonInput())
  const [isTemplatePanelOpen, setIsTemplatePanelOpen] = useState(false)

  const {
    templates,
    activeTemplate,
    activeTemplateId,
    createTemplate,
    selectTemplate,
    renameTemplate,
    updateTemplateContent,
    deleteTemplate,
  } = useTemplateStore()

  const { renderedHtml, error } = useTemplateRenderer({
    jsonInput,
    templateContent: activeTemplate?.content ?? null,
  })

  const activeTemplateContent = useMemo(
    () => activeTemplate?.content ?? "",
    [activeTemplate]
  )

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    window.localStorage.setItem(JSON_INPUT_STORAGE_KEY, jsonInput)
  }, [jsonInput])

  const handleCreateTemplate = () => {
    createTemplate()
    setIsTemplatePanelOpen(true)
  }

  const handleUpdateTemplateContent = (content: string) => {
    if (!activeTemplateId) {
      return
    }

    updateTemplateContent(activeTemplateId, content)
  }

  return (
    <AppLayout
      isTemplatePanelOpen={isTemplatePanelOpen}
      leftPanel={<JsonEditor onChange={setJsonInput} value={jsonInput} />}
      onTemplatePanelOpenChange={setIsTemplatePanelOpen}
      rightPanel={
        <PreviewPanel
          error={error}
          onCreateTemplate={handleCreateTemplate}
          renderedHtml={renderedHtml}
          templatesCount={templates.length}
        />
      }
      templatePanel={
        <TemplateManager
          activeTemplateContent={activeTemplateContent}
          activeTemplateId={activeTemplateId}
          onCreateTemplate={handleCreateTemplate}
          onDeleteTemplate={deleteTemplate}
          onRenameTemplate={renameTemplate}
          onSelectTemplate={selectTemplate}
          onUpdateTemplateContent={handleUpdateTemplateContent}
          templates={templates}
        />
      }
    />
  )
}

export default App
