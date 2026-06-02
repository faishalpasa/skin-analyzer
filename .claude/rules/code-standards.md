# Code Standards

- TypeScript strict mode — avoid `any`
- Use `async/await` over `.then()` chaining
- No nested ternary expressions — use `if/else` or early returns instead
- Readability over cleverness
- No comments unless the WHY is non-obvious

## Exports

- **Named exports** for all components, hooks, utils, and types
- No default exports

## Avoid

- Inline styles — use Tailwind CSS (exception: dynamic `style={{ backgroundColor }}` for skin tone hex)
- Large files with multiple responsibilities
- Duplicating logic across pages
- Direct canvas or face-api calls from page components — use `analyzeSkin` from `src/utils/skinAnalyzer.ts`

## AI Instructions

When generating or refactoring code:

- Use Tailwind CSS for all styles
- Follow the `_context.tsx` + `_components/` pattern for pages with non-trivial logic
- Determine whether logic is reusable (→ `src/`) or page-specific (→ page folder)
- Do not modify the architecture without clear justification
- Never use nested ternary expressions — use `if/else` or early returns
