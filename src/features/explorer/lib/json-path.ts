const SIMPLE_KEY = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/

export function buildJsonPath(pathSegments: string[]): string {
  if (pathSegments.length === 0) return "$"

  let result = "$"
  for (const segment of pathSegments) {
    if (/^\d+$/.test(segment)) {
      result += `[${segment}]`
    } else if (SIMPLE_KEY.test(segment)) {
      result += `.${segment}`
    } else {
      result += `["${segment}"]`
    }
  }

  return result
}
