import Editor from "@monaco-editor/react"

export function JsonEditor() {
  return (
    <div className="h-full w-full">
      <Editor
        defaultLanguage="json"
        defaultValue="{}"
        height="100%"
        options={{
          automaticLayout: true,
          fontSize: 13,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
        theme="light"
        width="100%"
      />
    </div>
  )
}
