import { Button } from "@/components/ui/button"

type PreviewPanelProps = {
  templatesCount: number
  renderedHtml: string
  error: string | null
  onCreateTemplate: () => void
}

export function PreviewPanel({
  templatesCount,
  renderedHtml,
  error,
  onCreateTemplate,
}: PreviewPanelProps) {
  if (templatesCount === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center">
        <h2 className="text-sm font-semibold">No templates yet</h2>
        <p className="max-w-sm text-xs text-muted-foreground">
          Create a template to render JSON data into an HTML preview.
        </p>
        <Button onClick={onCreateTemplate} size="sm" variant="outline">
          Create template
        </Button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="w-full max-w-xl border border-destructive/30 bg-destructive/10 p-3">
          <h2 className="text-xs font-semibold text-destructive">Render error</h2>
          <p className="mt-1 text-xs text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  if (!renderedHtml) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
        Rendered output will appear here.
      </div>
    )
  }

  return (
    <iframe
      className="h-full w-full border-0"
      sandbox=""
      srcDoc={renderedHtml}
      title="Template preview"
    />
  )
}
