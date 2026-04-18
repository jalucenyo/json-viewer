## 1. Dark palette CSS variables

- [ ] 1.1 Update `.dark` CSS variables in `src/index.css` with VS Code-inspired values (blue tint, solid borders, softer foreground)
- [ ] 1.2 Update `CSS_VARIABLES_DARK` in `src/features/preview/lib/preview-styles.ts` to match the new dark palette

## 2. Monaco editor theme synchronization

- [ ] 2.1 Add `theme` prop to `JsonEditor` component and map it to Monaco theme (`"dark"` → `"vs-dark"`, `"light"` → `"light"`)
- [ ] 2.2 Add `theme` prop to `TemplateEditor` component with the same mapping
- [ ] 2.3 Pass `theme` state from `App.tsx` to `JsonEditor` and `TemplateEditor` components

## 3. Toolbar theme toggle icon

- [ ] 3.1 Pass `theme` value to `Toolbar` component and display sun icon (`Sun`) when dark, moon icon (`Moon`) when light
