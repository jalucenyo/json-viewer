## ADDED Requirements

### Requirement: Preview renders inside a styled HTML document
The preview iframe SHALL receive a complete HTML document (`<!DOCTYPE html>` through `</html>`) as its `srcDoc`, wrapping the Handlebars-rendered output inside a `<body>` element with a `<head>` containing base styles.

#### Scenario: Rendered output is wrapped in a full document
- **WHEN** the template renderer produces HTML output
- **THEN** the iframe `srcDoc` SHALL contain a valid HTML document with `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>` elements, with the rendered output placed inside `<body>`

### Requirement: Base styles cover standard HTML elements
The preview document SHALL include a base stylesheet that styles the following HTML elements: `h1`–`h6`, `p`, `table`, `thead`, `tbody`, `th`, `td`, `ul`, `ol`, `li`, `a`, `code`, `pre`, `blockquote`, `hr`, and `img`.

#### Scenario: Headings are visually distinct
- **WHEN** the rendered output contains `<h1>` through `<h6>` elements
- **THEN** each heading level SHALL have a distinct font size decreasing from `h1` to `h6`, font-weight of 600 or higher, and bottom margin

#### Scenario: Tables are styled with borders and padding
- **WHEN** the rendered output contains a `<table>` element
- **THEN** the table SHALL have collapsed borders using `var(--border)`, cells SHALL have padding, and header cells (`th`) SHALL have a distinct background color

#### Scenario: Lists have proper indentation and markers
- **WHEN** the rendered output contains `<ul>` or `<ol>` elements
- **THEN** list items SHALL have left indentation, disc markers for unordered lists, and decimal markers for ordered lists

#### Scenario: Links are visually identifiable
- **WHEN** the rendered output contains `<a>` elements
- **THEN** links SHALL be styled with an underline and use `var(--primary)` as color

#### Scenario: Code blocks have distinct styling
- **WHEN** the rendered output contains `<code>` or `<pre>` elements
- **THEN** they SHALL use a monospace font, have a background color of `var(--muted)`, and include padding

#### Scenario: Images are responsive
- **WHEN** the rendered output contains `<img>` elements
- **THEN** images SHALL have `max-width: 100%` and `height: auto`

### Requirement: Preview uses app CSS variables
The preview document SHALL include the full set of CSS custom properties defined by the app's theme system (background, foreground, primary, secondary, muted, accent, destructive, border, input, ring, card, popover) for both light and dark modes.

#### Scenario: CSS variables available in preview
- **WHEN** the preview document is rendered
- **THEN** the `<style>` block SHALL define all theme CSS variables on `:root` (light) and `.dark` (dark) selectors, matching the values used by the host application

### Requirement: Preview synchronizes with app theme
The preview document SHALL reflect the current app theme (light or dark) by setting the appropriate class on the `<html>` element.

#### Scenario: Dark mode active
- **WHEN** the app is in dark mode
- **THEN** the preview document `<html>` element SHALL have `class="dark"`

#### Scenario: Light mode active
- **WHEN** the app is in light mode
- **THEN** the preview document `<html>` element SHALL NOT have the `dark` class

#### Scenario: Theme toggle updates preview
- **WHEN** the user toggles the app theme
- **THEN** the preview document SHALL re-render with the updated theme class within the debounce period

### Requirement: Preview uses JetBrains Mono font
The preview document body SHALL use JetBrains Mono as its primary font, with `monospace` as fallback.

#### Scenario: Font applied to body
- **WHEN** the preview document is rendered
- **THEN** the `<body>` element SHALL have `font-family` set to `'JetBrains Mono Variable', monospace`

### Requirement: Users can include custom styles in templates
Users SHALL be able to include `<style>` blocks within their Handlebars templates, and those styles SHALL be applied in the preview after the base styles.

#### Scenario: Custom style block overrides base styles
- **WHEN** a Handlebars template contains a `<style>` block with a rule targeting `h1`
- **THEN** the custom rule SHALL override the base `h1` style in the preview

#### Scenario: Custom styles can use app CSS variables
- **WHEN** a Handlebars template `<style>` block references `var(--border)` or other app CSS variables
- **THEN** the variable SHALL resolve to the correct value based on the current theme
