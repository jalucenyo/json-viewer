# 🧩 JSON Template Visualizer - MVP

## 🎯 Objective

Build a web application that allows:

- Pasting JSON
- Writing a Handlebars template
- Rendering the result as HTML in real time

Use cases:
- API debugging
- Logs/events visualization
- Quick data transformation

---

## 🧱 Tech Stack

- Frontend:
  - React
  - TypeScript
  - Vite
  - shadcn/ui
  - TailwindCSS

- Key libraries:
  - handlebars
  - monaco-editor
  - zod

- Persistence:
  - localStorage

- No backend

---

## 🧑‍💻 General Architecture

### Main layout

Interface split into two columns:

-----------------------------------------
| JSON + Template | HTML Preview        |
| (Monaco Editor) | (Live render)       |
-----------------------------------------

- Left column:
  - JSON Editor
  - Template Editor (Handlebars)

- Right column:
  - Live HTML preview

---

## 🧩 Main Components

### 1. AppLayout
Responsible for splitting the screen into two columns.

### 2. EditorPanel
Contains:
- JSON Editor
- Template Editor

### 3. JsonEditor
- Monaco Editor (JSON)
- Syntax highlighting
- Auto-formatting
- JSON validation

### 4. TemplateEditor
- Monaco Editor (HTML / Handlebars)

### 5. PreviewPanel
Renders HTML using dangerouslySetInnerHTML

### 6. useRenderer Hook
Responsible for:
- Parsing JSON
- Compiling template
- Rendering HTML

---

## 🔄 Data Flow

JSON + Template → Parse → Compile → Render → Preview

---

## 🧠 Rendering Logic

- Real-time rendering
- Debounce: 300ms

---

## 🛡️ Security

- No JS execution in templates
- HTML output is allowed
- XSS risk accepted for MVP

---

## 💾 Persistence (localStorage)

Keys:
- json_input
- template_input
- theme

---

## 🎨 UI / UX

- VSCode-inspired design
- Dark mode
- Use of shadcn components

---

## 🌙 Dark Mode

- Manual toggle
- Persisted in localStorage

---

## ⚙️ Features

Includes:
- JSON editor
- Template editor
- Real-time rendering
- JSON validation
- Local persistence
- Dark mode

---

## 🧪 Validation with Zod

```ts
const jsonSchema = z.string().refine((val) => {
  try {
    JSON.parse(val);
    return true;
  } catch {
    return false;
  }
}, "Invalid JSON");
```

---

## 📦 Folder Structure

src/
  components/
  hooks/
  lib/
  styles/
  App.tsx
  main.tsx

---

## 🚀 Render Engine

```ts
import Handlebars from "handlebars";

export function renderTemplate(json: string, template: string): string {
  try {
    const data = JSON.parse(json);
    const compiled = Handlebars.compile(template);
    return compiled(data);
  } catch (e) {
    return `<pre style="color:red;">${e}</pre>`;
  }
}
```

---

## 📈 Future Improvements

- JSON tree viewer
- Template autocomplete
- Export HTML
- Shareable state via URL

---

## 🎯 Success Criteria

- Render time < 100ms
- Smooth UX
- Reliable persistence

---

## 🧠 Notes for Copilot

- Prefer small, reusable components
- Use hooks for logic
- Strict TypeScript typing
