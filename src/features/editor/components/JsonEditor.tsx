import Editor from "@monaco-editor/react"

type JsonEditorProps = {
  theme: "light" | "dark"
  value: string
  onChange: (nextValue: string) => void
}

export function JsonEditor({ theme, value, onChange }: JsonEditorProps) {
  return (
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
  )
}
