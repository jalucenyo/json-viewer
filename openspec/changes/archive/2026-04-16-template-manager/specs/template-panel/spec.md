## ADDED Requirements

### Requirement: Collapsible bottom panel
The application SHALL display a collapsible bottom panel below the main content area for template management.

#### Scenario: Panel starts collapsed
- **WHEN** the application loads
- **THEN** the bottom panel SHALL be collapsed (not visible)

#### Scenario: Expand panel
- **WHEN** the user triggers the panel expand action (via toolbar button or CTA)
- **THEN** the bottom panel SHALL expand to its stored height (default 30% of viewport)

#### Scenario: Collapse panel
- **WHEN** the user triggers the panel collapse action
- **THEN** the bottom panel SHALL collapse fully, giving all vertical space to the main content

#### Scenario: Resize panel
- **WHEN** the user drags the vertical resize handle between main content and bottom panel
- **THEN** the bottom panel height SHALL adjust to follow the drag position

### Requirement: Persist panel height
The system SHALL persist the bottom panel height in localStorage under the key `template_panel_height`.

#### Scenario: Save height on resize
- **WHEN** the user resizes the bottom panel by dragging
- **THEN** the panel height (as percentage) SHALL be saved to localStorage key `template_panel_height`

#### Scenario: Restore height on expand
- **WHEN** the panel is expanded and a stored height exists in localStorage
- **THEN** the panel SHALL expand to the stored height

#### Scenario: Default height
- **WHEN** no stored height exists
- **THEN** the panel SHALL use 30% as the default height

### Requirement: Template Manager layout
The bottom panel SHALL display a two-column layout: a template list sidebar on the left and the template editor on the right.

#### Scenario: Sidebar and editor visible
- **WHEN** the bottom panel is expanded
- **THEN** a template list sidebar SHALL be visible on the left and the Monaco editor SHALL be visible on the right

#### Scenario: Sidebar shows all templates
- **WHEN** templates exist
- **THEN** the sidebar SHALL list all templates by name with the active template visually highlighted
