# Utility Template

## Location

`src/utils/<utilName>.ts`

## Template

```ts
export const <functionName> = (input: InputType): OutputType => {
  // pure logic — no side effects
  return result
}
```

## Canvas utility example

```ts
export const samplePixels = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number
): ImageData | null => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  return ctx.getImageData(x, y, width, height)
}
```

## Rules

- Pure functions only — no side effects, no API calls, no state mutations
- Named exports only
- No `any` types
- Group related small utilities in one file
- File name in camelCase: `skinAnalyzer.ts`
