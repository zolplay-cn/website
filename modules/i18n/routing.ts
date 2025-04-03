import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh-CN'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Only add the locale prefix when needed
  localePrefix: 'as-needed',
})

export type Locale = (typeof routing.locales)[number]
