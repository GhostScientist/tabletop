# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Tabletop

A lightweight, local-first, joyfully minimalist database viewer and SQL playground for the browser.

## 🧠 Philosophy

- **Local-first, privacy-honoring**: No backend, no accounts, no tracking
- **Performance and beauty**: Instant feedback, clean visuals, buttery fast UX
- **Serious power, playful vibes**: It should feel like a synth deck for your schema, not a filing cabinet

## 🛠️ Features

- Drag-and-drop SQLite file loading
- Table list and data exploration
- SQL query editor with results display
- Black and white minimalist UI design
- Fully responsive layout
- Dark mode support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tabletop.git
cd tabletop

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Usage

1. Launch the app in your browser
2. Drag and drop a `.sqlite` file into the designated area
3. Browse tables in the sidebar
4. View table data in the grid
5. Run custom SQL queries in the editor

## 🔧 Tech Stack

- React + TypeScript
- AG Grid Community for data tables
- TailwindCSS for styling
- sql.js for in-browser SQLite engine
- Vite for bundling

## 🚧 Future Plans

- Visual ERD schema browser
- Tabbed SQL editors with saved query history
- Data visualization (charts from query results)
- Workspace export/import
- Custom themes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
