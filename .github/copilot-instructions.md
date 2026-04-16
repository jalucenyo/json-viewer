# JSON Template Visualizer

Client-side React app: paste JSON + Handlebars template → live HTML preview. No backend.

Full product spec: [.ai/context/product_spec_init.md](../.ai/context/product_spec_init.md)

## Build & Run

```bash
npm install
npm run dev       # Vite dev server
npm run build     # TypeScript check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Stack

- React 19, TypeScript, Vite, Tailwind CSS v4
- UI: shadcn/ui (base-lyra style) + @base-ui/react + Phosphor icons
- Editors: monaco-editor
- Templating: handlebars
- Validation: zod
- Persistence: localStorage (keys: `json_input`, `template_input`, `theme`)

## Architecture

Feature-based structure organized by domain. Each feature owns its components, hooks, and logic.

```
src/
├── features/
│   ├── editor/            # Monaco editors (JSON + Handlebars template)
│   │   ├── components/    # JsonEditor, TemplateEditor, EditorPanel
│   │   └── hooks/         # useJsonValidation, useEditorState
│   ├── preview/           # Live HTML preview panel
│   │   ├── components/    # PreviewPanel, PreviewFrame
│   │   └── hooks/         # useRenderer, useDebounce
│   ├── layout/            # App shell, two-column layout, resizable panels
│   │   └── components/    # AppLayout, Sidebar, Toolbar
│   └── theme/             # Dark mode toggle, theme persistence
│       ├── components/    # ThemeToggle
│       └── hooks/         # useTheme
├── components/
│   └── ui/                # shadcn/ui primitives (do not edit manually)
├── lib/                   # Shared utilities (renderTemplate, cn, etc.)
├── App.tsx                # Root component — composes features
└── main.tsx               # Entry point
```

Two-column layout: left = JSON editor + template editor (Monaco), right = live HTML preview.

Data flow: `JSON + Template → parse → compile → render → preview` with 300ms debounce.

Each feature is self-contained. Shared UI primitives live in `components/ui/`, shared logic in `lib/`.

## Conventions

- **Small components**: One responsibility per component. Extract logic into custom hooks.
- **Strict TypeScript**: `noUnusedLocals`, `noUnusedParameters` are enforced. No `any`.
- **Imports**: Use `@/` path alias (maps to `src/`).
- **Styling**: Tailwind utility classes. Use `cn()` from `@/lib/utils` to merge classes. Theme via CSS variables in `src/index.css`.
- **shadcn components**: Add via `npx shadcn@latest add <component>`. Lives in `src/components/ui/`. Use CVA for variants.
- **Dark mode**: `.dark` class toggle, persisted in localStorage.
- **Icons**: Use `@phosphor-icons/react`.
- **Font**: JetBrains Mono (monospace).
- **No backend**: All state is client-side. Use localStorage for persistence.
