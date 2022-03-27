const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },

    extend: {
      backgroundImage: {
        'gradient-bg':
          'radial-gradient(26.96% 41.05% at 51.76% -18%, rgba(24, 114, 97, 0.2) 0%, rgba(24, 114, 97, 0) 100%), linear-gradient(113.5deg, #1C1C1F 10.29%, #121A2E 39.01%, #110B25 66.3%, #260F45 94.71%)',
      },
      boxShadow: {
        'in-dark':
          'inset -1px -1px 2px rgba(255, 225, 215, 0.02), inset 1px 1px 2px rgba(255, 255, 255, 0.07)',
      },
      colors: {
        dark: '#0A0D23',
        neon: {
          500: '#A1DDFFE5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },

      typography: ({ theme }) => ({
        dark: {
          css: {
            color: theme('colors.slate.400'),
            h1: {
              color: theme('colors.slate.100'),
            },
            'h2, h3, h4, thead th': {
              color: theme('colors.slate.200'),
            },
            'h2 small, h3 small, h4 small': {
              color: theme('colors.slate.400'),
            },
            code: {
              color: theme('colors.slate.200'),
            },
            hr: {
              borderColor: theme('colors.slate.200'),
              opacity: '0.05',
            },
            pre: {
              boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.1)',
            },
            a: {
              color: theme('colors.white'),
              borderBottomColor: theme('colors.sky.400'),
            },
            strong: {
              color: theme('colors.slate.200'),
            },
            thead: {
              color: theme('colors.slate.300'),
              borderBottomColor: 'rgb(148 163 184 / 0.2)',
            },
            'tbody tr': {
              borderBottomColor: 'rgb(148 163 184 / 0.1)',
            },
            blockQuote: {
              color: theme('colors.white'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
