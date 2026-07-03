import { CaretDown, CaretRight, Copy } from "@phosphor-icons/react"
import { useState } from "react"

import { cn } from "@/lib/utils"

import { buildJsonPath } from "../lib/json-path"
import type { JsonNode, JsonNodeType } from "../types"

type JsonTreeNodeProps = {
  node: JsonNode
  onCopyPath: (path: string) => void
  initiallyExpanded?: boolean
}

function typeColor(type: JsonNodeType): string {
  switch (type) {
    case "string":
      return "text-emerald-600 dark:text-emerald-400"
    case "number":
      return "text-blue-600 dark:text-blue-400"
    case "boolean":
      return "text-amber-600 dark:text-amber-400"
    case "null":
      return "text-muted-foreground/60 italic"
    default:
      return "text-foreground"
  }
}

function formatScalar(node: JsonNode): string {
  if (node.type === "null") return "null"
  if (node.type === "boolean") return String(node.value)
  if (node.type === "number") return String(node.value)
  if (node.type === "string") {
    const str = node.value as string
    return str.length > 80 ? `"${str.slice(0, 80)}…"` : `"${str}"`
  }
  return ""
}

const INDENT = 14

export function JsonTreeNode({
  node,
  onCopyPath,
  initiallyExpanded,
}: JsonTreeNodeProps) {
  const [expanded, setExpanded] = useState(
    initiallyExpanded ?? node.depth <= 1
  )

  const isExpandable = node.type === "array" || node.type === "object"
  const jsonPath = buildJsonPath(node.path)
  const isArrayIndex = node.key !== null && /^\d+$/.test(node.key)

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCopyPath(jsonPath)
  }

  return (
    <div>
      {/* Row */}
      <div
        className={cn(
          "group flex min-w-0 items-start gap-0.5 py-px pr-2 hover:bg-muted/40",
          isExpandable && "cursor-pointer select-none"
        )}
        style={{ paddingLeft: `${node.depth * INDENT + 4}px` }}
        onClick={isExpandable ? () => setExpanded((p) => !p) : undefined}
      >
        {/* Caret */}
        <span className="mt-0.5 flex size-3.5 shrink-0 items-center justify-center text-muted-foreground">
          {isExpandable &&
            (expanded ? (
              <CaretDown className="size-3" weight="bold" />
            ) : (
              <CaretRight className="size-3" weight="bold" />
            ))}
        </span>

        {/* Key */}
        {node.key !== null && (
          <span className="shrink-0 text-foreground/70">
            {isArrayIndex ? (
              <span className="text-muted-foreground">[{node.key}]</span>
            ) : (
              <span>"{node.key}"</span>
            )}
            <span className="text-muted-foreground">:&nbsp;</span>
          </span>
        )}

        {/* Value or summary */}
        {isExpandable ? (
          <span className="text-muted-foreground">
            {node.type === "array" ? "[" : "{"}
            {!expanded && (
              <>
                <span className="px-1 text-muted-foreground/50">
                  {node.size} {node.type === "array" ? "items" : "keys"}
                </span>
                {node.type === "array" ? "]" : "}"}
              </>
            )}
          </span>
        ) : (
          <span className={cn("min-w-0 truncate", typeColor(node.type))}>
            {formatScalar(node)}
          </span>
        )}

        {/* Copy path on hover */}
        <button
          className="ml-auto flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-foreground"
          title={`Copy path: ${jsonPath}`}
          onClick={handleCopyPath}
        >
          <Copy className="size-2.5" />
          <span className="text-[10px]">{jsonPath}</span>
        </button>
      </div>

      {/* Children */}
      {isExpandable && expanded && (
        <>
          {node.children.map((child) => (
            <JsonTreeNode
              key={child.id}
              node={child}
              onCopyPath={onCopyPath}
            />
          ))}
          {/* Closing bracket */}
          <div
            className="py-px text-muted-foreground"
            style={{ paddingLeft: `${node.depth * INDENT + 4 + 14}px` }}
          >
            {node.type === "array" ? "]" : "}"}
          </div>
        </>
      )}
    </div>
  )
}
