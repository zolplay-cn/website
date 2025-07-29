FROM node:22-alpine AS base

FROM base AS dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat


WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

RUN corepack enable

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Application environment variables
ARG CONTACT_WEBHOOK_URL=""
ARG NEXT_PUBLIC_POSTHOG_KEY=""

ENV CONTACT_WEBHOOK_URL=$CONTACT_WEBHOOK_URL
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
