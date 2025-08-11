# TangBlog - Personal Portfolio Website

TangBlog is a full-stack TypeScript portfolio and blog website for Matthew Tang, a software engineer. The application features a modern React frontend with Tailwind CSS styling and a Node.js/Express backend that serves blog posts from markdown files.

Always reference these instructions first and fall back to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Development Setup
- Install dependencies: `npm install` -- typically completes in under a minute; some peer dependency warnings are normal and can be ignored
- Type check the codebase: `npm run check` -- takes 6 seconds
- Start development server: `npm run dev` -- starts immediately, serves on port 5000
- Build for production: `npm run build` -- takes 4 seconds, builds both frontend and backend
- Start production server: `npm start` -- starts immediately, serves on port 5000

### Database Setup (Optional)
- **Development**: The application works without database setup using in-memory storage
- **Production**: Set `DATABASE_URL` environment variable and run `npm run db:push` to set up PostgreSQL
- Database command will fail without `DATABASE_URL` but this is expected for development

## Validation

### Manual Testing Requirements
Always manually validate changes by:
1. **Start the development server**: `npm run dev` and verify it serves on http://localhost:5000
2. **Test the blog API**: 
   - Visit http://localhost:5000/api/blog to see all blog posts
   - Visit http://localhost:5000/api/blog/testing-made-easy to see a specific post
3. **Verify the frontend**: Check that the portfolio website loads with proper styling
4. **Test blog functionality**: Ensure markdown blog posts are parsed correctly with frontmatter

### Before Committing
- Always run `npm run check` to ensure TypeScript compilation succeeds
- Always run `npm run build` to ensure production build works
- Test that both development and production servers start successfully

## Project Structure

### Key Directories
```
/client/src/        - React frontend application
  /components/      - Reusable UI components (Shadcn/ui)
  /pages/          - Page components
  /hooks/          - Custom React hooks
/server/            - Express backend
  index.ts         - Main server entry point
  routes.ts        - API route handlers and blog parsing
  storage.ts       - Database abstraction layer
/shared/            - Shared TypeScript types and database schema
  schema.ts        - Drizzle ORM database schema
/content/blog/      - Markdown blog posts with frontmatter
/dist/              - Production build output
```

### Configuration Files
- `package.json` - Dependencies and npm scripts
- `vite.config.ts` - Frontend build configuration with path aliases
- `tsconfig.json` - TypeScript configuration for all projects
- `drizzle.config.ts` - Database ORM configuration
- `tailwind.config.ts` - Tailwind CSS styling configuration

## Technology Stack

### Frontend
- **React 18** with TypeScript for component development
- **Vite** for build tooling and development server
- **Tailwind CSS** for utility-first styling
- **Shadcn/ui** component library built on Radix UI primitives
- **Wouter** for client-side routing
- **TanStack Query** for server state management

### Backend
- **Node.js** with Express framework
- **TypeScript** with ES modules
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** with Neon serverless (optional, uses memory storage in development)

## Common Commands and Expected Timing

### Development Workflow
- `npm install` -- 24 seconds, includes peer dependency warnings (normal)
- `npm run check` -- 6 seconds, validates TypeScript
- `npm run dev` -- Instant startup, development server on port 5000
- `npm run build` -- 4 seconds, builds frontend and backend
- `npm start` -- Instant startup, production server on port 5000

### Database Operations
- `npm run db:push` -- Requires DATABASE_URL environment variable, pushes schema to PostgreSQL

## API Endpoints

### Blog API
- `GET /api/blog` - Returns all blog posts with metadata
- `GET /api/blog/:slug` - Returns specific blog post by slug

### Static Assets
- `/attached_assets/*` - Serves static assets
- All other routes serve the React frontend

## Important Notes

### Development Workflow
- The application uses a monorepo structure with shared types between frontend and backend
- Path aliases are configured: `@/` for client src, `@shared/` for shared directory
- Hot module reloading works in development via Vite
- No linting or formatting scripts are configured in the project

### Blog System
- Blog posts are stored as markdown files in `/content/blog/`
- Each post must have frontmatter with: title, date, excerpt
- Optional frontmatter: tags (comma-separated)
- Posts are parsed at runtime when API endpoints are accessed

### Database Flexibility
- Application works without database setup using MemStorage class
- Database is only required for user authentication features
- Blog functionality is file-system based and doesn't require database

## Troubleshooting

### Common Issues
- **Peer dependency warnings during npm install**: Normal, can be ignored
- **DATABASE_URL error**: Expected when no database is configured, application still works
- **Port 5000 already in use**: Stop any running dev/prod servers first

### Performance
- Build times are very fast (4 seconds total)
- Development server starts immediately
- No long-running processes that require cancellation warnings

## File Locations Reference

### Frequently Modified Files
- `client/src/App.tsx` - Main React application component
- `server/routes.ts` - API route definitions and blog parsing logic
- `shared/schema.ts` - Database schema and type definitions
- `content/blog/*.md` - Blog post content files

### Configuration to Check When Making Changes
- Always check TypeScript compilation with `npm run check` after schema changes
- Verify path aliases in `vite.config.ts` when adding new import paths
- Check `drizzle.config.ts` when modifying database schema