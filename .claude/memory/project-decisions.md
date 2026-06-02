# Project Decisions

Track architectural and design decisions made during development, including the reasoning behind them.

---

## Template

```
### [Decision title]
- **Date**: YYYY-MM-DD
- **Decision**: what was decided
- **Why**: the motivation or constraint that drove this choice
- **Alternatives considered**: other options that were ruled out
- **Impact**: files or areas affected
```

---

## Recorded Decisions

### State-driven navigation (no router)
- **Date**: 2026-06-02
- **Decision**: Navigation between `landing`, `camera`, and `result` is managed via `useState` in `App.tsx`. No router is used.
- **Why**: The app has only three screens with a linear flow. A router would add unnecessary complexity and dependencies.
- **Alternatives considered**: React Router, TanStack Router.
- **Impact**: `src/App.tsx`, `src/types/skin.d.ts` (`PageName` type).

### All analysis runs in-browser (no backend)
- **Date**: 2026-06-02
- **Decision**: face-api.js models are served statically from `/public/models/`; pixel analysis runs entirely on `HTMLCanvasElement`. No data leaves the device.
- **Why**: Privacy requirement — skin data should not be sent to any server.
- **Alternatives considered**: Server-side ML inference via API.
- **Impact**: `src/utils/skinAnalyzer.ts`, `src/pages/camera/index.tsx`.

### Named exports + arrow functions for all components
- **Date**: 2026-06-02
- **Decision**: All components use named exports and arrow function syntax. Default exports are banned.
- **Why**: Aligns with reklub/admin-dashboard conventions; named exports make imports explicit and refactoring safer.
- **Alternatives considered**: Default exports (common React convention).
- **Impact**: All `.tsx` files.
