import Editor from "@monaco-editor/react"

import { JsonDropZone } from "@/features/editor/components/JsonDropZone"

type JsonEditorProps = {
  theme: "light" | "dark"
  value: string
  onChange: (nextValue: string) => void
  onFileLoad: (json: string) => void
  onFileLoadError: (message: string) => void
}

export function JsonEditor({
  theme,
  value,
  onChange,
  onFileLoad,
  onFileLoadError,
}: JsonEditorProps) {
  return (
    <JsonDropZone onError={onFileLoadError} onLoad={onFileLoad}>
      <div className="h-full w-full">
        <Editor
          language="json"
          height="100%"
          onChange={(nextValue) => onChange(nextValue ?? "")}
          options={{
            automaticLayout: true,
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
          theme={theme === "dark" ? "vs-dark" : "light"}
          value={value}
          width="100%"
        />
      </div>
    </JsonDropZone>
  )
}
