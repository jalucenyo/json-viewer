## 1. Dependencies & Setup

- [x] 1.1 Install `@monaco-editor/react` package
- [x] 1.2 Add shadcn `resizable` component (`npx shadcn@latest add resizable`)
- [x] 1.3 Create `src/lib/monaco-setup.ts` with Vite native worker imports and `loader.config({ monaco })`
- [x] 1.4 Import `monaco-setup.ts` in `main.tsx` before `createRoot().render()`

## 2. Layout Feature

- [x] 2.1 Create `src/features/layout/components/Toolbar.tsx` with app name and visual-only theme toggle button
- [x] 2.2 Create `src/features/layout/components/AppLayout.tsx` with full-viewport layout: Toolbar on top, ResizablePanelGroup below with two 50/50 panels

## 3. Editor Feature

- [x] 3.1 Create `src/features/editor/components/JsonEditor.tsx` using `@monaco-editor/react` Editor component with `language="json"`, default value `{}`, and full-size layout

## 4. Preview Feature

- [x] 4.1 Create `src/features/preview/components/PreviewPanel.tsx` with centered placeholder text "Preview will appear here"

## 5. App Integration

- [x] 5.1 Update `App.tsx` to render `AppLayout` with `JsonEditor` in the left panel and `PreviewPanel` in the right panel
- [x] 5.2 Remove `App.css` (no longer needed, using Tailwind only)

## 6. Verification

- [x] 6.1 Run `npm run build` to verify TypeScript compilation and production build succeed
