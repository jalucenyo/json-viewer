## Context

The preview panel renders Handlebars template output inside an `<iframe sandbox="" srcDoc={html}>`. Currently, `useTemplateRenderer` returns raw HTML fragments produced by Handlebars. The iframe displays them with browser defaults — Times New Roman, no spacing coherence, unstyled tables, etc.

The app uses Tailwind CSS v4 with OKLch CSS custom properties for theming (light/dark), JetBrains Mono as the primary font, and a `.dark` class toggle on the root element.

The iframe's `sandbox=""` attribute provides complete style isolation — styles inside cannot leak out and vice versa. This isolation is an asset: we can freely inject styles into the iframe without risk to the host app.

## Goals / Non-Goals

**Goals:**
- Provide a base stylesheet inside the iframe that covers standard HTML elements (headings, paragraphs, tables, lists, links, code blocks, blockquotes, horizontal rules, images).
- Propagate the app's CSS variable tokens into the iframe so base styles and user custom styles share the same visual language.
- Synchronize dark/light theme state from the app into the iframe document.
- Allow users to include `<style>` blocks in Handlebars templates for custom styling that can reference app CSS variables.

**Non-Goals:**
- Loading Tailwind CSS or any utility framework inside the iframe.
- Making the base stylesheet configurable or extensible by users via UI controls.
- Allowing JavaScript execution inside the iframe (`sandbox=""` stays restrictive).
- Supporting CSS-in-JS or scoped component styles inside the preview.

## Decisions

### 1. Full HTML document wrapper — not partial injection

**Decision**: Wrap the rendered Handlebars output in a complete `<!DOCTYPE html>...<body>` document before passing to `srcDoc`.

**Rationale**: A full document gives control over `<html class="dark">`, `<head><style>`, and `<body>` structure. The alternative — injecting a `<style>` tag into the raw fragment — is fragile and doesn't support theme class toggling on the root element.

### 2. Pure function `buildPreviewDocument(html, theme)` in a dedicated module

**Decision**: Create `src/features/preview/lib/preview-styles.ts` exporting a pure function that takes `(htmlContent: string, theme: "light" | "dark") => string`.

**Alternatives considered**:
- Inlining in `useTemplateRenderer`: Mixes rendering logic with presentation concerns.
- A React component that builds the document: Unnecessary since the iframe just needs a string.

**Rationale**: A pure function is testable, has no side effects, and keeps the renderer hook focused on Handlebars compilation.

### 3. Theme passed as parameter through the rendering pipeline

**Decision**: `useTemplateRenderer` receives a `theme` parameter. `App.tsx` reads the current theme and passes it down.

**Rationale**: The renderer already re-runs on input changes via debounced `useEffect`. Adding `theme` as a dependency is trivial and triggers a re-render when the user toggles dark mode. No extra synchronization mechanism needed.

### 4. CSS variables duplicated into iframe — not shared via inheritance

**Decision**: Copy the full set of CSS custom property definitions (both `:root` and `.dark` variants) into the iframe's `<style>` block.

**Alternatives considered**:
- CSS `@import` referencing the host: Blocked by iframe sandbox and CORS.
- Shared stylesheet URL: Requires a build step to extract tokens; over-engineered.

**Rationale**: The variable definitions are ~40 lines of CSS. Duplicating them is simple, reliable, and has zero runtime cost.

### 5. Font loaded via inline `@font-face` or system fallback

**Decision**: Reference JetBrains Mono via `@fontsource-variable` URL from the host's bundled assets, with `monospace` as fallback.

**Rationale**: The font is already installed and bundled by Vite. The iframe can reference it from the same origin. If loading fails, the monospace fallback maintains visual intent.

## Risks / Trade-offs

- **CSS variable drift**: If app tokens change in `index.css`, the preview stylesheet must be updated manually → Mitigation: The preview styles module is a single source of truth for the iframe; token values are defined once there.
- **User `<style>` specificity conflicts**: User-defined styles in templates might clash with base styles → Mitigation: Base styles target bare elements only (no classes), so user class-based selectors naturally win. Users can also override with element selectors since their `<style>` appears after the base styles.
- **No script execution in preview**: `sandbox=""` blocks `<script>` tags in templates → Accepted trade-off for security. Interactive previews are a non-goal.
