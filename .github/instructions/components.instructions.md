---
description: "Use when creating or modifying React components, UI elements, or working with shadcn/ui primitives. Covers component patterns, styling, and accessibility."
applyTo: "src/components/**"
---
# Component Conventions

## shadcn/ui Components (`src/components/ui/`)

- Do NOT edit these files manually — they are scaffolded by `npx shadcn@latest add <name>`.
- Built on `@base-ui/react` primitives with `class-variance-authority` (CVA) for variants.
- See [button.tsx](../../src/components/ui/button.tsx) as the reference pattern.

## Custom Components (`src/components/`)

- One component per file, named export matching filename.
- Extract business logic into hooks under `src/hooks/`.
- Use `cn()` from `@/lib/utils` to merge Tailwind classes.
- Use `@phosphor-icons/react` for icons — never inline SVGs.
- Support dark mode via Tailwind `dark:` variants and CSS variables.

## Styling

- Tailwind utility classes only. No CSS modules, no inline styles.
- Theme colors via CSS variables (e.g., `bg-primary`, `text-muted-foreground`).
- Responsive: use Tailwind breakpoints (`sm:`, `md:`, `lg:`).
