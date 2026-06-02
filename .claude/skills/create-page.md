# Skill: create-page

Scaffold a new page following the project's page convention.

## Trigger

When the user says "create a page", "add a page", or "new page named X".

## Steps

1. Create `src/pages/<page-name>/index.tsx` as the page entry point.
2. Create `src/pages/<page-name>/_context.tsx` if the page has non-trivial state or side effects.
3. Create `src/pages/<page-name>/_components/` if the page needs local components.
4. Add the new `PageName` variant to `src/types/skin.d.ts`.
5. Add the state branch in `App.tsx` to render the new page.

## Rules

- Named export: `export const <PageName>Page = () => {}`.
- No default exports.
- Page-specific logic stays inside the page folder.
- No nested ternaries.
- No `any` types.

## Output

A scaffolded page folder with `index.tsx` and optional `_context.tsx` and `_components/`.
