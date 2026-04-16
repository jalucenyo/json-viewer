import { useState, type ReactNode } from "react"
import type { PanelSize } from "react-resizable-panels"

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
}

export function AppLayout({
  leftPanel,
  rightPanel,
  templatePanel,
  isTemplatePanelOpen,
  onTemplatePanelOpenChange,
}: AppLayoutProps) {
  const [templatePanelSize, setTemplatePanelSize] = useState<number>(() =>
    getStoredTemplatePanelHeight()
  )

  const handleTemplatePanelResize = (size: PanelSize) => {
    if (size.asPercentage <= 0) {
      onTemplatePanelOpenChange(false)
      return
    }

    const nextSize = clampTemplatePanelHeight(size.asPercentage)

    setTemplatePanelSize(nextSize)

    if (typeof window !== "undefined") {
      window.localStorage.setItem(TEMPLATE_PANEL_HEIGHT_KEY, String(nextSize))
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full min-h-0 flex-col">
        <Toolbar
          isTemplatePanelOpen={isTemplatePanelOpen}
          onToggleTemplatePanel={() =>
            onTemplatePanelOpenChange(!isTemplatePanelOpen)
          }
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
            {isTemplatePanelOpen ? (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel
                  defaultSize={`${templatePanelSize}%`}
                  minSize={`${MIN_TEMPLATE_PANEL_HEIGHT}%`}
                  onResize={handleTemplatePanelResize}
                >
                  <div className="h-full w-full">{templatePanel}</div>
                </ResizablePanel>
              </>
            ) : null}
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}
