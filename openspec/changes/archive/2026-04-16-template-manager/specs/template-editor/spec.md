## ADDED Requirements

### Requirement: Monaco editor with Handlebars language
The template editor SHALL use Monaco editor configured with `language="handlebars"` for syntax highlighting of Handlebars expressions within HTML.

#### Scenario: Handlebars syntax highlighting
- **WHEN** a template is loaded in the editor
- **THEN** Handlebars expressions (`{{}}`, `{{#each}}`, `{{#if}}`, etc.) SHALL be syntax-highlighted distinctly from HTML content

#### Scenario: Editor fills available space
- **WHEN** the template panel is visible
- **THEN** the Monaco editor SHALL fill 100% of its container's width and height and resize automatically when the panel is resized

### Requirement: Handlebars syntax validation
The system SHALL validate Handlebars syntax on every content change and display errors as Monaco editor markers.

#### Scenario: Valid template
- **WHEN** the user types a valid Handlebars template
- **THEN** no error markers SHALL be shown in the editor

#### Scenario: Unclosed block expression
- **WHEN** the user types `{{#each items}}` without a closing `{{/each}}`
- **THEN** an error marker SHALL appear at the relevant line indicating the unclosed block

#### Scenario: Malformed expression
- **WHEN** the user types a malformed expression (e.g., `{{foo.}}`)
- **THEN** an error marker SHALL appear at the relevant line with the parse error message

#### Scenario: Validation debounce
- **WHEN** the user is actively typing
- **THEN** validation SHALL be debounced (300ms) to avoid excessive `Handlebars.precompile()` calls

### Requirement: Editor content sync
The editor SHALL synchronize its content with the active template's stored content.

#### Scenario: Load active template content
- **WHEN** the user selects a template from the list
- **THEN** the editor SHALL display that template's content

#### Scenario: Save on edit
- **WHEN** the user modifies content in the editor
- **THEN** the active template's `content` and `updatedAt` fields SHALL be updated and persisted to localStorage
