/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }, { hostname: 'upcdn.io' }],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [
            {
              type: 'query',
              key: 'uwu',
            },
          ],
          destination: '/og/uwu',
        },
      ],
    }
  },
}

export default config
