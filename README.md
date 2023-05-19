# Zolplay Official Website

## Introduction

This repo contains the code for the official website of Zolplay.

- [English (zolplay.com)](https://zolplay.com)
- [简体中文 (zolplay.cn)](https://zolplay.cn)

## Tech Stack

- [Next.js 13 (app router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Sanity.io](https://www.sanity.io/)
- [pnpm](https://pnpm.io/)

## Set up local environment

copy `.env.example` -> `.env`

```env
NEXT_PUBLIC_OG_URL=http://localhost:3000/api/og
```

### Set up Sanity environment variables

Go to https://www.sanity.io/get-started/create-project and create a project, for example:

![Screenshot of a page for creating a Sanity project](./.github/sanity-guide-01.png)

You can then go into the project and get sanity's two environment variables and add them to `.env`
![Annotated screenshot of how to find Sanity's project ID and dataset](./.github/sanity-guide-02.png)

Finally, run these commands to start the project:

```bash
pnpm i
pnpm dev
```
