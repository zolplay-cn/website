# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses pnpm as the package manager. Key commands:

- `pnpm dev` - Start development server on port 3333 with Turbo
- `pnpm build` - Build the production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint with Next.js configuration
- `pnpm lint:fix` - Format code with Prettier and fix linting issues
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking without emitting files

## Architecture Overview

This is a Next.js 15 application using the App Router with internationalization support. Key architectural decisions:

### Framework Stack

- **Next.js 15** with App Router for routing and server-side rendering
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **next-intl** for internationalization (English and Chinese)
- **PostHog** for analytics with custom proxy configuration
- **Zod** for form validation and type safety

### Project Structure

- `app/[locale]/` - Internationalized pages using dynamic routing
- `modules/` - Feature-specific code (careers, contact, i18n, portfolios)
- `components/` - Reusable UI components
- `lib/` - Utility functions and external service integrations
- `messages/` - Translation files (en.json, zh-CN.json)

### Internationalization

- Uses `next-intl` with locale-based routing
- Supports English (`en`) and Chinese (`zh-CN`) with English as default
- Pages are implemented as MDX files with locale suffixes (e.g., `page.en.mdx`, `page.zh-CN.mdx`)

### Content Strategy

- MDX files for page content with dynamic imports based on locale
- Portfolio/work content managed through data sources in `modules/portfolios/`
- Contact forms use server actions with form validation

### Key Features

- Responsive design with mobile-first approach
- Dark/light theme support with `next-themes`
- Analytics tracking with PostHog (proxied to bypass ad blockers)
- Server actions for form handling
- Static generation for performance
- Custom scrollbar styling and smooth scroll behavior

### Path Aliases

- `~/` maps to the root directory for cleaner imports

### Special Configurations

- PostHog proxy rewrites for analytics
- Redirects from old `/portfolios/` to new `/work/` paths
- MDX support for content pages
- Custom font loading (Inter Variable)
- 50MB body size limit for server actions

## Important Notes

- The application uses locale-based routing with `[locale]` dynamic segments
- Content is primarily in MDX format with dynamic imports based on locale
- Server actions are used for form submissions with Zod validation
- The site has specific redirects for portfolio → work path migration
- Analytics are proxied through the application domain to bypass ad blockers
