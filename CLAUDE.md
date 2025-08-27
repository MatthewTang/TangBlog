# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development**: `npm run dev` - Starts Vite dev server on port 5000
- **Build**: `npm run build` - Builds both frontend and backend (4 seconds)
- **Type Check**: `npm run check` - TypeScript compilation check (6 seconds)
- **Database Push**: `npm run db:push` - Push schema to PostgreSQL (requires DATABASE_URL)
- **Preview**: `npm run preview` - Preview production build

## Architecture Overview

This is a full-stack TypeScript personal portfolio website with a React frontend and Express backend that serves blog posts from markdown files.

### Project Structure
```
/client/src/        - React frontend with TypeScript
  /components/      - Shadcn/ui components built on Radix UI
  /pages/          - Page components (home.tsx, blog-post.tsx, not-found.tsx)
  /lib/            - Utilities (blog.ts for markdown parsing, utils.ts, queryClient.ts)
  /data/           - Static content data (content.ts)
  /blog/           - Markdown blog posts with frontmatter
/shared/           - Shared types and Drizzle schema
/attached_assets/  - Static assets
```

### Technology Stack
- **Frontend**: React 18 + TypeScript, Vite, Tailwind CSS, Shadcn/ui, Wouter routing, TanStack Query
- **Backend**: Node.js + Express + TypeScript (ES modules)
- **Database**: Drizzle ORM + PostgreSQL (Neon serverless) - optional, falls back to memory storage
- **Content**: Markdown files with YAML frontmatter

### Path Aliases
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

### Blog System
- Blog posts are markdown files in `client/src/blog/` with frontmatter
- Parsed client-side using Vite's glob import with `?raw` query
- Required frontmatter: `title`, `date`, `excerpt`
- Optional: `tags`
- Posts cached and sorted by date descending

### Database Schema
Single `users` table with id (UUID), username (unique), and password fields. Application works without database using memory storage fallback.

### Key Components
- `App.tsx`: Router with Wouter, QueryClient provider, toast system
- `home.tsx`: Main portfolio page with hero, skills, biography, projects, blog, contact sections
- `blog-post.tsx`: Individual blog post viewer with markdown rendering
- `lib/blog.ts`: Blog post loading and parsing logic

### Validation Requirements
Always run `npm run check` before committing to ensure TypeScript compilation. Test both development and production builds. The app should work without database setup using in-memory storage.