import { useCallback, useEffect, useMemo, useState } from "react"

import { JsonEditor } from "@/features/editor/components/JsonEditor"
import { AppLayout } from "@/features/layout/components/AppLayout"
import { PreviewPanel } from "@/features/preview/components/PreviewPanel"
import { TemplateManager } from "@/features/template/components/TemplateManager"
import { useTemplateRenderer } from "@/features/template/hooks/useTemplateRenderer"
import { useTemplateStore } from "@/features/template/hooks/useTemplateStore"

const JSON_INPUT_STORAGE_KEY = "json_input"
const THEME_STORAGE_KEY = "theme"

type Theme = "light" | "dark"

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light"
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (stored === "dark" || stored === "light") {
    return stored
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getStoredJsonInput() {
  if (typeof window === "undefined") {
    return "{}"
  }

  return window.localStorage.getItem(JSON_INPUT_STORAGE_KEY) ?? "{}"
}

function App() {
  const [jsonInput, setJsonInput] = useState<string>(() => getStoredJsonInput())
  const [isTemplatePanelOpen, setIsTemplatePanelOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme())

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
    theme,
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

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

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
      onToggleTheme={handleToggleTheme}
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
