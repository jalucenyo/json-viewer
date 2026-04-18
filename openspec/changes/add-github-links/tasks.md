## 1. GitHub Issue Template

- [x] 1.1 Create `.github/ISSUE_TEMPLATE/bug_report.md` with YAML front matter (`name`, `about`, `title`, `labels: bug`) and sections: Describe the bug, Steps to reproduce, Expected behavior, Actual behavior, Environment (OS, browser, version)

## 2. Toolbar — Report Issue Button

- [x] 2.1 Import `Bug` icon from `@phosphor-icons/react` in `Toolbar.tsx`
- [x] 2.2 Add a Report Issue `<Button>` rendered as an `<a>` element with `href="https://github.com/jalucenyo/json-viewer/issues/new?template=bug_report.md"`, `target="_blank"`, `rel="noopener noreferrer"`, `size="xs"`, `variant="outline"`, and `Bug` icon

## 3. Toolbar — GitHub Star Badge

- [x] 3.1 Add a shields.io star badge `<img>` (`https://img.shields.io/github/stars/jalucenyo/json-viewer?style=social`, `alt="GitHub stars"`) wrapped in an `<a>` tag linking to `https://github.com/jalucenyo/json-viewer` with `target="_blank"` and `rel="noopener noreferrer"`
- [x] 3.2 Position the badge to the left of the Report Issue button in the toolbar actions group

## 4. Verification

- [x] 4.1 Confirm toolbar renders: star badge → Report Issue → Show/Hide Templates → theme toggle (left to right)
- [x] 4.2 Confirm all external links open in a new tab with `rel="noopener noreferrer"`
- [x] 4.3 Run `npm run build` and confirm no TypeScript errors
