import Handlebars from "handlebars"
import { useEffect, useState } from "react"

import { buildPreviewDocument } from "@/features/preview/lib/preview-styles"
import { debounce } from "@/lib/debounce"

type UseTemplateRendererParams = {
  jsonInput: string
  templateContent: string | null
  theme: "light" | "dark"
}

type TemplateRenderState = {
  renderedHtml: string
  error: string | null
}

function getErrorMessage(error: unknown): string {
  if (error instanceof SyntaxError) {
    return `JSON parse error: ${error.message}`
  }

  if (error instanceof Error) {
    return `Template render error: ${error.message}`
  }

  return "Template render error: Unknown rendering failure"
}

export function useTemplateRenderer({
  jsonInput,
  templateContent,
  theme,
}: UseTemplateRendererParams): TemplateRenderState {
  const [state, setState] = useState<TemplateRenderState>({
    renderedHtml: "",
    error: null,
  })

  useEffect(() => {
    const renderTemplate = debounce(
      (
        nextJsonInput: string,
        nextTemplateContent: string | null,
        nextTheme: "light" | "dark"
      ) => {
        if (!nextTemplateContent) {
          setState({ renderedHtml: "", error: null })
          return
        }

        try {
          const parsedJson = nextJsonInput.trim() ? JSON.parse(nextJsonInput) : {}
          const compiledTemplate = Handlebars.compile(nextTemplateContent)
          const rawHtml = compiledTemplate(parsedJson)
          const renderedHtml = buildPreviewDocument(rawHtml, nextTheme)

          setState({
            renderedHtml,
            error: null,
          })
        } catch (error) {
          setState({
            renderedHtml: "",
            error: getErrorMessage(error),
          })
        }
      },
      300
    )

    renderTemplate(jsonInput, templateContent, theme)

    return () => {
      renderTemplate.cancel()
    }
  }, [jsonInput, templateContent, theme])

  return state
}
