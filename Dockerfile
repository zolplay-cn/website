FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat && apk upgrade

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Enable corepack and install dependencies
RUN corepack enable && \
    pnpm install --frozen-lockfile --production=false

FROM base AS builder
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable

# Copy installed dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY . .

# Set build environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build args for build-time environment variables
ARG CONTACT_WEBHOOK_URL=""
ARG NEXT_PUBLIC_POSTHOG_KEY=""

ENV CONTACT_WEBHOOK_URL=$CONTACT_WEBHOOK_URL
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY

# Build the application
RUN pnpm build

# Production runtime stage
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Runtime environment variables (will be passed from build args)
ARG CONTACT_WEBHOOK_URL=""
ARG NEXT_PUBLIC_POSTHOG_KEY=""

ENV CONTACT_WEBHOOK_URL=$CONTACT_WEBHOOK_URL
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY

# Install curl for health checks and create system group and user for security
RUN apk add --no-cache curl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public files and build output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set runtime configuration
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check (checking if the app responds)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start the application
CMD ["node", "server.js"]
