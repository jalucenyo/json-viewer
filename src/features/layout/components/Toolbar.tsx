import { Moon, RowsPlusBottom } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

type ToolbarProps = {
  isTemplatePanelOpen: boolean
  onToggleTemplatePanel: () => void
}

export function Toolbar({
  isTemplatePanelOpen,
  onToggleTemplatePanel,
}: ToolbarProps) {
  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-border px-3">
      <h1 className="text-xs font-semibold tracking-wide uppercase text-foreground">
        JSON Template Visualizer
      </h1>
      <div className="flex items-center gap-2">
        <Button
          onClick={onToggleTemplatePanel}
          size="xs"
          variant={isTemplatePanelOpen ? "secondary" : "outline"}
        >
          <RowsPlusBottom className="size-3" />
          {isTemplatePanelOpen ? "Hide templates" : "Show templates"}
        </Button>
        <Button aria-label="Toggle theme" size="icon-xs" variant="outline">
          <Moon className="size-3" />
        </Button>
      </div>
    </header>
  )
}
