# Tech Stack

- React 19 + TypeScript 5 (strict mode)
- Vite 6
- ESLint + Prettier
- Tailwind CSS v3
- face-api.js v0.22 (TinyFaceDetector, runs fully in-browser)

## Path Alias

`@/` maps to `src/` — use it for all internal imports.

## Notable Constraints

- face-api.js models must be served from `/public/models/` — they are fetched at runtime via `loadFromUri`
- All image/pixel processing uses `HTMLCanvasElement` + `CanvasRenderingContext2D.getImageData`
- No network requests — detection and analysis run entirely on-device
