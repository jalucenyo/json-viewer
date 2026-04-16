import { useCallback, useEffect, useMemo, useState } from "react"

import type { Template } from "@/features/template/types"

const TEMPLATES_STORAGE_KEY = "templates"
const ACTIVE_TEMPLATE_ID_STORAGE_KEY = "active_template_id"

function readStorageItem(key: string): string | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorageItem(key: string, value: string): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Ignore write failures.
  }
}

function removeStorageItem(key: string): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.removeItem(key)
  } catch {
    // Ignore remove failures.
  }
}

function isTemplate(value: unknown): value is Template {
  if (!value || typeof value !== "object") {
    return false
  }

  const candidate = value as Partial<Template>

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.content === "string" &&
    typeof candidate.createdAt === "number" &&
    typeof candidate.updatedAt === "number"
  )
}

function getStoredTemplates(): Template[] {
  const rawValue = readStorageItem(TEMPLATES_STORAGE_KEY)
  if (!rawValue) {
    return []
  }

  try {
    const parsed = JSON.parse(rawValue)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isTemplate)
  } catch {
    return []
  }
}

function getStoredActiveTemplateId(): string | null {
  return readStorageItem(ACTIVE_TEMPLATE_ID_STORAGE_KEY)
}

function getInitialActiveTemplateId(templates: Template[]): string | null {
  const storedActiveTemplateId = getStoredActiveTemplateId()
  if (storedActiveTemplateId === null) {
    return templates[0]?.id ?? null
  }

  const activeTemplateExists = templates.some(
    (template) => template.id === storedActiveTemplateId
  )

  if (activeTemplateExists) {
    return storedActiveTemplateId
  }

  return templates[0]?.id ?? null
}

function getDefaultTemplateName(templates: Template[]): string {
  const templateNames = new Set(templates.map((template) => template.name))

  let templateNumber = 1
  while (templateNames.has(`Untitled ${templateNumber}`)) {
    templateNumber += 1
  }

  return `Untitled ${templateNumber}`
}

export type TemplateStore = {
  templates: Template[]
  activeTemplateId: string | null
  activeTemplate: Template | null
  createTemplate: () => Template
  selectTemplate: (id: string) => void
  renameTemplate: (id: string, name: string) => void
  updateTemplateContent: (id: string, content: string) => void
  deleteTemplate: (id: string) => void
}

export function useTemplateStore(): TemplateStore {
  const [templates, setTemplates] = useState<Template[]>(() => getStoredTemplates())
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(() =>
    getInitialActiveTemplateId(getStoredTemplates())
  )

  useEffect(() => {
    writeStorageItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates))
  }, [templates])

  useEffect(() => {
    if (activeTemplateId === null) {
      removeStorageItem(ACTIVE_TEMPLATE_ID_STORAGE_KEY)
      return
    }

    writeStorageItem(ACTIVE_TEMPLATE_ID_STORAGE_KEY, activeTemplateId)
  }, [activeTemplateId])

  const createTemplate = useCallback(() => {
    const now = Date.now()
    const newTemplate: Template = {
      id: crypto.randomUUID(),
      name: getDefaultTemplateName(templates),
      content: "",
      createdAt: now,
      updatedAt: now,
    }

    setTemplates((currentTemplates) => [...currentTemplates, newTemplate])
    setActiveTemplateId(newTemplate.id)

    return newTemplate
  }, [templates])

  const selectTemplate = useCallback(
    (id: string) => {
      const hasRequestedTemplate = templates.some((template) => template.id === id)
      if (!hasRequestedTemplate) {
        return
      }

      setActiveTemplateId(id)
    },
    [templates]
  )

  const renameTemplate = useCallback((id: string, name: string) => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      return
    }

    setTemplates((currentTemplates) =>
      currentTemplates.map((template) =>
        template.id === id
          ? {
              ...template,
              name: trimmedName,
              updatedAt: Date.now(),
            }
          : template
      )
    )
  }, [])

  const updateTemplateContent = useCallback((id: string, content: string) => {
    setTemplates((currentTemplates) =>
      currentTemplates.map((template) =>
        template.id === id
          ? {
              ...template,
              content,
              updatedAt: Date.now(),
            }
          : template
      )
    )
  }, [])

  const deleteTemplate = useCallback(
    (id: string) => {
      const templateIndex = templates.findIndex((template) => template.id === id)
      if (templateIndex === -1) {
        return
      }

      const nextTemplates = templates.filter((template) => template.id !== id)
      setTemplates(nextTemplates)

      setActiveTemplateId((currentActiveTemplateId) => {
        if (currentActiveTemplateId !== id) {
          return currentActiveTemplateId
        }

        const replacementTemplate =
          nextTemplates[templateIndex] ?? nextTemplates[templateIndex - 1] ?? null

        return replacementTemplate?.id ?? null
      })
    },
    [templates]
  )

  const activeTemplate = useMemo(
    () => templates.find((template) => template.id === activeTemplateId) ?? null,
    [activeTemplateId, templates]
  )

  return {
    templates,
    activeTemplateId,
    activeTemplate,
    createTemplate,
    selectTemplate,
    renameTemplate,
    updateTemplateContent,
    deleteTemplate,
  }
}
