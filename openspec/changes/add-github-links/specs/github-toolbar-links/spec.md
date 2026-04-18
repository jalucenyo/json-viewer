## ADDED Requirements

### Requirement: GitHub star badge in toolbar
The toolbar SHALL display a shields.io GitHub star badge as a clickable link that opens the project repository in a new browser tab.

#### Scenario: Badge is visible on load
- **WHEN** the application loads
- **THEN** a shields.io star badge image SHALL be visible in the toolbar to the left of the Report Issue button

#### Scenario: Badge links to repository
- **WHEN** the user clicks the GitHub star badge
- **THEN** the browser SHALL open `https://github.com/jalucenyo/json-viewer` in a new tab

#### Scenario: Badge has accessible alt text
- **WHEN** the shields.io image fails to load
- **THEN** the `alt` attribute SHALL render fallback text "GitHub stars"

### Requirement: Report Issue button in toolbar
The toolbar SHALL display a "Report Issue" button that opens the GitHub issue creation form with a pre-filled bug report template in a new browser tab.

#### Scenario: Button is visible on load
- **WHEN** the application loads
- **THEN** a "Report Issue" button with a bug icon SHALL be visible in the toolbar, to the left of the "Show/Hide templates" button

#### Scenario: Button opens issue form
- **WHEN** the user clicks the "Report Issue" button
- **THEN** the browser SHALL open `https://github.com/jalucenyo/json-viewer/issues/new?template=bug_report.md` in a new tab

### Requirement: GitHub issue template
The repository SHALL include a GitHub issue template at `.github/ISSUE_TEMPLATE/bug_report.md` that guides users through submitting a well-structured bug report or feature request.

#### Scenario: Template is available on GitHub
- **WHEN** a user clicks "New Issue" on the GitHub repository
- **THEN** the bug report template SHALL appear as an option with fields for description, reproduction steps, expected vs actual behavior, and environment details
