## ADDED Requirements

### Requirement: Local Monaco loading
Monaco Editor SHALL be loaded from the local `monaco-editor` npm package via `loader.config({ monaco })`. The editor SHALL NOT load any resources from external CDNs at runtime.

#### Scenario: No external network requests for Monaco
- **WHEN** the application loads the editor
- **THEN** all Monaco Editor resources SHALL be served from the application bundle (no requests to `cdn.jsdelivr.net` or any other CDN)

### Requirement: Web workers via Vite native imports
Monaco web workers SHALL be configured using Vite's native `?worker` import syntax through `self.MonacoEnvironment.getWorker`.

#### Scenario: JSON worker is active
- **WHEN** the user edits JSON in the editor
- **THEN** the JSON language worker SHALL be loaded and provide validation and IntelliSense

#### Scenario: Editor base worker is active
- **WHEN** the Monaco Editor initializes
- **THEN** the base editor worker SHALL be loaded for core editor functionality

### Requirement: Setup isolation
The Monaco setup (worker configuration and loader config) SHALL be defined in a dedicated file (`src/lib/monaco-setup.ts`) and imported before the React app renders.

#### Scenario: Setup runs before app mount
- **WHEN** `main.tsx` executes
- **THEN** `monaco-setup.ts` SHALL be imported and executed before `createRoot().render()`
