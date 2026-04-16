---
description: "Add a new shadcn/ui component to the project and wire it up"
agent: "agent"
argument-hint: "component name (e.g., dialog, tabs, dropdown-menu)"
---
Add the shadcn/ui component `$input` to this project:

1. Run `npx shadcn@latest add $input` to scaffold the component into `src/components/ui/`.
2. Verify the generated file follows the existing patterns in [button.tsx](../src/components/ui/button.tsx).
3. If the component needs custom wrappers or composition, create them in `src/components/` (not in `ui/`).

Follow all conventions from [copilot-instructions.md](./copilot-instructions.md).
