# AGENTS.md

## Project Structure

This repo is now a single TanStack Start application at the repository root.

- `src/routes` contains file-based routes, including API routes under `src/routes/api`.
- `src/server` contains server-side services, validation, middleware, and config used by API routes.
- `src/common` contains shared UI components, hooks, errors, types, icons, and styles.
- `src/HomePage`, `src/HutRenovationPage`, `src/contactPage`, and `src/joinBeaversPage` contain page-specific components, constants, tests, and styles.
- `public` contains static image and browser assets.
- `.github/workflows` contains CI and release-label/version automation.

## Commands

Run these before each commit:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm build
```

Useful targeted commands:

```bash
pnpm test:client
pnpm test:server
```

Use `pnpm.cmd` on Windows PowerShell if script execution policy blocks `pnpm`.

## Conventions

- Use the `#/*` import alias for source imports where it keeps paths clearer.
- Keep page-specific code in the matching page folder unless it is genuinely shared.
- Keep reusable UI primitives and hooks in `src/common`.
- Do not use barrel imports from `@mui/icons-material`. Import icons directly, for example:

```ts
import HomeFilled from '@mui/icons-material/HomeFilled';
```

Avoid this form because it massively slows Vitest imports:

```ts
import { HomeFilled } from '@mui/icons-material';
```
