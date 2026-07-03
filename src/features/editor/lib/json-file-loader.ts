export class JsonFileLoaderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "JsonFileLoaderError"
  }
}

export function isJsonFile(file: File): boolean {
  const hasJsonExtension = file.name.toLowerCase().endsWith(".json")
  const hasJsonMimeType =
    file.type === "application/json" || file.type === "application/json; charset=utf-8"

  return hasJsonExtension || hasJsonMimeType
}

export function readJsonFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isJsonFile(file)) {
      reject(new JsonFileLoaderError("Please drop a valid .json file."))
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result !== "string") {
        reject(new JsonFileLoaderError("Could not read file contents."))
        return
      }

      resolve(result)
    }

    reader.onerror = () => {
      reject(new JsonFileLoaderError("Failed to read the file."))
    }

    reader.readAsText(file)
  })
}

export function parseAndFormatJson(text: string): string {
  const trimmed = text.trim()

  if (!trimmed) {
    throw new JsonFileLoaderError("The file is empty.")
  }

  try {
    const parsed = JSON.parse(trimmed)
    return JSON.stringify(parsed, null, 2)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON"
    throw new JsonFileLoaderError(`Invalid JSON: ${message}`)
  }
}

export async function loadJsonFile(file: File): Promise<string> {
  const text = await readJsonFile(file)
  return parseAndFormatJson(text)
}
