import { BracketsCurly, TreeStructure } from "@phosphor-icons/react"
import Editor from "@monaco-editor/react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { JsonStats } from "@/features/explorer/components/JsonStats"
import { JsonTreeView } from "@/features/explorer/components/JsonTreeView"
import { useJsonTree } from "@/features/explorer/hooks/useJsonTree"

import { JsonDropZone } from "./JsonDropZone"

type EditorView = "editor" | "tree"

const EDITOR_VIEW_KEY = "editor_view"

function getStoredEditorView(): EditorView {
  if (typeof window === "undefined") return "editor"
  const stored = window.localStorage.getItem(EDITOR_VIEW_KEY)
  return stored === "tree" ? "tree" : "editor"
}

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
  const [view, setView] = useState<EditorView>(getStoredEditorView)
  const { tree, stats, error } = useJsonTree(value)

  const handleViewChange = (next: EditorView) => {
    setView(next)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(EDITOR_VIEW_KEY, next)
    }
  }

  return (
    <JsonDropZone onError={onFileLoadError} onLoad={onFileLoad}>
      <div className="flex h-full w-full flex-col">
        {/* View toggle header */}
        <div className="flex shrink-0 items-center gap-1 border-b border-border px-2 py-1">
          <Button
            size="xs"
            variant={view === "editor" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("editor")}
          >
            <BracketsCurly />
            Editor
          </Button>
          <Button
            size="xs"
            variant={view === "tree" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("tree")}
          >
            <TreeStructure />
            Tree
          </Button>
        </div>

        {/* Main content */}
        <div className="min-h-0 flex-1">
          {view === "editor" ? (
            <Editor
              height="100%"
              language="json"
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
          ) : (
            <JsonTreeView
              tree={tree}
              error={error}
              isEmpty={!value.trim()}
            />
          )}
        </div>

        {/* Stats footer — visible when JSON is valid */}
        {stats && <JsonStats stats={stats} />}
      </div>
    </JsonDropZone>
  )
}
