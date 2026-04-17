## 1. Refactor AppLayout to always-mounted collapsible panel

- [ ] 1.1 Add `panelRef` to the template `ResizablePanel` using `usePanelRef` from `react-resizable-panels`
- [ ] 1.2 Replace conditional rendering of `ResizableHandle` and `ResizablePanel` with always-mounted elements using `collapsible={true}` and `collapsedSize="0%"`
- [ ] 1.3 Wire toolbar toggle to call `panelRef.collapse()` / `panelRef.expand()` instead of toggling React state directly
- [ ] 1.4 Sync `isTemplatePanelOpen` state from the `onResize` callback by detecting collapsed state (size === 0)

## 2. Handle resize handle visibility

- [ ] 2.1 Conditionally hide the vertical resize handle (between main content and template panel) when the template panel is collapsed, using CSS or a conditional className

## 3. Preserve panel size across sessions

- [ ] 3.1 Ensure `defaultSize` on the template panel uses the stored localStorage value so expanded size restores correctly after page reload
- [ ] 3.2 Verify that the `onResize` handler persists the panel size to localStorage only when expanded (not when collapsing to 0)

## 4. Verification

- [ ] 4.1 Verify resizing the template panel handle responds on first click without requiring a second click
- [ ] 4.2 Verify rapidly toggling "Show/Hide templates" after resizing does not crash the app
- [ ] 4.3 Verify template panel height persists across page reloads
