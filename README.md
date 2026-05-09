# JSON Template Visualizer

<div align="center">

[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Follow-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-luceno/)

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

*Stop showing raw JSON in demos. Paste data, write a Handlebars template, and get a readable HTML preview instantly.*

[**Live Demo ->**](https://jsonview.lucenyo.dev/)

</div>

![View Demo](https://raw.githubusercontent.com/jalucenyo/json-viewer/main/doc/snapshots/json_view.gif)

---

## 💡 Why this exists

There is always that awkward demo moment where someone says: "and here is the API response"... then 2,000 lines of JSON fill the screen.

This project solves that by separating three things:
- **Data** (your JSON)
- **Template** (Handlebars)
- **Preview** (live HTML)

So instead of showing raw payloads, you show meaningful, readable views.

## ✨ What you get

- Monaco-based JSON editor
- Monaco-based Handlebars template editor
- Live HTML preview in a sandboxed iframe
- Multiple templates (create, select, rename, delete)
- Handlebars validation markers in editor
- Clear JSON parse and template render errors
- Light/dark theme toggle
- localStorage persistence for JSON, templates, and theme
- Fully client-side (no backend required)

## 📝 Read the full story

I wrote a blog post about why I built this, the real problem it solves, and what I learned while using it in demos and debugging sessions.

👉 [Read the article: JSON Viewer, deja de mostrar JSON crudo en tus demos](https://www.lucenyo.dev/blog/json-viewer-visualizador-interactivo)

## ⚡ Quickstart

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

4. Open `http://localhost:5173`

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 🧪 How to use it

1. Paste your JSON into the left editor.
2. Open templates panel.
3. Create a template.
4. Write Handlebars syntax.
5. Watch preview update live.

Tips:
- Create different templates for different audiences.
- Switch templates to compare views of the same data.
- Your content is persisted automatically in localStorage.

## 🧩 Example

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

## ⚙️ How it works

```text
JSON + Template -> parse -> compile -> render -> preview
```

Implementation details:
- JSON is parsed from editor input.
- Templates are compiled with `Handlebars.compile(...)`.
- Rendering is debounced by 300ms.
- Preview is injected via `iframe srcDoc` with `sandbox=""`.
- State persists in localStorage keys:
  - `json_input`
  - `templates`
  - `active_template_id`
  - `theme`

## 🧱 Tech stack

| Component | Technology |
|-----------|------------|
| Framework | React 19 |
| Language | TypeScript (strict) |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui + Base UI |
| Editors | Monaco Editor |
| Templating | Handlebars |
| Icons | Phosphor Icons |
| Persistence | localStorage |

## 🗺️ Roadmap

- Auto templates based on detected JSON formats
- Automatic JSON formatting
- JSON structure graphs
- Data analysis charts
- Template sharing

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Implement your changes
4. Run checks (`npm run lint` and `npm run build`)
5. Commit with a descriptive message
6. Push and open a Pull Request

## 📄 License

This project is under the MIT License. See [LICENSE](LICENSE) for details.

---

If this project is useful to you, consider giving it a star.
