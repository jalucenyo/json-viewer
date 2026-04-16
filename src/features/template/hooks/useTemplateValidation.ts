import Handlebars from "handlebars"
import { useEffect } from "react"
import type { editor } from "monaco-editor"

import { debounce } from "@/lib/debounce"

type UseTemplateValidationParams = {
  content: string
  model: editor.ITextModel | null
  monaco: typeof import("monaco-editor") | null
}

function toErrorMarker(error: unknown): editor.IMarkerData {
  const fallbackMessage = "Invalid Handlebars syntax"
  if (!error || typeof error !== "object") {
    return {
      message: fallbackMessage,
      severity: 8,
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: 1,
      endColumn: 2,
    }
  }

  const candidate = error as {
    message?: unknown
    lineNumber?: unknown
    column?: unknown
  }

  const lineNumber =
    typeof candidate.lineNumber === "number" && candidate.lineNumber > 0
      ? Math.floor(candidate.lineNumber)
      : 1
  const column =
    typeof candidate.column === "number" && candidate.column >= 0
      ? Math.floor(candidate.column) + 1
      : 1

  return {
    message:
      typeof candidate.message === "string"
        ? candidate.message
        : fallbackMessage,
    severity: 8,
    startLineNumber: lineNumber,
    startColumn: column,
    endLineNumber: lineNumber,
    endColumn: column + 1,
  }
}

export function useTemplateValidation({
  content,
  model,
  monaco,
}: UseTemplateValidationParams) {
  useEffect(() => {
    if (!model || !monaco) {
      return
    }

    const validate = debounce((nextContent: string) => {
      try {
        Handlebars.precompile(nextContent)
        monaco.editor.setModelMarkers(model, "handlebars-validation", [])
      } catch (error) {
        monaco.editor.setModelMarkers(model, "handlebars-validation", [
          toErrorMarker(error),
        ])
      }
    }, 300)

    validate(content)

    return () => {
      validate.cancel()
    }
  }, [content, model, monaco])
}
