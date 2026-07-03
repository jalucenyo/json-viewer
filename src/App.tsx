import { useCallback, useEffect, useMemo, useState } from "react"

import { ToastProvider } from "@/components/ui/toast-provider"
import { Toaster } from "@/components/ui/toaster"
import { JsonEditor } from "@/features/editor/components/JsonEditor"
import { AppLayout } from "@/features/layout/components/AppLayout"
import { PreviewPanel } from "@/features/preview/components/PreviewPanel"
import { TemplateManager } from "@/features/template/components/TemplateManager"
import { useTemplateRenderer } from "@/features/template/hooks/useTemplateRenderer"
import { useTemplateStore } from "@/features/template/hooks/useTemplateStore"
import { useToast } from "@/hooks/use-toast"

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

function AppContent() {
  const [jsonInput, setJsonInput] = useState<string>(() => getStoredJsonInput())
  const [isTemplatePanelOpen, setIsTemplatePanelOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme())
  const { addToast } = useToast()

  const {
    templates,
    activeTemplate,
    activeTemplateId,
    createTemplate,
    selectTemplate,
    renameTemplate,
    updateTemplateContent,
    deleteTemplate,
    exportActiveTemplate,
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

    try {
      window.localStorage.setItem(JSON_INPUT_STORAGE_KEY, jsonInput)
    } catch {
      addToast("Could not save JSON to local storage.", "error")
    }
  }, [jsonInput, addToast])

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

  const handleLoadJson = useCallback(
    (json: string) => {
      setJsonInput(json)
      addToast("JSON file loaded successfully.", "success")
    },
    [addToast]
  )

  const handleLoadJsonError = useCallback(
    (message: string) => {
      addToast(message, "error")
    },
    [addToast]
  )

  const handleExportActiveTemplate = useCallback(async () => {
    try {
      const serialized = exportActiveTemplate()
      await navigator.clipboard.writeText(serialized)
      addToast("Active template copied to clipboard.", "success")
    } catch {
      addToast("Could not copy template to clipboard.", "error")
    }
  }, [exportActiveTemplate, addToast])

  return (
    <AppLayout
      isTemplatePanelOpen={isTemplatePanelOpen}
      leftPanel={
        <JsonEditor
          onChange={setJsonInput}
          onFileLoad={handleLoadJson}
          onFileLoadError={handleLoadJsonError}
          theme={theme}
          value={jsonInput}
        />
      }
      onLoadJson={handleLoadJson}
      onLoadJsonError={handleLoadJsonError}
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
      theme={theme}
      templatePanel={
        <TemplateManager
          activeTemplateContent={activeTemplateContent}
          activeTemplateId={activeTemplateId}
          canExport={activeTemplate !== null}
          onCreateTemplate={handleCreateTemplate}
          onDeleteTemplate={deleteTemplate}
          onExportActiveTemplate={handleExportActiveTemplate}
          onRenameTemplate={renameTemplate}
          onSelectTemplate={selectTemplate}
          onUpdateTemplateContent={handleUpdateTemplateContent}
          theme={theme}
          templates={templates}
        />
      }
    />
  )
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
      <Toaster />
    </ToastProvider>
  )
}

export default App
