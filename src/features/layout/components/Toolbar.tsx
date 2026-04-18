import { Bug, Moon, RowsPlusBottom, Sun } from "@phosphor-icons/react"

import { Button, buttonVariants } from "@/components/ui/button"

type ToolbarProps = {
  isTemplatePanelOpen: boolean
  theme: "light" | "dark"
  onToggleTemplatePanel: () => void
  onToggleTheme: () => void
}

export function Toolbar({
  isTemplatePanelOpen,
  theme,
  onToggleTemplatePanel,
  onToggleTheme,
}: ToolbarProps) {
  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-border px-3">
      <h1 className="text-xs font-semibold tracking-wide uppercase text-foreground">
        JSON Template Visualizer
      </h1>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/jalucenyo/json-viewer"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="GitHub stars"
            src="https://img.shields.io/github/stars/jalucenyo/json-viewer?style=social"
          />
        </a>
        <a
          className={buttonVariants({ size: "xs", variant: "outline" })}
          href="https://github.com/jalucenyo/json-viewer/issues/new?template=bug_report.md"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Bug className="size-3" />
          Report Issue
        </a>
        <Button
          onClick={onToggleTemplatePanel}
          size="xs"
          variant={isTemplatePanelOpen ? "secondary" : "outline"}
        >
          <RowsPlusBottom className="size-3" />
          {isTemplatePanelOpen ? "Hide templates" : "Show templates"}
        </Button>
        <Button aria-label="Toggle theme" onClick={onToggleTheme} size="icon-xs" variant="outline">
          {theme === "dark" ? <Sun className="size-3" /> : <Moon className="size-3" />}
        </Button>
      </div>
    </header>
  )
}
