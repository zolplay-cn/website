import next_intl from 'next-intl/plugin'

const withNextIntl = next_intl(
  './i18n.server.ts'
)

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' }
    ]
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production'
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production'
  }
}

export default withNextIntl(config)
