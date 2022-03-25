# [Turborepo](https://turborepo.org) for Zolplay Website.

## What's inside?

It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org) app
- `web`: another [Next.js](https://nextjs.org) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Tools

This turborepo is built by these amazing tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Turborepo](https://turborepo.org) for managing the monorepo
- [Next.js](https://nextjs.org/) for building the web apps
- [pnpm](https://pnpm.io/) for managing the packages
- [TailwindCSS](https://tailwindcss.com/) for styling the web apps

## Setup

To install all dependencies, run the following command:

```bash
pnpm i
```

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm dev
```
