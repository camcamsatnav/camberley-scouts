# Camberley 478 Scouts

Rewrite of the Camberley 478 Scout Group site.

## Getting Started

```bash
pnpm install
pnpm dev
```

The local dev server runs at `http://localhost:3000/`.
Netlify's TanStack Start Vite plugin emulates the Netlify platform through the Vite dev server, so `pnpm dev` is the preferred local command.

## Scripts

```bash
pnpm build
pnpm test
pnpm check
pnpm typecheck
```

## Routes

The app uses TanStack Router file-based routes in `src/routes`.

Key page routes:

- `/`
- `/beavers`
- `/about-us/contact`
- `/about-us/hut-renovation`

Server routes:

- `GET /api/v1/health`
- `POST /api/v1/contact`

## Contact Email

Copy `.env.local.example` to `.env.local` and fill in the SMTP and recipient variables before testing real contact form submissions.
