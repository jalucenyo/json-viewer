import { Bug, Moon, RowsPlusBottom, Sun, UploadSimple } from "@phosphor-icons/react"
import { useCallback, useRef, type ChangeEvent } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  JsonFileLoaderError,
  loadJsonFile,
} from "@/features/editor/lib/json-file-loader"

type ToolbarProps = {
  isTemplatePanelOpen: boolean
  theme: "light" | "dark"
  onToggleTemplatePanel: () => void
  onToggleTheme: () => void
  onLoadJson: (json: string) => void
  onLoadJsonError: (message: string) => void
}

export function Toolbar({
  isTemplatePanelOpen,
  theme,
  onToggleTemplatePanel,
  onToggleTheme,
  onLoadJson,
  onLoadJsonError,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (!file) {
        return
      }

      try {
        const formattedJson = await loadJsonFile(file)
        onLoadJson(formattedJson)
      } catch (error) {
        const message =
          error instanceof JsonFileLoaderError
            ? error.message
            : "Failed to load JSON file."
        onLoadJsonError(message)
      } finally {
        event.target.value = ""
      }
    },
    [onLoadJson, onLoadJsonError]
  )

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

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
        <Button
          aria-label="Load JSON file"
          onClick={handleUploadClick}
          size="icon-xs"
          variant="outline"
        >
          <UploadSimple className="size-3" />
        </Button>
        <input
          accept=".json,application/json"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
          type="file"
        />
        <Button aria-label="Toggle theme" onClick={onToggleTheme} size="icon-xs" variant="outline">
          {theme === "dark" ? <Sun className="size-3" /> : <Moon className="size-3" />}
        </Button>
      </div>
    </header>
  )
}
