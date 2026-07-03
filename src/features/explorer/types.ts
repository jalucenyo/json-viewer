export type JsonNodeType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "array"
  | "object"

export type JsonNode = {
  id: string
  key: string | null
  type: JsonNodeType
  value: unknown
  children: JsonNode[]
  path: string[]
  depth: number
  size: number
}

export type JsonStats = {
  maxDepth: number
  keyCount: number
  arrayCount: number
  objectCount: number
  typeMap: Record<JsonNodeType, number>
  sizeBytes: number
}
