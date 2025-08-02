# Overview

This is a full-stack personal portfolio website for Matthew Tang, a software engineer. The application features a modern React frontend with Tailwind CSS styling and a Node.js/Express backend that serves blog posts from markdown files. The portfolio showcases Matthew's professional background, skills, projects, and blog posts about software engineering topics including blockchain, mobile development, and testing. The website design is based on the provided screenshot and implements Gatsby-like functionality for markdown blog posts.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with Shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and production builds
- **UI Components**: Comprehensive component library using Radix UI primitives

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Blog System**: Markdown file parser with frontmatter support
- **API Endpoints**: RESTful API for serving blog posts from markdown files
- **File System**: Direct file system access for reading markdown content
- **Storage Interface**: Abstracted storage layer with memory and database implementations

## Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Development Storage**: In-memory storage implementation for development
- **Session Storage**: PostgreSQL-backed session store using connect-pg-simple

## Project Structure
- **Monorepo Design**: Shared schema and types between client and server
- **Client Directory**: Contains all frontend React code and assets
- **Server Directory**: Express backend with routes and storage logic
- **Shared Directory**: Common TypeScript types and database schema
- **Content Management**: Markdown-based blog posts with frontmatter

## Development Features
- **Hot Reload**: Vite development server with HMR
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Quality**: ESLint and Prettier configuration
- **Path Aliases**: Configured import aliases for cleaner imports
- **Error Handling**: Runtime error overlay for development

# External Dependencies

## Database & ORM
- **@neondatabase/serverless**: Neon PostgreSQL serverless database driver
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migration and introspection tool
- **connect-pg-simple**: PostgreSQL session store for Express

## Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **@radix-ui/react-***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **date-fns**: Date manipulation library

## Development Tools
- **vite**: Build tool and development server
- **@vitejs/plugin-react**: React support for Vite
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development

## UI Components
- **shadcn/ui**: Pre-built component library built on Radix UI
- **lucide-react**: Icon library
- **embla-carousel-react**: Carousel component
- **cmdk**: Command palette component

## Form Handling
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation library
- **drizzle-zod**: Zod integration for Drizzle schemas