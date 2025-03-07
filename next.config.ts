import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js', 'jsx'],
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin('./modules/i18n/request.ts')
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
export default withNextIntl(withMDX(nextConfig))
