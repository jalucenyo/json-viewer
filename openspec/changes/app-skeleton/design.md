## Context

The project is a greenfield React 19 + Vite + Tailwind v4 app with shadcn/ui (base-lyra style). Currently only a placeholder `<Button>` exists. We need to build the first functional UI: the app shell with a JSON editor and a preview placeholder.

Dependencies already installed: `monaco-editor@0.55.1`, `handlebars`, `zod`, `@phosphor-icons/react`, JetBrains Mono font. The shadcn/ui `button` component is already scaffolded.

## Goals / Non-Goals

**Goals:**

- Establish the feature-based directory structure that all future changes will follow
- Deliver a working JSON editor with syntax highlighting and validation via Monaco
- Set up Monaco to load from npm (no CDN dependency) with Vite native workers
- Create a resizable two-column layout using shadcn's `resizable` component
- Add a minimal toolbar with app branding and a visual-only theme toggle button

**Non-Goals:**

- Dark mode functionality (separate change)
- localStorage persistence of editor content
- Template editor (Handlebars)
- Live HTML preview / rendering
- JSON validation indicators outside the editor
- Custom Monaco themes

## Decisions

### 1. Monaco integration: `@monaco-editor/react` + `loader.config({ monaco })`

**Choice:** Use `@monaco-editor/react` wrapper configured to load Monaco from npm.

**Alternatives considered:**
- *Vanilla `monaco-editor`*: More control but requires manual React lifecycle management (mount/unmount/resize). Not worth the boilerplate for our use case.
- *CDN loading (default behavior)*: Simpler setup but introduces runtime dependency on `cdn.jsdelivr.net`. Rejected for security (no SRI, supply chain risk).

**Rationale:** The wrapper handles editor lifecycle, the `loader.config({ monaco })` eliminates CDN dependency. Best balance of convenience and security.

### 2. Workers: Vite native `?worker` imports (no plugin)

**Choice:** Configure `self.MonacoEnvironment.getWorker` using Vite's built-in `?worker` import syntax.

**Alternatives considered:**
- *`vite-plugin-monaco-editor`*: Abandoned (last release July 2022), incompatible with Vite 8, hooks into build pipeline. Rejected for security and maintenance risk.

**Rationale:** Officially documented by Microsoft in `monaco-editor/docs/integrate-esm.md`. Zero extra dependencies. Only json + editor base workers needed for this change.

### 3. Resizable panels: shadcn `resizable` component

**Choice:** Use `npx shadcn@latest add resizable` which wraps `react-resizable-panels` (by Brian Vaughn).

**Alternatives considered:**
- *CSS `resize` property*: Limited control, no programmatic API, poor UX.
- *Custom drag handler*: Unnecessary complexity for a solved problem.

**Rationale:** Consistent with project convention of using shadcn for all UI primitives. `react-resizable-panels` is well-maintained (ex-React core team author).

### 4. Monaco setup file: `src/lib/monaco-setup.ts`

**Choice:** Centralize worker configuration and `loader.config` in a single setup file, imported in `main.tsx` before app render.

**Rationale:** Keeps Monaco bootstrapping isolated from components. Easy to extend when adding more language workers later (HTML for Handlebars template editor).

### 5. Feature structure from day one

**Choice:** Create `features/editor/`, `features/preview/`, `features/layout/` directories immediately.

**Rationale:** Matches the architecture defined in project instructions. Starting flat and refactoring later would create unnecessary churn.

## Risks / Trade-offs

- **[Monaco bundle size]** → Monaco adds ~2-3MB to the bundle. Acceptable for MVP; can tree-shake unused languages later.
- **[`@monaco-editor/react` single maintainer]** → Package has 4.3M weekly downloads and 100/100 Socket security score. Low risk, but monitor for abandonment.
- **[Theme toggle is visual-only]** → Button exists but does nothing. Could confuse users. Mitigated by implementing dark mode in the next change.
- **[Workers only for JSON + base]** → When adding the template editor later, we'll need to add the HTML worker. The setup file is designed for easy extension.
