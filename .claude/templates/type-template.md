# Type Template

## Location

`src/types/<typeName>.d.ts`

## Template

```ts
// Entity type
export interface <EntityName> {
  id: string
  // fields
}

// Union type
export type <UnionName> = 'value-a' | 'value-b' | 'value-c'

// Utility type derivation
export type <EntityName>Summary = Pick<<EntityName>, 'id' | 'name'>
```

## Rules

- Named exports only
- Prefer `interface` for object shapes, `type` for unions and utility derivations
- No `any` types
- Group types for the same domain in one file
- File name in camelCase: `skin.d.ts`
- Derive related types (Pick, Omit, Partial) rather than duplicating fields manually
