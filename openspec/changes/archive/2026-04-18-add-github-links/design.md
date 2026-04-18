## Context

The `Toolbar` component currently has a title, a template panel toggle button, and a theme toggle button. There is no link to the project's GitHub repository. The change adds two new elements: a GitHub star badge and a Report Issue button.

The repo URL is: `https://github.com/jalucenyo/json-viewer`

## Goals / Non-Goals

**Goals:**
- Add a shields.io star badge that links to the GitHub repo (opens in new tab)
- Add a "Report Issue" button that opens the GitHub issue creation form (opens in new tab) with a pre-filled bug report template
- Add a GitHub issue template file at `.github/ISSUE_TEMPLATE/bug_report.md`

**Non-Goals:**
- Fetching live star count via GitHub API
- Authentication or GitHub OAuth
- Any other GitHub integration (pull requests, notifications, etc.)
- Changes to layout beyond the Toolbar header

## Decisions

### Star Badge: shields.io `<img>` tag
Use a shields.io badge image (`https://img.shields.io/github/stars/jalucenyo/json-viewer?style=social`) wrapped in an `<a>` tag with `target="_blank" rel="noopener noreferrer"`. No JavaScript, no fetch, no state.

Alternatives considered:
- **GitHub API fetch**: rejected — adds async complexity and rate-limit risk for cosmetic data
- **Static number hardcoded**: rejected — becomes stale immediately

### Report Issue button: static link with URL params
A `<Button>` component (existing shadcn primitive, `size="xs" variant="outline"`) rendered as an `<a>` with `href` pointing to:
```
https://github.com/jalucenyo/json-viewer/issues/new?template=bug_report.md
```

Uses Phosphor `Bug` icon to signal intent visually.

### Issue template: standard GitHub markdown template
Create `.github/ISSUE_TEMPLATE/bug_report.md` with YAML front matter (`name`, `about`, `title`, `labels`). Template covers: describe the bug, steps to reproduce, expected vs actual behavior, environment. Same structure as the GitHub default template but in English.

### Toolbar layout order (left to right in the actions group)
```
[⭐ shields badge]  [🐛 Report Issue]  [Show/Hide Templates]  [🌙 Theme]
```

The badge lives outside the `gap-2` button group as a standalone `<a>` element to avoid mismatched heights. The Report Issue button lives inside the button group alongside the existing buttons.

## Risks / Trade-offs

- **shields.io availability** → The badge image is loaded from an external CDN. If shields.io is down, the badge area will be empty/broken. Mitigation: use `alt="GitHub stars"` on the `<img>` for graceful fallback text.
- **Visual inconsistency** → The shields.io badge uses its own visual style (pill shape, GitHub branding). It won't perfectly match the shadcn button aesthetic. This is accepted per the product decision made in explore mode.
- **No `noopener` omission risk** → All external links use `rel="noopener noreferrer"` to prevent tab-napping (OWASP A05).
