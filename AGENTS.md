# AGENTS.md

## Cursor Cloud specific instructions

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite Dev Server | `npm run dev` | 5173 | Frontend-only app; no backend/DB required |

### Quick reference

- **Install deps**: `npm install`
- **Type check**: `npm run check`
- **Build**: `npm run build`
- **Dev server**: `npm run dev` (serves on port 5173, not 5000 despite what CLAUDE.md says)

### Gotchas

- The Vite config does not set a custom port; the dev server runs on the default **5173**, not port 5000 as CLAUDE.md states.
- No database is required to run the app. The `DATABASE_URL` env var is only needed for `npm run db:push` (schema migration to Neon Postgres). The app falls back to in-memory storage.
- `gatsby` and several unused backend packages (express, passport, etc.) are listed in `package.json` dependencies but are not actively used. They inflate install time (~70s) but do not affect the running app.
- There is no ESLint config or lint script; type checking via `npm run check` (tsc) is the primary static analysis step.
- The `@replit/vite-plugin-cartographer` plugin only loads when `REPL_ID` is set; safe to ignore outside Replit.
