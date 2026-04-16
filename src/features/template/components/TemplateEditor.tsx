import Editor, { type OnMount } from "@monaco-editor/react"
import { useCallback, useState } from "react"
import type { editor } from "monaco-editor"

import { useTemplateValidation } from "@/features/template/hooks/useTemplateValidation"

type TemplateEditorProps = {
  activeTemplateId: string | null
  value: string
  onChange: (nextValue: string) => void
}

export function TemplateEditor({
  activeTemplateId,
  value,
  onChange,
}: TemplateEditorProps) {
  const [model, setModel] = useState<editor.ITextModel | null>(null)
  const [monacoApi, setMonacoApi] =
    useState<typeof import("monaco-editor") | null>(null)

  const handleMount = useCallback<OnMount>((editorInstance, monacoInstance) => {
    setModel(editorInstance.getModel())
    setMonacoApi(monacoInstance)
  }, [])

  useTemplateValidation({
    content: value,
    model,
    monaco: monacoApi,
  })

  if (!activeTemplateId) {
    return (
      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
        Select or create a template to begin editing.
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language="handlebars"
        onChange={(nextValue) => onChange(nextValue ?? "")}
        onMount={handleMount}
        options={{
          automaticLayout: true,
          fontSize: 13,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
        theme="light"
        value={value}
        width="100%"
      />
    </div>
  )
}
