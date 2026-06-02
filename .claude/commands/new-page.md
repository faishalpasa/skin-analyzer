# New Page

Create a new page following the project's page convention.

## Usage

```
/project:new-page <page-name>
```

Example: `/project:new-page onboarding`

Page name from argument: **$ARGUMENTS**

## Steps

1. Create `src/pages/$ARGUMENTS/index.tsx`
   - Import and wrap with `<PageContextProvider>` if the page has non-trivial state
   - Otherwise render the page component directly
   - Named export

2. If the page has non-trivial state, create `src/pages/$ARGUMENTS/_context.tsx`
   - Create `PageContext` with `React.createContext`
   - Export `usePageContext` hook and `PageContextProvider`
   - Handle state and any browser API calls (camera, canvas, etc.) here

3. If the page needs local UI, create `src/pages/$ARGUMENTS/_components/<component>.tsx`
   - Named export, arrow function
   - Consume context via `usePageContext()`

4. Wire the new page in `App.tsx`
   - Add the new page name to the `PageName` union in `src/types/skin.d.ts`
   - Add a state branch in `App.tsx` to render the new page

## Conventions

- Named exports for all components and context providers — no default exports
- Tailwind CSS for all styles
- No nested ternaries — use `if/else` or early returns
- No `any` types
