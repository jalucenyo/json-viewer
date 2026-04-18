## Context

The app uses a `theme` state in `App.tsx` that toggles `.dark` on `<html>`. CSS variables in `index.css` drive the shell styling and a duplicated set in `preview-styles.ts` drives the preview iframe. Monaco editors currently ignore theme state entirely — both hardcode `theme="light"`.

The dark palette uses pure grayscale values (oklch chroma 0) and transparency-based borders, producing a flat, overly dark appearance.

## Goals / Non-Goals

**Goals:**
- Monaco editors switch themes in sync with the app (light ↔ vs-dark)
- Dark palette feels cohesive and comfortable, inspired by VS Code's Dark+ theme
- All surfaces (shell, editors, preview iframe) share a consistent visual language
- Theme toggle icon reflects the current state

**Non-Goals:**
- Custom Monaco color theme registration — using the built-in `vs-dark` is sufficient
- Independent theme control for the preview iframe (always matches app theme)
- Light mode palette changes — only dark mode is being adjusted

## Decisions

### 1. Use Monaco's built-in `vs-dark` theme (not a custom theme)

**Rationale:** `vs-dark` already matches the VS Code aesthetic we're targeting. A custom Monaco theme would require maintaining a full token color map and add complexity for marginal visual gain. The built-in theme pairs well with the adjusted shell palette.

**Alternative considered:** Registering a custom Monaco theme via `editor.defineTheme()` — rejected because it's maintenance overhead with little benefit for this use case.

### 2. Thread theme as a prop through component tree

**Rationale:** The theme state already lives in `App.tsx`. Both editors are direct children in the render tree. Passing `theme` as a prop (mapped to `"vs-dark" | "light"`) is the simplest approach — no context provider or global state needed.

**Alternative considered:** React context for theme — unnecessary indirection for 2 consumers that are already direct children.

### 3. VS Code-inspired dark palette with subtle blue tints

**Key changes to `.dark` CSS variables:**
- Add chroma `~0.005` at hue `~260` (blue) to backgrounds/surfaces — removes the pure-black feel
- Use solid border color (`oklch(0.370 ...)`) instead of `oklch(1 0 0 / 10%)` — visible panel separation
- Soften foreground from `0.985` to `~0.850` — less harsh contrast
- Maintain clear surface hierarchy: background < card/popover < secondary/muted

**Rationale:** VS Code's Dark+ uses `#1e1e1e` (editor), `#252526` (sidebar), `#474747` (borders) with slight warm tones. Translating to oklch with a small blue chroma reproduces this feel while staying within the existing shadcn variable system.

### 4. Keep preview-styles.ts in sync manually

**Rationale:** The preview iframe CSS variables are a string literal in `preview-styles.ts`. They must be manually synchronized with `index.css`. This is the existing pattern and changing it (e.g., extracting shared constants) would be over-engineering for two files.

## Risks / Trade-offs

- **Risk: Palette values may need visual tuning** → Mitigated by starting with known VS Code hex values converted to oklch. Can iterate after seeing the result.
- **Trade-off: Dual maintenance of CSS variables** (index.css + preview-styles.ts) → Accepted; extracting a shared source would add complexity for minimal benefit.
- **Risk: `vs-dark` Monaco theme may not perfectly match the shell palette** → Accepted; the slight difference is natural and expected (VS Code itself has this separation between editor and chrome).
