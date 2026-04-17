## Context

The app uses `react-resizable-panels` v4.10+ for a vertical `ResizablePanelGroup` containing the main content (editor + preview) and the template panel. Currently, the template panel and its `ResizableHandle` are conditionally rendered based on `isTemplatePanelOpen` state — they are fully mounted/unmounted from the DOM on each toggle.

The library tracks internal layout state (percentage allocations per panel). When the template panel unmounts, the library recalculates for 1 panel. When it remounts, stale 2-panel layout data conflicts with the fresh 1-panel state, causing `Error: Invalid 1 panel layout: X%, Y%`. The first-click-not-responding bug is a symptom of the handle/panel re-initialization after remount.

## Goals / Non-Goals

**Goals:**
- Eliminate the crash when toggling the template panel after resizing
- Fix the first-click-not-responding issue on the resize handle
- Preserve the existing UX: toggle button shows/hides the template panel, resized height persists across sessions

**Non-Goals:**
- Changing the template panel's visual design or layout
- Adding animation/transitions to the collapse/expand
- Refactoring the horizontal resizable panels (editor ↔ preview) — those work correctly

## Decisions

### Decision 1: Use `collapsible` panel API instead of conditional rendering

**Choice**: Keep the template panel and handle always mounted. Use `collapsible={true}` with `collapsedSize="0%"` on the template `ResizablePanel`, and control visibility via `panelRef.collapse()` / `panelRef.expand()`.

**Alternatives considered**:
- **Keyed remount** (`key={timestamp}`): Force a fresh panel group on each toggle. Would fix the stale state but causes layout flicker and loses resize handle initialization.
- **Manual layout reset** via `groupRef.setLayout()`: Reset layout before toggling. Fragile — requires tracking exact layout percentages and has race conditions with React renders.

**Rationale**: The `collapsible` API is the library's first-class solution for this pattern. It avoids mount/unmount entirely, keeping the panel group's internal state consistent. The handle is always in the DOM, so there's no first-click initialization delay.

### Decision 2: Derive `isTemplatePanelOpen` from panel collapsed state

**Choice**: Use the `onResize` callback to detect when the panel collapses (size reaches 0) and sync the external `isTemplatePanelOpen` state. The toolbar toggle button calls `panelRef.collapse()` / `panelRef.expand()` instead of setting state directly.

**Rationale**: This makes the panel ref the single source of truth for collapse state, eliminating any desync between the React state and the library's internal state. The `isTemplatePanelOpen` prop in `AppLayout` remains for the toolbar to reflect the correct button label.

### Decision 3: Hide resize handle when panel is collapsed

**Choice**: When the template panel is collapsed, visually hide the resize handle (but keep it in the DOM) to match the current behavior where the handle disappears when the template panel is hidden.

**Rationale**: Maintains the existing UX. A visible handle with no visible panel below it would be confusing.

## Risks / Trade-offs

- **[Risk] Collapsed panel still occupies minimal DOM space** → With `collapsedSize="0%"`, the panel renders at 0 height. The handle remains in the DOM but can be hidden via conditional styling. Net visual result is identical to current behavior.
- **[Risk] Double-click on separator resets to defaultSize** → The library's default double-click behavior on separators could interfere. If needed, use `disableDoubleClick` on the separator to prevent unexpected expand/collapse.
- **[Trade-off] Always-mounted template panel** → The template panel's content (Monaco editor, template list) remains in the DOM even when collapsed. This is acceptable since those components are already lightweight when not visible, and avoids the cost of repeated mount/unmount cycles.
