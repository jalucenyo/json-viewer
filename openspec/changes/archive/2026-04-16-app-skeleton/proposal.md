## Why

The project is bootstrapped but has no functional UI — just a placeholder button. We need to establish the foundational application shell: a two-column resizable layout with a JSON editor (Monaco) on the left and a preview area on the right. This is the first step toward the full JSON Template Visualizer described in the product spec.

## What Changes

- Add the main application layout with a toolbar and a two-column resizable panel structure (editor | preview)
- Integrate Monaco Editor configured for JSON editing, using `@monaco-editor/react` with local workers (no CDN)
- Add a preview panel placeholder (static text, no rendering yet)
- Add a minimal toolbar with the app name and a theme toggle button (visual only, non-functional)
- Establish the feature-based directory structure (`features/editor`, `features/preview`, `features/layout`)
- Configure Monaco workers using Vite's native `?worker` imports

## Capabilities

### New Capabilities

- `json-editor`: Monaco-based JSON editor panel with syntax highlighting, auto-formatting, and JSON validation
- `app-layout`: Application shell with toolbar, resizable two-column layout (editor | preview), and preview placeholder
- `monaco-setup`: Monaco Editor worker configuration using Vite native workers and local npm package (no CDN)

### Modified Capabilities

_(none — no existing specs)_

## Impact

- **New dependencies**: `@monaco-editor/react`, `react-resizable-panels` (via shadcn `resizable` component)
- **Vite config**: No changes needed (Vite handles `?worker` imports natively)
- **Files**: New feature directories under `src/features/`, new `src/lib/monaco-setup.ts`, updated `App.tsx`
- **Removed**: Placeholder `Button` in current `App.tsx`, `App.css`
