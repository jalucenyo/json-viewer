## Why

The app has no visible connection to its open-source repository. Adding GitHub links increases discoverability, encourages community contributions, and gives users a direct path to report bugs or suggest improvements.

## What Changes

- Add a GitHub star badge (shields.io) to the Toolbar linking to the project repository in a new tab
- Add a "Report Issue" button to the Toolbar that opens a pre-filled GitHub issue form in a new tab
- Add a GitHub issue template (`.github/ISSUE_TEMPLATE/bug_report.md`) to support structured bug reports and feature requests

## Capabilities

### New Capabilities

- `github-toolbar-links`: GitHub star badge and Report Issue button rendered in the app Toolbar, with links to the repo and issue creation form

### Modified Capabilities

- `app-layout`: Toolbar gains two new interactive elements; layout and visual hierarchy of the header area changes slightly

## Impact

- `src/features/layout/components/Toolbar.tsx` — new button and badge added
- `.github/ISSUE_TEMPLATE/bug_report.md` — new file (no runtime impact)
- No new dependencies required (shields.io badge is an `<img>` tag)
- No state, no backend, no localStorage changes
