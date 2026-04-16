## ADDED Requirements

### Requirement: Render active template with JSON data
The system SHALL compile the active template's Handlebars content and render it against the parsed JSON input, producing an HTML string displayed in the preview panel.

#### Scenario: Successful render
- **WHEN** the JSON input is valid JSON and the active template is valid Handlebars
- **THEN** the preview panel SHALL display the rendered HTML output

#### Scenario: JSON parse error
- **WHEN** the JSON input is not valid JSON
- **THEN** the preview panel SHALL display an error message indicating the JSON parse failure

#### Scenario: Template compile error
- **WHEN** the active template has Handlebars syntax errors
- **THEN** the preview panel SHALL display an error message indicating the template compilation failure

#### Scenario: Empty JSON
- **WHEN** the JSON editor contains empty or default `{}` content
- **THEN** the template SHALL render with an empty data context

### Requirement: Debounced rendering
The system SHALL debounce rendering by 300ms after any change to the JSON input or the active template content.

#### Scenario: Rapid typing in JSON editor
- **WHEN** the user types rapidly in the JSON editor
- **THEN** the preview SHALL update only after 300ms of inactivity

#### Scenario: Rapid typing in template editor
- **WHEN** the user types rapidly in the template editor
- **THEN** the preview SHALL update only after 300ms of inactivity

### Requirement: Sandboxed preview
The rendered HTML SHALL be displayed in a sandboxed iframe to prevent template output from affecting the application.

#### Scenario: Iframe rendering
- **WHEN** rendered HTML is produced
- **THEN** the HTML SHALL be loaded into an iframe via `srcdoc` attribute

#### Scenario: Script restriction
- **WHEN** the rendered HTML contains `<script>` tags
- **THEN** the iframe `sandbox` attribute SHALL prevent script execution

### Requirement: CTA when no templates exist
The preview panel SHALL display a call-to-action when no templates are available.

#### Scenario: No templates state
- **WHEN** the application has no templates (empty list)
- **THEN** the preview panel SHALL display a "Create template" button/CTA instead of the preview

#### Scenario: CTA opens template panel
- **WHEN** the user clicks the "Create template" CTA
- **THEN** the bottom template panel SHALL expand and a new template SHALL be created
