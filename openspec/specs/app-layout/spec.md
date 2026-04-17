## ADDED Requirements

### Requirement: Two-column resizable layout
The application SHALL display a two-column layout using shadcn's `ResizablePanelGroup` with a draggable resize handle between the editor panel (left) and the preview panel (right). A collapsible template panel SHALL be always-mounted below the main content within a vertical `ResizablePanelGroup`, using the `collapsible` panel API instead of conditional DOM rendering.

#### Scenario: Default panel split
- **WHEN** the application loads
- **THEN** the left panel SHALL occupy approximately 50% of the available width and the right panel SHALL occupy the remaining space

#### Scenario: User resizes panels
- **WHEN** the user drags the resize handle
- **THEN** both panels SHALL resize proportionally following the drag position

#### Scenario: Template panel toggle does not crash
- **WHEN** the user resizes the template panel and then rapidly toggles the "Show/Hide templates" button multiple times
- **THEN** the application SHALL remain stable with no errors or white-screen crashes

#### Scenario: Template panel resize handle responds on first click
- **WHEN** the template panel is visible and the user clicks and drags the vertical resize handle
- **THEN** the resize handle SHALL respond immediately on the first interaction without requiring a second click

#### Scenario: Template panel collapse via toolbar
- **WHEN** the user clicks the "Hide templates" button in the toolbar
- **THEN** the template panel SHALL collapse to 0% height and the resize handle SHALL be visually hidden

#### Scenario: Template panel expand via toolbar
- **WHEN** the user clicks the "Show templates" button in the toolbar
- **THEN** the template panel SHALL expand to its previously stored height (or the default 30%)

#### Scenario: Template panel height persistence
- **WHEN** the user resizes the template panel and reloads the page
- **THEN** the template panel SHALL restore its last resized height from localStorage

### Requirement: Toolbar with app branding
The application SHALL display a top toolbar containing the application name "JSON Template Visualizer" and a theme toggle button.

#### Scenario: Toolbar is visible
- **WHEN** the application loads
- **THEN** a toolbar SHALL be visible at the top of the viewport with the app name on the left side

#### Scenario: Theme toggle button exists
- **WHEN** the application loads
- **THEN** a theme toggle button SHALL be visible in the toolbar (visual only, non-functional in this change)

### Requirement: Preview placeholder
The right panel SHALL display a centered placeholder message indicating that preview functionality is not yet available.

#### Scenario: Placeholder content
- **WHEN** the application loads
- **THEN** the right panel SHALL display the text "Preview will appear here" centered both vertically and horizontally

### Requirement: Full viewport layout
The application layout SHALL fill the entire browser viewport without scrollbars.

#### Scenario: No overflow
- **WHEN** the application loads
- **THEN** the layout (toolbar + panels) SHALL fill 100% of the viewport height and width with no page-level scrollbars
