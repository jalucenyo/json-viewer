# JSON Visualizer

<div align="center">

[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Follow-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-luceno/)

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

*Paste JSON + write a Handlebars template and get a live HTML preview instantly.*

[**Live Demo ->**](https://jsonview.lucenyo.dev/)

</div>

---

<!-- TODO: Add animated GIF demo here -->
<!-- ![JSON Template Visualizer Demo](docs/demo.gif) -->

---

## Description

JSON Template Visualizer is a client-side web tool that transforms raw JSON data into meaningful, human-readable HTML using Handlebars templates.

Paste your JSON, write a template, and see the result rendered live with zero backend setup.

Use cases:
- API debugging
- Logs and events visualization
- Demo presentations with clean formatted data
- Quick data transformation from JSON to custom views

## Motivation

I was tired of looking at huge JSON payloads where the important information was hard to find.

I was also tired of boring demos where I had to show endless raw JSON that nobody really understood.

So I built this tool to focus only on what matters. With templates, I can shape the output to show exactly what I want to communicate.

No more boring demos. Now I can present the important data directly, clearly, and with context.

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

## How It Works

```
JSON + Template -> parse -> compile -> render -> preview
```

1. Paste your JSON in the JSON editor.
2. Open the templates panel.
3. Create a template.
4. Write Handlebars syntax to map fields from your JSON.
5. See the HTML preview update in real time.

Example template:

```handlebars
<h1>{{title}}</h1>
<ul>
  {{#each items}}
    <li>{{this.name}} - {{this.value}}</li>
  {{/each}}
</ul>
```

Tips:
- Create multiple templates for different audiences or views.
- Switch templates to compare presentations of the same JSON.
- Theme and content are persisted automatically in localStorage.

## Project Structure

```text
json-viewer/
|-- src/
|   |-- features/
|   |   |-- editor/            # Monaco JSON editor
|   |   |-- layout/            # App shell, toolbar, resizable panels
|   |   |-- preview/           # Live HTML preview
|   |   |-- template/          # Template CRUD and rendering
|   |-- components/ui/         # shadcn/ui primitives
|   |-- lib/                   # Shared utilities
|   |-- App.tsx
|   |-- main.tsx
|-- templates/                 # Example templates
|-- public/
|-- package.json
```

## Roadmap

Current capabilities:
- Monaco-based JSON editing
- Handlebars template editor
- Live HTML preview
- Template management (create, rename, delete)
- Dark mode persistence
- Resizable layout

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

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vite.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Handlebars Documentation](https://handlebarsjs.com/guide/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)

## License

This project is under the MIT License. See [LICENSE](LICENSE) for details.

---

If this project is useful to you, consider giving it a star.
