import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'
import { withNextVideo } from 'next-video/process'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js', 'jsx'],
  output: 'standalone',
  images: {
    remotePatterns: [new URL('https://cdn.zolplay.com/**')],
  },
  experimental: {
    serverActions: {
      // Limit body size to 50MB
      // Referenced from https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions#bodysizelimit
      bodySizeLimit: '50mb',
    },
  },
  // PostHog proxy configuration: Rewrites analytics requests through our domain to bypass ad blockers
  // Handles both root paths (/ingest/*) and localized paths (/:locale/ingest/*)
  // Referenced from https://posthog.com/docs/advanced/proxy/nextjs
  async rewrites() {
    return [
      // Standard paths - no locale prefix
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ]
  },
  // Redirects from old portfolios to new work pages
  async redirects() {
    return [
      {
        source: '/portfolios/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
      {
        source: '/portfolios/nexus',
        destination: '/work/live-aware',
        permanent: true,
      },
      {
        source: '/work/nexus',
        destination: '/work/live-aware',
        permanent: true,
      },
    ]
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
}

const withNextIntl = createNextIntlPlugin('./modules/i18n/request.ts')
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
export default withNextVideo(withNextIntl(withMDX(nextConfig)))
