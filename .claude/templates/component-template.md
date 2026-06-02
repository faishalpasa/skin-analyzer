# Component Template

## Location

- Reusable: `src/components/<ComponentName>.tsx`
- Page-specific: `src/pages/<page-name>/_components/<component-name>.tsx`

## Template

```tsx
interface <ComponentName>Props {
  // define props here
}

export const <ComponentName> = ({}: <ComponentName>Props) => (
  <div>
    {/* content */}
  </div>
)
```

## Rules

- Named export only — no `export default`
- Arrow function only
- Props interface named `<ComponentName>Props`
- No nested ternaries — use `if/else` or named variables
- Tailwind CSS only — no inline styles (exception: dynamic `backgroundColor` from a hex string)
- No `any` types
