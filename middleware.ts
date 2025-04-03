import createIntlMiddleware from 'next-intl/middleware'

import { routing } from './modules/i18n/routing'

export default createIntlMiddleware(routing)

export const config = {
  // Skip all paths that aren't pages that you'd like to internationalize.
  // If you use the `public` folder, make sure your static assets are ignored
  // (e.g. by moving them to a shared folder that is referenced here).
  matcher: ['/((?!api|_next|_vercel|favicon.ico|assets|29f57913ffd7e20819ae33051df453aa.txt).*)'],
}
