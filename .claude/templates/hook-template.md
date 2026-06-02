# Hook Template

## Location

- Reusable: `src/hooks/use<HookName>.ts`
- Page-specific: `src/pages/<page-name>/use<HookName>.ts`

## Template

```ts
interface Use<HookName>Return {
  // return shape
}

export const use<HookName> = (): Use<HookName>Return => {
  // hook logic
  return {}
}
```

## Async example

```ts
import { useState, useEffect } from 'react'

interface Use<HookName>Return {
  data: SomeType | null
  isLoading: boolean
  error: string | null
}

export const use<HookName> = (): Use<HookName>Return => {
  const [data, setData] = useState<SomeType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      try {
        const result = await someCall()
        setData(result)
      } catch {
        setError('Failed to load data')
      } finally {
        setIsLoading(false)
      }
    }

    fetch()
  }, [])

  return { data, isLoading, error }
}
```

## Rules

- Hook name must start with `use`
- No JSX inside hooks
- No `any` types
- No nested ternaries
- `async/await` preferred over promise chaining
- Named export only
