## Why

The preview panel renders Handlebars templates into an iframe, but the output is plain unstyled HTML. Elements like headings, tables, lists, and paragraphs appear with browser defaults — no font, no colors, no spacing coherence with the app. Users need a preview that visually matches the application's look and feel while remaining fully isolated so injected styles cannot break the host app.

## What Changes

- Inject a complete HTML document wrapper into the iframe `srcDoc` with base CSS styles covering standard HTML elements (`h1`–`h6`, `p`, `table`, `th/td`, `ul/ol`, `a`, `code/pre`, `blockquote`, `hr`, `img`).
- Propagate the app's CSS custom properties (color tokens, border, radius) into the iframe document so base styles and user-defined styles can reference them.
- Synchronize dark/light theme between the app and the iframe preview.
- Load the JetBrains Mono font inside the iframe for visual consistency.
- Allow users to include `<style>` blocks in their Handlebars templates for custom CSS that can leverage the app's CSS variables.

## Capabilities

### New Capabilities
- `preview-styles`: Base stylesheet and HTML document wrapper for the preview iframe, including theme synchronization and CSS variable propagation.

### Modified Capabilities
_None — the preview iframe structure and template rendering pipeline remain the same; only the content passed to `srcDoc` changes._

## Impact

- **Code**: `useTemplateRenderer` hook gains a `theme` parameter and wraps rendered HTML in a full document. New `preview-styles` module under `src/features/preview/lib/`.
- **Components**: `PreviewPanel` passes theme context; `App.tsx` provides theme to the renderer.
- **Dependencies**: No new dependencies. JetBrains Mono is already installed via `@fontsource-variable/jetbrains-mono`.
- **Breaking**: None. Existing templates render identically — they just look styled now.
