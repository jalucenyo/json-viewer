## MODIFIED Requirements

### Requirement: Preview uses app CSS variables
The preview document SHALL include the full set of CSS custom properties defined by the app's theme system (background, foreground, primary, secondary, muted, accent, destructive, border, input, ring, card, popover) for both light and dark modes. The dark mode variable values SHALL match the VS Code-inspired palette used by the host application, including subtle blue tints, solid borders, and softer foreground contrast.

#### Scenario: CSS variables available in preview
- **WHEN** the preview document is rendered
- **THEN** the `<style>` block SHALL define all theme CSS variables on `:root` (light) and `.dark` (dark) selectors, matching the values used by the host application

#### Scenario: Dark mode variables use VS Code-inspired values
- **WHEN** the preview document is rendered in dark mode
- **THEN** the CSS variables SHALL use the same adjusted dark palette as the app shell (subtle blue tint, solid borders, softened foreground)
