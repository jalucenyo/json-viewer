## MODIFIED Requirements

### Requirement: Toolbar with app branding
The application SHALL display a top toolbar containing the application name "JSON Template Visualizer", a GitHub star badge, a Report Issue button, a template panel toggle button, and a theme toggle button.

#### Scenario: Toolbar is visible
- **WHEN** the application loads
- **THEN** a toolbar SHALL be visible at the top of the viewport with the app name on the left side

#### Scenario: Theme toggle button exists
- **WHEN** the application loads
- **THEN** a theme toggle button SHALL be visible in the toolbar

#### Scenario: Toolbar action order
- **WHEN** the application loads
- **THEN** the toolbar actions SHALL appear left-to-right in this order: GitHub star badge, Report Issue button, Show/Hide Templates button, theme toggle button
