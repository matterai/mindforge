# CLAUDE.md - Agent Guidelines for MindForge

## Commands

- Install dependencies: `pnpm install`
- Start dev: `pnpm run dev`
- Build: `pnpm run build`
- Package: `pnpm run package`
- Test: `pnpm test`
- Run single test: `pnpm test -- -t "test name"`
- Lint: `pnpm run lint`
- Typecheck: `pnpm run typecheck`

## Code Style

- Use TypeScript for type safety
- Import order: React, external libs, internal modules, styles
- Use rules from Guidelines.md
- Prefer functional components with hooks
- Use async/await for promises
- Error handling: use try/catch with specific error types
- Naming: camelCase for variables/functions, PascalCase for components/interfaces
- Component files: one component per file, named with kebab-case
- Use ESLint and Prettier with `.prettierrc` settings for formatting

