## Why

The dark mode implementation is inconsistent: Monaco editors stay in light theme when dark mode is toggled, creating a jarring visual mismatch. Additionally, the dark palette uses pure neutral grays (chroma 0) producing a "too black" feel, unlike VS Code's softer dark theme which uses subtle blue tints, solid borders, and a clear surface hierarchy.

## What Changes

- Pass the current theme state to both Monaco editor components so they switch between `light` and `vs-dark` themes
- Adjust the `.dark` CSS variables in `index.css` to use a VS Code-inspired palette with subtle blue tints, solid borders, softer foreground contrast, and clear surface hierarchy
- Synchronize the dark CSS variables in `preview-styles.ts` to match the updated palette, keeping the preview iframe visually coherent with the app shell
- Update the Toolbar theme toggle to show the correct icon for the active theme (sun for dark mode, moon for light mode)

## Capabilities

### New Capabilities

### Modified Capabilities
- `monaco-setup`: Monaco editors must react to theme changes, switching between light and vs-dark themes
- `preview-styles`: Dark mode CSS variables must be updated to match the new VS Code-inspired palette
- `app-layout`: Theme state must flow to editor components as a prop

## Impact

- `src/index.css` — dark mode CSS variables
- `src/features/preview/lib/preview-styles.ts` — dark mode CSS variables for preview iframe
- `src/features/editor/components/JsonEditor.tsx` — accept and apply theme prop
- `src/features/template/components/TemplateEditor.tsx` — accept and apply theme prop
- `src/features/layout/components/AppLayout.tsx` — pass theme prop through layout
- `src/App.tsx` — thread theme prop to editor components
- `src/features/layout/components/Toolbar.tsx` — conditional icon for theme toggle
