# Skill: create-hook

Create a new custom React hook following project conventions.

## Trigger

When the user says "create a hook", "add a hook", or "new hook named X".

## Steps

1. Determine if the hook is reusable (→ `src/hooks/`) or page-specific (→ `src/pages/<page>/`).
2. Name the hook starting with `use` (e.g., `useFaceDetection`).
3. Use strict TypeScript typing for all inputs and return values.
4. Prefer `async/await` over promise chaining for async logic.

## Rules

- Hook file name must match the hook name: `useFaceDetection.ts`.
- No `any` types.
- No nested ternary expressions.
- Pure data-fetching or state logic only — no JSX inside hooks.
- Named export only.

## Output

A single `.ts` file placed in the correct hooks folder.
