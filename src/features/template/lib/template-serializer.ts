import { getFunnyTemplateName } from "@/features/template/lib/funny-template-names"
import type { Template } from "@/features/template/types"

export type ExportedTemplate = {
  name: string
  content: string
}

export class TemplateSerializerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "TemplateSerializerError"
  }
}

export function exportTemplate(template: Template): string {
  const exported: ExportedTemplate = {
    name: template.name,
    content: template.content,
  }

  return JSON.stringify(exported, null, 2)
}

function isExportedTemplate(value: unknown): value is ExportedTemplate {
  if (!value || typeof value !== "object") {
    return false
  }

  const candidate = value as Partial<ExportedTemplate>

  return (
    typeof candidate.name === "string" &&
    typeof candidate.content === "string"
  )
}

export function parseImportedTemplate(serialized: string): {
  name: string
  content: string
} {
  const trimmed = serialized.trim()

  if (!trimmed) {
    throw new TemplateSerializerError("Clipboard is empty.")
  }

  let parsed: unknown

  try {
    parsed = JSON.parse(trimmed)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON"
    throw new TemplateSerializerError(`Invalid template JSON: ${message}`)
  }

  if (Array.isArray(parsed)) {
    throw new TemplateSerializerError(
      "Expected a single template, but received an array. Copy one template at a time."
    )
  }

  if (!isExportedTemplate(parsed)) {
    throw new TemplateSerializerError(
      "Invalid template format. A template must have 'name' and 'content' strings."
    )
  }

  return {
    name: getFunnyTemplateName(),
    content: parsed.content,
  }
}
