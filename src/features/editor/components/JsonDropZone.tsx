import { type DragEvent, type ReactNode, useCallback, useState } from "react"

import {
  JsonFileLoaderError,
  isJsonFile,
  loadJsonFile,
} from "@/features/editor/lib/json-file-loader"

type JsonDropZoneProps = {
  children: ReactNode
  onLoad: (json: string) => void
  onError: (message: string) => void
}

export function JsonDropZone({ children, onLoad, onError }: JsonDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (Array.from(event.dataTransfer.items).some((item) => item.kind === "file")) {
      setIsDragging(true)
    }
  }, [])

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragging(false)

      const files = Array.from(event.dataTransfer.files)
      const jsonFile = files.find((file) => isJsonFile(file))

      if (!jsonFile) {
        onError("Please drop a valid .json file.")
        return
      }

      try {
        const formattedJson = await loadJsonFile(jsonFile)
        onLoad(formattedJson)
      } catch (error) {
        const message =
          error instanceof JsonFileLoaderError
            ? error.message
            : "Failed to load JSON file."
        onError(message)
      }
    },
    [onLoad, onError]
  )

  return (
    <div
      className="relative h-full w-full"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
      {isDragging && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="border border-dashed border-border bg-muted px-6 py-4 text-center">
            <p className="text-sm font-medium text-foreground">Drop JSON file here</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Only .json files are accepted
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
