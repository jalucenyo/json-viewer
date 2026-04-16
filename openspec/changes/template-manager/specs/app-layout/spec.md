## MODIFIED Requirements

### Requirement: Two-column resizable layout
The application SHALL display a two-column layout using shadcn's `ResizablePanelGroup` with a draggable resize handle between the editor panel (left) and the preview panel (right). This horizontal panel group SHALL be nested inside a vertical `ResizablePanelGroup` that splits the viewport into main content (top) and a collapsible template management panel (bottom).

#### Scenario: Default panel split
- **WHEN** the application loads
- **THEN** the left panel SHALL occupy approximately 50% of the available width and the right panel SHALL occupy the remaining space

#### Scenario: User resizes panels
- **WHEN** the user drags the resize handle
- **THEN** both panels SHALL resize proportionally following the drag position

#### Scenario: Vertical layout structure
- **WHEN** the application loads
- **THEN** the layout SHALL consist of a vertical panel group with the main content on top and a collapsible bottom panel for template management

### Requirement: Preview placeholder
The right panel SHALL display the rendered HTML output of the active template, or a CTA when no templates exist.

#### Scenario: No templates exist
- **WHEN** the application loads and no templates are stored
- **THEN** the right panel SHALL display a "Create template" CTA button

#### Scenario: Active template exists
- **WHEN** a template is active and JSON input is provided
- **THEN** the right panel SHALL display the rendered HTML output in a sandboxed iframe
