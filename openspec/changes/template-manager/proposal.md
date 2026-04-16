## Why

The app currently only has a JSON editor and a preview placeholder. Users need the ability to create, edit, and manage multiple Handlebars templates, then see the selected template rendered live against the JSON input. Without template management, the core product value (JSON + Template → HTML preview) cannot be delivered.

## What Changes

- Add a collapsible bottom panel (Template Manager) with a list of templates and a Monaco editor (`language="handlebars"`)
- CRUD operations for templates: create, select, rename, delete (inline confirmation)
- Persist templates as `Template[]` in localStorage key `templates`
- Persist active template ID in localStorage key `active_template_id`
- Persist bottom panel height in localStorage key `template_panel_height`
- Validate Handlebars syntax on edit using `Handlebars.precompile()` with errors mapped to Monaco markers
- Render selected template against JSON input with 300ms debounce into the preview panel
- Show a CTA in the preview panel when no templates exist, which opens the Template Manager
- Restructure layout from horizontal-only to vertical (main content) + collapsible bottom panel
- Bottom panel starts collapsed; default height 30%

## Capabilities

### New Capabilities
- `template-crud`: Create, read, update, delete Handlebars templates with localStorage persistence
- `template-editor`: Monaco editor with `language="handlebars"`, syntax validation via `Handlebars.precompile()`, error markers
- `template-panel`: Collapsible bottom panel UI with template list sidebar and editor area
- `template-rendering`: Compile active template + JSON data → HTML preview with 300ms debounce

### Modified Capabilities
- `app-layout`: Layout changes from horizontal-only to vertical split (main + collapsible bottom panel)

## Impact

- **Layout**: `AppLayout` restructured to wrap existing horizontal panels in a vertical `PanelGroup` with a collapsible bottom panel
- **Preview**: `PreviewPanel` updated to render compiled HTML and show CTA when no templates exist
- **Dependencies**: `handlebars` (already installed, currently unused) — now actively used
- **localStorage**: New keys `templates`, `active_template_id`, `template_panel_height`; key `template_input` from original spec is not used
- **Monaco**: Handlebars language worker not needed (Monaco's built-in `handlebars` tokenizer suffices)
