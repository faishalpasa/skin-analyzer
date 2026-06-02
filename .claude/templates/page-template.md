# Page Template

## Location

`src/pages/<page-name>/index.tsx`

## Folder Structure

```
src/pages/<page-name>/
  index.tsx         ← page entry point (wraps with context provider if needed)
  _context.tsx      ← page state + side effects (if non-trivial)
  _components/      ← page-specific components
```

## Simple page (no context needed)

```tsx
interface <PageName>PageProps {
  onNext: () => void
  onBack: () => void
}

export const <PageName>Page = ({ onNext, onBack }: <PageName>PageProps) => (
  <div>
    {/* page content */}
  </div>
)
```

## Page with context

```tsx
// index.tsx
import { <PageName>ContextProvider } from './_context'
import { PageContent } from './_components/page-content'

interface <PageName>PageProps {
  onResult: (result: SomeType) => void
  onBack: () => void
}

export const <PageName>Page = (props: <PageName>PageProps) => (
  <<PageName>ContextProvider {...props}>
    <PageContent />
  </<PageName>ContextProvider>
)
```

## Rules

- Named export only — no `export default`
- Page-specific state stays in `_context.tsx`; cross-page state stays in `App.tsx`
- No nested ternaries
- No `any` types
