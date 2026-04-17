import { useEffect, useState, type ReactNode } from "react"
import { usePanelRef, type PanelSize } from "react-resizable-panels"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Toolbar } from "./Toolbar"

const TEMPLATE_PANEL_HEIGHT_KEY = "template_panel_height"
const DEFAULT_TEMPLATE_PANEL_HEIGHT = 30
const MIN_TEMPLATE_PANEL_HEIGHT = 25

function clampTemplatePanelHeight(size: number) {
  return Math.min(100, Math.max(MIN_TEMPLATE_PANEL_HEIGHT, size))
}

function getStoredTemplatePanelHeight() {
  if (typeof window === "undefined") {
    return DEFAULT_TEMPLATE_PANEL_HEIGHT
  }

  const storedHeight = Number.parseFloat(
    window.localStorage.getItem(TEMPLATE_PANEL_HEIGHT_KEY) ?? ""
  )

  if (Number.isFinite(storedHeight) && storedHeight > 0) {
    return clampTemplatePanelHeight(storedHeight)
  }

  return DEFAULT_TEMPLATE_PANEL_HEIGHT
}

type AppLayoutProps = {
  leftPanel: ReactNode
  rightPanel: ReactNode
  templatePanel: ReactNode
  isTemplatePanelOpen: boolean
  onTemplatePanelOpenChange: (isOpen: boolean) => void
  onToggleTheme: () => void
}

export function AppLayout({
  leftPanel,
  rightPanel,
  templatePanel,
  isTemplatePanelOpen,
  onTemplatePanelOpenChange,
  onToggleTheme,
}: AppLayoutProps) {
  const templatePanelRef = usePanelRef()
  const [templatePanelSize, setTemplatePanelSize] = useState<number>(() =>
    getStoredTemplatePanelHeight()
  )
  const [isTemplatePanelCollapsed, setIsTemplatePanelCollapsed] = useState(
    !isTemplatePanelOpen
  )

  useEffect(() => {
    const panel = templatePanelRef.current

    if (!panel) {
      return
    }

    if (isTemplatePanelOpen && panel.isCollapsed()) {
      setIsTemplatePanelCollapsed(false)
      panel.expand()
      panel.resize(`${templatePanelSize}%`)
      return
    }

    if (!isTemplatePanelOpen && !panel.isCollapsed()) {
      setIsTemplatePanelCollapsed(true)
      panel.collapse()
    }
  }, [isTemplatePanelOpen, templatePanelRef])

  const handleTemplatePanelResize = (size: PanelSize) => {
    if (size.asPercentage <= 0) {
      setIsTemplatePanelCollapsed(true)

      if (isTemplatePanelOpen) {
        onTemplatePanelOpenChange(false)
      }

      return
    }

    setIsTemplatePanelCollapsed(false)

    if (!isTemplatePanelOpen) {
      onTemplatePanelOpenChange(true)
    }

    const nextSize = clampTemplatePanelHeight(size.asPercentage)

    setTemplatePanelSize(nextSize)

    if (typeof window !== "undefined") {
      window.localStorage.setItem(TEMPLATE_PANEL_HEIGHT_KEY, String(nextSize))
    }
  }

  const handleTemplatePanelToggle = () => {
    const panel = templatePanelRef.current

    if (!panel) {
      return
    }

    if (panel.isCollapsed()) {
      setIsTemplatePanelCollapsed(false)
      panel.expand()
      panel.resize(`${templatePanelSize}%`)
      return
    }

    setIsTemplatePanelCollapsed(true)
    panel.collapse()
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full min-h-0 flex-col">
        <Toolbar
          isTemplatePanelOpen={isTemplatePanelOpen}
          onToggleTemplatePanel={handleTemplatePanelToggle}
          onToggleTheme={onToggleTheme}
        />
        <div className="min-h-0 flex-1">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel minSize="30%">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize="50%" minSize="30%">
                  <div className="h-full w-full">{leftPanel}</div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="50%" minSize="30%">
                  <div className="h-full w-full">{rightPanel}</div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle
              className={isTemplatePanelCollapsed ? "hidden" : undefined}
              withHandle
            />
            <ResizablePanel
              collapsedSize="0%"
              collapsible
              defaultSize={`${templatePanelSize}%`}
              minSize={`${MIN_TEMPLATE_PANEL_HEIGHT}%`}
              onResize={handleTemplatePanelResize}
              panelRef={templatePanelRef}
            >
              <div className="h-full w-full">{templatePanel}</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}
