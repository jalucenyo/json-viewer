import type { JsonNode, JsonNodeType, JsonStats } from "../types"

function getType(value: unknown): JsonNodeType {
  if (value === null) return "null"
  if (Array.isArray(value)) return "array"
  switch (typeof value) {
    case "string":
      return "string"
    case "number":
      return "number"
    case "boolean":
      return "boolean"
    default:
      return "object"
  }
}

let counter = 0

function buildNode(
  value: unknown,
  key: string | null,
  path: string[],
  depth: number
): JsonNode {
  const type = getType(value)
  const id = `n${counter++}`

  if (type === "array" && Array.isArray(value)) {
    const children = value.map((item, i) =>
      buildNode(item, String(i), [...path, String(i)], depth + 1)
    )
    return { id, key, type, value, children, path, depth, size: value.length }
  }

  if (type === "object" && value !== null && typeof value === "object") {
    const children = Object.entries(value as Record<string, unknown>).map(
      ([k, v]) => buildNode(v, k, [...path, k], depth + 1)
    )
    return { id, key, type, value, children, path, depth, size: children.length }
  }

  return { id, key, type, value, children: [], path, depth, size: 0 }
}

function collectStats(node: JsonNode, stats: JsonStats): void {
  stats.typeMap[node.type] = (stats.typeMap[node.type] ?? 0) + 1

  if (node.type === "array") {
    stats.arrayCount++
  } else if (node.type === "object") {
    stats.objectCount++
    stats.keyCount += node.size
  }

  if (node.depth > stats.maxDepth) {
    stats.maxDepth = node.depth
  }

  for (const child of node.children) {
    collectStats(child, stats)
  }
}

export function buildTree(
  value: unknown,
  rawJson: string
): { root: JsonNode; stats: JsonStats } {
  counter = 0
  const root = buildNode(value, null, [], 0)

  const stats: JsonStats = {
    maxDepth: 0,
    keyCount: 0,
    arrayCount: 0,
    objectCount: 0,
    typeMap: {
      string: 0,
      number: 0,
      boolean: 0,
      null: 0,
      array: 0,
      object: 0,
    },
    sizeBytes: new TextEncoder().encode(rawJson).length,
  }

  collectStats(root, stats)

  return { root, stats }
}
