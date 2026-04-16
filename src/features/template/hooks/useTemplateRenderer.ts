import Handlebars from "handlebars"
import { useEffect, useState } from "react"

import { debounce } from "@/lib/debounce"

type UseTemplateRendererParams = {
  jsonInput: string
  templateContent: string | null
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
}: UseTemplateRendererParams): TemplateRenderState {
  const [state, setState] = useState<TemplateRenderState>({
    renderedHtml: "",
    error: null,
  })

  useEffect(() => {
    const renderTemplate = debounce(
      (nextJsonInput: string, nextTemplateContent: string | null) => {
        if (!nextTemplateContent) {
          setState({ renderedHtml: "", error: null })
          return
        }

        try {
          const parsedJson = nextJsonInput.trim() ? JSON.parse(nextJsonInput) : {}
          const compiledTemplate = Handlebars.compile(nextTemplateContent)
          const renderedHtml = compiledTemplate(parsedJson)

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

    renderTemplate(jsonInput, templateContent)

    return () => {
      renderTemplate.cancel()
    }
  }, [jsonInput, templateContent])

  return state
}
