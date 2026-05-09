# JSON Template Visualizer

<div align="center">

[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Follow-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-luceno/)

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

*Turn any JSON payload into a readable HTML view with live Handlebars templates.*

[**Live Demo ->**](https://jsonview.lucenyo.dev/)

</div>

![View Demo](https://raw.githubusercontent.com/jalucenyo/json-viewer/main/doc/snapshots/json_view.gif)

---

## Why This Exists

Reading large JSON payloads is slow, noisy, and hard to present.

This project helps you focus on relevant data by transforming raw JSON into custom HTML views with Handlebars, in real time, directly in the browser.

Use cases:
- API debugging and payload inspection
- Logs and events visualization
- Demo presentations with cleaner, audience-friendly output
- Fast JSON-to-view transformations without backend setup

## What You Get

- Monaco-based JSON editor
- Monaco-based Handlebars template editor
- Live HTML preview rendered in a sandboxed iframe
- Multiple templates (create, select, rename, delete)
- Handlebars syntax validation with Monaco markers
- JSON parse and template render error feedback
- Light and dark theme toggle
- localStorage persistence for JSON, templates, active template, and theme
- Fully client-side architecture (no backend required)

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/jalucenyo/json-viewer.git
cd json-viewer
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open the app at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check and production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## How To Use

1. Paste your JSON into the JSON editor.
2. Open the templates panel.
3. Create a new template.
4. Write Handlebars syntax that maps fields from your JSON.
5. See rendered output update live in the preview panel.

Tips:
- Create multiple templates for different audiences.
- Switch templates to compare different views of the same payload.
- Theme and content persist automatically in localStorage.

## Example

Input JSON:

```json
{
  "title": "Server Health",
  "items": [
    { "name": "api", "status": "ok" },
    { "name": "worker", "status": "degraded" }
  ]
}
```

Handlebars template:

```handlebars
<h1>{{title}}</h1>
<ul>
  {{#each items}}
    <li>{{name}}: {{status}}</li>
  {{/each}}
</ul>
```

Rendered result:

```html
<h1>Server Health</h1>
<ul>
  <li>api: ok</li>
  <li>worker: degraded</li>
</ul>
```

## How It Works

```text
JSON + Template -> parse -> compile -> render -> preview
```

Implementation details:
- JSON is parsed from editor input.
- Templates are compiled with `Handlebars.compile(...)`.
- Rendering is debounced by 300ms.
- Preview HTML is wrapped into a full document and injected into `iframe srcDoc`.
- Preview runs with `sandbox=""` for isolation.
- State persists in localStorage keys:
  - `json_input`
  - `templates`
  - `active_template_id`
  - `theme`

## Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | React 19 | UI layer |
| Language | TypeScript (strict) | Type-safe code |
| Build Tool | Vite | Fast development and builds |
| Styling | Tailwind CSS v4 | Utility-first styles |
| UI | shadcn/ui + Base UI | Accessible component primitives |
| Editors | Monaco Editor | JSON and template editing |
| Templating | Handlebars | Compile and render templates |
| Icons | Phosphor Icons | UI iconography |
| Font | JetBrains Mono | Editor typography |
| Persistence | localStorage | Save input, templates, and theme |

## Project Structure

```text
json-viewer/
|-- src/
|   |-- features/
|   |   |-- editor/            # Monaco JSON editor
|   |   |-- layout/            # App shell, toolbar, resizable panels
|   |   |-- preview/           # Live HTML preview
|   |   |-- template/          # Template CRUD, validation, and rendering
|   |-- components/ui/         # shadcn/ui primitives
|   |-- lib/                   # Shared utilities
|   |-- App.tsx
|   |-- main.tsx
|-- doc/snapshots/             # GIF and MP4 demos
|-- public/
|-- package.json
```

## Roadmap

Future features:
- Auto templates based on detected JSON formats
- Automatic JSON formatting
- JSON structure graphs
- Data analysis charts
- Template sharing

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Implement your changes
4. Run checks (`npm run lint` and `npm run build`)
5. Commit with a descriptive message
6. Push and open a Pull Request

## License

This project is under the MIT License. See [LICENSE](LICENSE) for details.

---

If this project is useful to you, consider giving it a star.
