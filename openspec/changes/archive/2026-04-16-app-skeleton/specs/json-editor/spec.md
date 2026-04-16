## ADDED Requirements

### Requirement: JSON editing with Monaco Editor
The system SHALL provide a Monaco Editor instance configured with `language: "json"` for editing JSON content.

#### Scenario: Editor renders on page load
- **WHEN** the application loads
- **THEN** a Monaco Editor instance SHALL be visible in the left panel with JSON language mode active

#### Scenario: Syntax highlighting for JSON
- **WHEN** the user types valid JSON in the editor
- **THEN** the editor SHALL display syntax highlighting (keys, values, strings, numbers, booleans, null)

#### Scenario: Inline JSON validation
- **WHEN** the user types invalid JSON in the editor
- **THEN** Monaco SHALL display inline error markers at the invalid locations

### Requirement: Default editor content
The editor SHALL initialize with an empty JSON object `{}` as default content when no prior content exists.

#### Scenario: Initial editor state
- **WHEN** the application loads for the first time
- **THEN** the editor SHALL contain `{}` as its value

### Requirement: Editor fills available space
The editor SHALL expand to fill the full height and width of its parent panel container.

#### Scenario: Editor dimensions match panel
- **WHEN** the editor panel is rendered
- **THEN** the Monaco Editor SHALL occupy 100% of the panel's width and height

#### Scenario: Editor resizes with panel
- **WHEN** the user resizes the panel via the drag handle
- **THEN** the Monaco Editor SHALL re-layout to fill the new panel dimensions
