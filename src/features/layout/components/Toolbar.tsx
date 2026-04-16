import { Moon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

export function Toolbar() {
  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-border px-3">
      <h1 className="text-xs font-semibold tracking-wide uppercase text-foreground">
        JSON Template Visualizer
      </h1>
      <Button aria-label="Toggle theme" size="icon-xs" variant="outline">
        <Moon className="size-3" />
      </Button>
    </header>
  )
}
