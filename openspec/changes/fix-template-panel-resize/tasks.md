## 1. Refactor AppLayout to always-mounted collapsible panel

- [x] 1.1 Add `panelRef` to the template `ResizablePanel` using `usePanelRef` from `react-resizable-panels`
- [x] 1.2 Replace conditional rendering of `ResizableHandle` and `ResizablePanel` with always-mounted elements using `collapsible={true}` and `collapsedSize="0%"`
- [x] 1.3 Wire toolbar toggle to call `panelRef.collapse()` / `panelRef.expand()` instead of toggling React state directly
- [x] 1.4 Sync `isTemplatePanelOpen` state from the `onResize` callback by detecting collapsed state (size === 0)

## 2. Handle resize handle visibility

- [x] 2.1 Conditionally hide the vertical resize handle (between main content and template panel) when the template panel is collapsed, using CSS or a conditional className

## 3. Preserve panel size across sessions

- [x] 3.1 Ensure `defaultSize` on the template panel uses the stored localStorage value so expanded size restores correctly after page reload
- [x] 3.2 Verify that the `onResize` handler persists the panel size to localStorage only when expanded (not when collapsing to 0)

## 4. Verification

- [x] 4.1 Verify resizing the template panel handle responds on first click without requiring a second click
- [x] 4.2 Verify rapidly toggling "Show/Hide templates" after resizing does not crash the app
- [x] 4.3 Verify template panel height persists across page reloads
