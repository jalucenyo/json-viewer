## Context

The app has a working two-column layout (JSON editor | preview placeholder) built with `react-resizable-panels` and Monaco. Handlebars is installed but unused. No template editing, rendering, or persistence exists yet. All decisions from the exploration phase are locked (see proposal).

Current layout is a single horizontal `ResizablePanelGroup` inside `AppLayout`. This needs to become a nested structure: vertical outer group (main + bottom panel) with the horizontal group inside the main panel.

## Goals / Non-Goals

**Goals:**
- Multi-template CRUD with localStorage persistence
- Handlebars syntax validation with Monaco markers
- Live preview of active template + JSON data
- Collapsible bottom panel with persistent height

**Non-Goals:**
- Template import/export or duplication
- Custom Handlebars helpers or partials registration
- Collaborative editing or backend sync
- Template versioning or undo history
- Monaco Handlebars language server (built-in tokenizer is sufficient)

## Decisions

### 1. Nested ResizablePanelGroup for layout

Wrap existing horizontal panels in a vertical `ResizablePanelGroup`. Bottom panel is collapsible with `collapsible={true}` on the `ResizablePanel`.

```
PanelGroup direction="vertical"
  ├── Panel (main, flex: 1)
  │     └── PanelGroup direction="horizontal"
  │           ├── Panel (JSON editor)
  │           └── Panel (preview)
  └── Panel (bottom, collapsible, defaultSize=30)
        └── TemplateManager
              └── PanelGroup direction="horizontal"
              		├── Panel (template list sidebar)
              		└── Panel (Monaco handlebars editor)
```

**Why over drawer/sheet**: Consistent with existing UX pattern. `react-resizable-panels` already in use, supports collapse/expand natively. User controls size by dragging.

### 2. Template data model

```typescript
interface Template {
  id: string       // crypto.randomUUID()
  name: string
  content: string
  createdAt: number
  updatedAt: number
}
```

Stored as `Template[]` in localStorage key `templates`. Simple flat array — no need for indexed access patterns at this scale.

### 3. State management via custom hooks

| Hook | Responsibility |
|------|----------------|
| `useTemplateStore()` | CRUD operations, localStorage sync, active template selection |
| `useTemplateValidation()` | `Handlebars.precompile()` → Monaco markers |
| `useTemplateRenderer()` | Compile active template + JSON → HTML output with 300ms debounce |

No external state library. React state + hooks + localStorage is sufficient for this scope.

**Why hooks over context**: Each feature component can import what it needs. No provider nesting. The template store hook uses a module-level sync pattern (similar to useSyncExternalStore) to keep multiple consumers in sync.

### 4. Handlebars validation strategy

On each editor change (with 300ms debounce):
1. Call `Handlebars.precompile(content)` — lighter than `compile()`, only parses AST
2. On success: clear Monaco markers
3. On error: `Handlebars.Exception` includes `lineNumber` and `column` → map to `monaco.editor.setModelMarkers()`

This catches unclosed blocks (`{{#each}}` without `{{/each}}`), malformed expressions, and syntax errors. It does NOT validate that referenced variables exist in the JSON (that's runtime, not syntax).

### 5. Template rendering pipeline

```
JSON string → JSON.parse()
                  ↓
            jsonData (object)
                  ↓
Active template content → Handlebars.compile() → templateFn
                  ↓
        templateFn(jsonData) → HTML string
                  ↓
        PreviewPanel renders via srcdoc iframe or dangerouslySetInnerHTML
```

Debounce 300ms on either JSON or template content change. Render errors (invalid JSON, template runtime errors) shown inline in preview panel.

**Why iframe srcdoc over dangerouslySetInnerHTML**: Sandboxes the rendered HTML. Prevents template output from breaking app layout or styles. `sandbox` attribute restricts script execution.

### 6. Bottom panel collapse/expand behavior

- Panel starts collapsed (`defaultSize={0}` with `collapsible={true}`)
- Toggle via toolbar button or CTA in preview
- Panel height persisted in localStorage key `template_panel_height` (default 30%)
- `onResize` callback stores the size; `onCollapse`/`onExpand` callbacks track collapsed state

### 7. Feature file structure

```
src/features/template/
  ├── components/
  │     ├── TemplateManager.tsx    # Container: sidebar + editor
  │     ├── TemplateList.tsx       # Template list with CRUD actions
  │     ├── TemplateListItem.tsx   # Single item: name, select, rename, delete
  │     └── TemplateEditor.tsx     # Monaco editor (language="handlebars")
  ├── hooks/
  │     ├── useTemplateStore.ts    # CRUD + localStorage persistence
  │     ├── useTemplateValidation.ts  # Syntax validation → markers
  │     └── useTemplateRenderer.ts    # Compile + render pipeline
  └── types.ts                     # Template interface
```

## Risks / Trade-offs

- **Monaco bundle size increases** → Handlebars tokenizer is already bundled with Monaco; no additional weight.
- **localStorage size limit (~5MB)** → Acceptable for template storage. A single template is typically <10KB. Would need 500+ templates to approach limits. Not a concern for MVP.
- **`Handlebars.precompile()` on every keystroke** → Mitigated by 300ms debounce. Compilation is fast (<5ms for typical templates).
- **iframe srcdoc for preview** → Adds slight complexity but prevents CSS/JS leakage from rendered templates into the app shell.
- **No conflict resolution for localStorage** → Single-tab app, no concurrent writes. Acceptable for MVP.
