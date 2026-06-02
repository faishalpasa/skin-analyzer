# Skill: create-component

Create a new React component following project conventions.

## Trigger

When the user says "create a component", "add a component", or "new component named X".

## Steps

1. Determine if the component is reusable (→ `src/components/`) or page-specific (→ `src/pages/<page>/_components/`).
2. Create the file using the component template.
3. Use named exports only — never default exports.
4. Define a TypeScript `interface` named `<ComponentName>Props`.
5. Use Tailwind CSS for all styling — no inline styles (exception: dynamic `backgroundColor` from a hex string).

## Rules

- Functional components with arrow functions only.
- No nested ternary expressions — use `if/else` or named variables.
- No `any` types.

## Output

A single `.tsx` file placed in the correct folder per the folder-structure rules.
