const CSS_VARIABLES_LIGHT = `
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
  }
`

const CSS_VARIABLES_DARK = `
  .dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
  }
`

const BASE_ELEMENT_STYLES = `
  body {
    font-family: 'JetBrains Mono Variable', monospace;
    color: var(--foreground);
    background: var(--background);
    margin: 0;
    padding: 1rem;
    line-height: 1.6;
    font-size: 0.875rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    color: var(--foreground);
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  h4 { font-size: 1.125rem; }
  h5 { font-size: 1rem; }
  h6 { font-size: 0.875rem; }

  p {
    margin-top: 0;
    margin-bottom: 1em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
  }

  th, td {
    border: 1px solid var(--border);
    padding: 0.5rem 0.75rem;
    text-align: left;
  }

  thead th {
    background: var(--muted);
    font-weight: 600;
  }

  ul, ol {
    padding-left: 1.5em;
    margin-top: 0;
    margin-bottom: 1em;
  }

  ul { list-style-type: disc; }
  ol { list-style-type: decimal; }

  li {
    margin-bottom: 0.25em;
  }

  a {
    color: var(--primary);
    text-decoration: underline;
  }

  code {
    font-family: 'JetBrains Mono Variable', monospace;
    background: var(--muted);
    padding: 0.15em 0.35em;
    font-size: 0.85em;
    border-radius: 0.25rem;
  }

  pre {
    background: var(--muted);
    padding: 0.75rem 1rem;
    overflow-x: auto;
    margin-bottom: 1em;
    border-radius: 0.25rem;
  }

  pre code {
    background: none;
    padding: 0;
    font-size: inherit;
  }

  blockquote {
    border-left: 3px solid var(--border);
    margin: 0 0 1em 0;
    padding: 0.5em 1em;
    color: var(--muted-foreground);
  }

  hr {
    border: none;
    border-top: 1px solid var(--border);
    margin: 1.5em 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`

export function buildPreviewDocument(
  html: string,
  theme: "light" | "dark"
): string {
  const htmlClass = theme === "dark" ? ' class="dark"' : ""

  return `<!DOCTYPE html>
<html${htmlClass}>
<head>
  <meta charset="utf-8" />
  <style>
    ${CSS_VARIABLES_LIGHT}
    ${CSS_VARIABLES_DARK}
    ${BASE_ELEMENT_STYLES}
  </style>
</head>
<body>${html}</body>
</html>`
}
