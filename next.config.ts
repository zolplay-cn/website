import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js', 'jsx'],
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

      // Localized paths with language prefix
      {
        source: '/:locale/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/:locale/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/:locale/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
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
export default withNextIntl(withMDX(nextConfig))
