import { useMemo } from "react"

import { buildTree } from "../lib/json-tree-builder"
import type { JsonNode, JsonStats } from "../types"

type UseJsonTreeResult = {
  tree: JsonNode | null
  stats: JsonStats | null
  error: string | null
}

export function useJsonTree(jsonInput: string): UseJsonTreeResult {
  return useMemo(() => {
    if (!jsonInput.trim()) {
      return { tree: null, stats: null, error: null }
    }

    try {
      const parsed: unknown = JSON.parse(jsonInput)
      const { root, stats } = buildTree(parsed, jsonInput)
      return { tree: root, stats, error: null }
    } catch (err) {
      return {
        tree: null,
        stats: null,
        error: err instanceof SyntaxError ? err.message : "Invalid JSON",
      }
    }
  }, [jsonInput])
}
