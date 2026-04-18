## MODIFIED Requirements

### Requirement: Toolbar with app branding
The application SHALL display a top toolbar containing the application name "JSON Template Visualizer" and a theme toggle button. The theme toggle button SHALL display a sun icon when dark mode is active and a moon icon when light mode is active.

#### Scenario: Toolbar is visible
- **WHEN** the application loads
- **THEN** a toolbar SHALL be visible at the top of the viewport with the app name on the left side

#### Scenario: Theme toggle button exists
- **WHEN** the application loads
- **THEN** a theme toggle button SHALL be visible in the toolbar

#### Scenario: Theme toggle shows moon icon in light mode
- **WHEN** the app is in light mode
- **THEN** the theme toggle button SHALL display a moon icon

#### Scenario: Theme toggle shows sun icon in dark mode
- **WHEN** the app is in dark mode
- **THEN** the theme toggle button SHALL display a sun icon

## ADDED Requirements

### Requirement: Theme flows to editor components
The `AppLayout` SHALL pass the current theme identifier to all editor panel children so that Monaco editors can apply the correct visual theme.

#### Scenario: Theme prop reaches editors
- **WHEN** the app theme is toggled
- **THEN** both the JSON editor and template editor components SHALL receive the updated theme value as a prop

#### Scenario: Editors render in dark mode on load
- **WHEN** the application loads with a persisted dark theme
- **THEN** the editor components SHALL receive `"dark"` as the theme prop on initial render
