# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router (routes under `app/[locale]`, API in `app/api`).
- `components/`: Reusable UI and layout components; `components/ui/` for primitives.
- `modules/`: Feature modules (e.g., `i18n`, `careers`, `portfolios`).
- `lib/`: Helpers and client/server utilities. `types/`: shared TypeScript types.
- `messages/`: i18n message catalogs (`en.json`, `zh-CN.json`).
- `public/`: static assets. Global styles in `app/globals.css`.

## Build, Test, and Development Commands

- `pnpm dev`: Run the app locally on `http://localhost:3333`.
- `pnpm build`: Production build (`next build --turbo`).
- `pnpm start`: Start the production server.
- `pnpm lint`: Lint with ESLint; `pnpm lint:fix` auto-fixes + formats.
- `pnpm format`: Run Prettier across the repo.
- `pnpm type-check`: TypeScript type checking (no emit).

## Coding Style & Naming Conventions

- TypeScript + React. Prefer server components; use `"use client"` only when needed.
- Formatting via Prettier (2 spaces, no semicolons, single quotes, width 120).
- ESLint config extends `@antfu` + Next rules; fix lint errors before pushing.
- File names: components `kebab-case.tsx` (PascalCase component names inside). Utility files `kebab-case.ts`.
- Paths: prefer `~/*` alias (configured in `tsconfig.json`).

## Testing Guidelines

- No unit test suite configured yet. Use `pnpm type-check` and `pnpm lint` as quality gates.
- For new features, add isolated utilities to `lib/` for easier future testing.

## Commit & Pull Request Guidelines

- Use Conventional Commits: `feat: ...`, `fix: ...`, `refactor: ...`, `chore: ...`, `style: ...`, `wip`.
- One logical change per commit; include scope when helpful (e.g., `feat(portfolios): ...`).
- PRs: include a clear description, linked issues, before/after screenshots for UI, and testing notes.
- Pre-commit hooks run `lint-staged` (ESLint autofix). Ensure a clean run locally.

## Security & Configuration Tips

- Copy `.env.example` to `.env.local`; never commit secrets. See `next.config.ts` for PostHog proxy and rewrites.
- i18n: add strings in `messages/*.json` and ensure routes under `app/[locale]` handle locale correctly.
