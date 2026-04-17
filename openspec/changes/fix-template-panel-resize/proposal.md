## Why

The template panel has two resizing bugs that degrade the user experience. First, when the user tries to resize the bottom template panel, the first mouse click on the drag handle doesn't respond — a second click is required. Second, rapidly toggling the "Show/Hide templates" button after resizing causes the app to crash with a white screen (`Error: Invalid 1 panel layout`). The root cause is that the template panel and its resize handle are conditionally mounted/unmounted from the `ResizablePanelGroup`, which corrupts the library's internal layout state.

## What Changes

- Replace conditional rendering (mount/unmount) of the template panel with the `collapsible` panel API from `react-resizable-panels`
- Keep both panels and the resize handle always mounted in the DOM
- Use `panelRef.collapse()` / `panelRef.expand()` to programmatically toggle visibility
- Sync the `isTemplatePanelOpen` state with the panel's collapsed state via the `onResize` callback
- Persist and restore the template panel size across sessions using the existing localStorage mechanism

## Capabilities

### New Capabilities

_None_ — this is a bug fix, not a new feature.

### Modified Capabilities

- `app-layout`: The template panel toggle behavior changes from conditional DOM rendering to collapsible panel management. The resize handle and panel remain always-mounted, and visibility is controlled via the library's collapse/expand API.

## Impact

- `src/features/layout/components/AppLayout.tsx` — primary change: refactor vertical `ResizablePanelGroup` to use collapsible panel
- `src/features/layout/components/Toolbar.tsx` — no API changes, same toggle callback
- `src/App.tsx` — minor: may simplify the `isTemplatePanelOpen` state management if collapse state is derived from `panelRef`
- Dependency: `react-resizable-panels` v4.10+ (already installed, supports `collapsible` prop)
