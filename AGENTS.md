<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# EquipRent client

Next.js App Router frontend for an equipment rental marketplace. `README.md` is only a project blurb; the notes below are the working context.

## Commands

- `npm run dev` — Next 16 dev server on `http://localhost:3000` (Turbopack).
- `npm run lint`, `npm run typecheck`, `npm run build` — the only verification steps. There is no test runner, test script, or test file in this repo.
- `npm run typecheck` is clean; `npm run lint` exits non-zero on a clean tree because the shadcn-generated `components/ui/carousel.tsx` trips React 19's `react-hooks/set-state-in-effect` rule (warnings elsewhere are unused imports and `<img>` usage). Capture a baseline before blaming a new error on your change.
- `npm run format` — Prettier over all TS/TSX. Config: no semicolons, double quotes, LF, 80 columns, Tailwind class sorting against `app/globals.css`.
- Package manager is npm (`package-lock.json`).

## App wiring

- `app/` is the App Router. Route groups do not change URLs: `app/(auth)/sign-in/page.tsx` → `/sign-in`, `app/(auth)/register/page.tsx` → `/register`.
- `app/layout.tsx` is the only root layout; it mounts `ThemeProvider` and the shared `Navbar` for every page.
- `app/page.tsx` composes the homepage from `components/homepage/` (`Banner`, `FeaturedEquipment`, `Footer`). The footer lives only there, not in the root layout, so auth pages render without one.
- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Static images live in `app/assets/` and are imported as modules (`import DarkLogo from "@/app/assets/dark-logo.png"`); `public/` is empty apart from `.gitkeep`. Follow that convention instead of adding files to `public/`.
- Homepage data is hardcoded: `components/homepage/FeaturedEquipment.tsx` exports `featuredEquipment` and `IEquipment` with Unsplash image URLs.
- Those Unsplash images use a plain `<img>` (lint warning only) because `next.config.ts` sets no `images.remotePatterns`; switching to `next/image` requires adding that config first.

## Auth

- Better Auth is served at `app/api/auth/[...all]/route.ts` via `toNextJsHandler(auth)`; the server config is `lib/auth.ts`.
- **Auth is currently in-memory.** `lib/auth.ts` creates a `MongoClient` and `db` and imports `mongodbAdapter`, but `betterAuth()` is never passed `database`/`adapter`, so better-auth silently falls back to its memory adapter. Accounts and sessions vanish on restart and are per-instance; the `equiprent` database is never written. Persisting means passing `database: mongodbAdapter(db)`.
- Client access is `authClient` from `lib/auth-client.ts`; use `authClient.useSession()` for session state and `hooks/useSignOut.ts` for sign-out.
- `.env` is gitignored and holds `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (`http://localhost:3000`), and `MONGODB_URI`. `lib/auth.ts` also reads `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`, which are not set.
- `lib/auth-client.ts` reads `process.env.BETTER_AUTH_URL`, but non-`NEXT_PUBLIC_` variables are not exposed to the browser, so that base URL never reaches client code.
- Auth pages call `authClient.signIn.email` / `signUp.email`, then `router.push("/")`.

## UI conventions

- shadcn is configured for **Base UI** (`@base-ui/react`, style `base-nova`), not Radix. Primitives live in `components/ui/`; add more with `npx shadcn@latest add <component>`.
- Base UI components accept a `render` prop; prefer it over a Radix-style `asChild`.
- `cn` is re-exported from `lib/utils.ts` (backed by the `cn` package). Use `@/lib/utils` in new code; generated `components/ui/*` files import `"cn"` directly.
- Toasts use Base UI's manager in `components/ui/toast.tsx`: `toast.add({ type: "success" | "error", description, priority: "high" })`.
- **Toasts are currently invisible**: the `Toaster` component is exported but never mounted in `app/layout.tsx`.
- Dark mode runs through `next-themes` in `components/provider/ThemeProvider.tsx`, which is the mounted provider. `components/theme-provider.tsx` is an unused duplicate with a `d` hotkey — do not edit it expecting changes to take effect.
- Styling uses Tailwind v4 tokens from `app/globals.css` (`bg-background`, `text-muted-foreground`, `border-border`, …).

## Current gaps

- Links to `/equipment`, `/dashboard`, and `/dashboard/add-equipment` exist in the navbar/homepage but have no pages yet.
- `hooks/useSignOut.ts` redirects to `/signin`, while the real route is `/sign-in`.
- No data layer: the codebase has zero `fetch()` calls and no `NEXT_PUBLIC_*` env vars, so any backend integration starts from scratch (base URL + client helper) rather than extending an existing API module.
- No CI (`.github/` absent) and no `opencode.json`. `CLAUDE.md` only contains `@AGENTS.md`, so this file is the single instruction source.

Keep the `nextjs-agent-rules` block at the top: `next dev` re-adds it if removed.
