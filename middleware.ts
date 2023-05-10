import createIntlMiddleware from 'next-intl/middleware'

import { i18n } from '~/i18n'

export default createIntlMiddleware({
  // A list of all locales that are supported
  locales: i18n.locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: i18n.defaultLocale,

  domains: [
    {
      domain: 'zolplay.com',
      defaultLocale: 'en',
      locales: ['en'],
    },
    {
      domain: 'cn.zolplay.com',
      defaultLocale: 'zh-CN',
      locales: ['zh-CN'],
    },
    {
      domain: 'zolplay.cn',
      defaultLocale: 'zh-CN',
      locales: ['zh-CN'],
    },
    {
      domain: 'localhost',
      defaultLocale: 'zh-CN',
      locales: ['zh-CN', 'en'],
    },
  ],
})

export const config = {
  // Skip all paths that aren't pages that you'd like to internationalize.
  // If you use the `public` folder, make sure your static assets are ignored
  // (e.g. by moving them to a shared folder that is referenced here).
  matcher: ['/((?!api|_next|_vercel|favicon.ico|assets|studio).*)'],
}
