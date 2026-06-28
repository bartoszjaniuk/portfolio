# Portfolio

Personal portfolio site built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS. Content will be powered by [Strapi](https://strapi.io) CMS.

## Requirements

| Tool    | Version                                                           |
| ------- | ----------------------------------------------------------------- |
| Node.js | `>=24.3.0` (see [`.nvmrc`](.nvmrc))                               |
| Bun     | `1.3.11` (see `packageManager` in [`package.json`](package.json)) |

Use [fnm](https://github.com/Schniz/fnm), [nvm](https://github.com/nvm-sh/nvm), or [asdf](https://asdf-vm.com) to match the pinned Node version locally.

## Getting started

```bash
bun install
cp .env.example .env.local
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` and fill in values as needed:

| Variable               | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| `STRAPI_URL`           | Strapi API base URL                                                  |
| `STRAPI_API_TOKEN`     | Strapi API token for authenticated requests                          |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (defaults to `http://localhost:3000` in development) |

## Scripts

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `bun dev`           | Start the development server          |
| `bun run build`     | Create a production build             |
| `bun run start`     | Serve the production build            |
| `bun run check`     | Run ESLint and Prettier checks        |
| `bun run typecheck` | Run TypeScript without emitting files |
| `bun run validate`  | Run `check`, `typecheck`, and `build` |

Git hooks run `lint-staged` on commit and `bun run validate` before push.

## CI

GitHub Actions runs `check`, `typecheck`, and `build` on every pull request and on pushes to `main`. Enable branch protection on `main` to require CI to pass before merging.

## Deployment

This project deploys to [Vercel](https://vercel.com) via the GitHub integration. Preview deployments are created for pull requests; merges to `main` deploy to production.

Repository: [github.com/bartoszjaniuk/portfolio](https://github.com/bartoszjaniuk/portfolio)
