## 1. Preview Styles Module

- [x] 1.1 Create `src/features/preview/lib/preview-styles.ts` with CSS variable definitions (light and dark tokens) matching `index.css`
- [x] 1.2 Add base element styles (h1–h6, p, table/th/td, ul/ol, a, code/pre, blockquote, hr, img) using CSS variables
- [x] 1.3 Implement `buildPreviewDocument(html, theme)` function that returns a complete HTML document string with base styles, CSS variables, font, and theme class

## 2. Renderer Integration

- [x] 2.1 Add `theme` parameter to `useTemplateRenderer` hook
- [x] 2.2 Call `buildPreviewDocument` to wrap rendered Handlebars output before setting state
- [x] 2.3 Add `theme` to the `useEffect` dependency array so theme changes trigger re-render

## 3. App Wiring

- [x] 3.1 Read current theme in `App.tsx` and pass it to `useTemplateRenderer`
- [x] 3.2 Verify dark/light toggle propagates to the preview iframe

## 4. Verification

- [x] 4.1 Test with a template using headings, tables, lists, and paragraphs — confirm styled output
- [x] 4.2 Test with a template containing a custom `<style>` block — confirm overrides work and CSS variables resolve
- [x] 4.3 Toggle dark/light mode — confirm preview re-renders with correct theme
- [x] 4.4 Run `npm run build` and `npm run lint` to confirm no regressions
