import { i18n } from '~/i18n'
import createIntlMiddleware from 'next-intl/middleware'

export default createIntlMiddleware({
  // A list of all locales that are supported
  locales: i18n.locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
})

export const config = {
  // Skip all paths that aren't pages that you'd like to internationalize.
  // If you use the `public` folder, make sure your static assets are ignored
  // (e.g. by moving them to a shared folder that is referenced here).
  matcher: [
    '/((?!api|_next|_vercel|favicon.ico|assets|studio|29f57913ffd7e20819ae33051df453aa.txt).*)',
  ],
}
