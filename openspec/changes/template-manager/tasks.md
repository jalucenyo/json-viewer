## 1. Template types and store

- [ ] 1.1 Create `src/features/template/types.ts` with `Template` interface
- [ ] 1.2 Create `src/features/template/hooks/useTemplateStore.ts` — CRUD operations, localStorage sync (`templates`, `active_template_id`), active template selection
- [ ] 1.3 Create `src/lib/debounce.ts` — reusable debounce utility (used by validation and rendering)

## 2. Template panel and layout

- [ ] 2.1 Create `src/features/template/components/TemplateManager.tsx` — container with horizontal panel group (sidebar + editor)
- [ ] 2.2 Create `src/features/template/components/TemplateList.tsx` — template list with "New template" button
- [ ] 2.3 Create `src/features/template/components/TemplateListItem.tsx` — single item: select, rename (double-click), delete (inline confirm)
- [ ] 2.4 Update `AppLayout` — wrap existing horizontal panels in vertical `ResizablePanelGroup` with collapsible bottom panel, persist height in `template_panel_height`

## 3. Template editor

- [ ] 3.1 Create `src/features/template/components/TemplateEditor.tsx` — Monaco editor with `language="handlebars"`, syncs content with active template
- [ ] 3.2 Create `src/features/template/hooks/useTemplateValidation.ts` — `Handlebars.precompile()` with 300ms debounce, maps errors to Monaco markers

## 4. Template rendering and preview

- [ ] 4.1 Create `src/features/template/hooks/useTemplateRenderer.ts` — compile active template + JSON data → HTML with 300ms debounce
- [ ] 4.2 Update `PreviewPanel` — render HTML in sandboxed iframe (`srcdoc`), show errors inline, show CTA when no templates exist (CTA expands bottom panel and creates template)

## 5. App integration

- [ ] 5.1 Update `App.tsx` — wire JSON editor state, template store, renderer, and pass to layout/preview
- [ ] 5.2 Verify full flow: create template → edit → see preview → persist across reload
- [ ] 5.3 Run `npm run build` — ensure TypeScript and production build pass
