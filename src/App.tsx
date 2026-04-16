import { JsonEditor } from "@/features/editor/components/JsonEditor"
import { AppLayout } from "@/features/layout/components/AppLayout"
import { PreviewPanel } from "@/features/preview/components/PreviewPanel"

function App() {
  return (
    <AppLayout leftPanel={<JsonEditor />} rightPanel={<PreviewPanel />} />
  )
}

export default App
