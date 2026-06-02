# Architecture

## Page State: `App.tsx`

`App.tsx` holds `page` (the active screen) and `result` (the last skin analysis result). These are the only two pieces of cross-component state in the app.

| State    | Type                         | Description                                        |
| -------- | ---------------------------- | -------------------------------------------------- |
| `page`   | `PageName`                   | Active screen: `landing \| camera \| result`       |
| `result` | `SkinAnalysisResult \| null` | Last analysis result, passed to the result page    |

There is no global context provider — the app is small enough that lifting state to `App.tsx` is sufficient. If cross-component state grows beyond these two values, introduce an `app-context.tsx`.

## Page-Level Context: `_context.tsx`

Pages with non-trivial state or side effects should have a `_context.tsx` that:
- Holds all page-scoped state, side effects, and derived values
- Exports a `PageContext` via `React.createContext` and a `usePageContext` hook
- Wraps the page root in `index.tsx` as the context provider

Do not put page-scoped logic directly in `index.tsx`.

---

## Analysis Layer

All skin analysis logic lives in `src/utils/skinAnalyzer.ts`. It operates entirely on browser APIs — no network calls.

```typescript
import { analyzeSkin } from '@/utils/skinAnalyzer'

const result = analyzeSkin(canvas, detection) // returns SkinAnalysisResult | null
```

Face detection uses `face-api.js` with the `TinyFaceDetector` model loaded from `/public/models/`.

---

## Routing

There is no router. Navigation is state-driven: `App.tsx` renders the correct page component based on the `page` state.
