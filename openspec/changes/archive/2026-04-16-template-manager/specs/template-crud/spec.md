## ADDED Requirements

### Requirement: Template data model
Each template SHALL be represented as an object with `id` (string, UUID), `name` (string), `content` (string), `createdAt` (number, timestamp), and `updatedAt` (number, timestamp).

#### Scenario: New template structure
- **WHEN** a new template is created
- **THEN** the template object SHALL contain all required fields with `id` generated via `crypto.randomUUID()`, `createdAt` and `updatedAt` set to the current timestamp, and `content` set to an empty string

### Requirement: Create template
The system SHALL allow users to create a new template with a default name.

#### Scenario: Create first template
- **WHEN** the user clicks the "New template" button and no templates exist
- **THEN** a new template SHALL be created with name "Untitled 1" and added to the template list

#### Scenario: Create subsequent template
- **WHEN** the user clicks the "New template" button and templates already exist
- **THEN** a new template SHALL be created with an incremented default name (e.g., "Untitled 2", "Untitled 3") avoiding name collisions

#### Scenario: New template becomes active
- **WHEN** a new template is created
- **THEN** the new template SHALL become the active template and its content SHALL load in the editor

### Requirement: Select template
The system SHALL allow users to select a template from the list to make it the active template.

#### Scenario: Select different template
- **WHEN** the user clicks on a template in the list
- **THEN** that template SHALL become the active template and its content SHALL load in the editor

#### Scenario: Active template visual indicator
- **WHEN** a template is active
- **THEN** it SHALL be visually distinguished from inactive templates in the list

### Requirement: Rename template
The system SHALL allow users to rename a template.

#### Scenario: Enter rename mode
- **WHEN** the user double-clicks the template name in the list
- **THEN** the name SHALL become an editable text input

#### Scenario: Confirm rename
- **WHEN** the user presses Enter or clicks outside the rename input
- **THEN** the template name SHALL be updated and `updatedAt` SHALL be set to the current timestamp

#### Scenario: Cancel rename
- **WHEN** the user presses Escape while renaming
- **THEN** the rename SHALL be cancelled and the original name restored

### Requirement: Delete template
The system SHALL allow users to delete a template with inline confirmation.

#### Scenario: Request delete
- **WHEN** the user clicks the delete button on a template
- **THEN** the list item SHALL show an inline confirmation with "confirm" and "cancel" actions

#### Scenario: Confirm delete
- **WHEN** the user confirms the inline delete action
- **THEN** the template SHALL be removed from the list and from localStorage

#### Scenario: Cancel delete
- **WHEN** the user cancels the inline delete action
- **THEN** the template SHALL remain in the list and the confirmation SHALL be dismissed

#### Scenario: Delete active template
- **WHEN** the user deletes the currently active template and other templates exist
- **THEN** the next template in the list SHALL become active (or the previous one if the deleted was last)

#### Scenario: Delete last template
- **WHEN** the user deletes the last remaining template
- **THEN** the template list SHALL be empty and the preview SHALL show the CTA to create a template

### Requirement: Persist templates in localStorage
The system SHALL persist all templates in localStorage under the key `templates` as a serialized `Template[]`.

#### Scenario: Save on change
- **WHEN** a template is created, renamed, edited, or deleted
- **THEN** the full template array SHALL be serialized and written to localStorage key `templates`

#### Scenario: Load on startup
- **WHEN** the application loads
- **THEN** the system SHALL read and deserialize templates from localStorage key `templates`

#### Scenario: No stored data
- **WHEN** the application loads and localStorage key `templates` does not exist or is invalid
- **THEN** the system SHALL initialize with an empty template array

### Requirement: Persist active template ID
The system SHALL persist the active template ID in localStorage under the key `active_template_id`.

#### Scenario: Restore active template
- **WHEN** the application loads and a valid `active_template_id` exists in localStorage
- **THEN** the system SHALL select that template as active

#### Scenario: Invalid active template ID
- **WHEN** the application loads and `active_template_id` references a non-existent template
- **THEN** the system SHALL select the first template in the list (or none if list is empty)
