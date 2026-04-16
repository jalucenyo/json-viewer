import { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"

type MonacoWorkerFactory = {
  getWorker: (_: string, label: string) => Worker
}

const monacoEnvironment = self as typeof globalThis & {
  MonacoEnvironment?: MonacoWorkerFactory
}

monacoEnvironment.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker()
    }

    return new editorWorker()
  },
}

loader.config({ monaco })