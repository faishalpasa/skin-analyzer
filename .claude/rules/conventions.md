# Conventions

## Page Convention

- Each page lives in `src/pages/<page-name>/index.tsx`
- Page-specific context: `_context.tsx` (underscore prefix = internal)
- Page-specific components: `_components/` folder — files use kebab-case (e.g. `capture-button.tsx`)
- Page-specific hooks: inside the page folder

```
src/pages/camera/
├── index.tsx         # Page entry — renders layout + context provider (if used)
├── _context.tsx      # PageContextProvider with camera/detection state
└── _components/      # Components only used by this page
```

Do not move page-specific logic to global folders unless it becomes reusable.

---

## Components

- Functional components only, arrow function syntax
- **Named exports** for all components
- TypeScript `interface` or `type` for all props, named `<ComponentName>Props`
- No `any` types

---

## Hooks

- All custom hooks start with `use`
- Reusable hooks → `src/hooks/`
- Page-specific hooks → inside the page folder

---

## Styling

- **Tailwind CSS** for all styling
- No inline styles unless unavoidable (e.g. dynamic `backgroundColor` from a hex value)
- No global CSS except resets/base in `index.css`

---

## Utilities

- Pure functions only in `src/utils/`
- No side effects in utility functions
- `analyzeSkin(canvas, detection)` — main entry point for pixel-level skin analysis
