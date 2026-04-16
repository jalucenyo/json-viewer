import type { ReactNode } from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Toolbar } from "./Toolbar"

type AppLayoutProps = {
  leftPanel: ReactNode
  rightPanel: ReactNode
}

export function AppLayout({ leftPanel, rightPanel }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full min-h-0 flex-col">
        <Toolbar />
        <div className="min-h-0 flex-1">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full w-full">{leftPanel}</div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full w-full">{rightPanel}</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}
