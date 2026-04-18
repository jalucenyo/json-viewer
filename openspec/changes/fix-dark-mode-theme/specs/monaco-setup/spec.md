## MODIFIED Requirements

### Requirement: Web workers via Vite native imports
Monaco web workers SHALL be configured using Vite's native `?worker` import syntax through `self.MonacoEnvironment.getWorker`.

#### Scenario: JSON worker is active
- **WHEN** the user edits JSON in the editor
- **THEN** the JSON language worker SHALL be loaded and provide validation and IntelliSense

#### Scenario: Editor base worker is active
- **WHEN** the Monaco Editor initializes
- **THEN** the base editor worker SHALL be loaded for core editor functionality

## ADDED Requirements

### Requirement: Editor theme synchronization
Each Monaco Editor instance SHALL accept a theme identifier and apply the corresponding Monaco theme. The theme SHALL be `"vs-dark"` when the app is in dark mode and `"light"` when in light mode.

#### Scenario: Editor switches to dark theme
- **WHEN** the app theme changes to dark
- **THEN** all Monaco Editor instances SHALL render with the `vs-dark` theme

#### Scenario: Editor switches to light theme
- **WHEN** the app theme changes to light
- **THEN** all Monaco Editor instances SHALL render with the `light` theme

#### Scenario: Editor theme matches app on initial load
- **WHEN** the application loads with a persisted dark theme
- **THEN** Monaco Editors SHALL initialize with the `vs-dark` theme
